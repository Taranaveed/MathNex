const { packs } = require("./packs");

function allPacks() {
  return packs.map((pack) => ({
    ...pack,
    topicCount: pack.papers.reduce((sum, paper) => sum + paper.topics.length, 0),
    paperCount: pack.papers.length,
  }));
}

function getPack(slug) {
  return allPacks().find((pack) => pack.slug === slug) || null;
}

function getPaper(packSlug, paperSlug) {
  const pack = getPack(packSlug);
  if (!pack) return null;
  const paper = pack.papers.find((item) => item.slug === paperSlug) || null;
  if (!paper) return null;
  return { pack, paper };
}

function flattenPack(pack) {
  const list = [];
  pack.papers.forEach((paper) => {
    paper.topics.forEach((topic, index) => {
      list.push({ paper, topic, index });
    });
  });
  return list;
}

function getTopic(packSlug, paperSlug, topicSlug) {
  const found = getPaper(packSlug, paperSlug);
  if (!found) return null;
  const list = flattenPack(found.pack);
  const at = list.findIndex(
    (item) => item.paper.slug === paperSlug && item.topic.slug === topicSlug
  );
  if (at < 0) return null;
  return {
    pack: found.pack,
    ...list[at],
    prev: at > 0 ? list[at - 1] : null,
    next: at < list.length - 1 ? list[at + 1] : null,
  };
}

function notesBase(pack) {
  if (pack.legacyBase) return pack.legacyBase;
  return `/notes/${pack.slug}`;
}

function topicHref(pack, paper, topic) {
  return `${notesBase(pack)}/${paper.slug}/${topic.slug}`;
}

function paperHref(pack, paper) {
  return `${notesBase(pack)}/${paper.slug}`;
}

module.exports = {
  packs: allPacks(),
  allPacks,
  getPack,
  getPaper,
  getTopic,
  flattenPack,
  notesBase,
  topicHref,
  paperHref,
};
