
//nos aseguramos de que el modal siempre este cerrado
//document.getElementById('openModal').style.display = 'none';

let DocumentID;
let Indice;


// esta funcion se encarga de conseguir el Id del documento y convertilar en una varibal global
// con la finalidad de que al dar click en el guardar cambios aplique los cambios en base al Id del documento 

const getDocumentID = function (documentID, indice) {

    //para 
    document.getElementById('openModal').style.display = 'block';
    resetModal();
   
    //Proporcioanmos el Indice ya  que cada icono de proceso aprobado y rechazado tienen un indice, IconoAproavado_1 por ejemplo 
    //lo utilizaremos para manipular lo mas adelante 
    Indice = indice;
    DocumentID = documentID;

    return Indice;
    return DocumentID;
}


var guardarCambiosAprobar = function () {

    $(function () {
        //el AJAX manda al metodo Aprovar del controlador para cambiar el status en la base de datos 

        console.log("Entra aquí");

       
        url = '/Usuarios/AprobarDocumento'

        
        var data = { idDocUsu: DocumentID }

        $.post(url, data).done(function (data) {
            if (data.success) {
            }
            //cerramos el modal 
            document.getElementById('openModal').style.display = 'none';
            //Cambiamos los iconos del modal 
            $("#IconoProceso_" + Indice).addClass("d-none");
            $("#IconoAprobado_" + Indice).removeClass("d-none")


        });

       
    });
}


var guardarCambiosRechazar = function () {
    $(function () {

        url = '/Usuarios/RecahzarDocumento'

        var mensajeRechazo = $('#mensajeRechazado').val();

        var data = { IDDOC: DocumentID, Mensaje: mensajeRechazo }



        $.post(url, data).done(function (data) {
            if (data.success) {
            }

            document.getElementById('openModal').style.display = 'none';

            $("#IconoProceso_" + Indice).addClass("d-none");
            $("#IconoRechazado_" + Indice).removeClass("d-none")

            mensaje = $('#mensajeRechazado');
            mensaje.val("")
        });
    });
}


