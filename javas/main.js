// ===============================
// main.js - Windbnb
// ===============================

// --- DATOS DE EJEMPLO ---
const estancias = [
  {
    city: "México",
    guests: 2,
    title: "Casa en la Ciudad de México",
    image: "./imagenes/casa1.jpg",
    address: "Av. Reforma 123, Ciudad de México",
    amenities: ["WiFi", "Cocina", "Estacionamiento"]
  },
  {
    city: "Guadalajara",
    guests: 4,
    title: "Departamento moderno en GDL",
    image: "./imagenes/departamento1.jpg",
    address: "Calle Juárez 456, Guadalajara",
    amenities: ["WiFi", "Aire acondicionado", "Lavadora"]
  },
  {
    city: "Monterrey",
    guests: 3,
    title: "Loft con vista panorámica",
    image: "./imagenes/loft1.jpg",
    address: "Paseo de los Leones 789, Monterrey",
    amenities: ["WiFi", "TV", "Balcón"]
  },
  {
    city: "México",
    guests: 5,
    title: "Villa con alberca privada",
    image: "./imagenes/villa1.jpg",
    address: "Calle Lago 101, Ciudad de México",
    amenities: ["WiFi", "Alberca", "Cocina", "Estacionamiento"]
  },
];

// --- SELECCIÓN DE ELEMENTOS ---
const inputCiudad = document.getElementById("buscadorCiudad");
const inputHuespedes = document.getElementById("buscadorHuespedes");
const btnBuscar = document.getElementById("btnBuscar");
const contenedorEstancias = document.getElementById("contenedorEstancias");

// Modal
const modalDetalle = document.getElementById("modalDetalle");
const contenidoModal = document.getElementById("contenidoModal");
const contenidoDetalle = document.getElementById("contenidoDetalle");
const cerrarDetalle = document.getElementById("cerrarDetalle");

// ===============================
// FUNCIONES
// ===============================

// 1️⃣ Buscar estancias filtradas
function buscarEstancias() {
  const ciudad = inputCiudad.value.trim().toLowerCase();
  const huespedes = parseInt(inputHuespedes.value);

  if (huespedes < 0) {
    alert("El número de huéspedes no puede ser negativo.");
    inputHuespedes.value = 1;
    return;
  }

  const filtradas = estancias.filter(est => {
    const ciudadCoincide = ciudad === "" || est.city.toLowerCase().includes(ciudad);
    const huespedesCoinciden = isNaN(huespedes) || est.guests >= huespedes;
    return ciudadCoincide && huespedesCoinciden;
  });

  mostrarEstancias(filtradas);
}

// 2️⃣ Mostrar estancias
function mostrarEstancias(lista) {
  contenedorEstancias.innerHTML = "";

  if (lista.length === 0) {
    contenedorEstancias.innerHTML = "<p class='text-gray-500'>No se encontraron estancias.</p>";
    return;
  }

  lista.forEach(est => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden";
    card.innerHTML = `
      <img src="${est.image}" alt="${est.title}" class="w-full h-48 object-cover rounded-t-lg">
      <div class="p-4">
        <h3 class="font-semibold text-gray-800">${est.title}</h3>
        <p class="text-gray-600">${est.city}</p>
        <p class="text-sm text-gray-500">Hasta ${est.guests} huéspedes</p>
      </div>
    `;

    // Abrir modal al hacer clic en la tarjeta
    card.addEventListener("click", () => abrirModal(est));

    contenedorEstancias.appendChild(card);
  });
}

// 3️⃣ Abrir modal
function abrirModal(estancia) {
  const amenitiesHTML = estancia.amenities.map(a =>
    `<span class="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1 mb-1">${a}</span>`
  ).join("");

  contenidoDetalle.innerHTML = `
    <img src="${estancia.image}" alt="${estancia.title}" class="w-full h-64 object-cover rounded-lg mb-4">
    <h3 class="font-bold text-2xl text-gray-800 mb-2">${estancia.title}</h3>
    <p class="text-gray-600 mb-1">${estancia.city}</p>
    <p class="text-gray-500 mb-2">${estancia.address}</p>
    <p class="text-gray-700 mb-2">Hasta ${estancia.guests} huéspedes</p>
    <div class="mb-2">${amenitiesHTML}</div>
    <p class="text-gray-600">Descripción: Aquí puedes agregar más info de la estancia.</p>
  `;

  modalDetalle.classList.remove("hidden");
}

// 4️⃣ Cerrar modal
function cerrarModal() {
  modalDetalle.classList.add("hidden");
}

// ===============================
// EVENTOS
// ===============================
btnBuscar.addEventListener("click", buscarEstancias);

// Cerrar modal con botón X
cerrarDetalle.addEventListener("click", cerrarModal);

// Cerrar modal al hacer clic fuera
modalDetalle.addEventListener("click", (e) => {
  if (e.target === modalDetalle) {
    cerrarModal();
  }
});

// ===============================
// INICIALIZAR
// ===============================
mostrarEstancias(estancias);
