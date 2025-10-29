// 🔹 IMPORTS (siempre al inicio)
import { estancias } from "../datos/stays.js";
import { mostrarEstancias } from "../modulos/mostrarEstancias.js";
import { filtrarEstancias } from "../modulos/filtrarEstancias.js";
import { mostrarModal } from "./modal.js"; 
import { abrirModalFiltro, cerrarModalFiltro } from "./filtros.js";

// 🔹 ELEMENTOS DEL DOM
const contenedor = document.getElementById("contenedorEstancias");
const inputCiudad = document.getElementById("ciudadInput");
const inputHuespedes = document.getElementById("huespedesInput");
const btnBuscar = document.getElementById("btnBuscar");
const mensaje = document.getElementById("mensajeEstancias");

// 🔹 FUNCIÓN PRINCIPAL: aplicar filtro de búsqueda
function aplicarFiltro() {
  const ciudad = inputCiudad.value;
  const huespedes = inputHuespedes.value;
  const resultados = filtrarEstancias(estancias, ciudad, huespedes);

  // 🔹 Se pasa mostrarModal como callback
  mostrarEstancias(resultados, contenedor, mostrarModal);

  // Mostrar mensaje dinámico
  if (resultados.length > 0) {
    mensaje.textContent = `Mostrando ${resultados.length} estancias en ${ciudad || "todas las ciudades"}`;
  } else {
    mensaje.textContent = "No se encontraron resultados.";
  }
}

// 🔹 EVENTOS
btnBuscar.addEventListener("click", aplicarFiltro);
inputCiudad.addEventListener("input", aplicarFiltro);
inputHuespedes.addEventListener("input", aplicarFiltro);

// 🔹 Mostrar todas las estancias al cargar la página
mostrarEstancias(estancias, contenedor, mostrarModal);
mensaje.textContent = `Mostrando ${estancias.length} estancias disponibles`;


