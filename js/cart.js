let cartData = [];  //Variable para almacenar datos del carrito.
let CarritoVacio;
// La siguiente funcion recibe un array (items) como argumento, representando los productos en el carrito.
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
    
    // El siguiente for each Recorre el array items para traer la informacion
    items.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("row", "align-items-center", "mb-3");
        itemElement.setAttribute('data-index', index);
    
    //Estructura del producto  y controles de cantidad      
        itemElement.innerHTML = `
        <div class="col-md-6">
            <p>${item.name}</p>
            <img alt="${item.name}" class="img-fluid" height="150" src="${item.image}" width="200"/>
        </div>
        <div class="col-md-2"> 
            <div class="input-group">
                <button class="btn btn-outline-secondary btn-sm increase-btn" type="button">+</button>
                <input class="form-control form-control-sm text-center quantity-input" type="text" value="${item.quantity}" readonly/>
                <button class="btn btn-outline-secondary btn-sm decrease-btn" type="button">-</button>
            </div>
        </div>
        <div class="col-md-2">
            <p>${item.currency}</p>
        </div>
        <div class="col-md-2">
             <p class="item-cost">${new Intl.NumberFormat('de-DE').format(Number(item.cost) * Number(item.quantity))}</p>
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

        const increaseBtn = itemElement.querySelector('.increase-btn');
        const decreaseBtn = itemElement.querySelector('.decrease-btn');
        const quantityInput = itemElement.querySelector('.quantity-input');
        const itemCost = itemElement.querySelector('.item-cost');

        increaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity++;
            quantityInput.value = currentQuantity;
            cartData[index].quantity = currentQuantity;
            
            itemCost.textContent = new Intl.NumberFormat('de-DE').format(Number(item.cost) * currentQuantity);
            
            localStorage.setItem("cart", JSON.stringify(cartData));
            ActualizarCarrito(cartData);
            contarItems()
        });

        decreaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
                cartData[index].quantity = currentQuantity;
                
                itemCost.textContent = new Intl.NumberFormat('de-DE').format(Number(item.cost) * currentQuantity);
                
                localStorage.setItem("cart", JSON.stringify(cartData));
                ActualizarCarrito(cartData);
                contarItems()
            }
        });
    });
}

//Eliminar articulo del carrito

function EliminarDelCarrito(index) {
    cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (cartData.length === 0) {
        CarritoVacio.style.display = "block";
        document.getElementById("cart-summary").style.display = "none";
        MostrarCarrito([]); 
        ActualizarCarrito([]);
    } else {
        MostrarCarrito(cartData);
        
    }
    ActualizarCarrito(cartData);
    contarItems()
}

document.addEventListener("DOMContentLoaded", () => {
CarritoVacio = document.getElementById("empty-cart-message");

cartData = JSON.parse(localStorage.getItem("cart")) || [];

if (cartData.length === 0) {
    CarritoVacio.style.display = "block";
    document.getElementById("cart-summary").style.display = "none";
} else {
    CarritoVacio.style.display = "none";
    document.getElementById("cart-summary").style.display = "block";
    MostrarCarrito(cartData);
    
}
});

let tipoCambioGlobal = 40; 


// Guardamos en localStorage
localStorage.setItem('tipoCambio', JSON.stringify({
 valor: tipoCambioGlobal,
 timestamp: new Date().getTime()
}));


// Funciones de conversión de moneda 
function convertirUSDaUYU(monto) {
    return monto * tipoCambioGlobal;
}

function convertirUYUaUSD(monto) {
    return monto / tipoCambioGlobal;
}

// Inicializar el tipo de cambio cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarTipoCambio();
    
});

function ActualizarCarrito(items) {
    const SubtotalProd = document.getElementById("subtotal");
    const TotalProd = document.getElementById("total");
    const currencySelect = document.getElementById("currencySelect");

    if (items.length === 0) {
        SubtotalProd.textContent = "USD 0";
        TotalProd.textContent = "USD 0";
        return;
    }
   
    function calcularSubtotalesPorMoneda() {
        let subtotalUSD = 0;
        let subtotalUYU = 0;

        items.forEach(item => {
            const cantidad = parseInt(item.quantity);
            const costo = parseFloat(item.cost);

            if (item.currency === 'USD') {
                subtotalUSD += costo * cantidad;
            } else if (item.currency === 'UYU') {
                subtotalUYU += costo * cantidad;
            }
        });

        return { subtotalUSD, subtotalUYU };
    }
    
    function calcularCostoEnvio(subtotal) {
        const shippingSelected = document.querySelector('input[name="shipping"]:checked');
        if (!shippingSelected) {
            return 0; 
        }

    let shippingPercentage = 0;
    switch (shippingSelected.value) {
        case 'premium':
            shippingPercentage = 0.15; 
            break;
        case 'express':
            shippingPercentage = 0.07; 
            break;
        case 'standard':
            shippingPercentage = 0.05; 
            break;
        default:
            shippingPercentage = 0; 
    }
    
    return subtotal * shippingPercentage;
}

document.querySelectorAll('input[name="shipping"]').forEach((radioButton) => {
    radioButton.addEventListener('change', function() {
        actualizarPrecios(); // 
    });
});

    function actualizarPrecios() {
        const { subtotalUSD, subtotalUYU } = calcularSubtotalesPorMoneda();

        console.log("Subtotal USD: ", subtotalUSD);
        console.log("Subtotal UYU: ", subtotalUYU);

        const subtotalList = document.getElementById('subtotalList');
        subtotalList.innerHTML = '';
    
        if (subtotalUSD > 0) {
            const liUSD = document.createElement('li');
            liUSD.textContent = `USD ${new Intl.NumberFormat('de-DE').format(subtotalUSD)}`;
            subtotalList.appendChild(liUSD);
        }
        if (subtotalUYU > 0) {
            const liUYU = document.createElement('li');
            liUYU.textContent = `UYU ${new Intl.NumberFormat('de-DE').format(subtotalUYU)}`;
            subtotalList.appendChild(liUYU);
        }
    
        const monedaSeleccionada = currencySelect.value;
        let totalFinal;

        let envioUSD = calcularCostoEnvio(subtotalUSD);
        let envioUYU = calcularCostoEnvio(subtotalUYU);

        console.log("Envio USD: ", envioUSD);
        console.log("Envio UYU: ", envioUYU);
    
        if (monedaSeleccionada === 'USD') {
            totalFinal = subtotalUSD + envioUSD + convertirUYUaUSD(subtotalUYU + envioUYU);
        } else {
            totalFinal = convertirUSDaUYU(subtotalUSD + envioUSD) + subtotalUYU + envioUYU;
        }
    
        TotalProd.textContent = `${monedaSeleccionada} ${new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(totalFinal)}`;
    }

    actualizarPrecios();

    currencySelect.addEventListener('change', actualizarPrecios);
}

// Configuracion de diferentes items dentro del modal

const modalTipoEnvio = document.getElementById('nav-delivery');
const tipoDeEnvio = modalTipoEnvio.querySelectorAll('input[type="radio"]');

const dropFormaPago = document.getElementById('paymentmethod');

const formulario = document.getElementById('data-envio');
const allCampos = formulario.querySelectorAll('input');

const infoCreditoDebito = document.getElementById('debit-credit-form');
const camposCreditoDebito = infoCreditoDebito.querySelectorAll('input');
const radiosCreditoDebito = infoCreditoDebito.querySelectorAll('input[type="radio"]');


const dataEnLocal = localStorage.getItem('cart');
const carritoConProductos = dataEnLocal && JSON.parse(dataEnLocal).length > 0;

document.getElementById('checkout-button').addEventListener('click', function() {

    let radiosTipoEnvio = false;
    for (let radiosEnvio of tipoDeEnvio) {
        if (radiosEnvio.checked) {
            radiosTipoEnvio = true;
            break; 
        }
    }

    let todosCamposLlenos = true;
    for (let campo of allCampos) {
        if (campo.value.trim() === "") {
            todosCamposLlenos = false;
            break; 
        }
    }

    const metodoPagoSeleccionado = dropFormaPago.value;


    const medioPagoValido = (metodoPagoSeleccionado === "Débito" || metodoPagoSeleccionado === "Crédito" || metodoPagoSeleccionado === "Transferencia");

  
    let camposCompletos = true;
    if (metodoPagoSeleccionado === "Débito" || metodoPagoSeleccionado === "Crédito") {
        for (let campo of camposCreditoDebito) {
            if (campo.value.trim() === "") {
                camposCompletos = false;
                break; 
            }
        }
    }

    
    if (metodoPagoSeleccionado === "Transferencia") {
        camposCompletos = true;  
    }


    let radiosTarjeta = false;
    if (metodoPagoSeleccionado === "Débito" || metodoPagoSeleccionado === "Crédito") {
        for (let radioTarjeta of radiosCreditoDebito) {
            if (radioTarjeta.checked) {
                radiosTarjeta = true;
                break; 
            }
        }
    }

    const alerta = document.getElementById('feedbackAlerta');


    if (radiosTipoEnvio && todosCamposLlenos && carritoConProductos && medioPagoValido && camposCompletos && (metodoPagoSeleccionado === "Transferencia" || radiosTarjeta)) {
        alerta.innerHTML = `
        <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000" style="width: 600px; position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 1050; font-size: 15px;">
            <div class="d-flex">
                <div class="toast-body">
                    Campos completos correctamente.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;

    
        const toastElement = alerta.querySelector('.toast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

    } else {
        alerta.innerHTML = `
        <div class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000" style="width: 600px; position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 1050; font-size: 15px;">
            <div class="d-flex">
                <div class="toast-body">
                    Por favor, para continuar completa todos los campos obligatorios.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`;

        
        const toastElement = alerta.querySelector('.toast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }
});



