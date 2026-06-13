/* ============================================================
   BEST FOR PETS — animations.js
   Scroll reveals, confetti, floating paws, counters
   ============================================================ */

/* ---------- scroll reveal ---------- */
function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ---------- floating paw prints (decorative) ---------- */
function spawnPaws(containerSel = "body", count = 8) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = document.querySelector(containerSel); if (!host) return;
  for (let i = 0; i < count; i++) {
    const paw = document.createElement("div");
    paw.className = "paw-float";
    paw.style.left = Math.random() * 100 + "%";
    paw.style.animationDelay = (Math.random() * 12) + "s";
    paw.style.animationDuration = (14 + Math.random() * 10) + "s";
    paw.style.fontSize = (16 + Math.random() * 22) + "px";
    paw.textContent = "🐾";
    host.appendChild(paw);
  }
}

/* ---------- confetti (order success) ---------- */
function fireConfetti(duration = 2600) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#E63946", "#FFB627", "#0E9594", "#FF6F61", "#8B5A8B", "#FFE3D2"];
  const canvas = document.createElement("canvas");
  canvas.className = "fixed inset-0 pointer-events-none z-[130]";
  canvas.width = innerWidth; canvas.height = innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const N = 160;
  const parts = Array.from({ length: N }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.5,
    w: 6 + Math.random() * 7, h: 8 + Math.random() * 10,
    vy: 2 + Math.random() * 3.5, vx: -1.5 + Math.random() * 3,
    rot: Math.random() * Math.PI, vr: -0.12 + Math.random() * 0.24,
    c: colors[(Math.random() * colors.length) | 0]
  }));
  const start = performance.now();
  (function tick(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.y += p.vy; p.x += p.vx + Math.sin(p.y / 40); p.rot += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    if (now - start < duration) requestAnimationFrame(tick);
    else canvas.remove();
  })(start);
}

/* ---------- animated number counter ---------- */
function animateCounters() {
  document.querySelectorAll("[data-count]").forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1200; const start = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased).toLocaleString("en-IN")) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ---------- skeleton swap helper ---------- */
function swapSkeleton(skelId, contentId, delay = 600) {
  setTimeout(() => {
    const s = document.getElementById(skelId), c = document.getElementById(contentId);
    if (s) s.classList.add("hidden");
    if (c) { c.classList.remove("hidden"); c.classList.add("fade-in-up"); }
    if (window.lucide) lucide.createIcons();
    initReveal();
  }, delay);
}
