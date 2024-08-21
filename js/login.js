const user = document.getElementById("user");
const password = document.getElementById("password");

/*function validacionAutenticado() {
  if (localStorage.getItem("EstaAutenticado") !== "true") {
    window.location.href = "login.html";
  }
}*/

/*window.onload = function() {
  validacionAutenticado();
};*/



document.getElementById("botoning").addEventListener('click', function(event) {
  if (user.value === "" || password.value === "") {
    alert("Los campos de usuario y contraseña son obligatorios.");
    event.preventDefault(); // evita que el formulario se envíe automáticamente cuando se hace click en el botón
  } else {
      alert("Ingresaste correctamente");     
      window.location.href = "index.html";
      let autho = [user.value, password.value];
    } 
});


const userAutenticado = local.storage.getItem('estaAutenticado');


function checkAuthentication(){ 
 console.log('estaAutenticado', userAutenticado);
return userAutenticado !== null;
}

/* function iniciarSesion() {
  if (autenticacionCorrecta) {
    localStorage.setItem('estaLogueado', true);
    window.location.href = 'index.html';
  } else {
    /alert("No has iniciado sesión, serás redireccionado");
  }
} */