let cartData = [];
let CarritoVacio;

const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const ultimoUsuario = usuarios[usuarios.length - 1];
document.getElementsByClassName("nav-item")[3].innerHTML = `
    <div class="dropdown">
        <button class="btn dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #212529; color: white;">
            <a class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                </svg>  
                ${ultimoUsuario.email}
            </a>
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="my-profile.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg> 
                Perfil</a></li>
            <li><a class="dropdown-item" href="cart.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                </svg> 
                Carrito</a></li>
            <li id="btnCerrarSesion">
                <a class="dropdown-item" style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg> 
                    Cerrar sesión
                </a>
            </li>
        </ul>
    </div>
`;

document.getElementById('btnCerrarSesion').addEventListener('click', function() {
    localStorage.removeItem('usuarios');
    window.location = "login.html";
});

function MostrarCarrito(items) {
    const cartContainer = document.getElementById("cart-items");
    
    if (items.length === 0) {
        cartContainer.innerHTML = '';
        return;
    }

    cartContainer.innerHTML = `
        <div class="card mb-3 TarjetaCarrito">
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-12">
                        <div class="custom-container">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <i class="fas fa-shopping-cart"></i> 
                                    Mi carrito (${items.length} Item${items.length > 1 ? 's' : ''})
                                </div>
                                <div class="col-md-2"><strong>Cantidad</strong></div>
                                <div class="col-md-2"><strong>Moneda</strong></div>
                                <div class="col-md-2"><strong>Costo</strong></div>
                            </div>
                            <hr/>
                            <div id="items-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const itemsContainer = document.getElementById("items-container");
    
    items.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("row", "align-items-center", "mb-3");
        itemElement.setAttribute('data-index', index);
            
        itemElement.innerHTML = `
        <div class="col-md-6">
            <p>${item.name}</p>
            <img alt="${item.name}" class="img-fluid" height="150" src="${item.image}" width="200"/>
        </div>
        <div class="col-md-2">
            <div class="input-group">
                <button class="btn btn-outline-secondary btn-sm" type="button">+</button>
                <input class="form-control form-control-sm text-center" type="text" value="${item.quantity}" readonly/>
                <button class="btn btn-outline-secondary btn-sm" type="button">-</button>
            </div>
        </div>
        <div class="col-md-2">
            <p>${item.currency}</p>
        </div>
        <div class="col-md-2">
            <p>${new Intl.NumberFormat('de-DE').format(item.cost)}</p>
        </div>
        <div class="col-12 mt-2">
            <button class="btn btn-warning delete-btn" onclick="EliminarDelCarrito(${index})">
                <i class="fas fa-trash-alt"></i> Remover
            </button>
            <button class="btn btn-warning">
                <i class="fas fa-heart"></i> Guardar
            </button>
        </div>
        <hr class="mt-3"/>
    `;

    itemsContainer.insertBefore(itemElement, itemsContainer.firstChild);
});
}

function ActualizarCarrito(items) {
const SubtotalProd = document.getElementById("subtotal");
const TotalProd = document.getElementById("total");

if (items.length === 0) {
    SubtotalProd.textContent = "USD 0";
    TotalProd.textContent = "USD 0";
    return;
}

const subtotal = items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
SubtotalProd.textContent = `${monedaSeleccionada} ${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(subtotal)}`;
TotalProd.textContent = `${monedaSeleccionada} ${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(subtotal)}`;
}

function EliminarDelCarrito(index) {
cartData.splice(index, 1);
localStorage.setItem("cart", JSON.stringify(cartData));

if (cartData.length === 0) {
    CarritoVacio.style.display = "block";
    document.getElementById("cart-summary").style.display = "none";
    ActualizarCarrito([]);
    MostrarCarrito([]); // Esto limpiará la tarjeta
} else {
    MostrarCarrito(cartData);
    ActualizarCarrito(cartData);
}
}

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
const cartContainer = document.getElementById("cart-items");
CarritoVacio = document.getElementById("empty-cart-message");
const SubtotalProd = document.getElementById("subtotal");
const TotalProd = document.getElementById("total");

cartData = JSON.parse(localStorage.getItem("cart")) || [];

if (cartData.length === 0) {
    CarritoVacio.style.display = "block";
    document.getElementById("cart-summary").style.display = "none";
} else {
    CarritoVacio.style.display = "none";
    document.getElementById("cart-summary").style.display = "block";
    MostrarCarrito(cartData);
    ActualizarCarrito(cartData);
}
});

function convertirUSDaUYU(monto) {
    const tipoCambio = 40;
    return monto * tipoCambio;
}

function convertirUYUaUSD(monto) {
    const tipoCambio = 40;
    return monto / tipoCambio;
}

function ActualizarCarrito(items) {
    const SubtotalProd = document.getElementById("subtotal");
    const TotalProd = document.getElementById("total");
    const currencySelect = document.getElementById("currencySelect");

    if (items.length === 0) {
        SubtotalProd.textContent = "USD 0";
        TotalProd.textContent = "USD 0";
        return;
    }

    function calcularTotales(monedaSeleccionada) {
        let subtotal = 0;

        items.forEach(item => {
            const cantidad = item.quantity;
            const costo = item.cost;

            if (item.currency === monedaSeleccionada) {
                // Si la moneda del item coincide con la seleccionada
                subtotal += costo * cantidad;
            } else if (item.currency === 'USD' && monedaSeleccionada === 'UYU') {
                // Convertir de USD a UYU
                subtotal += convertirUSDaUYU(costo * cantidad);
            } else if (item.currency === 'UYU' && monedaSeleccionada === 'USD') {
                // Convertir de UYU a USD
                subtotal += convertirUYUaUSD(costo * cantidad);
            }
        });

        return subtotal;
    }

    function actualizarPrecios() {
        const monedaSeleccionada = currencySelect.value;
        const subtotal = calcularTotales(monedaSeleccionada);
        
        SubtotalProd.textContent = `${monedaSeleccionada} ${new Intl.NumberFormat('es-ES').format(subtotal.toFixed(2))}`;
        TotalProd.textContent = `${monedaSeleccionada} ${new Intl.NumberFormat('es-ES').format(subtotal.toFixed(2))}`;
    }

    // Actualizar precios inicialmente
    actualizarPrecios();

    // Agregar evento para cuando cambie la moneda seleccionada
    currencySelect.addEventListener('change', actualizarPrecios);
}