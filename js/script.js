/* ============================================================
   Abid Hasan Rafi — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Header shadow + scroll progress ---------- */
  const header = $("#header");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

    toTop.classList.toggle("show", y > 450);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile nav ---------- */
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");

  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  $$(".nav__link").forEach((link) =>
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Active nav link on scroll ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".nav__link");

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Typing effect ---------- */
  const roles = [
    "SEO Expert",
    "Digital Marketer",
    "BBA Student",
    "MicroDeft Team Member",
    "Search Engine Strategist"
  ];
  const typed = $("#typedRoles");
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIdx];
    typed.textContent = deleting
      ? current.slice(0, --charIdx)
      : current.slice(0, ++charIdx);

    let delay = deleting ? 45 : 95;
    if (!deleting && charIdx === current.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 350;
    }
    setTimeout(typeLoop, delay);
  }
  if (typed) typeLoop();

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Skill bars ---------- */
  const bars = $$(".bar");
  const barObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const level = e.target.dataset.level || "0";
        const fill = $(".bar__fill", e.target);
        if (fill) setTimeout(() => (fill.style.width = level + "%"), 150);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => barObserver.observe(b));

  /* ---------- Contact form (demo handler) ---------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const btn = $("button[type='submit']", form);
      const original = btn.textContent;
      btn.textContent = "✓ Message Ready — DM me on social!";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 3200);
    });
  }

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
