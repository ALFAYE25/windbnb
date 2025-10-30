// modal.js

// Crear los elementos base del modal
const modalOverlay = document.createElement("div");
modalOverlay.id = "modalOverlay";
modalOverlay.className =
  "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 hidden";

const modalContent = document.createElement("div");
modalContent.className =
  "bg-white rounded-2xl shadow-2xl max-w-lg w-11/12 overflow-hidden transform transition-all scale-95";

modalOverlay.appendChild(modalContent);
document.body.appendChild(modalOverlay);

// Función para mostrar el modal con la información de la estancia
export function mostrarModal(estancia) {
  modalContent.innerHTML = `
    <img src="${estancia.imagen}" alt="${estancia.titulo}" class="w-full h-60 object-cover">
    <div class="p-5">
      <h2 class="text-2xl font-semibold mb-2">${estancia.titulo}</h2>
      <p class="text-gray-600 mb-1">${estancia.ciudad}, ${estancia.pais}</p>
      <p class="text-gray-700 mb-2">${estancia.maxHuespedes} huéspedes • ${estancia.camas} camas</p>
      <p class="text-yellow-500 text-sm">★ ${estancia.calificacion}</p>
      <p class="text-gray-900 font-bold text-lg mt-3">${estancia.precio} USD / noche</p>

      <button id="cerrarModalBtn" class="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold">
        Cerrar
      </button>
    </div>
  `;

  modalOverlay.classList.remove("hidden");
  modalOverlay.classList.add("flex");

  // Cerrar modal al hacer clic en el botón
  document.getElementById("cerrarModalBtn").addEventListener("click", cerrarModal);
}

// Función para cerrar el modal
function cerrarModal() {
  modalOverlay.classList.add("hidden");
  modalOverlay.classList.remove("flex");
}

// 🔹 Nuevo: cerrar al hacer clic fuera del contenido
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    cerrarModal();
  }
});

// 🔹 Nuevo: cerrar al presionar la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
    cerrarModal();
  }
});
