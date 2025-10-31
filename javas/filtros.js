// Archivo FILTROS.JS
// Contiene la lógica para filtrar estancias por ciudad, huéspedes y amenidades.

/* FUNCIÓN PARA FILTRAR ESTANCIAS */
export function filtrarEstancias(estancias, ciudad, huespedes, filtrosSeleccionados) {
 // Filtra por ciudad si se ingresó texto en el buscador
  let resultado = estancias.filter(estancia =>
    ciudad
      ? estancia.city.toLowerCase().includes(ciudad.toLowerCase()) 
        || (estancia.country && estancia.country.toLowerCase().includes(ciudad.toLowerCase()))
      : true
  );

  // Filtra por número de huéspedes si es mayor que 0
  if (huespedes > 0) {
    resultado = resultado.filter(estancia => estancia.guests >= huespedes);
  }

   // Filtra por amenidades seleccionadas (WiFi, TV, Balcón, etc.)
  if (filtrosSeleccionados.length > 0) {
    resultado = resultado.filter(estancia =>
      filtrosSeleccionados.every(filtro =>
        estancia.amenities.map(a => a.toLowerCase()).includes(filtro.toLowerCase())
      )
    );
  }

  // Devuelve la lista final de estancias que cumplen todos los criterios
  return resultado;
}
