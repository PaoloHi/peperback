/*funcion para eliminar un propietario*/
function deletePropietario() {
    var propietario = "idPropietario a eliminar";

    Swal.fire({
        title: '¿Está seguro que desea eliminar este usuario?',
        text: "Esta acción es irreversible.",
        icon: 'warning',
        showCancelButton: true,
        customClass: {
            confirmButton: 'button_confirmacion'
        },
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Registro eliminado',
                icon: 'success',
                html: 'El propietario fue eliminado con éxito.',
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: 'button_confirmacion'
            }
        }).then(function () {
            location.reload();
        });
        /*esto se queda como guia para futuros ajustes*/
            //Función para eliminar
            //$.ajax({
            //    type: 'POST',
            //    url: '/Usuarios/Eliminar',
            //    //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
            //    data: { IDUsuario: User, TipoUsuario: TUser },
            //    success: function (result) {

            //        Swal.fire({
            //            title: 'Registro eliminado',
            //            icon: 'success',
            //            html: 'El usuario fue eliminado con éxito.',
            //            confirmButtonText: "Ok",
            //            customClass: {
            //                confirmButton: 'button_confirmacion'
            //            }
            //        }).then(function () {
            //            location.reload();
            //        });

            //    },
            //    error: function () {
            //        alert('Failed to receive the Data');
            //        console.log('Failed ');
            //    }
            //})
        }
    })
}