const disminuirBtn = document.querySelector('.disminuir');
const aumentarBtn = document.querySelector('.aumentar');
const cantidadInput = document.querySelector('.cantidad');

disminuirBtn.addEventListener('click', () => {
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
});