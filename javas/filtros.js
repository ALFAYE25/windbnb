// javas/filtros.js

/* ===============================
   FUNCIÓN PARA FILTRAR ESTANCIAS
   =============================== */
export function filtrarEstancias(estancias, ciudad, huespedes, filtrosSeleccionados) {
  // 1️⃣ Filtrar por ciudad (si se ingresa texto)
  let resultado = estancias.filter(estancia =>
    ciudad
      ? estancia.city.toLowerCase().includes(ciudad.toLowerCase()) 
        || (estancia.country && estancia.country.toLowerCase().includes(ciudad.toLowerCase()))
      : true
  );

  // 2️⃣ Filtrar por cantidad de huéspedes
  if (huespedes > 0) {
    resultado = resultado.filter(estancia => estancia.guests >= huespedes);
  }

  // 3️⃣ Filtrar por amenidades seleccionadas
  if (filtrosSeleccionados.length > 0) {
    resultado = resultado.filter(estancia =>
      filtrosSeleccionados.every(filtro =>
        estancia.amenities.map(a => a.toLowerCase()).includes(filtro.toLowerCase())
      )
    );
  }

  // 4️⃣ Retornar estancias filtradas
  return resultado;
}
