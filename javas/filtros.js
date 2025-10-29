// javas/filtros.js
export function abrirModalFiltro() {
  const modal = document.getElementById("modalFiltro");
  const overlay = document.getElementById("overlayFiltro");
  if (!modal || !overlay) return;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

export function cerrarModalFiltro() {
  const modal = document.getElementById("modalFiltro");
  const overlay = document.getElementById("overlayFiltro");
  if (!modal || !overlay) return;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

/* NOTA: la asignación de eventos la haremos desde main.js para evitar ejecución prematura */
