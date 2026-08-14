(() => {
  const palette = localStorage.getItem("tiago-palette");
  document.body.dataset.palette = palette === "day" ? "day" : "cobalt";
})();
