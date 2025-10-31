// Proyecto Windbnb - main.js
// Controla la lógica principal: búsqueda, filtros avanzados,
// renderizado de tarjetas, modal de detalle y modo oscuro.

import { filtrarEstancias } from "./filtros.js";

// --------------------------------------------------
// Datos de ejemplo (array de objetos)
// --------------------------------------------------
const estancias = [
  { city: "México", guests: 2, title: "Casa en la Ciudad de México", image: "./imagenes/casa1.jpg", address: "Av. Reforma 123, Ciudad de México", amenities: ["WiFi", "Cocina", "Estacionamiento"] },
  { city: "Guadalajara", guests: 4, title: "Departamento moderno en GDL", image: "./imagenes/departamento1.jpg", address: "Calle Juárez 456, Guadalajara", amenities: ["WiFi", "Aire acondicionado", "Lavadora"] },
  { city: "Monterrey", guests: 3, title: "Loft con vista panorámica", image: "./imagenes/loft1.jpg", address: "Paseo de los Leones 789, Monterrey", amenities: ["WiFi", "TV", "Balcón"] },
  { city: "Cancún", guests: 5, title: "Villa frente al mar", image: "./imagenes/villamar1.jpg", address: "Playa Delfines, Cancún", amenities: ["WiFi", "Piscina", "Aire acondicionado", "Cocina"] },
  { city: "Puebla", guests: 2, title: "Casa colonial en el centro", image: "./imagenes/colonial1.jpg", address: "Av. 5 Oriente 250, Puebla", amenities: ["WiFi", "Cocina", "Terraza"] },
  { city: "Tulum", guests: 4, title: "Bungalow ecológico con jardín", image: "./imagenes/tulum1.jpg", address: "Zona Hotelera, Tulum", amenities: ["WiFi", "Cocina", "Alberca natural"] },
];

// --------------------------------------------------
// Selección de elementos del DOM
// --------------------------------------------------
const inputCiudad = document.getElementById("buscadorCiudad");
const inputHuespedes = document.getElementById("buscadorHuespedes");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorEstancias = document.getElementById("contenedorEstancias");

const overlayDetalle = document.getElementById("overlayDetalle");
const modalDetalle = document.getElementById("modalDetalle");
const contenidoDetalle = document.getElementById("contenidoDetalle");
const cerrarDetalle = document.getElementById("cerrarDetalle");

const checkboxesFiltros = document.querySelectorAll(".filtro-checkbox");

// --------------------------------------------------
// Función para mostrar estancias en pantalla
// --------------------------------------------------
function mostrarEstancias(lista) {
  const mensaje = document.getElementById("mensajeEstancias");
  contenedorEstancias.innerHTML = "";

  if (lista.length === 0) {
    mensaje.textContent = "No se encontraron estancias.";
    contenedorEstancias.innerHTML = "<p class='text-gray-500'>Intenta otra búsqueda.</p>";
    return;
  }

  mensaje.textContent = `${lista.length} estancia${lista.length > 1 ? "s" : ""} disponible${lista.length > 1 ? "s" : ""}`;

  lista.forEach(est => {
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden";

    card.innerHTML = `
      <img src="${est.image}" alt="${est.title}" class="w-full h-52 object-cover rounded-t-2xl">
      <div class="p-5">
        <h3 class="font-semibold text-lg mb-1 text-gray-800 dark:text-gray-100">${est.title}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-1">${est.city}</p>
        <p class="text-sm text-gray-500">Hasta ${est.guests} huéspedes</p>
      </div>
    `;

    card.addEventListener("click", () => abrirModal(est));
    contenedorEstancias.appendChild(card);
  });
}

// --------------------------------------------------
// Función para abrir modal de detalle
// --------------------------------------------------
function abrirModal(estancia) {
  const amenitiesHTML = estancia.amenities.map(a =>
    `<span class="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded mr-1 mb-1">${a}</span>`
  ).join("");

  contenidoDetalle.innerHTML = `
    <img src="${estancia.image}" alt="${estancia.title}" class="w-full h-64 object-cover rounded-lg mb-4">
    <h3 class="font-bold text-2xl mb-2">${estancia.title}</h3>
    <p class="text-gray-600 dark:text-gray-300 mb-1">${estancia.city}</p>
    <p class="text-gray-500 mb-2">${estancia.address}</p>
    <p class="text-gray-700 dark:text-gray-200 mb-2">Hasta ${estancia.guests} huéspedes</p>
    <div class="mb-2">${amenitiesHTML}</div>
  `;

  overlayDetalle.classList.remove("hidden");
  modalDetalle.classList.remove("hidden");
}

// --------------------------------------------------
// Función para cerrar modal
// --------------------------------------------------
function cerrarModal() {
  overlayDetalle.classList.add("hidden");
  modalDetalle.classList.add("hidden");
}

// --------------------------------------------------
// Función para buscar estancias con filtros avanzados
// --------------------------------------------------
function buscarEstancias() {
  const ciudad = inputCiudad.value.trim().toLowerCase();
  const huespedes = parseInt(inputHuespedes.value);

  if (huespedes < 1) {
    alert("El número de huéspedes no puede ser menor que 1.");
    inputHuespedes.value = 1;
    return;
  }

  const filtrosSeleccionados = Array.from(checkboxesFiltros)
    .filter(c => c.checked)
    .map(c => c.value);

  const filtradas = filtrarEstancias(estancias, ciudad, huespedes, filtrosSeleccionados);

  mostrarEstancias(filtradas);
  console.log({ ciudad, huespedes, filtrosSeleccionados, resultados: filtradas });
}

// --------------------------------------------------
// Eventos
// --------------------------------------------------
btnBuscar.addEventListener("click", buscarEstancias);
cerrarDetalle.addEventListener("click", cerrarModal);
modalDetalle.addEventListener("click", e => {
  if (e.target === modalDetalle) cerrarModal();
});

// --------------------------------------------------
// Inicialización
// --------------------------------------------------
mostrarEstancias(estancias);

// --------------------------------------------------
// Modo oscuro / claro
// --------------------------------------------------
const btnModoOscuro = document.getElementById("btnModoOscuro");
if (btnModoOscuro) {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    btnModoOscuro.textContent = "☀️ Modo Claro";
  }

  btnModoOscuro.addEventListener("click", () => {
    const html = document.documentElement;
    const esOscuro = html.classList.toggle("dark");
    localStorage.theme = esOscuro ? "dark" : "light";
    btnModoOscuro.textContent = esOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
  });
}