//Funcion para mostrar tipo de envio solo cuando hay elementos en el carrito

document.addEventListener("DOMContentLoaded", () => { 
    // Configura la visibilidad de las tarjetas al cargar la página
    actualizarVisibilidadCarteles();

    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cartData.length === 0) {
        document.getElementById("empty-cart-message").style.display = "block";
    } else {
        MostrarCarrito(cartData);
        ActualizarCarrito(cartData);
    }
});

// Función para actualizar la visibilidad de las tarjetas en función del contenido del carrito
    
    // Mostrar u ocultar tarjetas según el contenido inicial del carrito
    function actualizarVisibilidadCarteles() {
        const deliverCard = document.getElementById("deliveries-card");
        const cartSummary = document.getElementById("cart-summary");
    
        if (cartData.length === 0) {
            CarritoVacio.style.display = "block";
            deliverCard.style.display = "none";
            cartSummary.style.display = "none";
        } else {
            CarritoVacio.style.display = "none";
            deliverCard.style.display = "block"; // O el estilo que prefieras
            cartSummary.style.display = "block"; // O el estilo que prefieras
        }
    }


// Función para eliminar un elemento del carrito
function EliminarDelCarrito(index) {
    cartData.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));

    if (cartData.length === 0) {
        CarritoVacio.style.display = "block";
        document.getElementById("cart-summary").style.display = "none";
        document.getElementById("deliveries-card").style.display = "none";
        
        MostrarCarrito([]); 
        ActualizarCarrito([]);
    } else {
        MostrarCarrito(cartData);
        ActualizarCarrito(cartData);

    }
    ActualizarCarrito(cartData);
    contarItems()
}


