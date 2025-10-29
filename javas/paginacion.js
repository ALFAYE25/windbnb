// paginacion.js
/**
 * Divide un arreglo grande en páginas más pequeñas y controla los botones.
 */
export function aplicarPaginacion(datos, paginaActual, porPagina) {
  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const totalPaginas = Math.ceil(datos.length / porPagina);

  return {
    datosPagina: datos.slice(inicio, fin),
    totalPaginas
  };
}

export function crearControlesPaginacion(contenedor, paginaActual, totalPaginas, callback) {
  contenedor.innerHTML = "";

  const btnPrev = document.createElement("button");
  btnPrev.textContent = "← Anterior";
  btnPrev.disabled = paginaActual === 1;
  btnPrev.className = "px-3 py-1 border rounded mr-2 disabled:opacity-40";
  btnPrev.addEventListener("click", () => callback(paginaActual - 1));

  const btnNext = document.createElement("button");
  btnNext.textContent = "Siguiente →";
  btnNext.disabled = paginaActual === totalPaginas;
  btnNext.className = "px-3 py-1 border rounded ml-2 disabled:opacity-40";
  btnNext.addEventListener("click", () => callback(paginaActual + 1));

  const info = document.createElement("span");
  info.textContent = `Página ${paginaActual} de ${totalPaginas}`;

  contenedor.append(btnPrev, info, btnNext);
}
