function obtenerParametroId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

let productID = obtenerParametroId();

if (!productID) {
  productID = localStorage.getItem("productID");
}

if (productID) {
  localStorage.setItem("productID", productID);
} else {
  showToast("No se encontró un productID en la URL o en el localStorage.", "error");
}

const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

fetch(PRODUCT_URL)
  .then(response => response.json())
  .then(product => {
    if (!product || !product.name || !product.description) {
      throw new Error('La respuesta de la API no tiene el formato esperado');
    }

    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = `
      <div class="container-product mt-5">
        <div class="row">
          <div class="col-md-6">
            <div id="productCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                ${product.images.map((img, index) => `
                  <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100" alt="Imagen del producto">
                  </div>
                `).join('')}
              </div>
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
            <div class="descripcion mt-4">
              <h5>Descripción</h5>
              <p>${product.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const cantidadInput = document.querySelector('.cantidad');
    const botonAumentar = document.querySelector('.aumentar');
    const botonDisminuir = document.querySelector('.disminuir');

    botonAumentar.addEventListener('click', () => {
      let cantidad = parseInt(cantidadInput.value);
      cantidad++;
      cantidadInput.value = cantidad;
    });

    botonDisminuir.addEventListener('click', () => {
      let cantidad = parseInt(cantidadInput.value);
      if (cantidad > 1) {
        cantidad--;
        cantidadInput.value = cantidad;
      }
    });

    let relatedProducts = product.relatedProducts;
    const relatedProductsElement = document.getElementById('prodRelacionados');

    if (relatedProductsElement) {
      const relacionadoDiv = document.createElement('div');
      const parrafito = document.createElement('p');
      const relatedProductIds = relatedProducts.map(product => product.id);
      localStorage.setItem('relatedProducts', JSON.stringify(relatedProductIds));

      parrafito.innerHTML = `
      <div id="relProd">
        <div class="row">
          ${relatedProducts.map(relatedProduct => `
            <div class="col-md-4">
              <div class="product-card">
                <a href="product-info.html?id=${relatedProduct.id}">
                  <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="img-fluid">
                  <div class="product-body">
                    <h5 class="product-title">${relatedProduct.name}</h5>
                  </div>
                </a>
              </div>
            </div>
          `).join('')}
          <div class="col-md-4 button-container">
            <a href="products.html" id="botonrelated">Ver más</a>
          </div>
        </div>
      </div>
      `;
      relacionadoDiv.appendChild(parrafito);
      relatedProductsElement.appendChild(relacionadoDiv);
    } else {
      showToast("No se encontró el contenedor de productos relacionados", "error");
    }
  })
  .catch(error => {
    showToast('Error al obtener la información del producto: ' + error.message, "error");
  });

const productInfoElement = document.getElementById('productInfo');
productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';

var modal = document.getElementById("calificarModal");
var calificarBtn = document.getElementById("btncalificar");
var span = document.getElementsByClassName("close")[0];
var estrellas = document.querySelectorAll(".estrella");
var comentario = document.getElementById("comentario");
var enviarBtn = document.getElementById("enviarBtn");
var ratingSeleccionado = 0;

btncalificar.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function pintarEstrellas(rating) {
  estrellas.forEach(function(estrella) {
    const estrellaValue = parseInt(estrella.getAttribute("data-value"));
    if (estrellaValue <= rating) {
      estrella.classList.add("selected");
    } else {
      estrella.classList.remove("selected");
    }
  });
}

function resetearEstrellas() {
  estrellas.forEach(function(estrella) {
    estrella.classList.remove("selected");
  });
}

estrellas.forEach(function(estrella) {
  estrella.addEventListener("mouseover", function() {
    const ratingHover = parseInt(this.getAttribute("data-value"));
    pintarEstrellas(ratingHover);
  });

  estrella.addEventListener("mouseleave", function() {
    resetearEstrellas();
    if (ratingSeleccionado) {
      pintarEstrellas(ratingSeleccionado);
    }
  });

  estrella.addEventListener("click", function() {
    ratingSeleccionado = parseInt(this.getAttribute("data-value"));
    pintarEstrellas(ratingSeleccionado);
  });
});

enviarBtn.onclick = function() {
  if (ratingSeleccionado > 0 && comentario.value.trim()) {
    showToast("Gracias por tu calificación de " + ratingSeleccionado + " estrellas", "success");

    const fechaActual = new Date().toISOString();

    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const ultimoUsuario = usuarios[usuarios.length - 1];
document.getElementsByClassName("nav-item")[3].innerHTML=`
        <div class="dropdown" >
  <button class="btn dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #212529; color: white;">
    <a class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>  
        ${ultimoUsuario.usuario}</a>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="my-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> Perfil</a></li>
    <li><a class="dropdown-item" href="cart.html"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
</svg> Carrito</a></li>
    <li id="btnCerrarSesion"><a class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style="cursor: pointer;">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg> Cerrar sesión</a></li>
  </ul>
</div>
        `
        document.getElementById('btnCerrarSesion').addEventListener('click', function(){
          localStorage.removeItem('usuarios');
          window.location = "login.html"
        });

    const nuevoComentario = {
      user: ultimoUsuario.usuario || "Anónimo",
      dateTime: fechaActual,
      score: ratingSeleccionado,
      description: comentario.value.trim()
    };

    agregarComentarioAlDOM(nuevoComentario);

    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${productID}`)) || [];
    comentariosGuardados.push(nuevoComentario);
    localStorage.setItem(`comentarios_${productID}`, JSON.stringify(comentariosGuardados));

    modal.style.display = "none";
    resetearEstrellas();
    comentario.value = '';
    ratingSeleccionado = 0;
  } else {
    showToast("Selecciona una calificación y escribe un comentario.", "error");
  }
};

