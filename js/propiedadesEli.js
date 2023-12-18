function validateDataDelate(Propiedad) {

    console.log(Propiedad);
    Swal.fire({
        title: '¿Está seguro que desea eliminar esta propiedad?',
        text: "Esta acción es irreversible.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f4971c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Función para eliminar
            $.ajax({
                type: 'POST',
                url: '/Propiedades/Eliminar',
                //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
                data: { IDPropiedadG: Propiedad },
                success: function (result) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        customClass: {
                            confirmButton: 'button_confirmacion'
                        }
                    }).then(function () {
                        window.location.href = '/Propiedades/PropiedadesTab';
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
