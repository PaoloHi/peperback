function validateDataDelate(User, TUser) {

    console.log(User);
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
            //Función para eliminar
            $.ajax({
                type: 'POST',
                url: '/Usuarios/Eliminar',
                //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
                data: { IDUsuario: User, TipoUsuario: TUser },
                success: function (result) {

                    Swal.fire({
                        title: 'Registro eliminado',
                        icon: 'success',
                        html: 'El usuario fue eliminado con éxito.',
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: 'button_confirmacion'
                        }
                    }).then(function () {
                        location.reload();
                    });

                },
                error: function () {
                    alert('Failed to receive the Data');
                    console.log('Failed ');
                }
            })

        }
    })
}


function changeStatus(checkBox, IDusuario, Correo) {

    var statusFToggle;

    if (checkBox.checked == true) {
        // El checkbox está marcado
        statusFToggle = "Activo";
    } else {
        // El checkbox no está marcado
        statusFToggle = "Inactivo";
    }

    $.ajax({
        type: 'POST',
        url: '/Usuarios/incUsuario',
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
        data: {
            IDUsuario: IDusuario,
            Estatus: statusFToggle,
            CorreoUs: Correo
        },
        success: function (result) {

            //Para cambiar el color de la tabla
            let parrafo = document.getElementById("estatus_" + IDusuario);

            if (statusFToggle == "Activo") {
                parrafo.textContent = "Activo";

                parrafo.classList.replace("bg-status-red", "bg-status-green");
            } else {
                parrafo.textContent = "Inactivo";
                parrafo.classList.replace("bg-status-green", "bg-status-red");
            }

                Swal.fire({
                title: '¡Cambio realizado!',
                icon: 'success',
                confirmButtonText: "Ok",
                customClass: {
                    confirmButton: 'button_confirmacion'
                }
            });
          
        },
        error: function () {
            alert('Hubo un error, por favor, consulte al administrador.');
            console.log('Failed ');
        }
    });


}

