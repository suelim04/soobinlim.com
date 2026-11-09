// Open research project from #anchor (e.g. research.html#tinoco)
(function () {
  function openFromHash() {
    if (!location.hash) return;
    var el = document.querySelector(location.hash);
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
