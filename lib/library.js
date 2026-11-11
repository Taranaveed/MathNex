const fs = require("fs");
const path = require("path");

function publicFile(rel) {
  const abs = path.join(__dirname, "..", "public", rel);
  return fs.existsSync(abs) ? `/${rel.split(path.sep).join("/")}` : null;
}

function topicFiles(topic) {
  return {
    questions: publicFile(`papers/topical/${topic.slug}-questions.pdf`),
    markScheme: publicFile(`papers/topical/${topic.slug}-ms.pdf`),
    solutions: publicFile(`papers/topical/${topic.slug}-solutions.pdf`),
    expected: {
      questions: `public/papers/topical/${topic.slug}-questions.pdf`,
      markScheme: `public/papers/topical/${topic.slug}-ms.pdf`,
      solutions: `public/papers/topical/${topic.slug}-solutions.pdf`,
    },
  };
}

function sessionRows(session) {
  return session.variants.map((code) => ({
    code,
    qp: publicFile(`papers/sessions/${session.id}-${code}-qp.pdf`),
    ms: publicFile(`papers/sessions/${session.id}-${code}-ms.pdf`),
    solved: publicFile(`papers/sessions/${session.id}-${code}-solved.pdf`),
    expected: {
      qp: `public/papers/sessions/${session.id}-${code}-qp.pdf`,
      ms: `public/papers/sessions/${session.id}-${code}-ms.pdf`,
      solved: `public/papers/sessions/${session.id}-${code}-solved.pdf`,
    },
  }));
}

function countReady(papers, sessions) {
  let ready = 0;
  let total = 0;
  papers.forEach((paper) => {
    paper.topics.forEach((topic) => {
      const files = topicFiles(topic);
      [files.questions, files.markScheme, files.solutions].forEach((file) => {
        total += 1;
        if (file) ready += 1;
      });
    });
  });
  sessions.forEach((session) => {
    sessionRows(session).forEach((row) => {
      [row.qp, row.ms, row.solved].forEach((file) => {
        total += 1;
        if (file) ready += 1;
      });
    });
  });
  return { ready, total };
}

module.exports = { topicFiles, sessionRows, countReady };
