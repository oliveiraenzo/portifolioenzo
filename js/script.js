/* ==========================================================
   Page reveal helper: reveal content without animation delay
   ========================================================== */
(function () {
  'use strict';
  var qsa = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  function revealAll() {
    qsa('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealAll);
  } else {
    revealAll();
  }
})();