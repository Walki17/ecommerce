let variable = localStorage.getItem("catID")

const DATOS = `https://japceibal.github.io/emercado-api/cats_products/` + variable + `.json`;


fetch(DATOS)
    .then(response => response.json()) 
    .then(data => {
        console.log(data);
        const autos = data.products; 
        const divAutitos = document.getElementById("autitos");
        divAutitos.innerHTML="";
        autos.forEach(producto => {
            const parrafo = document.createElement("p");
            parrafo.innerHTML = `
<div id="test" class="col-md-3">
  <div class="col">
    <div class="card">
      <img src="${producto.image}" class="card-img-top" alt="Productos" style="width: 15rem;">
      <div class="card-body">
        <h5 class="card-title">${producto.name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>`;
            divAutitos.appendChild(parrafo); 
        });
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

     