//Funcion de metodos de pago 

document.getElementById('paymentmethod').addEventListener('change', function() {
    // Ocultar ambos formularios inicialmente
    document.getElementById('debit-credit-form').style.display = 'none';
    document.getElementById('transfer-info').style.display = 'none';
    
    // Mostrar el formulario correspondiente
    if (this.value === 'Débito' || this.value === 'Crédito') {
      document.getElementById('debit-credit-form').style.display = 'block';
    } else if (this.value === 'Transferencia') {
      document.getElementById('transfer-info').style.display = 'block';
    }
  });


//Calculo costos de envio
    function calcularCostoEnvio(subtotal) {
        const shippingSelected = document.querySelector('input[name="shipping"]:checked');
        if (!shippingSelected) {
            return 0; 
        }

    let shippingPercentage = 0;
    switch (shippingSelected.value) {
        case 'premium':
            shippingPercentage = 0.15; 
            break;
        case 'express':
            shippingPercentage = 0.07; 
            break;
        case 'standard':
            shippingPercentage = 0.05; 
            break;
        default:
            shippingPercentage = 0; 
    }

    return subtotal * shippingPercentage;
}

document.querySelectorAll('input[name="shipping"]').forEach((radioButton) => {
    radioButton.addEventListener('change', function() {
        actualizarPrecios();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const radiobuttons = document.querySelectorAll('input[name="shipping"]');
    const Contenedor = document.getElementById('shippingContainer');

    radiobuttons.forEach(option => {
        option.addEventListener('change', (event) => {
            let shippingText = "";

            switch (event.target.value) {
                case "premium":
                    shippingText = "Premium";
                    break;
                case "express":
                    shippingText = "Express";
                    break;
                case "standard":
                    shippingText = "Standard";
                    break;
                default:
                    shippingText = "Ninguno seleccionado";
            }

            Contenedor.innerHTML = `Tipo de envío: ${shippingText}`;
        });
    });
});

