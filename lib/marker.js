const fs = require("fs");
const OpenAI = require("openai");
const { findMarkSchemeFile } = require("./markSchemeIndex");

const MAX_MS_CHARS = 24000;

async function extractPdfText(absPath) {
  const data = fs.readFileSync(absPath);
  const { PDFParse } = require("pdf-parse");
  const parser = new PDFParse({ data });
  const parsed = await parser.getText();
  return String((parsed && parsed.text) || "").replace(/\s+\n/g, "\n").trim();
}

function buildSystemPrompt(mode) {
  const shared = [
    "You are an exam marker for Cambridge (CAIE) and Edexcel mathematics (IGCSE, O Level, A Level, Further Maths).",
    "If the working is unclear, say what cannot be awarded and why.",
    "Reply with JSON only, matching this schema:",
    JSON.stringify({
      question: "string",
      marksEarned: 0,
      marksAvailable: 0,
      summary: "one short plain-English sentence",
      steps: [{ student: "what they did", markScheme: "what is expected", awarded: true, note: "optional" }],
      whereMarkWent: "plain English explanation of lost marks",
      tip: "one examiner-style tip",
    }),
  ];

  if (mode === "scheme") {
    return [
      ...shared.slice(0, 1),
      "Mark ONLY against the provided mark scheme text. Do not invent mark scheme points.",
      ...shared.slice(1),
    ].join("\n");
  }

  return [
    ...shared.slice(0, 1),
    "No official mark scheme file was supplied.",
    "Check the student's working as a careful examiner: method, accuracy, and typical board-style method marks.",
    "Estimate a fair marksEarned / marksAvailable for the work shown.",
    "In steps[].markScheme, write what a correct method would expect — label it as expected method, not as a quoted official scheme.",
    "Be honest when you are unsure.",
    ...shared.slice(1),
  ].join("\n");
}

function buildUserText({ contextLabel, question, typedWorking, markSchemeText, msFileName, mode }) {
  const lines = [
    `Mode: ${mode === "scheme" ? "official mark scheme" : "open check (any question)"}`,
    `Paper context: ${contextLabel || "not specified — mark the work as shown"}`,
    question ? `Question focus: ${question}` : "Question focus: whole script / as shown",
  ];

  if (mode === "scheme") {
    lines.push(`Mark scheme file: ${msFileName}`, "", "MARK SCHEME TEXT:", markSchemeText.slice(0, MAX_MS_CHARS));
  } else {
    lines.push("", "No uploaded mark scheme. Mark from the student working alone.");
  }

  lines.push("", typedWorking ? `STUDENT TYPED WORKING:\n${typedWorking}` : "STUDENT WORKING: see attached image or PDF.");
  return lines.join("\n");
}

async function loadMarkScheme(slugs, preferredMs) {
  if (!Array.isArray(slugs) || !slugs.length) return null;

  const ms = findMarkSchemeFile(slugs, preferredMs);
  if (!ms) return { mode: "open", contextLabel: null, msName: null, markSchemeText: "", folder: null };

  let markSchemeText = "";
  try {
    markSchemeText = await extractPdfText(ms.abs);
  } catch (err) {
    const error = new Error("The mark scheme PDF could not be read.");
    error.status = 500;
    throw error;
  }

  if (!markSchemeText || markSchemeText.length < 40) {
    return {
      mode: "open",
      contextLabel: ms.context.node.parts.join(" / "),
      msName: null,
      markSchemeText: "",
      folder: ms.context.folder,
      note: "Mark scheme PDF had almost no readable text; falling back to an open check.",
    };
  }

  return {
    mode: "scheme",
    contextLabel: ms.context.node.parts.join(" / "),
    msName: ms.name,
    markSchemeText,
    folder: ms.context.folder,
  };
}

async function markAttempt({
  slugs,
  question,
  typedWorking,
  filePath,
  fileMime,
  preferredMs,
}) {
  if (!process.env.OPENAI_API_KEY) {
    const error = new Error("OPENAI_API_KEY is not set on the server.");
    error.status = 503;
    throw error;
  }

  const hasTyped = Boolean(typedWorking && typedWorking.trim());
  const hasFile = Boolean(filePath);
  if (!hasTyped && !hasFile) {
    const error = new Error("Add typed working, or upload a photo/PDF of the script.");
    error.status = 422;
    throw error;
  }

  const scheme = await loadMarkScheme(slugs, preferredMs);
  const mode = scheme && scheme.mode === "scheme" ? "scheme" : "open";
  const contextLabel =
    (scheme && scheme.contextLabel) ||
    (Array.isArray(slugs) && slugs.length ? slugs.join(" / ") : "");

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const content = [
    {
      type: "text",
      text: buildUserText({
        contextLabel,
        question: question || "",
        typedWorking: hasTyped ? typedWorking.trim() : "",
        markSchemeText: (scheme && scheme.markSchemeText) || "",
        msFileName: (scheme && scheme.msName) || "",
        mode,
      }),
    },
  ];

  if (hasFile) {
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString("base64");
    const mime = fileMime || "application/octet-stream";
    if (mime.startsWith("image/")) {
      content.push({
        type: "image_url",
        image_url: { url: `data:${mime};base64,${base64}` },
      });
    } else if (mime === "application/pdf") {
      let studentPdfText = "";
      try {
        studentPdfText = await extractPdfText(filePath);
      } catch (err) {
        studentPdfText = "";
      }
      content[0].text += studentPdfText
        ? `\n\nSTUDENT PDF TEXT:\n${studentPdfText.slice(0, 16000)}`
        : "\n\nSTUDENT PDF: uploaded, but text could not be extracted. Mark only what you can from typed working and context.";
    } else {
      const error = new Error("Upload a PNG, JPG, WEBP, or PDF.");
      error.status = 422;
      throw error;
    }
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(mode) },
      { role: "user", content },
    ],
  });

  const raw = completion.choices[0] && completion.choices[0].message && completion.choices[0].message.content;
  let result;
  try {
    result = JSON.parse(raw);
  } catch (err) {
    const error = new Error("The marker returned an unreadable reply. Try again.");
    error.status = 502;
    throw error;
  }

  return {
    result,
    meta: {
      mode,
      markScheme: (scheme && scheme.msName) || null,
      folder: (scheme && scheme.folder) || null,
      context: contextLabel || "Open check",
      model: process.env.OPENAI_MODEL || "gpt-4o",
      note:
        mode === "open"
          ? (scheme && scheme.note) ||
            "Reviewed without an official mark scheme on file. Guidance only — not a board-certified mark."
          : null,
    },
  };
}

module.exports = { markAttempt, extractPdfText };
