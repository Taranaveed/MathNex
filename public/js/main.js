document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      throwOnError: false,
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
    });
  }

  const filter = document.querySelector("[data-filter]");
  if (filter) {
    filter.addEventListener("input", () => {
      const query = filter.value.trim().toLowerCase();
      document.querySelectorAll("[data-topic]").forEach((item) => {
        const hit = !query || item.dataset.topic.includes(query);
        item.hidden = !hit;
      });
      document.querySelectorAll(".paper").forEach((paper) => {
        const visible = [...paper.querySelectorAll("[data-topic]")].some((item) => !item.hidden);
        paper.hidden = query.length > 0 && !visible;
        if (query && visible) paper.open = true;
      });
    });
  }

  const bar = document.querySelector(".readbar");
  if (bar) {
    const paint = () => {
      const node = document.documentElement;
      const max = node.scrollHeight - node.clientHeight;
      bar.style.transform = `scaleX(${max > 0 ? node.scrollTop / max : 0})`;
    };
    document.addEventListener("scroll", paint, { passive: true });
    paint();
  }

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tilt = document.querySelector("[data-tilt]");
  if (tilt && !motion) {
    const panel = tilt.querySelector(".hero-stage-inner");
    const cards = [...tilt.querySelectorAll(".motive-card")];
    const state = {
      tx: -12,
      ty: 10,
      cx: -12,
      cy: 10,
      px: 0,
      py: 0,
      dragging: false,
      live: false,
      baseX: 0,
      baseY: 0,
      startTx: 0,
      startTy: 0,
    };

    const paint = () => {
      state.cx += (state.tx - state.cx) * 0.16;
      state.cy += (state.ty - state.cy) * 0.16;
      panel.style.transform = `rotateX(${state.cy}deg) rotateY(${state.cx}deg) translateZ(18px)`;
      cards.forEach((card, index) => {
        const depth = 48 + index * 22;
        const shiftX = state.px * (18 + index * 10);
        const shiftY = state.py * (14 + index * 8);
        const float = Math.sin(Date.now() / 420 + index * 1.1) * (7 + index * 2);
        card.style.transform = `translate3d(${shiftX}px, ${shiftY + float}px, ${depth}px)`;
      });
      requestAnimationFrame(paint);
    };
    requestAnimationFrame(paint);

    const aimFromPoint = (clientX, clientY) => {
      const box = tilt.getBoundingClientRect();
      const x = (clientX - box.left) / box.width;
      const y = (clientY - box.top) / box.height;
      state.px = (x - 0.5) * 2;
      state.py = (y - 0.5) * 2;
      state.tx = (x - 0.5) * 36;
      state.ty = (0.5 - y) * 28;
      state.live = true;
      tilt.classList.add("is-live");
    };

    tilt.addEventListener("pointerenter", () => {
      tilt.classList.add("is-live");
      state.live = true;
    });

    tilt.addEventListener("pointermove", (event) => {
      if (state.dragging) {
        const dx = (event.clientX - state.baseX) / 6;
        const dy = (event.clientY - state.baseY) / 6;
        state.tx = Math.max(-34, Math.min(34, state.startTx + dx));
        state.ty = Math.max(-26, Math.min(26, state.startTy - dy));
        state.px = state.tx / 18;
        state.py = -state.ty / 14;
        return;
      }
      aimFromPoint(event.clientX, event.clientY);
    });

    tilt.addEventListener("pointerdown", (event) => {
      state.dragging = true;
      state.baseX = event.clientX;
      state.baseY = event.clientY;
      state.startTx = state.tx;
      state.startTy = state.ty;
      tilt.setPointerCapture(event.pointerId);
      tilt.classList.add("is-live");
    });

    const endDrag = () => {
      state.dragging = false;
    };

    tilt.addEventListener("pointerup", endDrag);
    tilt.addEventListener("pointercancel", endDrag);

    tilt.addEventListener("pointerleave", () => {
      if (state.dragging) return;
      state.live = false;
      state.tx = -12;
      state.ty = 10;
      state.px = 0;
      state.py = 0;
      tilt.classList.remove("is-live");
    });
  }

  const slot = document.querySelector("[data-formula]");
  if (slot && window.katex && !motion) {
    const lines = [
      { label: "Roots", tex: "\\sum \\alpha=-\\dfrac{b}{a}" },
      { label: "Polar area", tex: "\\dfrac12\\int r^{2}\\,d\\theta" },
      { label: "Hooke", tex: "T=\\dfrac{\\lambda x}{l}" },
      { label: "Generating functions", tex: "G'(1)=\\mathrm{E}(X)" },
    ];
    const label = slot.querySelector("[data-formula-label]");
    const tex = slot.querySelector("[data-formula-tex]");
    let index = 0;
    const paint = () => {
      label.textContent = lines[index].label;
      tex.innerHTML = window.katex.renderToString(lines[index].tex, { throwOnError: false, displayMode: true });
    };
    paint();
    window.setInterval(() => {
      index = (index + 1) % lines.length;
      paint();
    }, 3400);
  }
});
