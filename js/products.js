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
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
            <p>${producto.currency} ${formatter.format(producto.cost)}</p>
            <p>Vendidos: ${producto.soldCount}</p>
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
                    <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 15rem;">
                    <div class="card-body">
                      <h5 class="card-title">${auto.name}</h5>
                      <p class="card-text">${auto.description}</p>
                      <p class="card-text">${auto.cost}</p>
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
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 15rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.cost} ${auto.cost}</p>
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
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 15rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.cost} ${auto.cost}</p>
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
                      <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 15rem;">
                      <div class="card-body">
                        <h5 class="card-title">${auto.name}</h5>
                        <p class="card-text">${auto.description}</p>
                        <p class="card-text">${auto.cost} ${auto.cost}</p>
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
                        <img src="${auto.image}" class="card-img-product" alt="Productos" style="width: 15rem;">
                        <div class="card-body">
                            <h5 class="card-title">${auto.name}</h5>
                            <p class="card-text">${auto.description}</p>
                            <p class="card-text">${auto.cost} ${auto.currency}</p>
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
  document.getElementsByClassName("nav-item")[3].innerHTML=` <a class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
               <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>  
       ${ultimoUsuario.usuario}</a>`

