let cartData = [];
let CarritoVacio;
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
            }
        });
    });
}

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
        ActualizarCarrito(cartData);
    }
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
    ActualizarCarrito(cartData);
}
});

let tipoCambioGlobal = 40; 

// Función para obtener el tipo de cambio del BCU
async function obtenerTipoCambioBCU() {
    const fechaActual = new Date();
    const fechaAnterior = new Date(fechaActual);
    fechaAnterior.setDate(fechaActual.getDate() - 2);

    // Formato de fecha
    const fechaHasta = fechaActual.toISOString().split('T')[0];
    const fechaDesde = fechaAnterior.toISOString().split('T')[0];

    const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cot="Cotiza">
            <soapenv:Header />
            <soapenv:Body>
                <cot:wsbcucotizaciones.Execute>
                    <cot:Entrada>
                        <cot:Moneda>
                            <cot:item>2222</cot:item>
                        </cot:Moneda>
                        <cot:FechaDesde>${fechaDesde}</cot:FechaDesde>
                        <cot:FechaHasta>${fechaHasta}</cot:FechaHasta>
                        <cot:Grupo>0</cot:Grupo>
                    </cot:Entrada>
                </cot:wsbcucotizaciones.Execute>
            </soapenv:Body>
        </soapenv:Envelope>`;

    try {
        const response = await fetch('https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcucotizaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                'SOAPAction': ''
            },
            body: xmlBody
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            console.error('Error en la respuesta del servidor:', response.statusText);
            return null; // Retorna null si hay un error en la respuesta
        }

        // Obtiene el texto de la respuesta
        const data = await response.text();
        console.log("Respuesta del BCU:", data); // Imprimir la respuesta

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        // Busca el elemento TCC en la respuesta
        const tccElements = xmlDoc.getElementsByTagName("TCC");
        if (tccElements.length > 0) {
            return parseFloat(tccElements[0].textContent);
        } else {
            console.error('No se encontró el elemento TCC en la respuesta.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener cotización del BCU:', error);
        return null; // Retornar null en caso de error
    }
}

// Ejemplo de uso
async function inicializarTipoCambio() {
    const tipoCambio = await obtenerTipoCambioBCU();
    if (tipoCambio !== null) {
        console.log("Tipo de cambio obtenido:", tipoCambio);
    } else {
        console.log("No se pudo obtener el tipo de cambio, usando valor por defecto.");
    }
}

// Llamar a la función cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarTipoCambio();
});

// Función para inicializar el tipo de cambio
async function inicializarTipoCambio() {
    const tipoCambioGuardado = localStorage.getItem('tipoCambio');
    
    if (tipoCambioGuardado) {
        const datos = JSON.parse(tipoCambioGuardado);
        const ahora = new Date().getTime();
        
        // Si el tipo de cambio guardado tiene menos de 1 hora, lo usamos
        if (ahora - datos.timestamp < 3600000) {
            tipoCambioGlobal = datos.valor;
            return;
        }
    }

    // Consultamos al BCU
    const nuevoTipoCambio = await obtenerTipoCambioBCU();
    
    if (nuevoTipoCambio !== null) {
        tipoCambioGlobal = nuevoTipoCambio;
    } else {
        console.warn('Usando tipo de cambio por defecto:', 40);
    }
    
    // Guardamos en localStorage
    localStorage.setItem('tipoCambio', JSON.stringify({
        valor: tipoCambioGlobal,
        timestamp: new Date().getTime()
    }));
}

// Funciones de conversión
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

// ACÁ ARRANCA LA PARTE 3 -- ATT: CAMILUCHI

const modalTipoEnvio = document.getElementById('nav-delivery');
const tipoDeEnvio = modalTipoEnvio.querySelectorAll('input[type="radio"]');

const modalFormaPago = document.getElementById('nav-payment');
const tipoDeFormaPago = modalFormaPago.querySelectorAll('input[type="radio"]'); 

const btnPagar = document.getElementById('checkout-button');

const formulario = document.getElementById('data-envio');
const allCampos = formulario.querySelectorAll('input');

const dataEnLocal = localStorage.getItem('cart');
const carritoConProductos = dataEnLocal && JSON.parse(dataEnLocal).length > 0;

btnPagar.addEventListener('click', function() {

    let radiosTipoEnvio = false;
    for (let radiosEnvio of tipoDeEnvio) {
        if (radiosEnvio.checked) {
            radiosTipoEnvio = true;
            break; //rompe el bucle cuando encuentra vacío
        }
    }

    let todosCamposLlenos = true;
    for (let campo of allCampos) {
        if (campo.value.trim() === "") {
            todosCamposLlenos = false;
            break; //rompe el bucle cuando encuentra vacío
        }
    }

    let radiosTipoPago = false;
    for (let radiosPago of tipoDeFormaPago) {
        if (radiosPago.checked) {
            radiosTipoPago = true;
            break; //rompe el bucle cuando encuentra vacío
        }
    }

    if(radiosTipoEnvio && todosCamposLlenos && carritoConProductos && radiosTipoPago) {
        alert('ta bien');
    } else {
        alert('no ta bien');
    }
});

// ACÁ TERMINA LA PARTE 3


// testeo costos Rai
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('Confirmar').addEventListener('click', function() {
    // Verifica si el tipo de envío fue seleccionado
    const shippingSelected = document.querySelector('input[name="shipping"]:checked');
    if (!shippingSelected) {
      alert("Por favor, seleccione el tipo de envío.");
      return; 
    }

    const shippingValue = shippingSelected.value;
    localStorage.setItem('shipping', shippingValue);  // Guarda en localStorage o en otra variable

    // Verifica si todos los campos de dirección fueron llenados
    const requiredFields = ['dpt', 'city', 'street', 'number', 'corner', 'additional'];
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);

    if (!field || !field.value || !field.value.trim()) {
        const label = field ? field.previousElementSibling : null;
        const errorMessage = label ? `Por favor, rellene el campo ${label.textContent}.` : "Por favor, rellene todos los campos obligatorios.";
        alert(errorMessage);
        return; 
    }

    console.log("Verificando campo: ", fieldId, " Valor: ", field ? field.value : "Campo no encontrado");

    // Verifica si la forma de pago fue seleccionada
    const paymentSelected= document.getElementById('paymentmethod').value;
    console.log("Forma de pago seleccionada:", paymentSelected); 
    if (!paymentSelected || paymentSelected === 'Method') {
      alert("Por favor, seleccione la forma de pago.");
      return; 
    }
 }

    const modalElement = document.getElementById('myModal');
    const modal = bootstrap.Modal.getInstance(modalElement); 
    modal.hide();

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    console.log("Datos enviados con éxito!");
 });
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
function actualizarVisibilidadCarteles() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Actualizar visibilidad del mensaje de carrito vacío
    document.getElementById("empty-cart-message").style.display = cartData.length === 0 ? "block" : "none";
    document.getElementById("cart-summary").style.display = cartData.length > 0 ? "block" : "none";
    document.getElementById("deliveries-card").style.display = cartData.length > 0 ? "block" : "none";
}

// Función para agregar un elemento al carrito
function addItemToCart(item) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.push(item);
    localStorage.setItem("cart", JSON.stringify(cartData));
    
    // Actualizar interfaz y visibilidad en tiempo real
    MostrarCarrito(cartData);
    ActualizarCarrito(cartData);
    actualizarVisibilidadCarteles(); // Actualiza las tarjetas de resumen y tipo de envío
}

// Función para eliminar un elemento del carrito
function EliminarDelCarrito(index) {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.splice(index, 1); // Remueve el producto en el índice especificado
    localStorage.setItem("cart", JSON.stringify(cartData));
    
    // Actualizar la interfaz y visibilidad en tiempo real
    MostrarCarrito(cartData);
    ActualizarCarrito(cartData);
    actualizarVisibilidadCarteles(); // Verifica si mostrar/ocultar las tarjetas de resumen y tipo de envío
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
