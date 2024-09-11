let productID = localStorage.getItem("productID");
console.log(productID)
const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
  fetch(PRODUCT_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(product => {
    // Verifica si el objeto product tiene los datos esperados
    if (!product || !product.name || !product.description) {
      throw new Error('La respuesta de la API no tiene el formato esperado');
      console.log(product)
    }

    // Mostrar la información del producto en el DOM
    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = `
<div class="container-product mt-5">
    <div class="row">
      <!-- Columna para el carrusel de imágenes del producto -->
      <div class="col-md-6">
        <div id="productCarousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            ${product.images.map((img, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="Imagen del producto">
              </div>
            `).join('')}
          </div>
          <!-- Controles del carrusel (Anterior / Siguiente) -->
          <a class="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>

      <!-- Columna para la información del producto -->
      <div class="col-md-6">
        <div class="informacion">
          <p>Nuevo | ${product.soldCount} Vendidos</p>
          <h2>${product.name}</h2>
          <h2>${product.currency} ${new Intl.NumberFormat('es-ES').format(product.cost)}</h2>

          <div class="stock">
            <h5>Stock disponible</h5>
            <div class="cantidad-contenedor">
              <span>Cantidad</span>
              <span class="disminuir">-</span>
              <input type="number" value="1" min="1" class="cantidad form-control d-inline w-25 mx-2">
              <span class="aumentar">+</span>
            </div>
            <button id="comprar" class="btn btn-warning mt-3"><strong>Comprar ahora</strong></button>
            <button id="agregar" class="btn btn-light mt-3"><strong>Agregar al carrito</strong></button>
          </div>
        </div>

        

        <!-- Descripción del producto -->
        <div class="descripcion mt-4">
          <h5>Descripción</h5>
          <p>${product.description}</p>
        </div>
      </div>
    </div>
  </div>
`;

/*

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los botones y entradas
    const btnDisminuir = document.querySelectorAll(".disminuir");
    const btnAumentar = document.querySelectorAll(".aumentar");
    const inputCantidad = document.querySelectorAll(".cantidad");

    // Función para disminuir el valor
    btnDisminuir.forEach(function(btn, index) {
        btn.addEventListener("click", function() {
            let valorActual = parseInt(inputCantidad[index].value);
            if (valorActual > 1) {  // Evita que el valor sea menor a 1
                inputCantidad[index].value = valorActual - 1;
            }
        });
    });

    // Función para aumentar el valor
    btnAumentar.forEach(function(btn, index) {
        btn.addEventListener("click", function() {
            let valorActual = parseInt(inputCantidad[index].value);
            inputCantidad[index].value = valorActual + 1;
        });
    });
});
 Posible funcion para que funcionen los botones de - y +, no he podido completarla*/

    
  })
  .catch(error => {
    console.error('Error al obtener la información del producto:', error);
    // Mostrar un mensaje de error al usuario
    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';
  })