const user = document.getElementById("user");
const password = document.getElementById("password");

function validacionAutenticado() {
  if (localStorage.getItem("EstaAutenticado") !== "true") {
    window.location.href = "login.html";
  }
}

document.getElementById("botoning").addEventListener('click', function(event) {
  if (user.value === "" || password.value === "") {
    alert("Los campos de usuario y contraseña son obligatorios");
    event.preventDefault();
  } else {
    if (user.value === "true" && password.value === "true") {
      alert("Ingresaste correctamente");
      localStorage.setItem("EstaAutenticado", "true");
      window.location.href = "index.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }
});

window.onload = function() {
  validacionAutenticado();
};



