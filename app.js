const fs = require("fs");
const os = require("os");
const path = require("path");
const express = require("express");
const multer = require("multer");

const root = __dirname;
const site = require(path.join(root, "data", "site.js"));
const sessions = require(path.join(root, "data", "sessions.js"));
const { papers, getPaper, getTopic, flatten } = require(path.join(root, "data", "syllabus"));
const notes = require(path.join(root, "data", "notes"));
const { topicFiles, sessionRows, countReady } = require(path.join(root, "lib", "library.js"));
const { boards, findBySlugs, crumbsFor, allHrefs, LIBRARY_ROOT } = require(path.join(root, "lib", "catalog.js"));
const { pickerTree, resolveContext } = require(path.join(root, "lib", "markSchemeIndex.js"));
const { markAttempt } = require(path.join(root, "lib", "marker.js"));

const app = express();
const recentPosts = new Map();
const markerHits = new Map();
const upload = multer({
  dest: path.join(os.tmpdir(), "mathnex-uploads"),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter(req, file, cb) {
    const ok = /^(image\/(png|jpeg|webp)|application\/pdf)$/.test(file.mimetype);
    cb(ok ? null : new Error("Upload a PNG, JPG, WEBP, or PDF."), ok);
  },
});

try {
  fs.mkdirSync(path.join(os.tmpdir(), "mathnex-uploads"), { recursive: true });
} catch (error) {
  // ignore
}

app.disable("x-powered-by");
app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", path.join(root, "views"));

app.use((req, res, next) => {
  if ((req.method === "GET" || req.method === "HEAD") && req.path.length > 1 && req.path.endsWith("/")) {
    return res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length));
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.locals.site = site;
  res.locals.path = req.path || "/";
  res.locals.year = new Date().getFullYear();
  next();
});

const production = process.env.NODE_ENV === "production";
app.use(express.static(path.join(root, "public"), { maxAge: production ? "2h" : 0 }));
app.use("/library", express.static(LIBRARY_ROOT, { index: false, dotfiles: "deny", maxAge: production ? "2h" : 0 }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

function baseUrl(req) {
  return (process.env.SITE_URL || `${req.protocol}://${req.get("host")}`).replace(/\/$/, "");
}

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "MathNex — CAIE and Edexcel mathematics",
    pageDescription: site.blurb,
    boards,
  });
});

app.get(/^\/(caie|edexcel)(\/[a-z0-9-]+)*$/, (req, res, next) => {
  const slugs = req.path.split("/").filter(Boolean);
  const node = findBySlugs(slugs);
  if (!node) return next();
  res.render("browse", {
    pageTitle: `${node.label} — MathNex`,
    pageDescription: node.blurb || `${node.label} on MathNex.`,
    node,
    crumbs: crumbsFor(slugs),
  });
});

app.get("/notes", (req, res) => {
  res.render("notes", {
    pageTitle: "Notes — MathNex",
    pageDescription: "Topic notes for every CAIE and Edexcel paper on MathNex.",
    packs: notes.allPacks(),
  });
});

app.get("/notes/:pack", (req, res, next) => {
  const pack = notes.getPack(req.params.pack);
  if (!pack) return next();
  res.render("notes-pack", {
    pageTitle: `${pack.code} ${pack.title} notes — MathNex`,
    pageDescription: pack.blurb,
    pack,
    base: notes.notesBase(pack),
  });
});

app.get("/notes/:pack/:paper", (req, res, next) => {
  const found = notes.getPaper(req.params.pack, req.params.paper);
  if (!found) return next();
  if (found.pack.legacyBase) {
    return res.redirect(302, `${found.pack.legacyBase}/${found.paper.slug}`);
  }
  res.render("paper", {
    pageTitle: `${found.paper.title} — MathNex`,
    pageDescription: found.paper.summary,
    paper: found.paper,
    notesBase: notes.notesBase(found.pack),
    packHref: `/notes/${found.pack.slug}`,
    packLabel: `${found.pack.code} ${found.pack.title}`,
  });
});

