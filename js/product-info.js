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

    // **Eventos de cantidad**
    const cantidadInput = document.querySelector('.cantidad');
    const botonAumentar = document.querySelector('.aumentar');
    const botonDisminuir = document.querySelector('.disminuir');

    // Evento para aumentar la cantidad
    botonAumentar.addEventListener('click', () => {
        let cantidad = parseInt(cantidadInput.value);
        cantidad++;
        cantidadInput.value = cantidad;
    });

    // Evento para disminuir la cantidad
    botonDisminuir.addEventListener('click', () => {
        let cantidad = parseInt(cantidadInput.value);
        if (cantidad > 1) {
            cantidad--;
            cantidadInput.value = cantidad;
        }
    });

    // **Productos relacionados**
    let relatedProducts = product.relatedProducts;

const relatedProductsElement = document.getElementById('relatedProducts');

if (relatedProductsElement) {
  relatedProductsElement.innerHTML = `
    <div class="container mt-5">
      <h3>Productos Relacionados</h3>
      <div class="row">
        ${relatedProducts.map(relatedProduct => `
          <div class="col-md-4">
            <div class="product-card">
              <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="img-fluid">
              <div class="product-body">
                <h5 class="product-title">${relatedProduct.name}</h5>
                <a href="product-info.html?id=${relatedProduct.id}"></a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
} else {
  console.error("No se encontró el contenedor de productos relacionados");
}
  })
  .catch(error => {
    console.error('Error al obtener la información del producto:', error);
  });
