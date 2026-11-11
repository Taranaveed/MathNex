const fs = require("fs");
const path = require("path");
const { boards, findBySlugs } = require("./catalog");

function isMsName(name) {
  const lower = name.toLowerCase();
  return lower.endsWith(".pdf") && (lower.includes("-ms") || lower.includes("_ms") || /(^|[^a-z])ms([^a-z]|$)/i.test(lower.replace(/\.pdf$/, "")));
}

function isQpName(name) {
  const lower = name.toLowerCase();
  return lower.endsWith(".pdf") && (lower.includes("-qp") || lower.includes("_qp") || lower.includes("question"));
}

function folderPath(node) {
  return path.join(__dirname, "..", node.folder);
}

function listPdfMeta(node) {
  const dir = folderPath(node);
  if (!fs.existsSync(dir)) return { markSchemes: [], questionPapers: [], other: [] };
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".pdf"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return {
    markSchemes: files.filter(isMsName),
    questionPapers: files.filter(isQpName),
    other: files.filter((name) => !isMsName(name) && !isQpName(name)),
  };
}

function pickerTree(nodes = boards) {
  return nodes.map((node) => ({
    slug: node.slug,
    label: node.label,
    kind: node.kind,
    href: node.href,
    hasMarkScheme: listPdfMeta(node).markSchemes.length > 0,
    children: pickerTree(node.children),
  }));
}

function resolveContext(slugs) {
  if (!Array.isArray(slugs) || !slugs.length) return null;
  const node = findBySlugs(slugs);
  if (!node) return null;
  const pdfs = listPdfMeta(node);
  return {
    node,
    folder: node.folder,
    markSchemes: pdfs.markSchemes.map((name) => ({
      name,
      abs: path.join(folderPath(node), name),
    })),
    questionPapers: pdfs.questionPapers.map((name) => ({
      name,
      abs: path.join(folderPath(node), name),
    })),
  };
}

function findMarkSchemeFile(slugs, preferredName) {
  const context = resolveContext(slugs);
  if (!context || !context.markSchemes.length) return null;
  if (preferredName) {
    const hit = context.markSchemes.find((file) => file.name === preferredName);
    if (hit) return { ...hit, context };
  }
  return { ...context.markSchemes[0], context };
}

module.exports = {
  pickerTree,
  resolveContext,
  findMarkSchemeFile,
  listPdfMeta,
  isMsName,
};
