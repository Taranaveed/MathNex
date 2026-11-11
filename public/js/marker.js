document.addEventListener("DOMContentLoaded", () => {
  const tree = window.MATHNEX_PICKER || [];
  const board = document.getElementById("board");
  const level = document.getElementById("level");
  const pathRest = document.getElementById("path-rest");
  const msFile = document.getElementById("ms-file");
  const msStatus = document.getElementById("ms-status");
  const form = document.getElementById("marker-form");
  const resultBox = document.getElementById("marker-result");

  if (!board || !form) return;

  function fillSelect(select, options, placeholder) {
    select.innerHTML = "";
    const first = document.createElement("option");
    first.value = "";
    first.textContent = placeholder;
    select.appendChild(first);
    options.forEach((option) => {
      const el = document.createElement("option");
      el.value = option.value;
      el.textContent = option.label;
      select.appendChild(el);
    });
  }

  function findNode(nodes, slug) {
    return nodes.find((node) => node.slug === slug) || null;
  }

  function flattenLeaves(node, prefix = []) {
    const here = prefix.concat(node.slug);
    if (!node.children || !node.children.length) {
      return [{ value: here.slice(2).join("/"), label: node.label + (node.hasMarkScheme ? " · mark scheme available" : ""), slugs: here }];
    }
    return node.children.flatMap((child) => flattenLeaves(child, here));
  }

  function selectedSlugs() {
    const boardSlug = board.value;
    const levelSlug = level.value;
    const rest = pathRest.value;
    if (!boardSlug || !levelSlug || !rest) return null;
    return [boardSlug, levelSlug].concat(rest.split("/").filter(Boolean));
  }

  function refreshBoards() {
    fillSelect(
      board,
      tree.map((node) => ({ value: node.slug, label: node.label })),
      "Optional"
    );
    fillSelect(level, [], "Optional");
    fillSelect(pathRest, [], "Optional");
  }

  function refreshLevels() {
    const node = findNode(tree, board.value);
    fillSelect(
      level,
      node ? node.children.map((child) => ({ value: child.slug, label: child.label })) : [],
      "Optional"
    );
    fillSelect(pathRest, [], "Optional");
    clearMs();
  }

  function refreshPaths() {
    const boardNode = findNode(tree, board.value);
    const levelNode = boardNode ? findNode(boardNode.children, level.value) : null;
    const leaves = levelNode ? levelNode.children.flatMap((child) => flattenLeaves(child, [boardNode.slug, levelNode.slug])) : [];
    fillSelect(
      pathRest,
      leaves.map((leaf) => ({
        value: leaf.value,
        label: leaf.slugs.slice(2).join(" / ") + (leaf.label.includes("mark scheme available") ? " · mark scheme available" : ""),
      })),
      "Optional"
    );
    clearMs();
  }

  function clearMs() {
    fillSelect(msFile, [], "Automatic — use the mark scheme if available");
    msStatus.textContent = "No paper selected. Your work can still be checked.";
  }

  async function refreshMs() {
    const slugs = selectedSlugs();
    if (!slugs) return clearMs();
    msStatus.textContent = "Checking folder…";
    try {
      const res = await fetch("/api/marker/context?" + new URLSearchParams({ slugs: slugs.join("/") }));
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not read folder");
      fillSelect(
        msFile,
        (data.markSchemes || []).map((name) => ({ value: name, label: name })),
        "Automatic — use the mark scheme if available"
      );
      if ((data.markSchemes || []).length) {
        msStatus.textContent = data.markSchemes.length + " mark scheme file(s) found.";
      } else {
        msStatus.textContent = "No mark scheme found for this paper. Your work can still be checked.";
      }
    } catch (error) {
      clearMs();
      msStatus.textContent = error.message;
    }
  }

  function renderResult(payload) {
    const { result, meta } = payload;
    const steps = Array.isArray(result.steps) ? result.steps : [];
    const open = meta.mode === "open";
    const expectCol = open ? "Expected method" : "Mark scheme";
    const kicker = open ? "Reviewed" : "Marked";
    const metaLine = open
      ? (meta.context || "General review") + (meta.note ? " · " + meta.note : "")
      : (meta.context || "") + " · " + (meta.markScheme || "");

    resultBox.innerHTML = `
      <article class="board-card marker-card">
        <p class="board-card-kicker">${escapeHtml(kicker)}</p>
        <h3>${escapeHtml(String(result.marksEarned ?? "—"))} / ${escapeHtml(String(result.marksAvailable ?? "—"))}</h3>
        <p>${escapeHtml(result.summary || "")}</p>
        <p class="quiet">${escapeHtml(metaLine)}</p>
        <div class="table-scroll">
          <table>
            <thead><tr><th>Your working</th><th>${escapeHtml(expectCol)}</th><th>Awarded</th></tr></thead>
            <tbody>
              ${steps
                .map(
                  (step) => `<tr>
                    <td>${escapeHtml(step.student || "")}</td>
                    <td>${escapeHtml(step.markScheme || "")}</td>
                    <td>${step.awarded ? "Yes" : "No"}${step.note ? "<br><small>" + escapeHtml(step.note) + "</small>" : ""}</td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <h3>Where the mark went</h3>
        <p>${escapeHtml(result.whereMarkWent || "")}</p>
        <h3>Tip</h3>
        <p>${escapeHtml(result.tip || "")}</p>
      </article>
    `;
  }

  function renderError(message) {
    resultBox.innerHTML = `
      <article class="board-card marker-card">
        <p class="board-card-kicker">Could not mark</p>
        <h3>Stopped</h3>
        <p>${escapeHtml(message)}</p>
      </article>
    `;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  board.addEventListener("change", refreshLevels);
  level.addEventListener("change", refreshPaths);
  pathRest.addEventListener("change", refreshMs);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const slugs = selectedSlugs();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = "Marking…";
    resultBox.innerHTML = `<article class="board-card"><p class="board-card-kicker">Please wait</p><h3>Marking in progress…</h3></article>`;

    const body = new FormData();
    body.set("slugs", slugs ? slugs.join("/") : "");
    body.set("question", form.question.value.trim());
    body.set("working", form.working.value);
    body.set("msFile", msFile.value);
    if (form.script.files[0]) body.set("script", form.script.files[0]);

    try {
      const res = await fetch("/api/marker", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Marking failed");
      renderResult(data);
    } catch (error) {
      renderError(error.message);
    } finally {
      button.disabled = false;
      button.textContent = "Mark this script";
    }
  });

  refreshBoards();
});
