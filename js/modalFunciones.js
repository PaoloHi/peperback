

function rechazar() {
    document.getElementById('motivoRechazo').style.display = 'block';
    document.getElementById('rechazrBtn').style.display = 'none';
    document.getElementById('aprbarBtn').style.display = 'none';
    document.getElementById('modal-header').style.display = 'none';
}


function aprovar() {
    document.getElementById('rechazrBtn').style.display = 'none';
    document.getElementById('aprbarBtn').style.display = 'none';
    document.getElementById('motivoAprovado').style.display = 'block'
    document.getElementById('modal-header').style.display = 'none';
}


function resetModal() {
    document.getElementById('motivoRechazo').style.display = 'none';
    document.getElementById('motivoAprovado').style.display = 'none';
    document.getElementById('aprbarBtn').style.display = 'block';
    document.getElementById('rechazrBtn').style.display = 'block';
    document.getElementById('modal-header').style.display = 'flex';
    document.getElementById('alertaRazonRechazo').textContent = '';
}

function CambioContra() {


    var email = ('#CorreoPE').val();
    var contra = ('#ContraNueva').val();

    //Función para eliminar
    $.ajax({
        type: 'POST',
        url: '/Usuarios/ResetPassword',
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
        data: { emailUser: email, newPassword: contra },
        success: function (result) {


        },
        error: function () {
            alert('Failed to receive the Data');
            console.log('Failed ');
        }

    });

}


//nos aseguramos de que el modal siempre este cerrado
document.getElementById('openModal').style.display = 'none';



let DocumentID;
let Indice;

// esta funcion se encarga de conseguir el Id del documento y convertilar en una varibal global
// con la finalidad de que al dar click en el guardar cambios aplique los cambios en base al Id del documento 

const getDocumentID = function (indice) {

    DocumentID = document.getElementById('IDdoc_' + indice).value
    //para 
    document.getElementById('openModal').style.display = 'block';
    resetModal();

    //Proporcioanmos el Indice ya  que cada icono de proceso aprovado y rechazado tienen un indice, IconoAproavado_1 por ejemplo 
    //lo utilizaremos para manipular lo mas adelante 
    Indice = indice;

    return Indice;
    return DocumentID;
}


var controladorRuta = "Propiedades";



$('.controlador_Propiedades').on('click', function () {
    controladorRuta = "Propiedades"
    return controladorRuta

})


$('.controlador_usuarios').on('click', function () {
    controladorRuta = "Usuarios"
    return controladorRuta

})

var guardarCambiosAprobar = function (event) {

    //Función para eliminar
    $.ajax({
        type: 'POST',
        url: '/' + controladorRuta + '/AprobarDocumento',
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
        data: { IDDOC: DocumentID },
        success: function (result) {

            //cerramos el modal 
            document.getElementById('openModal').style.display = 'none';


            var IconoStatus = document.getElementById("IconoEstatus_" + Indice);
            IconoStatus.innerHTML = '<a class="  my-0" title="Documento aprobado" style="color:green !important;"><i class="fa-solid fa-circle-check size-icon " ></i></a >';
        },
        error: function () {
            alert('Failed to receive the Data');
           
            console.log('Failed ');
        }
    })



}

function guardarCambiosRechazar(event) {
    url = '/' + controladorRuta + '/RecahzarDocumento';

    var mensajeRechazo = $('#mensajeRechazado').val();


    const alertContainer = document.getElementById('alertaRazonRechazo');


    const rechazar = document.getElementById("mensajeRechazado")

    rechazar.addEventListener('input', function () {

        mensajeRechazo.value != "" ? alertContainer.innerHTML = '' : console.log('no cambio');

    })

    if (mensajeRechazo != "") {

        var data = { IDDOC: DocumentID, MENSAJE: mensajeRechazo }
        $.post(url, data).done(function (data) {
            if (data.success) {
            }

            document.getElementById('openModal').style.display = 'none';


            var IconoStatus = document.getElementById("IconoEstatus_" + Indice);
            IconoStatus.innerHTML = '<a class="my-0" title = "Documento rechazado" style = "color:red !important;" ><i class="fa-solid fa-circle-xmark size-icon" ></i></a > ';

            mensaje = $('#mensajeRechazado');
            mensaje.val("");
        });

    } else {

        const p = '<p class="text-danger texto-animado " >Debes ingresar el motivo por el cual rechazas la propiedad</p>';

        if (alertContainer.childElementCount < 1) {
            alertContainer.innerHTML += p;
        }
        event.preventDefault()

    }
}


   
