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
});


const todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios'));
const ultimoEmail = todosLosUsuarios[todosLosUsuarios.length - 1];
document.getElementById('emailPerfil').value = ultimoEmail.email;


document.getElementById('btnGuardarCambios').addEventListener('click', function() {
    // Extraer valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const segundoNombre = document.getElementById('segundoNombre').value;
    const apellido = document.getElementById('apellido').value;
    const segundoApellido = document.getElementById('segundoApellido').value;
    const emailPerfil = document.getElementById('emailPerfil').value;
    const numeroContacto = document.getElementById('numeroContacto').value;
  
    // Crear un objeto con la nueva información del usuario
    const nuevoUser = {
      nombre: nombre,
      segundoNombre: segundoNombre,
      apellido: apellido,
      segundoApellido: segundoApellido,
      email: emailPerfil,  // Usar emailPerfil en vez de 'email'
      numeroContacto: numeroContacto
    };
  
    // Obtener el array de usuarios del localStorage, si no existe, crear un array vacío
    const losUsuarios = JSON.parse(localStorage.getItem('informacionUsuarios')) || [];
  
    // Verificar si el usuario con el mismo email ya existe en el array
    const usuarioExistente = losUsuarios.findIndex(usuario => usuario.email === emailPerfil); // usar losUsuarios y emailPerfil
  
    if (usuarioExistente !== -1) {
      // Si el usuario ya existe, actualizar su información
      losUsuarios[usuarioExistente] = nuevoUser;
    } else {
      // Si el usuario no existe, agregar el nuevo usuario al array
      losUsuarios.push(nuevoUser);
    }
  
    // Guardar el array actualizado en localStorage
    localStorage.setItem('informacionUsuarios', JSON.stringify(losUsuarios));
  
    // Mostrar mensaje de confirmación (opcional)
    console.log('Información guardada o actualizada:', losUsuarios);
  });