app.get("/notes/:pack/:paper/:topic", (req, res, next) => {
  const found = notes.getTopic(req.params.pack, req.params.paper, req.params.topic);
  if (!found) return next();
  if (found.pack.legacyBase) {
    return res.redirect(302, `${found.pack.legacyBase}/${found.paper.slug}/${found.topic.slug}`);
  }
  res.render("topic", {
    pageTitle: `${found.topic.title} — MathNex`,
    pageDescription: String(found.topic.summary).replace(/<[^>]+>/g, ""),
    paper: found.paper,
    topic: found.topic,
    index: found.index,
    prev: found.prev,
    next: found.next,
    files: topicFiles(found.topic),
    notesBase: notes.notesBase(found.pack),
    packHref: `/notes/${found.pack.slug}`,
    packLabel: `${found.pack.code} ${found.pack.title}`,
  });
});

app.get("/further-maths", (req, res) => {
  res.render("further", {
    pageTitle: "Further Mathematics (9231) — MathNex",
    pageDescription: "The four papers of Cambridge Further Mathematics, topic by topic.",
    papers,
    topicCount: flatten().length,
  });
});

app.get("/further-maths/past-papers", (req, res) => {
  const topical = papers.map((paper) => ({
    slug: paper.slug,
    code: paper.code,
    title: paper.title,
    tone: paper.tone,
    topics: paper.topics.map((topic) => ({
      slug: topic.slug,
      code: topic.code,
      title: topic.title,
      href: `/further-maths/${paper.slug}/${topic.slug}`,
      files: topicFiles(topic),
    })),
  }));
  const shelves = sessions.map((session) => {
    const rows = sessionRows(session);
    const uploaded = rows.reduce((sum, row) => sum + [row.qp, row.ms, row.solved].filter(Boolean).length, 0);
    return { id: session.id, label: session.label, rows, uploaded, slots: rows.length * 3 };
  });
  const library = countReady(papers, sessions);
  res.render("past-papers", {
    pageTitle: "Past papers — MathNex",
    pageDescription: "Topical questions and whole sessions for Further Mathematics 9231.",
    topical,
    shelves,
    library,
  });
});

app.get("/further-maths/:paper", (req, res, next) => {
  const paper = getPaper(req.params.paper);
  if (!paper) return next();
  res.render("paper", {
    pageTitle: `${paper.title} — MathNex`,
    pageDescription: paper.summary,
    paper,
    notesBase: "/further-maths",
    packHref: "/notes/9231",
    packLabel: "9231 Further Mathematics",
  });
});

app.get("/further-maths/:paper/:topic", (req, res, next) => {
  const found = getTopic(req.params.paper, req.params.topic);
  if (!found) return next();
  res.render("topic", {
    pageTitle: `${found.topic.title} — MathNex`,
    pageDescription: found.topic.summary.replace(/<[^>]+>/g, ""),
    paper: found.paper,
    topic: found.topic,
    index: found.index,
    prev: found.prev,
    next: found.next,
    files: topicFiles(found.topic),
    notesBase: "/further-maths",
    packHref: "/notes/9231",
    packLabel: "9231 Further Mathematics",
  });
});

app.get("/add-maths", (req, res) => {
  res.redirect(301, "/notes/4037");
});

app.get("/classes", (req, res) => {
  res.render("classes", {
    pageTitle: "Classes — MathNex",
    pageDescription: "Book one-to-one or group mathematics tuition through Mathism.",
  });
});

app.get("/courses", (req, res) => {
  res.redirect(301, "/classes");
});

app.get("/marker", (req, res) => {
  res.render("marker", {
    pageTitle: "AI Marker — MathNex",
    pageDescription: "Upload or type your mathematics working for AI marking against a mark scheme when available.",
    pickerTree: pickerTree(),
  });
});

