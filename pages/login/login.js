//evento para cambiar el boton mostrar contraseña de la clase fontawesome al <i class="fa-solid fa-eye-slash"></i>
function mostrarContrasena() {
    //obtener el input de la contraseña
    var inputPassword = document.getElementById("password");
    //obtener el icono del boton
    var icon = document.getElementById("show-password");
    //cambiar el tipo del input de password a text
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
        icon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        //cambiar el tipo del input de text a password
        inputPassword.type = "password";
        icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}


//agregar el evento al boton
document.getElementById("show-password").addEventListener("click", mostrarContrasena);

//evento para capturar el submit del formulario y redirigir a la pagina de inicio
document.getElementById("login-form").addEventListener("submit", function (e) {
    //evitar que se recargue la pagina
    e.preventDefault();
    //redirigir a la pagina de inicio
    window.location.href = "../../index.html";
});
