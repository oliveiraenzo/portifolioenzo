(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var root = document.documentElement;

  /* ---------- Paleta por tema ---------- */
  function palette(isHero) {
    // O hero (index) tem fundo escuro sempre -> mantém partículas claras
    var light = !isHero && root.getAttribute("data-theme") === "light";
    return light
      ? { node: "12, 20, 45", link: "124, 93, 255", link2: "40, 120, 220", nodeA: 0.55, linkA: 0.5 }
      : { node: "184, 200, 230", link: "86, 217, 255", link2: "124, 93, 255", nodeA: 0.6, linkA: 0.55 };
  }

  /* ---------- Rede de partículas ---------- */
  function initNetwork() {
    // No index, o hero cobre a tela inteira e cria seu próprio contexto
    // de empilhamento; injetamos o canvas dentro dele (acima do overlay,
    // abaixo do conteúdo). Nas demais páginas, fica fixo atrás do conteúdo.
    var hero = document.querySelector(".hero");
    var isHero = !!hero;

    var canvas = document.createElement("canvas");
    canvas.className = isHero ? "fx-net fx-net--hero" : "fx-net";
    canvas.setAttribute("aria-hidden", "true");
    (hero || document.body).insertBefore(canvas, (hero || document.body).firstChild);

    var ctx = canvas.getContext("2d");
    var width = 0, height = 0, dpr = 1;
    var rect = { left: 0, top: 0 };
    var nodes = [];
    var raf = null, running = true;
    var mouse = { x: null, y: null };
    var LINK_DIST = 150;
    var MOUSE_DIST = 210;
    var SPEED = prefersReduced ? 0.14 : 0.4;

    function count() {
      var area = window.innerWidth * window.innerHeight;
      return Math.max(30, Math.min(90, Math.floor(area / 20000)));
    }

    function updateRect() {
      var r = canvas.getBoundingClientRect();
      rect.left = r.left;
      rect.top = r.top;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateRect();
      build();
    }

    function build() {
      var n = count();
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          r: Math.random() * 1.6 + 0.7
        });
      }
    }

    function draw() {
      var p = palette(isHero);
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            var a = (1 - dist / LINK_DIST) * p.linkA;
            var grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, "rgba(" + p.link + "," + a + ")");
            grad.addColorStop(1, "rgba(" + p.link2 + "," + a + ")");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          var mdx = n.x - mouse.x, mdy = n.y - mouse.y;
          var md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MOUSE_DIST) {
            var ma = (1 - md / MOUSE_DIST) * 0.55;
            ctx.strokeStyle = "rgba(" + p.link + "," + ma + ")";
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.node + "," + p.nodeA + ")";
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    function start() { if (!running) { running = true; draw(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt); rt = setTimeout(resize, 200);
    });
    window.addEventListener("scroll", updateRect, { passive: true });
    if (finePointer) {
      window.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }, { passive: true });
      root.addEventListener("mouseleave", function () { mouse.x = null; mouse.y = null; });
    }
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });

    resize();
    draw();
  }

  /* ---------- Cursor personalizado ---------- */
  function initCursor() {
    if (!finePointer) return;

    var dot = document.createElement("div");
    dot.className = "fx-cursor-dot";
    var ring = document.createElement("div");
    ring.className = "fx-cursor-ring";
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    root.classList.add("fx-cursor-on");

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;
    var lastTrail = 0;

    function spawnTrail(x, y) {
      var now = performance.now();
      if (now - lastTrail < 38) return;
      lastTrail = now;
      var t = document.createElement("div");
      t.className = "fx-cursor-trail";
      t.style.left = x + "px";
      t.style.top = y + "px";
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 650);
    }

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
      root.classList.add("fx-cursor-active");
      if (!prefersReduced) spawnTrail(mx, my);
    }, { passive: true });

    window.addEventListener("mousedown", function () { root.classList.add("fx-cursor-down"); });
    window.addEventListener("mouseup", function () { root.classList.remove("fx-cursor-down"); });
    root.addEventListener("mouseleave", function () { root.classList.remove("fx-cursor-active"); });

    var interactive = "a, button, input, textarea, select, label, [role='button'], .lang-toggle, .theme-toggle";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(interactive)) root.classList.add("fx-cursor-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(interactive)) root.classList.remove("fx-cursor-hover");
    });

    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    }
    loop();
  }

  function init() {
    try { console.info("[FX] effects.js ativo — reducedMotion:", prefersReduced, "| finePointer:", finePointer); } catch (e) {}
    initNetwork();
    initCursor();
    document.body.classList.add("is-loaded");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();