app.get("/api/marker/context", (req, res) => {
  const slugs = String(req.query.slugs || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
  const context = resolveContext(slugs);
  if (!context) return res.status(404).json({ error: "That paper path was not found." });
  res.json({
    folder: context.folder,
    markSchemes: context.markSchemes.map((file) => file.name),
    questionPapers: context.questionPapers.map((file) => file.name),
  });
});

app.post("/api/marker", (req, res) => {
  upload.single("script")(req, res, async (err) => {
    const cleanup = () => {
      if (req.file && req.file.path) {
        fs.promises.unlink(req.file.path).catch(() => {});
      }
    };

    if (err) {
      cleanup();
      return res.status(422).json({ error: err.message || "Upload failed." });
    }

    const ip = req.ip || "local";
    const now = Date.now();
    const hits = (markerHits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
    if (hits.length >= 20) {
      cleanup();
      return res.status(429).json({ error: "Too many marking requests from this network. Try again later." });
    }
    if (hits.length && now - hits[hits.length - 1] < 8000) {
      cleanup();
      return res.status(429).json({ error: "Wait a few seconds between marking requests." });
    }

    try {
      const slugs = String(req.body.slugs || "")
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean);
      const payload = await markAttempt({
        slugs,
        question: String(req.body.question || "").trim(),
        typedWorking: String(req.body.working || ""),
        filePath: req.file && req.file.path,
        fileMime: req.file && req.file.mimetype,
        preferredMs: String(req.body.msFile || "").trim() || null,
      });
      hits.push(now);
      markerHits.set(ip, hits);
      cleanup();
      return res.json(payload);
    } catch (error) {
      cleanup();
      return res.status(error.status || 500).json({ error: error.message || "Marking failed." });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About — MathNex",
    pageDescription: "Learn about MathNex — past papers, notes, AI marking, and live classes.",
    topicCount: flatten().length,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    pageTitle: "Contact — MathNex",
    pageDescription: "Contact the MathNex team.",
    sent: req.query.sent === "1",
    errors: [],
    values: { name: "", email: "", interest: "General enquiry", message: "" },
  });
});

app.post("/contact", (req, res) => {
  const values = {
    name: String(req.body.name || "").trim(),
    email: String(req.body.email || "").trim(),
    interest: String(req.body.interest || "").trim(),
    message: String(req.body.message || "").trim(),
  };
  const honeypot = String(req.body.company || "").trim();
  const errors = [];

  if (honeypot) {
    return res.redirect(303, "/contact?sent=1");
  }

  if (values.name.length < 2 || values.name.length > 80) errors.push("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 120) {
    errors.push("Please enter a valid email address.");
  }
  if (values.message.length < 10 || values.message.length > 4000) {
    errors.push("Please enter a message of at least one sentence.");
  }
  if (values.interest.length > 80) errors.push("Please choose a shorter subject.");

  const ip = req.ip || "local";
  const now = Date.now();
  if (recentPosts.get(ip) && now - recentPosts.get(ip) < 20000) {
    errors.push("Please wait a few seconds before sending again.");
  }

  const renderWith = () => {
    res.status(errors.length ? 422 : 200).render("contact", {
      pageTitle: "Contact — MathNex",
      pageDescription: "Contact the MathNex team.",
      sent: false,
      errors,
      values,
    });
  };

  if (errors.length) {
    return renderWith();
  }

  const entry = { at: new Date().toISOString(), ...values };
  const file = path.join(root, "data", "inbox.json");
  let items = [];
  try {
    if (fs.existsSync(file)) items = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    items = [];
  }
  if (!Array.isArray(items)) items = [];
  items.push(entry);
  try {
    fs.writeFileSync(file, JSON.stringify(items, null, 2));
  } catch (error) {
    errors.push(`Your message could not be saved. Please email ${site.email} instead.`);
    return renderWith();
  }
  recentPosts.set(ip, now);
  return res.redirect(303, "/contact?sent=1");
});

app.get("/privacy", (req, res) => {
  res.render("privacy", {
    pageTitle: "Privacy — MathNex",
    pageDescription: "How MathNex handles personal information and uploads.",
  });
});

app.get("/health", (req, res) => {
  res.type("text/plain").send("ok");
});

app.get("/sitemap.xml", (req, res) => {
  const base = baseUrl(req);
  const paths = ["/", "/notes", "/further-maths", "/further-maths/past-papers", "/classes", "/marker", "/about", "/contact", "/privacy", ...allHrefs()];
  notes.allPacks().forEach((pack) => {
    paths.push(`/notes/${pack.slug}`);
    if (pack.legacyBase) return;
    pack.papers.forEach((paper) => {
      paths.push(`/notes/${pack.slug}/${paper.slug}`);
      paper.topics.forEach((topic) => paths.push(`/notes/${pack.slug}/${paper.slug}/${topic.slug}`));
    });
  });
  papers.forEach((paper) => {
    paths.push(`/further-maths/${paper.slug}`);
    paper.topics.forEach((topic) => paths.push(`/further-maths/${paper.slug}/${topic.slug}`));
  });
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((item) => `  <url><loc>${base}${item}</loc></url>`),
    "</urlset>",
  ].join("\n");
  res.type("application/xml").send(body);
});

app.use((req, res) => {
  res.status(404).render("not-found", {
    pageTitle: "Page not found — MathNex",
    pageDescription: "The requested page could not be found.",
    boards,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MathNex listening on ${port}`);
});
