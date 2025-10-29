// modal.js
/**
 * Crea y controla un modal de detalles para mostrar más información de la estancia.
 */

export function mostrarModal(estancia) {
  // Crear contenedor de fondo
  const overlay = document.createElement("div");
  overlay.className = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";

  // Crear contenido del modal
  const modal = document.createElement("div");
  modal.className = "bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-5 relative";

  modal.innerHTML = `
    <button id="cerrarModal" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>
    <img src="${estancia.imagen}" alt="${estancia.titulo}" class="w-full h-64 object-cover rounded-lg mb-3" />
    <h2 class="text-xl font-semibold mb-1">${estancia.titulo}</h2>
    <p class="text-sm text-gray-600 dark:text-gray-300">${estancia.ciudad}, ${estancia.pais}</p>
    <p class="mt-2 text-gray-700 dark:text-gray-200">Capacidad máxima: ${estancia.huespedesMax} huéspedes</p>
    <p class="text-gray-700 dark:text-gray-200">Calificación: ★ ${estancia.calificacion}</p>
    <p class="text-gray-800 dark:text-gray-100 font-bold mt-2">${estancia.precio} USD / noche</p>
    <button id="reservarBtn" class="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded">Reservar</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Cerrar con botón o clic fuera
  document.getElementById("cerrarModal").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") overlay.remove(); }, { once: true });
}
