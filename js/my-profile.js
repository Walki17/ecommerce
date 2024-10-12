document.addEventListener('DOMContentLoaded', function() {
  const savedPic = localStorage.getItem('profilePic');
  if (savedPic) {
      document.getElementById('profile-pic').src = savedPic;
  }

  document.getElementById('change-pic').addEventListener('click', function() {
      document.getElementById('file-input').click();
  });

  document.getElementById('file-input').addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const imageData = e.target.result;
              document.getElementById('profile-pic').src = imageData;
              localStorage.setItem('profilePic', imageData);
          };
          reader.readAsDataURL(file);
      }
  });

  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const ultimoUsuario = usuarios[usuarios.length - 1];
    document.getElementsByClassName("nav-item")[3].innerHTML=`
        <div class="dropdown" >
  <button class="btn dropdown-toggle d-flex justify-content-between align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #212529; color: white;">
    <a class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>  
        ${ultimoUsuario.email}</a>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="my-profile.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> Perfil</a></li>
    <li><a class="dropdown-item" href="cart.html"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
</svg> Carrito</a></li>
    <li id="btnCerrarSesion"><a class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style="cursor: pointer;">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg> Cerrar sesión</a></li>
  </ul>
</div>
        `
        document.getElementById('btnCerrarSesion').addEventListener('click', function(){
          localStorage.removeItem('usuarios');
          window.location = "login.html"
        });

  // Obtener todos los usuarios almacenados
  const todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const ultimoEmail = todosLosUsuarios[todosLosUsuarios.length - 1]?.email; // Tomar el último email guardado en el login

  document.getElementById('emailPerfil').value = ultimoEmail;

  document.getElementById('btnGuardarCambios').addEventListener('click', function() {
      const usuario = document.getElementById('usuario').value;
      const nombre = document.getElementById('nombre').value;
      const segundoNombre = document.getElementById('segundoNombre').value;
      const apellido = document.getElementById('apellido').value;
      const segundoApellido = document.getElementById('segundoApellido').value;
      const emailPerfil = document.getElementById('emailPerfil').value;
      const contacto = document.getElementById('contacto').value;

      if (!nombre.trim() || !apellido.trim()) {
        return;
    }

      const nuevoUser = {
          usuario: usuario,
          nombre: nombre,
          segundoNombre: segundoNombre,
          apellido: apellido,
          segundoApellido: segundoApellido,
          email: emailPerfil,
          contacto: contacto
      };

      const losUsuarios = JSON.parse(localStorage.getItem('informacionUsuarios')) || [];
      const usuarioExistente = losUsuarios.findIndex(usuario => usuario.email === emailPerfil);
// Si el usuario ya existe, actualizar su información si no existe lo agrega en el array
      if (usuarioExistente !== -1) {
          losUsuarios[usuarioExistente] = nuevoUser;
      } else {
          losUsuarios.push(nuevoUser);
      }

      localStorage.setItem('informacionUsuarios', JSON.stringify(losUsuarios));

      console.log('Información guardada o actualizada:', losUsuarios);
  });

  // Cargar los datos asociados al email del usuario logueado
  const losUsuarios = JSON.parse(localStorage.getItem('informacionUsuarios')) || [];

  if (losUsuarios.length > 0 && ultimoEmail) {
      // Buscar el usuario con el email del login
      const usuarioActual = losUsuarios.find(usuario => usuario.email === ultimoEmail);

      if (usuarioActual) {
          document.getElementById('usuario').value = usuarioActual.usuario || '';
          document.getElementById('nombre').value = usuarioActual.nombre || '';
          document.getElementById('segundoNombre').value = usuarioActual.segundoNombre || '';
          document.getElementById('apellido').value = usuarioActual.apellido || '';
          document.getElementById('segundoApellido').value = usuarioActual.segundoApellido || '';
          document.getElementById('emailPerfil').value = usuarioActual.email || '';
          document.getElementById('contacto').value = usuarioActual.contacto || '';
      }
  }
});
