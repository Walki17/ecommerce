const variable = localStorage.getItem("catID");
const DATOS = `https://japceibal.github.io/emercado-api/cats_products/` + variable + `.json`;

fetch(DATOS)
  .then(response => response.json())
  .then(data => {
    const autos = data.products;
    const formatter = new Intl.NumberFormat('es-ES');
    const divAutitos = document.getElementById("autitos");
    divAutitos.innerHTML = "";

    // crea un numero de contenedores por fila basado en la cantidad de productos
    const numProducts = autos.length;
    const numRows = Math.ceil(numProducts / 4);

    for (let i = 0; i < numRows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      // Loop de maximo 4 productos por columna
      for (let j = 0; j < 4 && i * 4 + j < numProducts; j++) {
        const producto = autos[i * 4 + j];

        const card = document.createElement("div");
        card.classList.add("col-md-3", "mb-4"); // agrega Bootstrap col-md-3 and mb-4 classes

        const cardContent = `
          <div class="card">
            <img src="${producto.image}" class="card-img-top" alt="Productos">
             <h5 class="card-title">${producto.name}</h5>
        <p class="card-text">${producto.description}</p>
        <p>${producto.currency} ${formatter.format(producto.cost)} </p> 
        <p>Vendidos: ${producto.soldCount}</p>
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

const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const ultimoUsuario = usuarios[usuarios.length - 1];
document.getElementsByClassName("nav-item")[3].innerHTML=` <a class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
             <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
          </svg>  
     ${ultimoUsuario.usuario}</a>`

     





