// este Ajaax es para la alerta que dice ¡¡ Felicidades se guardo correctamente

$(document).ready(function () {
    var success = '@TempData'
    var successMessage = '@TempData["SuccessMessage"]';
    if (success) {
        Swal.fire(
            'Felicidades Prueba',
            successMessage,
            'success'
        );
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Lo lamento',
            text: 'no se pudo guardar la propiedad, contactar a tech support!',
            footer: '<a href="">Why do I have this issue?</a>'
        })


    }
});






