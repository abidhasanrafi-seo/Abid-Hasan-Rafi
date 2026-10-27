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

  /* Safety net: ensure reveals trigger even if IntersectionObserver misses (e.g. on some laptops) */
  function revealInView() {
    $$(".reveal").forEach((el) => {
      if (el.classList.contains("visible")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible");
    });
  }
  revealInView();
  window.addEventListener("scroll", revealInView, { passive: true });
  if (!("IntersectionObserver" in window)) {
    $$(".reveal").forEach((el) => el.classList.add("visible"));
  }

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
/* ============================================================
   Chatbot — Rafi's AI Assistant
   ============================================================ */
(function () {
  "use strict";

  const msgs = document.getElementById("chatMsgs");
  const input = document.getElementById("chatInput");
  const form = document.getElementById("chatForm");
  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const closeBtn = document.getElementById("chatClose");
  const quick = document.getElementById("chatQuick");

  if (!msgs || !input || !form || !toggle || !panel) return;

  /* ---------- Knowledge base ---------- */
  const KB = [
    { keys: ["hi", "hello", "hey", "hola", "salam", "assalam"], reply: "Hi there! 👋 I'm <b>Rafi's AI Assistant</b>. How can I help you today? You can ask about Abid Hasan Rafi's skills, services, experience, education, or how to contact him." },
    { keys: ["who", "abid", "rafi", "about", "introduce", "yourself"], reply: "Abid Hasan Rafi is an <b>SEO Expert working at MicroDeft</b> and a <b>BBA student at Canadian University of Bangladesh</b>. He helps businesses rank higher on Google with data-driven, white-hat SEO strategies. Based in Dhaka, Bangladesh." },
    { keys: ["seo", "search engine"], reply: "Rafi specializes in complete SEO: on-page, off-page, technical SEO, keyword research, link building, local SEO, Core Web Vitals, and content strategy — all white-hat and Google-compliant." },
    { keys: ["skill", "skills", "expertise", "good at"], reply: "His key skills:\n• On-Page SEO (95%)\n• Keyword Research (92%)\n• Off-Page SEO & Link Building (90%)\n• Technical SEO & Core Web Vitals (88%)\n• Content Strategy (86%)\n• Google Analytics & Search Console (84%)\n\nTools: Ahrefs, SEMrush, Moz, Screaming Frog, GA4, Search Console, GTmetrix, PageSpeed Insights, Yoast, Rank Math & more." },
    { keys: ["service", "services", "offer", "provide", "help me"], reply: "Rafi offers 6 core SEO services:\n1. SEO Audit & Strategy\n2. Keyword Research & Mapping\n3. On-Page SEO\n4. Technical SEO & Speed\n5. Link Building & Off-Page\n6. Local SEO & Content\n\nWant details on any? Just ask!" },
    { keys: ["experience", "work", "microdeft", "job", "company"], reply: "Rafi works as an <b>SEO Expert at MicroDeft</b> (microdeft.com) — a leading software development & digital marketing company in Dhaka, Bangladesh. He manages end-to-end SEO: audits, keyword research, on-page optimization, link building, and performance tracking." },
    { keys: ["education", "study", "university", "college", "bba", "cub", "canadian"], reply: "Rafi is pursuing a <b>Bachelor of Business Administration (BBA)</b> at <b>Canadian University of Bangladesh (CUB)</b> — focusing on Marketing & Digital Business, with coursework in strategy, consumer behavior, and market research." },
    { keys: ["contact", "reach", "hire", "talk", "email", "message"], reply: "You can reach Rafi here:\n• Facebook: <a href=\"https://web.facebook.com/abid.hasan.rafi.731010\" target=\"_blank\" rel=\"noopener\">abid.hasan.rafi.731010</a>\n• LinkedIn: <a href=\"https://www.linkedin.com/in/abid-hasan-rafi-392333329/\" target=\"_blank\" rel=\"noopener\">Abid Hasan Rafi</a>\n• Instagram: <a href=\"https://www.instagram.com/ab_id9630/?hl=en\" target=\"_blank\" rel=\"noopener\">ab_id9630</a>\n• Or use the Contact form on this page. He's available for SEO projects, audits & consultations!" },
    { keys: ["facebook", "fb"], reply: "Facebook: <a href=\"https://web.facebook.com/abid.hasan.rafi.731010\" target=\"_blank\" rel=\"noopener\">web.facebook.com/abid.hasan.rafi.731010</a>" },
    { keys: ["linkedin"], reply: "LinkedIn: <a href=\"https://www.linkedin.com/in/abid-hasan-rafi-392333329/\" target=\"_blank\" rel=\"noopener\">linkedin.com/in/abid-hasan-rafi-392333329</a>" },
    { keys: ["instagram", "insta", "ig"], reply: "Instagram: <a href=\"https://www.instagram.com/ab_id9630/?hl=en\" target=\"_blank\" rel=\"noopener\">instagram.com/ab_id9630</a>" },
    { keys: ["price", "cost", "rate", "fee", "charge", "how much"], reply: "Pricing depends on the project scope. Please DM Rafi directly on Facebook or LinkedIn for a custom quote — he'll be happy to discuss!" },
    { keys: ["location", "where", "based", "dhaka", "bangladesh"], reply: "Rafi is based in <b>Dhaka, Bangladesh</b> 🇧🇩 and works with clients worldwide." },
    { keys: ["thank", "thanks", "thx", "appreciate"], reply: "You're welcome! 😊 Feel free to ask anything else, or reach out to Rafi directly. Happy to help!" },
    { keys: ["bye", "goodbye", "see you", "exit", "close"], reply: "Goodbye! 👋 Thanks for visiting Abid Hasan Rafi's website. Come back anytime!" },
    { keys: ["audit", "technical", "core web vitals", "speed"], reply: "Rafi's Technical SEO & Speed service covers: Core Web Vitals (LCP, INP, CLS), crawl errors, indexation, XML sitemaps, schema markup, mobile-first fixes, and site speed optimization." },
    { keys: ["keyword", "research"], reply: "Rafi does data-backed keyword research: search intent analysis, long-tail opportunities, keyword-to-page mapping, and competitor gap analysis to find ranking opportunities others miss." },
    { keys: ["link building", "backlink", "off-page"], reply: "Rafi builds authority through white-hat link building: digital PR, guest posting, outreach, brand mentions & citations — all Google-compliant to grow Domain Authority safely." },
    { keys: ["local seo", "google business", "map pack"], reply: "Rafi's Local SEO includes Google Business Profile optimization, NAP consistency, local citations, and review strategy to help businesses rank in the local map pack." }
  ];

  const FALLBACK = "I'm not sure about that, but I can connect you with Rafi! Try asking about his <b>skills, services, experience, education,</b> or <b>contact</b> details. Or reach him directly on Facebook/LinkedIn/Instagram.";

  const QUICK = ["Who is Rafi?", "SEO Services", "Skills", "Contact", "Experience", "Education"];

  let isOpen = false;
  let isTyping = false;

  function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function formatMsg(text) {
    const safe = text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/&lt;b&gt;/g, "<b>").replace(/&lt;\/b&gt;/g, "</b>")
      .replace(/&lt;a /g, "<a ").replace(/&lt;\/a&gt;/g, "</a>")
      .replace(/&lt;ul&gt;/g, "<ul>").replace(/&lt;\/ul&gt;/g, "</ul>")
      .replace(/&lt;li&gt;/g, "<li>").replace(/&lt;\/li&gt;/g, "</li>")
      .replace(/\n/g, "<br>");
    return safe;
  }

  function addMessage(text, who) {
    const wrap = document.createElement("div");
    wrap.className = "chatbot__msg chatbot__msg--" + who;
    const avatar = document.createElement("div");
    avatar.className = "chatbot__msg-avatar";
    avatar.textContent = who === "bot" ? "🤖" : "👤";
    const bubble = document.createElement("div");
    bubble.className = "chatbot__bubble";
    bubble.innerHTML = formatMsg(text);
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const wrap = document.createElement("div");
    wrap.className = "chatbot__msg chatbot__msg--bot";
    wrap.id = "chatTyping";
    const avatar = document.createElement("div");
    avatar.className = "chatbot__msg-avatar";
    avatar.textContent = "🤖";
    const typing = document.createElement("div");
    typing.className = "chatbot__typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    wrap.appendChild(avatar);
    wrap.appendChild(typing);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() { const t = document.getElementById("chatTyping"); if (t) t.remove(); }

  function getReply(text) {
    const q = text.toLowerCase().trim();
    if (!q) return null;
    for (const entry of KB) {
      for (const k of entry.keys) {
        if (q.includes(k)) return entry.reply;
      }
    }
    return FALLBACK;
  }

  function botReply(userText) {
    if (isTyping) return;
    isTyping = true;
    showTyping();
    const delay = 600 + Math.min(900, userText.length * 12);
    setTimeout(() => {
      hideTyping();
      addMessage(getReply(userText) || FALLBACK, "bot");
      isTyping = false;
    }, delay);
  }

  function openChat() {
    isOpen = true;
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    if (msgs.childElementCount === 0) {
      setTimeout(() => addMessage("I am Rafi’s AI Assistant. How Can I help you?", "bot"), 250);
      renderQuick();
    }
    setTimeout(() => input.focus(), 320);
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function renderQuick() {
    quick.innerHTML = "";
    QUICK.forEach((q) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = q;
      b.addEventListener("click", () => { addMessage(q, "user"); botReply(q); });
      quick.appendChild(b);
    });
  }

  toggle.addEventListener("click", () => (isOpen ? closeChat() : openChat()));
  closeBtn.addEventListener("click", closeChat);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    addMessage(escapeHtml(val), "user");
    input.value = "";
    botReply(val);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen) closeChat(); });

  if (!sessionStorage.getItem("chatHintShown")) {
    sessionStorage.setItem("chatHintShown", "1");
    setTimeout(() => { if (!isOpen) toggle.style.animation = "chatPulse 1.2s ease-in-out 3"; }, 4000);
  }
})();
