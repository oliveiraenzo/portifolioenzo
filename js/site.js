/* ==========================================================
   Site-wide controls: theme toggle (dark/light) + i18n (PT/EN/ES)
   Persisted in localStorage: "theme", "lang"
   ========================================================== */
(function () {
  'use strict';
  var root = document.documentElement;
  var qsa = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  /* ------ Theme ------ */
  function applyTheme(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    qsa(".theme-toggle").forEach(function (b) { b.setAttribute("aria-pressed", String(theme === "light")); });
  }
  var savedTheme = "dark";
  try { if (localStorage.getItem("theme") === "light") savedTheme = "light"; } catch (e) {}
  applyTheme(savedTheme);
  qsa(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  });

  /* ------ Mobile hamburger nav ------ */
  /* ------ Mobile hamburger nav ------ */
  function initHamburgerNav() {
    qsa(".nav-toggle").forEach(function (btn) {
      var nav = btn.closest("nav");
      if (!nav) return;
      
      // 1. Abrir e fechar pelo botão (seu código original mantido)
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        var open = nav.classList.toggle("is-open");
        document.documentElement.classList.toggle("nav-open", open);
        btn.setAttribute("aria-expanded", String(open));
        btn.textContent = open ? "✕" : "☰";
      });

      // 2. NOVO: Fechar o menu imediatamente ao clicar em qualquer link
      var navLinks = nav.querySelectorAll(".navbar_link, .mh-nav_link");
      navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
          nav.classList.remove("is-open");
          document.documentElement.classList.remove("nav-open");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "☰";
        });
      });
    });

    // 3. NOVO: Adicionado 'touchstart' para garantir que fechar fora funcione no iOS
    ['click', 'touchstart'].forEach(function(evt) {
      document.addEventListener(evt, function (event) {
        if (event.target.closest("nav")) return;
        
        qsa("nav.is-open").forEach(function (nav) {
          nav.classList.remove("is-open");
          document.documentElement.classList.remove("nav-open");
          var toggle = nav.querySelector(".nav-toggle");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "false");
            toggle.textContent = "☰";
          }
        });
      }, { passive: true }); // passive melhora a performance de scroll no mobile
    });
  }
  initHamburgerNav();


  /* ------ i18n ------ */
  var LANGS = ["pt", "en", "es"];
  var currentLang = "pt";
  var i18n = {
    pt: {
      navHistory: "Minha História",
      navResume: "Currículo",
      navProjects: "Projetos",
      navBuild: "O Que Construyo",
      navNext: "Próximos Passos",
      heroDesc: '<strong class="hero-lead">Choose Your Hard.</strong><span class="hero-sub">Aprender é difícil. Ficar parado também.</span>Escolhi o caminho da curiosidade, dos dados, da segurança e da construção contínua. Desde então, venho transformando desafios em aprendizado e tecnologia em impacto.',
      introTitle: "Uma jornada movida por curiosidade e propósito.",
      introDesc: "Desde criança, a tecnologia sempre me fascinou. Hoje, transformo essa paixão em soluções que unem segurança, dados e inteligência artificial para gerar impacto real.",
      quoteText: "Aprender é difícil, mas deixar de aprender também. Construir é difícil, mas permanecer no mesmo lugar também. Ebulir é difícil, mas se arrepender depois também. Todo caminho tem o seu preço - e, diante da escolha, prefiro a dificuldade de crescer à de ficar parado. Choose Your Hard.",
      t1Title: "Infância",
      t1Desc: "Desde pequeno, os computadores e videogames foram minha porta de entrada para a tecnologia. Eu desmontava, explorava e queria entender tudo que acontecia por trás das telas.",
      t2Title: "Descoberta do Bug Bounty",
      t2Desc: "Um dia, assistindo a um vídeo no YouTube, um adolescente falava sobre Bug Bounty. Aquilo mudou minha forma de ver a tecnologia e me mostrou o universo da Cybersecurity.",
      t3Title: "Dados",
      t3Desc: "Percebi que dados contam histórias e revelam padrões. Mergulhei em Python, SQL, Power BI e análise de dados para transformar informação em decisões que geram valor.",
      t4Title: "Construção de Soluções",
      t4Desc: "Passei a criar automações, dashboards e ferramentas que otimizam processos, reduzem riscos e aumentam eficiência. Resolver problemas se tornou meu maior combustível.",
      t5Title: "Cybersecurity",
      t5Desc: "A segurança se tornou meu foco. Estudo vulnerabilidades, arquitetura de sistemas, governança e defesa. Entendi que proteger é tão importante quanto construir.",
      t6Title: "Inteligência Artificial",
      t6Desc: "Explorei o potencial da IA para automatizar análises, detectar padrões e apoiar decisões estratégicas. É a tecnologia amplificando pessoas e resultados.",
      t7Title: "Próximo Capítulo: Computação Quântica",
      t7Desc: "A próxima fronteira. A computação quântica promete revolucionar a forma como processamos informação e também a segurança do futuro. Estou apenas começando a explorar esse universo.",
      projTitle: "Projetos",
      projSoon: "Em construção. Em breve, uma seleção de projetos em Cybersecurity, Dados e IA.",
      cvTitle: "Meu Currículo",
      cvLead: "Confira minha trajetória, competências e certificações em Cybersecurity, Dados e IA.",
      cvOpen: "Abrir em nova aba",
      cvDownloadLabel: "Baixar PDF",
      cvVersion: "Exibindo a versão em Português.",
      cvNotice: "Currículo completo disponível sob solicitação. Entre em contato para receber a versão em PDF.",
      navFrontier: "Próxima Fronteira",
      pjHeroKicker: "Projetos que moldaram minha jornada",
      pjHeroTitle: "Projetos que moldaram minha jornada",
      pjHeroDesc: "Cada projeto é uma etapa da minha evolução profissional – uma trajetória de crescimento, construção, aprendizado e impacto. Explore os marcos que me trouxeram até aqui.",
      pjScroll: "Role para explorar",
      pjLabelTech: "Tecnologias",
      pjLabelImpact: "Impacto",
      pjLabelAreas: "Áreas",
      pjLabelObjectives: "Objetivos",
      pjLabelStatus: "Em desenvolvimento",
      pj1Kicker: "Capítulo 01",
      pj1Title: "Risk Monitoring Platform",
      pj1Theme: "Dados se transformando em visibilidade.",
      pj1Narrative: "Consolidação de indicadores de risco em um ambiente unificado para apoio à tomada de decisão.",
      pj1Message: "Transformando informações dispersas em uma visão clara dos riscos.",
      pj1ShotBadge: "Dados fictícios",
      pj1Disclaimer: "Os dados exibidos são fictícios. Dados reais não podem ser compartilhados por questões de confidencialidade.",
      pj1Imp1: "Maior visibilidade.",
      pj1Imp2: "Menor trabalho operacional.",
      pj1Imp3: "Análises mais eficientes.",
      pj2Kicker: "Capítulo 02",
      pj2Title: "Managed Solutions Hub",
      pj2Theme: "Ecossistema de conexões.",
      pj2Narrative: "Desenvolvimento de produtos que combinam soluções de fabricantes com serviços gerenciados.",
      pj2Message: "Conectar tecnologia e serviços para criar experiências completas.",
      pj2Area1: "Cybersecurity",
      pj2Area2: "Managed Services",
      pj2Area3: "Arquitetura de Soluções",
      pj2Imp1: "Maior escalabilidade.",
      pj2Imp2: "Mais valor para clientes.",
      pj2Imp3: "Soluções integradas.",
      pj3Kicker: "Capítulo 03",
      pj3Title: "Institutional Data Lake",
      pj3Theme: "Diversas fontes convergindo para um núcleo central.",
      pj3Narrative: "Projeto em desenvolvimento para construção de uma plataforma institucional de dados.",
      pj3Message: "Criar a fundação para decisões orientadas por dados.",
      pj3Obj1: "Centralização de dados.",
      pj3Obj2: "Governança.",
      pj3Obj3: "Escalabilidade.",
      pj3Obj4: "Preparação para IA.",
      pjFlowTitle: "Uma progressão natural",
      pjFlowSub: "Os projetos não são independentes. Cada um prepara o próximo – uma evolução de quem constrói, aprende e se prepara para o futuro.",
      pjFlow1: "Transformar dados em visibilidade",
      pjFlow2: "Conectar tecnologia e serviços",
      pjFlow3: "Fundação para decisões por dados",
      pjFlow4: "O próximo salto",
      pjFutureKicker: "Seção de Futuro",
      pjFutureTitle: "Próxima Fronteira",
      pjFutureMsg: "O melhor projeto ainda está por vir.",
      pjF1: "Cybersecurity",
      pjF2: "Inteligência Artificial",
      pjF3: "Engenharia de Dados",
      pjF4: "Computação Quântica"
    },
    en: {
      navHistory: "My Story",
      navResume: "Resume",
      navProjects: "Projects",
      navBuild: "What I Build",
      navNext: "Next Steps",
      heroDesc: '<strong class="hero-lead">Choose Your Hard.</strong><span class="hero-sub">Learning is hard. Standing still is too.</span>I chose the path of curiosity, data, security and continuous building. Since then, I\'ve been turning challenges into learning and technology into impact.',
      introTitle: "A journey driven by curiosity and purpose.",
      introDesc: "Since childhood, technology has always fascinated me. Today, I turn that passion into solutions that combine security, data and artificial intelligence to create real impact.",
      quoteText: "Learning is hard, but so is not learning. Building is hard, but so is standing still. Evolving is hard, but so is living with regret. Every path has its price - and, faced with the choice, I'd rather take on the hard of growing than the hard of standing still. Choose Your Hard.",
      t1Title: "Childhood",
      t1Desc: "As a child, computers and video games were my gateway into technology. I took things apart, explored and wanted to understand everything happening behind the screens.",
      t2Title: "Discovering Bug Bounty",
      t2Desc: "One day, watching a YouTube video, a teenager was talking about Bug Bounty. That changed the way I saw technology and showed me the world of Cybersecurity.",
      t3Title: "Data",
      t3Desc: "I realized that data tells stories and reveals patterns. I dove into Python, SQL, Power BI and data analysis to turn information into decisions that create value.",
      t4Title: "Building Solutions",
      t4Desc: "I started creating automations, dashboards and tools that optimize processes, reduce risks and increase efficiency. Solving problems became my greatest fuel.",
      t5Title: "Cybersecurity",
      t5Desc: "Security became my focus. I study vulnerabilities, systems architecture, governance and defense. I understood that protecting is as important as building.",
      t6Title: "Artificial Intelligence",
      t6Desc: "I explored the potential of AI to automate analyses, detect patterns and support strategic decisions. It's technology amplifying people and results.",
      t7Title: "Next Chapter: Quantum Computing",
      t7Desc: "The next frontier. Quantum computing promises to revolutionize how we process information and also the security of the future. I'm just beginning to explore this universe.",
      projTitle: "Projects",
      projSoon: "Under construction. A selection of Cybersecurity, Data and AI projects is coming soon.",
      cvTitle: "My Resume",
      cvLead: "Check out my background, skills and certifications in Cybersecurity, Data and AI.",
      cvOpen: "Open in new tab",
      cvDownloadLabel: "Download PDF",
      cvVersion: "Showing the English version.",
      cvNotice: "Full resume available on request. Get in touch to receive the PDF version.",
      navFrontier: "Next Frontier",
      pjHeroKicker: "Projects that shaped my journey",
      pjHeroTitle: "Projects that shaped my journey",
      pjHeroDesc: "Each project is a stage in my professional evolution - a path of growth, building, learning and impact. Explore the milestones that brought us here.",
      pjScroll: "Scroll to explore",
      pjLabelTech: "Technologies",
      pjLabelImpact: "Impact",
      pjLabelAreas: "Areas",
      pjLabelObjectives: "Objectives",
      pjLabelStatus: "In development",
      pj1Kicker: "Chapter 01",
      pj1Title: "Data turning into visibility.",
      pj1Theme: "Data turning into visibility.",
      pj1Narrative: "Consolidation of risk indicators into a unified environment to support decision-making.",
      pj1Message: "Turning scattered information into a clear view of risks.",
      pj1ShotBadge: "Fictitious data",
      pj1Disclaimer: "The data shown is fictitious. Real data cannot be shared for confidentiality reasons.",
      pj1Imp1: "Greater visibility.",
      pj1Imp2: "Less operational work.",
      pj1Imp3: "More efficient analysis.",
      pj2Kicker: "Chapter 02",
      pj2Theme: "An ecosystem of connections.",
      pj2Narrative: "Development of products that combine vendor solutions with managed services.",
      pj2Message: "Connecting technology and services to create complete experiences.",
      pj2Area1: "Cybersecurity",
      pj2Area2: "Managed Services",
      pj2Area3: "Solution Architecture",
      pj2Imp1: "Greater scalability.",
      pj2Imp2: "More value for clients.",
      pj2Imp3: "Integrated solutions.",
      pj3Kicker: "Chapter 03",
      pj3Theme: "Multiple sources converging into a central core.",
      pj3Narrative: "An in-progress project to build an institutional data platform.",
      pj3Message: "Building the foundation for data-driven decisions.",
      pj3Obj1: "Data centralization.",
      pj3Obj2: "Governance.",
      pj3Obj3: "Scalability.",
      pj3Obj4: "AI readiness.",
      pjFlowTitle: "A natural progression",
      pjFlowSub: "The projects are not independent. Each one prepares the next - a continuous evolution of someone who builds, learns and gets ready for the future.",
      pjFlow1: "Turn data into visibility",
      pjFlow2: "Connect technology and services",
      pjFlow3: "Foundation for data-driven decisions",
      pjFlow4: "The next leap",
      pjFutureKicker: "The Future",
      pjFutureTitle: "Next Frontier",
      pjFutureMsg: "The best project is yet to come.",
      pjF1: "Cybersecurity",
      pjF2: "Artificial Intelligence",
      pjF3: "Data Engineering",
      pjF4: "Quantum Computing"
    },
    es: {
      navHistory: "Mi Historia",
      navResume: "Currículum",
      navProjects: "Proyectos",
      navBuild: "Lo Que Construyo",
      navNext: "Próximos Pasos",
      heroDesc: '<strong class="hero-lead">Choose Your Hard.</strong><span class="hero-sub">Aprender es difícil. Quedarse quieto también.</span>Elegí el camino de la curiosidad, los datos, la seguridad y la construcción continua. Desde entonces, vengo transformando desafíos en aprendizaje y tecnología en impacto.',
      introTitle: "Un viaje impulsado por la curiosidad y el propósito.",
      introDesc: "Desde niño, la tecnología siempre me ha fascinado. Hoy, transformo esa pasión en soluciones que unen seguridad, datos e inteligencia artificial para generar un impacto real.",
      quoteText: "Aprender es difícil, pero dejar de aprender también. Construir es difícil, mas permanecer en el mismo lugar también. Evolucionar es difícil, pero arrepentirse después también. Todo camino tiene su precio - y, ante la elección, prefiero la dificultad de crecer a la de quedarse quieto. Choose Your Hard.",
      t1Title: "Infancia",
      t1Desc: "Desde pequeño, los computadores y los videojuegos fueron mi puerta de entrada a la tecnología. Desarmaba, exploraba y quería entender todo lo que ocurría detrás de las pantallas.",
      t2Title: "Descubriendo el Bug Bounty",
      t2Desc: "Un día, viendo un video en YouTube, un adolescente hablaba sobre Bug Bounty. Aquello cambió mi forma de ver la tecnología y me mostró el universo de la Cybersecurity.",
      t3Title: "Datos",
      t3Desc: "Descubrí que los datos cuentan historias y revelan patrones. Me sumergí en Python, SQL, Power BI y el análisis de datos para transformar la información en decisiones que generan valor.",
      t4Title: "Construcción de Soluciones",
      t4Desc: "Empecé a crear automatizaciones, dashboards y herramientas que optimizan procesos, reducen riesgos y aumentan la eficiencia. Resolver problemas se convirtió en mi mayor combustible.",
      t5Title: "Cybersecurity",
      t5Desc: "La seguridad se convirtió en mi foco. Estudio vulnerabilidades, arquitectura de sistemas, gobernanza y defensa. Entendí que proteger es tan importante como construir.",
      t6Title: "Inteligencia Artificial",
      t6Desc: "Exploré el potencial de la IA para automatizar análisis, detectar patrones y apoyar decisiones estratégicas. Es la tecnología amplificando personas y resultados.",
      t7Title: "Próximo Capítulo: Computación Cuántica",
      t7Desc: "La próxima frontera. La computación cuántica promete revolucionar la forma en que procesamos la información y también la seguridad del futuro. Estoy apenas comenzando a explorar este universo.",
      projTitle: "Proyectos",
      projSoon: "En construcción. Pronto, una selección de proyectos en Cybersecurity, Datos e IA.",
      cvTitle: "Mi Currículum",
      cvLead: "Descubre mi trayectoria, competencias y certificaciones en Cybersecurity, Datos e IA.",
      cvOpen: "Abrir en nueva pestaña",
      cvDownloadLabel: "Descargar PDF",
      cvVersion: "Mostrando la versión en Inglés.",
      cvNotice: "Currículum completo disponible bajo solicitud. Ponte en contacto para recibir la versión en PDF.",
      navFrontier: "Próxima Frontera",
      pjHeroKicker: "Proyectos que moldearon mi trayectoria",
      pjHeroTitle: "Proyectos que moldearon mi trayectoria",
      pjHeroDesc: "Cada proyecto es una etapa de mi evolución profesional - un camino de crecimiento, construcción, aprendizaje e impacto. Explora los hitos que me trajeron hasta aquí.",
      pjScroll: "Desplázate para explorar",
      pjLabelTech: "Tecnologías",
      pjLabelImpact: "Impacto",
      pjLabelAreas: "Áreas",
      pjLabelObjectives: "Objetivos",
      pjLabelStatus: "En desarrollo",
      pj1Kicker: "Capítulo 01",
      pj1Theme: "Datos que se transforman en visibilidad.",
      pj1Narrative: "Consolidación de indicadores de riesgo en un entorno unificado para apoyar la toma de decisiones.",
      pj1Message: "Transformar información dispersa en una visión clara de los riesgos.",
      pj1ShotBadge: "Datos ficticios",
      pj1Disclaimer: "Los datos mostrados son ficticios. Los datos reales no pueden compartirse por motivos de confidencialidad.",
      pj1Imp1: "Mayor visibilidad.",
      pj1Imp2: "Menor trabajo operacional.",
      pj1Imp3: "Análisis más eficientes.",
      pj2Kicker: "Capítulo 02",
      pj2Theme: "Un ecosistema de conexiones.",
      pj2Narrative: "Desarrollo de productos que combinan soluciones de fabricantes con servicios gestionados.",
      pj2Message: "Conectar tecnología y servicios para crear experiencias completas.",
      pj2Area1: "Cybersecurity",
      pj2Area2: "Managed Services",
      pj2Area3: "Arquitectura de Soluciones",
      pj2Imp1: "Mayor escalabilidad.",
      pj2Imp2: "Más valor para los clientes.",
      pj2Imp3: "Soluciones integradas.",
      pj3Kicker: "Capítulo 03",
      pj3Theme: "Diversas fuentes convergiendo hacia un núcleo central.",
      pj3Narrative: "Proyecto en desarrollo para construir una plataforma institucional de datos.",
      pj3Message: "Crear la base para decisiones orientadas por datos.",
      pj3Obj1: "Centralización de datos.",
      pj3Obj2: " Gobernanza.",
      pj3Obj3: "Escalabilidad.",
      pj3Obj4: "Preparación para IA.",
      pjFlowTitle: "Una progresión natural",
      pjFlowSub: "Los proyectos no son independientes. Cada uno prepara el siguiente - una evolución continua de quien construye, aprende y se prepara para el futuro.",
      pjFlow1: "Transformar datos en visibilidad",
      pjFlow2: "Conectar tecnología y servicios",
      pjFlow3: "Base para decisiones por datos",
      pjFlow4: "El próximo salto",
      pjFutureKicker: "Sección de Futuro",
      pjFutureTitle: "Próxima Frontera",
      pjFutureMsg: "El mejor proyecto aún está por venir.",
      pjF1: "Cybersecurity",
      pjF2: "Inteligencia Artificial",
      pjF3: "Ingeniería de Datos",
      pjF4: "Computación Cuántica"
    }
  };

  function updateCvAssets(lang) {
    var frame = document.getElementById("cvFrame");
    var openLink = document.getElementById("cvOpen");
    var downloadLink = document.getElementById("cvDownload");
    if (!frame && !openLink && !downloadLink) return;

    var pdfPath = lang === "pt"
      ? "assets/Curriculo/Enzo_Brito_Cybersecurity_CV_PT1.pdf"
      : "assets/Curriculo/Enzo_Brito_Cybersecurity_CV_EN.pdf";

    if (openLink) openLink.href = pdfPath;
    if (downloadLink) downloadLink.href = pdfPath;
    if (frame) frame.src = pdfPath + "#view=FitH";
  }

  function applyLang(lang) {
    if (!i18n[lang]) lang = "pt";
    currentLang = lang;
    root.setAttribute("lang", lang === "pt" ? "pt-BR" : lang);
    qsa("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (i18n[lang][k] != null) el.textContent = i18n[lang][k];
    });
    qsa("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (i18n[lang][k] != null) el.innerHTML = i18n[lang][k];
    });
    qsa(".lang-toggle").forEach(function (b) {
      b.textContent = lang.toUpperCase();
      b.setAttribute("aria-label", "Idioma / Language: " + lang.toUpperCase());
    });
    updateCvAssets(lang);
  }

  var savedLang = "pt";
  try { if (localStorage.getItem("lang")) savedLang = localStorage.getItem("lang"); } catch (e) {}
  applyLang(savedLang);

  qsa(".lang-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = LANGS[(LANGS.indexOf(currentLang) + 1) % LANGS.length];
      applyLang(next);
      try { localStorage.setItem("lang", next); } catch (e) {}
    });
  });
})();