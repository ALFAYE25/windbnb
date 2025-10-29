// javas/modulos/modalDetalle.js
const overlayDetalle = document.getElementById("overlayDetalle");
const modalDetalle = document.getElementById("modalDetalle");
const cerrarDetalleBtn = document.getElementById("cerrarDetalle");
const contenidoDetalle = document.getElementById("contenidoDetalle");

export function mostrarDetalle(estancia) {
  contenidoDetalle.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${estancia.titulo}</h2>
    <img src="${estancia.imagen}" alt="${estancia.titulo}" class="w-full h-64 object-cover rounded mb-4">
    <p class="mb-2"><strong>Ciudad:</strong> ${estancia.ciudad}</p>
    <p class="mb-2"><strong>País:</strong> ${estancia.pais}</p>
    <p class="mb-2"><strong>Huéspedes (máx):</strong> ${estancia.maxHuespedes}</p>
    <p class="mb-2"><strong>Precio por noche:</strong> $${estancia.precio}</p>
    <p class="mb-2"><strong>Calificación:</strong> ★ ${estancia.calificacion}</p>
  `;
  overlayDetalle.classList.remove("hidden");
  modalDetalle.classList.remove("hidden");
}

export function cerrarDetalle() {
  overlayDetalle.classList.add("hidden");
  modalDetalle.classList.add("hidden");
}

/* Eventos para cerrar modal (si los elementos existen) */
if (cerrarDetalleBtn) cerrarDetalleBtn.addEventListener("click", cerrarDetalle);
if (overlayDetalle) overlayDetalle.addEventListener("click", (e) => { if (e.target === overlayDetalle) cerrarDetalle(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalDetalle.classList.contains("hidden")) cerrarDetalle();
});

