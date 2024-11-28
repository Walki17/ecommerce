const catID = localStorage.getItem("catID"); // Obtiene el catID del localStorage
const url = DATOS(catID); // Genera la URL usando la función DATOS de init.js

// Obtener productos
fetch(url)
  .then(response => response.json())
  .then(data => {
    const autos = data.products;
    const formatter = new Intl.NumberFormat('es-ES');
    const divAutitos = document.getElementById("autitos");
    divAutitos.innerHTML = "";
    console.log(autos);

    // Crear contenedores por fila basado en la cantidad de productos
    const numProducts = autos.length;
    const numRows = Math.ceil(numProducts / 4);

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      // Loop de máximo 4 productos por fila
      for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
        const producto = autos[i * 4 + j];

        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4");

        const cardContent = `
          <div class="card-product" style="cursor: pointer;" onclick="selectProduct(${producto.id})">
            <img src="${producto.image}" class="card-img-product" alt="Producto">
            <div class="card-body"> 
              <h5 class="card-title">${producto.name}</h5>
              <p class="card-text">${producto.description}</p>
              <p class="price">${producto.currency} ${formatter.format(producto.cost)}</p>
              <p class="sold">Vendidos: ${producto.soldCount}</p>
            </div>
          </div>`;

        card.innerHTML = cardContent;
        row.appendChild(card);
      }

      divAutitos.appendChild(row);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Obtener el nombre de la categoría y actualizar el título
fetch(url)
  .then(response => response.json())
  .then(data => {
    const catName = data.catName;
    const categoryTitleElement = document.getElementById("categoryTitle");
    categoryTitleElement.innerHTML = catName;
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para seleccionar producto
function selectProduct(productId) {
  localStorage.setItem("productID", productId);
  window.location.href = "product-info.html";
}

function filtrado() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

      // Obtener los valores de los inputs de precio
      const campo1 = parseFloat(document.getElementById("precio1").value) || 0;
      const campo2 = parseFloat(document.getElementById("precio2").value) || Infinity;

      // Filtrar productos según el rango de precios
      const autosXprecio = autos.filter(auto => auto.cost >= campo1 && auto.cost <= campo2);

      divAutitos.innerHTML = ''; // Limpiar resultados anteriores

      mostrarProductos(autosXprecio);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function filtrado2() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

      // Ordenar productos de menor a mayor precio
      const precioMenoraMayor = [...autos].sort((a, b) => a.cost - b.cost);

      divAutitos.innerHTML = ''; // Limpiar resultados anteriores

      mostrarProductos(precioMenoraMayor);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function filtrado3() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

      // Ordenar productos de mayor a menor precio
      const precioMayoraMenor = [...autos].sort((a, b) => b.cost - a.cost);

      divAutitos.innerHTML = ''; // Limpiar resultados anteriores

      mostrarProductos(precioMayoraMenor);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function filtrado4() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

      // Ordenar productos por relevancia (vendidos de mayor a menor)
      const relev = [...autos].sort((a, b) => b.soldCount - a.soldCount);

      divAutitos.innerHTML = ''; // Limpiar resultados anteriores

      mostrarProductos(relev);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function mostrarProductos(productos) {
  const divAutitos = document.getElementById("autitos");
  const formatter = new Intl.NumberFormat('es-ES');

  const numProducts = productos.length;
  const numRows = Math.ceil(numProducts / 4);

  // Crear filas de productos
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Máximo de 4 productos por fila
    for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
      const producto = productos[i * 4 + j];

      const card = document.createElement("div");
      card.classList.add("col-md-3", "mb-4");

      const cardContent = `
        <div class="card-product" style="cursor: pointer;" onclick="selectProduct(${producto.id})">
          <img src="${producto.image}" class="card-img-product" alt="Producto">
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
            <p class="price">${producto.currency} ${formatter.format(producto.cost)}</p>
            <p class="sold">Vendidos: ${producto.soldCount}</p>
          </div>
        </div>`;

      card.innerHTML = cardContent;
      row.appendChild(card);
    }

    divAutitos.appendChild(row);
  }
}

