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
    const cantidadInput = document.querySelector('.cantidad');
    const botonAumentar = document.querySelector('.aumentar');
    const botonDisminuir = document.querySelector('.disminuir');

    // Evento para aumentar la cantidad
    botonAumentar.addEventListener('click', () => {
        let cantidad = parseInt(cantidadInput.value);  // Convertir el valor a número
        cantidad++;  // Aumentar la cantidad
        cantidadInput.value = cantidad;  // Actualizar el campo de entrada
    });

    // Evento para disminuir la cantidad
    botonDisminuir.addEventListener('click', () => {
        let cantidad = parseInt(cantidadInput.value);  // Convertir el valor a número
        if (cantidad > 1) {  // Evitar que la cantidad sea menor que 1
            cantidad--;  // Disminuir la cantidad
            cantidadInput.value = cantidad;  // Actualizar el campo de entrada
        }
    });

})
.catch(error => {
    console.error('Error al obtener la información del producto:', error);
    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';
});


// Obtener elementos
var modal = document.getElementById("calificarModal");
var calificarBtn = document.getElementById("btncalificar");
var span = document.getElementsByClassName("close")[0];
var estrellas = document.querySelectorAll(".estrella");
var comentario = document.getElementById("comentario");
var enviarBtn = document.getElementById("enviarBtn");
var ratingSeleccionado = 0;

// Mostrar el modal al hacer clic en "Calificar"
btncalificar.onclick = function() {
  modal.style.display = "block";
}

// Cerrar el modal al hacer clic en la 'x'
span.onclick = function() {
  modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera del modal
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

// Función para pintar las estrellas desde la izquierda hasta la seleccionada
function pintarEstrellas(rating) {
  estrellas.forEach(function(estrella) {
      const estrellaValue = parseInt(estrella.getAttribute("data-value"));
      if (estrellaValue <= rating) {
          estrella.classList.add("selected"); // Pinta la estrella
      } else {
          estrella.classList.remove("selected"); // Despinta las estrellas no seleccionadas
      }
  });
}

// Función para limpiar la selección de estrellas
function resetearEstrellas() {
  estrellas.forEach(function(estrella) {
      estrella.classList.remove("selected"); // Despinta todas las estrellas
  });
}

// Seleccionar estrellas al pasar el mouse (mouseover)
estrellas.forEach(function(estrella) {
  estrella.addEventListener("mouseover", function() {
      const ratingHover = parseInt(this.getAttribute("data-value"));
      pintarEstrellas(ratingHover); // Pintar desde la estrella seleccionada hacia la izquierda
  });

  // Restablecer las estrellas cuando se quita el mouse (mouseleave)
  estrella.addEventListener("mouseleave", function() {
      resetearEstrellas(); // Despintar todas las estrellas al salir
      if (ratingSeleccionado) { // Si hay un rating seleccionado, volver a pintarlo
          pintarEstrellas(ratingSeleccionado);
      }
  });

  // Seleccionar estrellas al hacer clic (click)
  estrella.addEventListener("click", function() {
      ratingSeleccionado = parseInt(this.getAttribute("data-value"));
      pintarEstrellas(ratingSeleccionado); // Pintar las estrellas seleccionadas
  });
});

// Enviar comentario y rating
enviarBtn.onclick = function() {
  if (ratingSeleccionado > 0 ) {
      alert("Gracias por tu calificación de " + ratingSeleccionado + " estrellas");
      modal.style.display = "none";
  } else {
      alert("Selecciona una calificación y escribe un comentario.");
  }
}


const COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;


fetch(COMMENTS)
  .then(response => response.json())
  .then(comentarios => {
    const elementoProd = document.getElementById('destacadas');
    console.log(comentarios); 
    
    function comentariosUsers(comentarios) {
      comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `${comentario.user} ${comentario.dateTime}<br>${comentario.score} <br> ${comentario.description}`;  
        comentarioDiv.appendChild(parrafo);
        
        elementoProd.appendChild(comentarioDiv);  
      });
    }

    // Función para generar estrellas basadas en el score
    function generarEstrellas(score) {
      const maxEstrellas = 5;
      let estrellasHTML = '';

      // Generar estrellas llenas
      for (let i = 0; i < Math.floor(score); i++) {
        estrellasHTML += '★'; // Estrella llena
      }

      // Rellenar con estrellas vacías
      for (let i = Math.floor(score); i < maxEstrellas; i++) {
        estrellasHTML += '☆'; // Estrella vacía
      }

      return estrellasHTML;
    }

    // Función para mostrar los comentarios de los usuarios
    function comentariosUsers(comentarios) {
      comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        const parrafo = document.createElement('p');

        // Generamos las estrellas usando el score
        const estrellas = generarEstrellas(comentario.score);

        // Mostramos el comentario con el nombre del usuario, fecha, estrellas y descripción
        parrafo.innerHTML = `
          <strong>${comentario.user}</strong> ${comentario.dateTime}<br>
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
    console.error('Error:', error);
  });