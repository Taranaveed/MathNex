const fs = require("fs");
const path = require("path");

const LIBRARY_ROOT = path.join(__dirname, "..", "Exam Boards");
const FILE_EXT = new Set([".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".webp"]);

const BLURBS = {
  CAIE: "Cambridge International resources for A Level, IGCSE, and O Level, organised by syllabus.",
  "CAIE/A Level": "9709 Mathematics and 9231 Further Mathematics.",
  "CAIE/IGCSE": "0580 Mathematics (Core and Extended) and Additional Mathematics 0606.",
  "CAIE/O Level": "4024 Mathematics and Additional Mathematics 4037.",
  "CAIE/A Level/9709 (Mathematics)": "Six papers, each available under May/June and October/November.",
  "CAIE/A Level/9231 (Further Mathematics)": "Further Pure, Further Mechanics, and Further Statistics, with topic notes alongside session folders.",
  "CAIE/IGCSE/0580 (Mathematics)": "Core: Papers 1 and 3. Extended: Papers 2 and 4.",
  "CAIE/IGCSE/AM (Additional Mathematics - 0606)": "Papers 1 and 2, organised into past papers and worksheets.",
  "CAIE/O Level/4024 (Mathematics)": "Past papers and worksheets.",
  "CAIE/O Level/AM (Additional Mathematics - 4037)": "Papers 1 and 2, organised into past papers and worksheets.",
  Edexcel: "International A Level, IGCSE, and GCSE resources, with past papers and worksheets kept separate.",
  "Edexcel/IAL (International A Level)": "Pure, further pure, statistics, and mechanics units, with worksheets by unit.",
  "Edexcel/IGCSE": "Past papers and worksheets.",
  "Edexcel/GCSE": "Past papers, plus worksheets organised as V1 and V2.",
};

const PAPER_NAMES = {
  "9709": {
    P1: "Pure Mathematics 1",
    P2: "Pure Mathematics 2",
    P3: "Pure Mathematics 3",
    S1: "Probability & Statistics 1",
    M1: "Mechanics 1",
    M2: "Mechanics 2",
  },
  "9231": {
    FP1: "Further Pure 1",
    FP2: "Further Pure 2",
    FM1: "Further Mechanics",
    FS1: "Further Statistics",
  },
  "0580": {
    P1: "Paper 1",
    P2: "Paper 2",
    P3: "Paper 3",
    P4: "Paper 4",
  },
  ial: {
    P1: "Pure Mathematics 1",
    P2: "Pure Mathematics 2",
    P3: "Pure Mathematics 3",
    P4: "Pure Mathematics 4",
    FP1: "Further Pure 1",
    FP2: "Further Pure 2",
    FP3: "Further Pure 3",
    S1: "Statistics 1",
    S2: "Statistics 2",
    S3: "Statistics 3",
    M1: "Mechanics 1",
    M2: "Mechanics 2",
    M3: "Mechanics 3",
  },
};

const GROUP_RANK = { FP: 3, FM: 4, FS: 5, P: 0, S: 1, M: 2, V: 6 };

function slugify(name) {
  const code = name.match(/(\d{4})/);
  if (code) return code[1];
  return name
    .split("(")[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function rank(name) {
  const fixed = {
    CAIE: 0,
    Edexcel: 1,
    "A Level": 0,
    IGCSE: 1,
    "O Level": 2,
    "IAL (International A Level)": 0,
    GCSE: 2,
    "May-June": 0,
    "Oct-Nov": 1,
    Core: 0,
    Extended: 1,
    "Past Papers": 0,
    Worksheets: 1,
  };
  if (Object.prototype.hasOwnProperty.call(fixed, name)) return fixed[name];
  const match = name.match(/^(FP|FM|FS|P|S|M|V)(\d+)$/);
  if (match) return 100 + GROUP_RANK[match[1]] * 20 + Number(match[2]);
  return 500;
}

function kindOf(name, depth, hasChildren) {
  if (depth === 0) return "board";
  if (name === "May-June" || name === "Oct-Nov") return "session";
  if (name === "Core" || name === "Extended") return "tier";
  if (name === "Past Papers" || name === "Worksheets") return "shelf";
  if (depth === 1) return "level";
  if (depth === 2) return "subject";
  if (!hasChildren) return "paper";
  return "group";
}

function labelOf(name, subjectKey) {
  if (name === "May-June") return "May / June";
  if (name === "Oct-Nov") return "October / November";
  if (name === "Past Papers") return "Past papers";
  if (name === "IAL (International A Level)") return "International A Level";
  if (subjectKey && PAPER_NAMES[subjectKey] && PAPER_NAMES[subjectKey][name]) {
    return PAPER_NAMES[subjectKey][name];
  }
  const code = name.match(/(\d{4})/);
  const inside = name.match(/\(([^)]+)\)/);
  if (code && inside) {
    const inner = inside[1].replace(code[1], "").replace(/^[\s-]+|[\s-]+$/g, "").trim();
    if (name.startsWith(code[1])) return `${code[1]} ${inner}`.trim();
    return `${inner} ${code[1]}`.trim();
  }
  if (/^P\d+$/.test(name)) return `Paper ${name.slice(1)}`;
  if (/^V\d+$/.test(name)) return `Paper ${name}`;
  return name;
}

function subjectKeyFrom(parts) {
  const joined = parts.join("/");
  if (joined.startsWith("Edexcel/IAL")) return "ial";
  const code = joined.match(/(\d{4})/);
  return code ? code[1] : "";
}

function publicUrl(parts) {
  return "/library/" + parts.map((part) => encodeURIComponent(part)).join("/");
}

function walk(dir, parts) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));
  const files = entries
    .filter((entry) => entry.isFile() && FILE_EXT.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => ({
      name: entry.name,
      href: publicUrl(parts.concat(entry.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const children = folders.map((folder) => walk(path.join(dir, folder.name), parts.concat(folder.name)));
  const name = parts[parts.length - 1];
  const depth = parts.length - 1;
  const subjectKey = subjectKeyFrom(parts);
  const kind = kindOf(name, depth, children.length > 0);
  const node = {
    name,
    slug: slugify(name),
    label: labelOf(name, subjectKey),
    kind,
    blurb: BLURBS[parts.join("/")] || "",
    parts,
    folder: path.relative(path.join(LIBRARY_ROOT, ".."), dir).split(path.sep).join("/"),
    href: "/" + parts.map(slugify).join("/"),
    children,
    files,
    fileCount: files.length + children.reduce((sum, child) => sum + child.fileCount, 0),
    paperCount: (kind === "paper" ? 1 : 0) + children.reduce((sum, child) => sum + child.paperCount, 0),
  };
  const notesMap = {
    "/caie/a-level/9231": "/notes/9231",
    "/caie/a-level/9709": "/notes/9709",
    "/caie/igcse/0580": "/notes/0580",
    "/caie/igcse/0606": "/notes/0606",
    "/caie/o-level/4037": "/notes/4037",
    "/caie/o-level/4024": "/notes/4024",
    "/edexcel/ial": "/notes/edexcel-ial",
  };
  if (notesMap[node.href]) node.notesHref = notesMap[node.href];
  return node;
}

function build() {
  if (!fs.existsSync(LIBRARY_ROOT)) return [];
  return fs
    .readdirSync(LIBRARY_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => rank(a.name) - rank(b.name))
    .map((entry) => walk(path.join(LIBRARY_ROOT, entry.name), [entry.name]));
}

const boards = build();

function findBySlugs(slugs) {
  let nodes = boards;
  let found = null;
  for (const slug of slugs) {
    found = nodes.find((node) => node.slug === slug) || null;
    if (!found) return null;
    nodes = found.children;
  }
  return found;
}

function crumbsFor(slugs) {
  const crumbs = [];
  let nodes = boards;
  slugs.forEach((slug) => {
    const found = nodes.find((node) => node.slug === slug);
    if (!found) return;
    crumbs.push({ label: found.label, href: found.href });
    nodes = found.children;
  });
  return crumbs;
}

function allHrefs(nodes = boards, list = []) {
  nodes.forEach((node) => {
    list.push(node.href);
    allHrefs(node.children, list);
  });
  return list;
}

module.exports = { boards, findBySlugs, crumbsFor, allHrefs, LIBRARY_ROOT };
