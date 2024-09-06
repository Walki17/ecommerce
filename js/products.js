const DATOS = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 

/*const dato1 = document.getElementById("dato1");
const dato2 = document.getElementById("dato2"); 
const dato3 = document.getElementById("dato3");
const dato4 = document.getElementById("dato4");
const dato5 = document.getElementById("dato5");
const dato6 = document.getElementById("dato6");
const dato7 = document.getElementById("dato7"); 
const dato8 = document.getElementById("dato8");
const dato9 = document.getElementById("dato9");
const dato10 = document.getElementById("dato10");
const dato11 = document.getElementById("dato11");
const dato12 = document.getElementById("dato12"); 
const dato13 = document.getElementById("dato13");
const dato14 = document.getElementById("dato14");
const dato15 = document.getElementById("dato15");
const dato16 = document.getElementById("dato16");
const dato17 = document.getElementById("dato17"); 
const dato18 = document.getElementById("dato18");
const dato19 = document.getElementById("dato19");
const dato20 = document.getElementById("dato20");
const dato21 = document.getElementById("dato21");
const dato22 = document.getElementById("dato22"); 
const dato23 = document.getElementById("dato23");
const dato24 = document.getElementById("dato24");
const dato25 = document.getElementById("dato25"); */

fetch(DATOS)
    .then(response => response.json())
    .then(data => {
        const productos = data.products;
        const formatter = new Intl.NumberFormat('es-ES');
        document.getElementById("dato1").innerHTML = data.products[0].name;
        document.getElementById("dato2").innerHTML = data.products[0].currency + " " + formatter.format(data.products[0].cost);
        document.getElementById("dato3").innerHTML = data.products[0].description;
        document.getElementById("dato4").innerHTML = "Vendidos: " + data.products[0].soldCount;

        const contenedorImagenUno = document.getElementById("dato5");
        const nuevaImagenUno = document.createElement("img");
        nuevaImagenUno.src = data.products[0].image;
        nuevaImagenUno.alt = data.products[0].image;
        contenedorImagenUno.appendChild(nuevaImagenUno);

        document.getElementById("dato6").innerHTML = data.products[1].name;
        document.getElementById("dato7").innerHTML = data.products[1].currency + " " + formatter.format(data.products[1].cost);
        document.getElementById("dato8").innerHTML = data.products[1].description;
        document.getElementById("dato9").innerHTML = "Vendidos: " + data.products[1].soldCount;

        const contenedorImagenDos = document.getElementById("dato10");
        const nuevaImagenDos = document.createElement("img");
        nuevaImagenDos.src = data.products[1].image;
        nuevaImagenDos.alt = data.products[1].image;
        contenedorImagenDos.appendChild(nuevaImagenDos);

        document.getElementById("dato11").innerHTML = data.products[2].name;
        document.getElementById("dato12").innerHTML = data.products[2].currency + " " + formatter.format(data.products[2].cost);
        document.getElementById("dato13").innerHTML = data.products[2].description;
        document.getElementById("dato14").innerHTML = "Vendidos: " + data.products[2].soldCount;

        const contenedorImagenTres = document.getElementById("dato15");
        const nuevaImagenTres = document.createElement("img");
        nuevaImagenTres.src = data.products[2].image;
        nuevaImagenTres.alt = data.products[2].image;
        contenedorImagenTres.appendChild(nuevaImagenTres);


        document.getElementById("dato16").innerHTML = data.products[3].name;
        document.getElementById("dato17").innerHTML = data.products[3].currency + " " + formatter.format(data.products[3].cost);
        document.getElementById("dato18").innerHTML = data.products[3].description;
        document.getElementById("dato19").innerHTML = "Vendidos: " + data.products[3].soldCount;

        const contenedorImagenCuatro = document.getElementById("dato20");
        const nuevaImagenCuatro = document.createElement("img");
        nuevaImagenCuatro.src = data.products[3].image;
        nuevaImagenCuatro.alt = data.products[3].image;
        contenedorImagenCuatro.appendChild(nuevaImagenCuatro);

        document.getElementById("dato21").innerHTML = data.products[4].name;
        document.getElementById("dato22").innerHTML = data.products[4].currency + " " + formatter.format(data.products[4].cost);
        document.getElementById("dato23").innerHTML = data.products[4].description;
        document.getElementById("dato24").innerHTML = "Vendidos: " + data.products[4].soldCount;

        const contenedorImagenCinco = document.getElementById("dato25");
        const nuevaImagenCinco = document.createElement("img");
        nuevaImagenCinco.src = data.products[4].image;
        nuevaImagenCinco.alt = data.products[4].image;
        contenedorImagenCinco.appendChild(nuevaImagenCinco);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    const btnLupa1 = document.getElementById('boton1');
    const imagen1 = document.getElementById('dato5');

btnLupa1.addEventListener('click', () => {
    imagen1.style.transform = 'scale(2)';
    btnLupa1.style.opacity = 0;
    btnLupa2.style.opacity = 0;
    btnLupa3.style.opacity = 0;
    btnLupa4.style.opacity = 0;
    btnLupa5.style.opacity = 0;
});


    const btnLupa2 = document.getElementById('boton2');
    const imagen2 = document.getElementById('dato10');

btnLupa2.addEventListener('click', () => {
    imagen2.style.transform = 'scale(2)';
    btnLupa1.style.opacity = 0;
    btnLupa2.style.opacity = 0;
    btnLupa3.style.opacity = 0;
    btnLupa4.style.opacity = 0;
    btnLupa5.style.opacity = 0;
});

const btnLupa3 = document.getElementById('boton3');
    const imagen3 = document.getElementById('dato15');

btnLupa3.addEventListener('click', () => {
    imagen3.style.transform = 'scale(2)';
    btnLupa1.style.opacity = 0;
    btnLupa2.style.opacity = 0;
    btnLupa3.style.opacity = 0;
    btnLupa4.style.opacity = 0;
    btnLupa5.style.opacity = 0;
});

const btnLupa4 = document.getElementById('boton4');
    const imagen4 = document.getElementById('dato20');

btnLupa4.addEventListener('click', () => {
    imagen4.style.transform = 'scale(2)';
    btnLupa1.style.opacity = 0;
    btnLupa2.style.opacity = 0;
    btnLupa3.style.opacity = 0;
    btnLupa4.style.opacity = 0;
    btnLupa5.style.opacity = 0;
});

    const btnLupa5 = document.getElementById('boton5');
    const imagen5 = document.getElementById('dato25');

    btnLupa5.addEventListener('click', () => {
        imagen5.style.transform = 'scale(2)';
        btnLupa1.style.opacity = 0;
        btnLupa2.style.opacity = 0;
        btnLupa3.style.opacity = 0;
        btnLupa4.style.opacity = 0;
        btnLupa5.style.opacity = 0;
    });



const usuarios = JSON.parse(localStorage.getItem("usuarios"));
const ultimoUsuario = usuarios[usuarios.length - 1];
document.getElementsByClassName("nav-item")[3].innerHTML=` <a class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
             <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
          </svg>  
     ${ultimoUsuario.usuario}</a>`


    /*constantes para la funcion de filtro*/

   const minCostInput = document.getElementById('minCost');
   const maxCostInput = document.getElementById('maxCost');
   const filterButton = document.getElementById('filterButton');
   const clearButton = document.getElementById('clearButton');


   const products = [
    { id: ('auto1'), cost: 13500, soldCount: 14 },
    { id: ('auto2'), cost: 14500, soldCount: 52 },
    { id: ('auto3'), cost: 12500, soldCount: 25 },
    { id: ('auto4'), cost: 15200, soldCount: 17 },
    { id: ('auto5'), cost: 3500000, soldCount: 0 }
 ];

 // Funcion para filtrar precios en base a un rango 
  function filterProductsByCost() {
  const minCost = (minCostInput.value) || 0;
  const maxCost = (maxCostInput.value) || Number.MAX_VALUE;

  const filteredProducts = products.filter(product => {
    const productCost = parseInt(product.cost);
    return productCost >= minCost && productCost <= maxCost;
  });
}

// Funcion para limpiar los filtros y mostrar todos los productos*/
function clearFilters() {
  minCostInput.value = '';
  maxCostInput.value = '';
}

// Event listeners para los filtros y boton de limpiar
filterButton.addEventListener('click', filterProductsByCost);
clearButton.addEventListener('click', clearFilters);

/*constantes para botones de ordenamiento*/

const sortAscButton = document.getElementById('sortAsc');
const sortDescButton = document.getElementById('sortDesc');
const sortBysoldCountButton = document.getElementById('sortBysoldCount');   


sortAscButton.addEventListener('click', () => {
  products.sort((a, b) => a.cost - b.cost);
  console.log(products);
});

sortDescButton.addEventListener('click', () => {
  products.sort((a, b) => b.cost - a.cost);
  console.log(products);
});

sortBysoldCountButton.addEventListener('click', () => {
  products.sort((a, b) => b.soldCount - a.soldCount);
  console.log(products);
});

