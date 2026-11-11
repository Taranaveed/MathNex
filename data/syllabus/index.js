const papers = [
  require("./fp1"),
  require("./fp2"),
  require("./mechanics"),
  require("./statistics"),
];

function flatten() {
  const list = [];
  papers.forEach((paper) => {
    paper.topics.forEach((topic, index) => {
      list.push({ paper, topic, index });
    });
  });
  return list;
}

function getPaper(slug) {
  return papers.find((paper) => paper.slug === slug) || null;
}

function getTopic(paperSlug, topicSlug) {
  const list = flatten();
  const at = list.findIndex(
    (item) => item.paper.slug === paperSlug && item.topic.slug === topicSlug
  );
  if (at < 0) return null;
  return {
    ...list[at],
    prev: at > 0 ? list[at - 1] : null,
    next: at < list.length - 1 ? list[at + 1] : null,
  };
}

module.exports = { papers, flatten, getPaper, getTopic };
