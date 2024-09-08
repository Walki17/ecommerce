
/*const disminuirBtn = document.querySelector('.disminuir');
const aumentarBtn = document.querySelector('.aumentar');
const cantidadInput = document.querySelector('.cantidad');*/
/*disminuirBtn.addEventListener('click', () => {
  let cantidad = parseInt(cantidadInput.value);
  if (cantidad > 1) {
    cantidad--;
    cantidadInput.value = cantidad;
  }
});

aumentarBtn.addEventListener('click', () => {
  let cantidad = parseInt(cantidadInput.value);
  cantidad++;
  cantidadInput.value = cantidad;
});*/

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
      <h2>${product.name}</h2>
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p><strong>Precio:</strong> ${product.currency} ${new Intl.NumberFormat('es-ES').format(product.cost)}</p>
        <p><strong>Cantidad Vendida:</strong> ${product.soldCount}</p>
        <h3>Imágenes:</h3>
      `;
  })
  .catch(error => {
    console.error('Error al obtener la información del producto:', error);
    // Mostrar un mensaje de error al usuario
    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';
  })

/*document.addEventListener('DOMContentLoaded', () => {
  let productID = localStorage.getItem("productID");
  console.log("productID obtenido:", productID); // Verifica el valor en la consola*/

  /*const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

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
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}">
      `;
  })
  .catch(error => {
    console.error('Error al obtener la información del producto:', error);
    // Mostrar un mensaje de error al usuario
    const productInfoElement = document.getElementById('productInfo');
    productInfoElement.innerHTML = 'Ha ocurrido un error al cargar la información del producto.';
  })*/




 
