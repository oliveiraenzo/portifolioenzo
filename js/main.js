/* ==========================================================
   Enzo Brito - Portfolio interactions
   ========================================================== */
(function () {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ----------------------------------------------------------
     Data
     ---------------------------------------------------------- */
  const ICONS = {
    risk: '<path d="M3 3v18h18"/><path d="M7 14l3-3 3 2 5-6"/><circle cx="7" cy="14" r="1"/><circle cx="10" cy="11" r="1"/><circle cx="13" cy="13" r="1"/><circle cx="18" cy="7" r="1"/>',
    investigator: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/>',
    worker: '<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V4h6v3"/>',
    warehouse: '<ellipse cx="12" cy="5" rx="6" ry="3"/><path d="M9 7v4h6V7"/><path d="M9 12v4h6v-4"/>',
    dashboard: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    check: '<path d="M20 6L9 17l-5-5"/>'
  };

  const PROJECTS = [
    {
      id: "risk-monitoring",
      title: "Risk Monitoring Platform",
      short: "Consolidação de indicadores de risco em tempo real.",
      tag: "Risk • Data",
      icon: ICONS.risk,
      color: "rgba(0,191,255,0.35)",
      desc: "Plataforma central que unifica métricas de risco de múltiplas fontes em um painel executivo vivo, com alertas inteligentes e priorização automática.",
      features: [
        "Ingestão em tempo real de indicadores de risco",
        "Scoring dinâmico e priorização automática",
        "Alertas contextuais para times de segurança",
        "Visão executiva consolidada"
      ],
      stack: ["Python", "Databricks", "SQL", "Power BI", "Azure"]
    },
    {
      id: "ai-incident",
      title: "AI Incident Investigator",
      short: "Assistente para investigação automatizada de eventos.",
      tag: "AI • Security",
      icon: ICONS.investigator,
      color: "rgba(124,93,237,0.4)",
      desc: "Copiloto de investigação que correlaciona eventos, resume incidentes e sugere próximos passos, reduzindo drasticamente o tempo de resposta.",
      features: [
        "Correlação automática de eventos e logs",
        "Resumo de incidentes em linguagem natural",
        "Sugestão de ações de contenção",
        "Integração com fluxos de SOC"
      ],
      stack: ["OpenAI", "RAG", "Python", "LangChain", "Vector DB"]
    },
    {
      id: "cyber-worker",
      title: "Cyber Risk Worker",
      short: "Agente inteligente para suporte a análises e auditorias.",
      tag: "AI Agent",
      icon: ICONS.worker,
      color: "rgba(34,211,238,0.35)",
      desc: "Agente autônomo que apoia analistas em auditorias, coleta evidências, valida controles e gera relatórios prontos para revisão.",
      features: [
        "Coleta e organização de evidências",
        "Validação automática de controles",
        "Geração de relatórios de auditoria",
        "Orquestração multi-etapas com supervisão humana"
      ],
      stack: ["Copilot Studio", "AI Agents", "Python", "Graph API"]
    },
    {
      id: "sec-warehouse",
      title: "Security Data Warehouse",
      short: "Centralização de dados de segurança.",
      tag: "Data Engineering",
      icon: ICONS.warehouse,
      color: "rgba(0,191,255,0.3)",
      desc: "Data warehouse desenhado para segurança: pipelines confiáveis, modelagem clara e uma única fonte de verdade para analytics e IA.",
      features: [
        "Pipelines ETL resilientes e versionados",
        "Modelagem dimensional para segurança",
        "Camada única de verdade para analytics",
        "Base pronta para casos de uso de IA"
      ],
      stack: ["Databricks", "SQL", "ETL", "Delta Lake", "Python"]
    },
    {
      id: "risk-dashboard",
      title: "Risk Intelligence Dashboard",
      short: "Dashboards executivos para tomada de decisão.",
      tag: "Analytics",
      icon: ICONS.dashboard,
      color: "rgba(124,58,237,0.35)",
      desc: "Dashboards executivos que traduzem dados complexos de risco em decisões claras, com storytelling visual e drill-down sob demanda.",
      features: [
        "KPIs executivos de risco e segurança",
        "Storytelling visual e drill-down",
        "Tendências e projeções",
        "Exportação para comitês e board"
      ],
      stack: ["Power BI", "SQL", "DAX", "Python"]
    }
  ];

  const EXPERIENCE = [
    {
      date: "2024 – Presente",
      title: "Security, Data & AI Solutions",
      org: "Building Intelligent Security Solutions",
      desc: "Liderança técnica no desenho de soluções que unem cybersecurity, engenharia de dados e agentes de IA para reduzir risco e acelerar decisões."
    },
    {
      date: "2023",
      title: "Data Engineering & Analytics",
      org: "Plataformas de Dados",
      desc: "Construção de pipelines, data warehouse e dashboards executivos, transformando dados dispersos em inteligência acionável."
    },
    {
      date: "2022",
      title: "Security Operations & Risk",
      org: "Governança & Risco",
      desc: "Atuação em operações de segurança, gestão de vulnerabilidades e frameworks de governança e risco."
    },
    {
      date: "2021",
      title: "Foundations",
      org: "Cybersecurity & Programação",
      desc: "Base sólida em segurança da informação, programação e automação – o ponto de partida para a interseção entre risco, dados e IA."
    }
  ];

  /* ----------------------------------------------------------
     Render: Projects
     ---------------------------------------------------------- */
  function renderProjects() {
    const grid = $("#projectsGrid");
    if (!grid) return;
    grid.classList.add("stagger");
    grid.innerHTML = PROJECTS.map((p) => `
      <article class="project-card" data-tilt data-project="${p.id}" tabindex="0" role="button" aria-label="Abrir detalhes de ${p.title}">
        <span class="project-card_bg" style="--pc:${p.color}"></span>
        <span class="project-card_mesh"></span>
        <div class="project-card_top">
          <span class="project-card_icon">${p.icon}</span>
          <span class="project-card_tag">${p.tag}</span>
        </div>
        <div class="project-card_content">
          <h3 class="project-card_title">${p.title}</h3>
          <p class="project-card_desc">${p.short}</p>
          <span class="project-card_more">
            Ver detalhes
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </article>
    `).join("");
  }

  /* ----------------------------------------------------------
     Render: Experience timeline
     ---------------------------------------------------------- */
  function renderExperience() {
    const tl = $("#timeline");
    if (!tl) return;
    tl.innerHTML = EXPERIENCE.map((e) => `
      <div class="tl-item">
        <span class="tl-item_date">${e.date}</span>
        <div class="tl-item_card">
          <h3 class="tl-item_title">${e.title}</h3>
          <p class="tl-item_org">${e.org}</p>
          <p class="tl-item_desc">${e.desc}</p>
        </div>
      </div>
    `).join("");
  }

  /* ----------------------------------------------------------
     Modal
     ---------------------------------------------------------- */
  const modal = $("#projectModal");
  const modalBody = $("#modalBody");
  let lastFocused = null;

  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p || !modal) return;
    lastFocused = document.activeElement;
    modalBody.innerHTML = `
      <span class="modal_eyebrow"><svg viewBox="0 0 24 24" style="width:14px;height:14px">${p.icon}</svg>${p.tag}</span>
      <h3 class="modal_title" id="modalTitle">${p.title}</h3>
      <p class="modal_desc">${p.desc}</p>
      <p class="modal_section-label">Destaques</p>
      <div class="modal_features">
        ${p.features.map((f) => `<div class="modal_feature"><svg viewBox="0 0 24 24">${ICONS.check}</svg><span>${f}</span></div>`).join("")}
      </div>
      <p class="modal_section-label" style="margin-top:20px">Stack Tecnológica</p>
      <div class="project-card_tags" style="margin-top:8px">
        ${p.stack.map((s) => `<span class="project-card_tag">${s}</span>`).join("")}
      </div>
    `;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = $(".modal_close", modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function bindModal() {
    const grid = $("#projectsGrid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const card = e.target.closest("[data-project]");
        if (card) openModal(card.dataset.project);
      });
      grid.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target.closest("[data-project]")) {
          e.preventDefault();
          openModal(e.target.closest("[data-project]").dataset.project);
        }
      });
    }
    if (modal) {
      $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("is-open")) closeModal();
      });
    }
  }

  /* ----------------------------------------------------------
     Navigation: glass on scroll, mobile toggle, active link
     ---------------------------------------------------------- */
  function bindNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const links = $("#navLinks");
    const navLinks = $$(".nav_link");

    const onScroll = () => {
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      links.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav_link")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* Active link via section observer */
    const sections = navLinks
      .map((l) => document.getElementById(l.getAttribute("href").slice(1)))
      .filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((l) => {
              l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ----------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------- */
  function bindReveal() {
    const items = $$("[data-reveal], .stagger");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     Animated counters
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReduced) { el.textContent = target; return; }
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target).toLocaleString("pt-BR");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function bindCounters() {
    const counters = $$(".counter");
    if (!counters.length) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ----------------------------------------------------------
     Cursor glow + skill card local glow
     ---------------------------------------------------------- */
  function bindCursor() {
    if (!finePointer) return;
    const glow = $(".cursor-glow");
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (glow) glow.style.opacity = "1";
    });
    window.addEventListener("mouseout", () => { if (glow) glow.style.opacity = "0"; });
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (glow) glow.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    /* Local glow inside skill/info/project cards */
    $$(".skillcard").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ----------------------------------------------------------
     3D tilt on cards
     ---------------------------------------------------------- */
  function bindTilt() {
    if (!finePointer || prefersReduced) return;
    const MAX = 7;
    const attach = (el) => {
      const strength = el.classList.contains("infocard") ? 5 : MAX;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    };
    $$("[data-tilt]").forEach(attach);
  }

  /* ----------------------------------------------------------
     Parallax (subtle) + scroll progress
     ---------------------------------------------------------- */
  function bindScrollFx() {
    const parallaxEls = $$("[data-parallax]");
    const progress = $(".scroll-progress span");
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (!prefersReduced) {
        parallaxEls.forEach((el) => {
          const factor = parseFloat(el.dataset.parallax) || 0;
          el.style.transform = `translate3d(0, ${y * factor * -1}px, 0)`;
        });
      }
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${h > 0 ? (y / h) * 100 : 0}%`;
      }
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ----------------------------------------------------------
     Profile image fallback
     ---------------------------------------------------------- */
  function bindProfileImage() {
    const img = $("#profileImg");
    const placeholder = $("#portraitPlaceholder");
    if (!img) return;
    const showPlaceholder = () => {
      img.style.display = "none";
      if (placeholder) placeholder.style.display = "flex";
    };
    const showImage = () => {
      if (placeholder) placeholder.style.display = "none";
      img.style.display = "block";
    };
    if (img.complete) {
      if (img.naturalWidth > 0) showImage(); else showPlaceholder();
    }
    img.addEventListener("load", () => { if (img.naturalWidth > 0) showImage(); });
    img.addEventListener("error", showPlaceholder);
  }

  /* ----------------------------------------------------------
     Contact form (client-side validation + mailto fallback)
     ---------------------------------------------------------- */
  function bindContact() {
    const form = $("#contactForm");
    const status = $("#contactStatus");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !message) {
        status.textContent = "Preencha nome, um email válido e a mensagem.";
        status.className = "contact_status is-error";
        return;
      }
      const subject = encodeURIComponent(`Contato de ${name}`);
      const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
      window.location.href = `mailto:enzo.brito@example.com?subject=${subject}&body=${body}`;
      status.textContent = "Abrindo seu cliente de email...";
      status.className = "contact_status is-ok";
      form.reset();
    });
  }

  /* ----------------------------------------------------------
     Particle network background
     ---------------------------------------------------------- */
  function initNetwork() {
    const canvas = $("#network-canvas");
    if (!canvas || prefersReduced) { if (canvas) canvas.style.display = "none"; return; }
    const ctx = canvas.getContext("2d");
    let width, height, dpr, nodes = [], raf = null, running = true;
    let mouse = { x: null, y: null };
    const config = () => {
      const area = window.innerWidth * window.innerHeight;
      return Math.max(28, Math.min(70, Math.floor(area / 26000)));
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };
    const buildNodes = () => {
      const count = config();
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.6
        });
      }
    };
    const LINK_DIST = 140;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x, dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.5;
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `rgba(34,211,238,${alpha})`);
            grad.addColorStop(1, `rgba(124,58,237,${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
        if (mouse.x != null) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.4;
            ctx.strokeStyle = `rgba(0,191,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(184,200,230,0.55)";
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!running) { running = true; draw(); } };
    const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); };
    window.addEventListener("resize", debounce(resize, 200));
    if (finePointer) {
      window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
      window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });
    }
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : start();
    });
    resize();
    draw();
  }

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  function init() {
    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    renderProjects();
    renderExperience();
    bindModal();
    bindNav();
    bindCounters();
    bindCursor();
    bindTilt();
    bindScrollFx();
    bindProfileImage();
    bindContact();
    initNetwork();
    // Reveal must run after dynamic content is in the DOM
    bindReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();