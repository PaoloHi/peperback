var selectElement = document.getElementById('RolS');
var septimoDocumento = document.getElementById('7moDocumento')

selectElement.addEventListener('change', function () {
    // Acciones a realizar cuando cambie la opción seleccionada
    var Rol = selectElement.options[selectElement.selectedIndex].value;

    if (Rol == 'Propietario') {
        septimoDocumento.innerText = ''
        septimoDocumento.innerText = 'Acta de Matrimonio'
    } else {
        septimoDocumento.innerText = ''
        septimoDocumento.innerText = 'Carta de confidencialidad'
    }
});

