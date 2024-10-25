const variable = localStorage.getItem("catID");
const DATOS = `https://japceibal.github.io/emercado-api/cats_products/` + variable + `.json`;

fetch(DATOS)
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

      // Loop de máximo 4 productos por columna
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

  //titulo empieza aca

  fetch(DATOS)
  .then(response => response.json())
  .then(data => {
    const catName = data.catName;
    const categoryTitleElement = document.getElementById("categoryTitle");
    categoryTitleElement.innerHTML = catName;
  })
  .catch(error => {
    console.error('Error:', error);
  });

  //termina aca

function selectProduct(productId) {
  localStorage.setItem("productID", productId);
  window.location.href = "product-info.html";
}



function filtrado() {
  fetch(DATOS)
  .then(response => response.json()) 
  .then(data => {
      const autos = data.products;
      const divAutitos = document.getElementById("autitos");

    
      const campo1 = parseFloat(document.getElementById("precio1").value);
      const campo2 = parseFloat(document.getElementById("precio2").value);
      
   
      const autosXprecio = autos.filter(auto => auto.cost >= campo1 && auto.cost <= campo2);
      
      divAutitos.innerHTML = ''; 

      const numProducts = autosXprecio.length;
      const numRows = Math.ceil(numProducts / 4); 

      
      for (let i = 0; i < numRows; i++) {
          const row = document.createElement("div");
          row.classList.add("row"); 

         
          for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
              const auto = autosXprecio[i * 4 + j];

              const card = document.createElement("div");
              card.classList.add("col-md-3", "mb-4"); 

              card.innerHTML = `
                <div class="col">
                  <div class="card-product">
                    <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                    <div class="card-body">
                      <h5 class="card-title">${auto.name}</h5>
                      <p class="card-text">${auto.description}</p>
                      <p class="card-text">${auto.currency} ${auto.cost}</p>
                      <p> Vendidos: ${auto.soldCount}</p>
                    </div>
                  </div>
                </div>`;
              
              row.appendChild(card); 
          }

          divAutitos.appendChild(row); 
      }
  })
  .catch(error => {
      console.error('Error:', error); 
  });
}

  function filtrado2() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

       
        const precioMenoraMayor = autos.sort((a, b) => a.cost - b.cost);

        divAutitos.innerHTML = ''; 

        const numProducts = precioMenoraMayor.length;
        const numRows = Math.ceil(numProducts / 4); 

       
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row"); 

            
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = precioMenoraMayor[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4"); 

                card.innerHTML = `
                  <div class="col">
                    <div class="card-product">
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.currency} ${auto.cost}</p>
                        <p> Vendidos: ${auto.soldCount}</p>
                      </div>
                    </div>
                  </div>`;
                
                row.appendChild(card); 
            }

            divAutitos.appendChild(row); 
        }
    })
    .catch(error => {
        console.error('Error:', error); 

    });
}
  
  function filtrado3() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

     
        const precioMayoraMenor = autos.sort((a, b) => b.cost - a.cost);

        divAutitos.innerHTML = ''; 

        const numProducts = precioMayoraMenor.length;
        const numRows = Math.ceil(numProducts / 4); 

        // Loop para crear filas
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row"); 

         
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = precioMayoraMenor[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4"); 

                card.innerHTML = `
                  <div id="test" class="col">
                    <div class="card-product">
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.currency} ${auto.cost}</p>
                        <p> Vendidos: ${auto.soldCount}</p>
                      </div>
                    </div>
                  </div>`;
                
                row.appendChild(card);
            }

            divAutitos.appendChild(row); 
        }
    })
    .catch(error => {
        console.error('Error:', error); 
    });
}  

function filtrado4() {
    fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        const autos = data.products;
        const divAutitos = document.getElementById("autitos");

        // Ordena los productos por relevancia (cantidad de vendidos)
        const relev = autos.sort((a, b) => b.soldCount - a.soldCount);

        divAutitos.innerHTML = ''; // Limpia el contenido anterior

        const numProducts = relev.length;
        const numRows = Math.ceil(numProducts / 4);

        for (let i = 0; i < numRows; i++) {
            const row = document.createElement("div");
            row.classList.add("row");

            // Loop de máximo 4 productos por fila
            for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
                const auto = relev[i * 4 + j];

                const card = document.createElement("div");
                card.classList.add("col-md-3", "mb-4");

                card.innerHTML = `
                    <div class="card-product">
                        <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 17rem;">
                        <div class="card-body">
                            <h5 class="card-title">${auto.name}</h5>
                            <p class="card-text">${auto.description}</p>
                            <p class="card-text">${auto.currency} ${auto.cost}</p>
                            <p>Vendidos: ${auto.soldCount}</p>
                        </div>
                    </div>`;
                
                row.appendChild(card);
            }

            divAutitos.appendChild(row);
        }
    })
    .catch(error => {
        console.error('Error:', error); 
    });
};

const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const ultimoUsuario = usuarios[usuarios.length - 1];
  document.getElementsByClassName("nav-item")[3].innerHTML=`
        <div class="dropdown" >
  <button class="btn dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #212529; color: white;">
    <a class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>  
        ${ultimoUsuario.email}</a>
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
