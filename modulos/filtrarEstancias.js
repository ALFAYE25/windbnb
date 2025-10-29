// javas/modulos/filtrarEstancias.js
export function filtrarEstancias(estancias, ciudad, huespedes) {
  const ciudadBuscada = (ciudad || "").trim().toLowerCase();
  const numHuespedes = parseInt(huespedes, 10) || 0;

  return estancias.filter((e) => {
    const coincideCiudad = ciudadBuscada === "" ? true : e.ciudad.toLowerCase().includes(ciudadBuscada);
    const suficienteEspacio = numHuespedes <= (e.maxHuespedes ?? 0);
    // si numHuespedes === 0 (campo vacío) consideramos que coincide
    return coincideCiudad && (numHuespedes === 0 ? coincideCiudad : suficienteEspacio);
  });
}