function agregarComentarioAlDOM(comentario) {
  const elementoProd = document.getElementById('destacadas');
  const comentarioDiv = document.createElement('div');
  const parrafo = document.createElement('p');

  const estrellas = generarEstrellas(comentario.score);

  parrafo.innerHTML = `
          <div class="user-info">
            <strong>${comentario.user}</strong>
            <span class="date">${formatearFecha(comentario.dateTime)}</span>
          </div>
          <span>${estrellas}</span><br>
          ${comentario.description}
        `;

  comentarioDiv.appendChild(parrafo);
  elementoProd.appendChild(comentarioDiv);
}

function generarEstrellas(score) {
  const maxEstrellas = 5;
  let estrellasHTML = '';

  for (let i = 0; i < Math.floor(score); i++) {
    estrellasHTML += '★';
  }

  for (let i = Math.floor(score); i < maxEstrellas; i++) {
    estrellasHTML += '☆';
  }

  return estrellasHTML;
}

function formatearFecha(fecha) {
  const dateObj = new Date(fecha);
  const dia = String(dateObj.getDate()).padStart(2, '0');
  const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
  const anio = String(dateObj.getFullYear());
  const horas = String(dateObj.getHours()).padStart(2, '0');
  const minutos = String(dateObj.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

window.onload = function() {
  const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_${productID}`)) || [];
  comentariosGuardados.forEach(comentario => {
    agregarComentarioAlDOM(comentario);
  });
};

const COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

fetch(COMMENTS)
  .then(response => response.json())
  .then(comentarios => {
    const elementoProd = document.getElementById('destacadas');

    function comentariosUsers(comentarios) {
      comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        const parrafo = document.createElement('p');
        parrafo.classList.add("comentariosUser");

        const estrellas = generarEstrellas(comentario.score);

        parrafo.innerHTML = `
          <div class="user-info">
            <strong>${comentario.user}</strong>
            <span class="date">${formatearFecha(comentario.dateTime)}</span>
          </div>
          <span>${estrellas}</span><br>
          ${comentario.description}
        `;
        comentarioDiv.appendChild(parrafo);
        elementoProd.appendChild(comentarioDiv);
      });
    }

    if (Array.isArray(comentarios) && comentarios.length > 0) {
      comentariosUsers(comentarios);
    }
  })
  .catch(error => {
    showToast('Error: ' + error.message, "error");
  });

// Función para mostrar toasts
function showToast(message, type) {
  const toastContainer = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  if (type === 'success') {
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13l4 4L19 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
    `;
  } else if (type === 'error') {
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="white"/>
        </svg>
      </div>
      <div class="toast-content">
        <p class="toast-message">${message}</p>
      </div>
    `;
  }

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, 500);
  }, 3000);
}
