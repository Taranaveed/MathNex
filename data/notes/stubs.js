function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stubTopic(code, title, summary, points) {
  const safePoints = points && points.length ? points : [`Core ideas in ${title}`];
  return {
    slug: slugify(title),
    code,
    title,
    status: "draft",
    summary: summary || `Topic notes for ${title}, written in the same format as our Further Mathematics notes.`,
    points: safePoints,
    blocks: [
      {
        heading: "Notes in progress",
        body: `<p>This topic follows the MathNex notes format: syllabus points, clear explanations, a worked example, common mistakes, and practice.</p><p>The full write-up for <strong>${title}</strong> is being prepared. The outline below shows what will be covered.</p><ul>${safePoints
          .map((point) => `<li>${point}</li>`)
          .join("")}</ul>`,
      },
    ],
    example: {
      prompt: `A worked example for ${title} will appear here.`,
      steps: ["The method will be shown step by step.", "The final answer will be highlighted clearly."],
      answer: "Answer coming soon.",
    },
    mistakes: [
      `Typical exam slips for ${title} will be listed here.`,
      "Use the outline above to start revising while the full note is finished.",
    ],
    practice: [
      `Try a past-paper question on ${title} from the matching paper folder.`,
      "Bring any stuck step to the AI Marker or a live class.",
    ],
  };
}

function makePaper({ slug, number, code, title, tone, summary, topics }) {
  return {
    slug,
    number,
    code,
    title,
    tone: tone || "moss",
    summary,
    topics: topics.map((topic, index) =>
      stubTopic(
        topic.code || `${number}.${index + 1}`,
        topic.title,
        topic.summary,
        topic.points
      )
    ),
  };
}

module.exports = { stubTopic, makePaper, slugify };
