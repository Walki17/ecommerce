const user = document.getElementById("user");
const password = document.getElementById("password");

document.getElementById("botoning").addEventListener('click', function(event) {
  if (user.value === "" || password.value === "") {
    alert("Los campos de usuario y contraseña son obligatorios.");
    event.preventDefault(); // evita que el formulario se envíe automáticamente cuando se hace click en el botón
  } else {
      alert("Ingresaste correctamente, bienvenid@!");     
      window.location.href = "index.html";
    } 
});

const formularioLogin = document.querySelector('#login')
formularioLogin.addEventListener('click', (e)=> {
  e.preventDefault()

  const usuario = document.querySelector('#user').value
  const contrasena = document.querySelector('#password').value

  const usuariosTotales = JSON.parse(localStorage.getItem('usuarios')) || []
  usuariosTotales.push({usuario: usuario, contraseña: contrasena})
  localStorage.setItem('usuarios', JSON.stringify(usuariosTotales))
  
});