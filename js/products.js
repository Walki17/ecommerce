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

