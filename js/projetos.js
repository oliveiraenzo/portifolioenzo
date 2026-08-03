/* ==========================================================
   Projetos - cinematic scroll: progress bar + traveling spark
   (reveal + parallax são tratados por js/script.js)
   ========================================================== */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var progress = document.querySelector(".pj-progress span");
  var timeline = document.querySelector(".pj-timeline");
  var spark = document.querySelector(".pj-timeline_spark");
  var ticking = false;
  function update() {
    var y = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
    }
    if (spark && timeline && !prefersReduced) {
      var rect = timeline.getBoundingClientRect();
      var total = rect.height;
      var scrolled = Math.min(Math.max(-rect.top + window.innerHeight * 0.5, 0), total);
      spark.style.transform = "translate(-50%, " + scrolled + "px)";
      spark.style.opacity = rect.bottom < 0 || rect.top > window.innerHeight ? "0" : "1";
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();