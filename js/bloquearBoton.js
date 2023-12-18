const botonBloqueado = document.getElementsByName('finalizar')[0]


// Escuchar el evento 'submit' del formulario
document.getElementById("myform").addEventListener("submit", function () {
    // Deshabilitar el botón antes de enviar el formulario
    botonBloqueado.disabled = true;

    setTimeout(() => {
        // Habilita el botón de envío después de que el envío haya terminado
        if (botonBloqueado) {
            botonBloqueado.disabled = false;
        }
    }, 5000);
});



