// javas/modulos/mostrarEstancias.js
export function mostrarEstancias(estancias, contenedor, mostrarDetalle) {
  contenedor.innerHTML = "";

  if (!estancias || estancias.length === 0) {
    contenedor.innerHTML = `<p class="text-gray-500 text-center w-full">No hay estancias disponibles.</p>`;
    return;
  }

  estancias.forEach((estancia) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer";

    tarjeta.innerHTML = `
      <img src="${estancia.imagen}" alt="${estancia.titulo}" class="w-full h-48 object-cover">
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-500">${estancia.ciudad}, ${estancia.pais}</span>
          <span class="text-yellow-500 font-semibold">★ ${estancia.calificacion ?? "-"}</span>
        </div>
        <h3 class="text-lg font-semibold mb-1">${estancia.titulo}</h3>
        <p class="text-gray-600 text-sm mb-2">${estancia.maxHuespedes} huéspedes</p>
        <p class="text-gray-800 font-bold">${estancia.precio} USD / noche</p>
      </div>
    `;

    tarjeta.addEventListener("click", () => {
      // usar la función inyectada para abrir el modal
      if (typeof mostrarDetalle === "function") mostrarDetalle(estancia);
    });

    contenedor.appendChild(tarjeta);
  });
}

