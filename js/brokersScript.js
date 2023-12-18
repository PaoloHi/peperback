

$("#CP").on("change", function () {

    var url = '/Brokers/ListarUbicacion';
    var CP = $('#CP').val() || 11000;

    $("#CP").val(CP)
    console.log(CP)
    if (CP !== null) {
        var data = { CodigoPostal: CP }

        $.post(url, data).done(function (data) {
            console.log(data);

            if (data.legnth === 0) {
                $('#CPInvalid').removeClass('d-none')
            } else (
                $('#CPInvalid').addClass('d-none')
            )

            $('#n_Municipio').val(data[0].muniAlca);
            $('#n_Estado').val(data[0].estado);
            $('#n_Pais').val(data[0].pais);

            var $select = $('<select>');
            $select.append($('<option>').val('').text('--Seleccione una colonia--')); // Agrega una opción en blanco
            $.each(data, function (i, item) {
                $select.append($('<option>').val(item.idColonia).text(item.colonia));
                $('#IDcolonia').val(item.idColonia)
            });

            $('#Colonia').html($select.html()); // Actualiza el contenido del dropdownlist existente

            return
        });
    }
});

function cargarColonia() {

    var url = '/Brokers/ListarUbicacion';
    var CP = $('#CP').val();
    var cp2 = document.getElementById("CP");
    console.log("SI ENTRA");
    var coloniaGuardada = $('#colonia').val();
    console.log("Esta es la colonia guuardad" + coloniaGuardada);

    console.log(cp2);

    if (CP != null || CP != '') {
        console.log("CODIGO DENTRO" + CP)

        if (CP !== null) {
            var data = { CodigoPostal: CP }

            $.post(url, data).done(function (data) {
                console.log(data);

                if (data.legnth === 0) {
                    $('#CPInvalid').removeClass('d-none')
                } else (
                    $('#CPInvalid').addClass('d-none')
                )

                $('#n_Municipio').val(data[0].muniAlca);
                $('#n_Estado').val(data[0].estado);
                $('#n_Pais').val(data[0].pais);

                var $select = $('<select>');
                $select.append($('<option>').val('').text('--Seleccione una colonia--')); // Agrega una opción en blanco
                $.each(data, function (i, item) {
                    $select.append($('<option>').val(item.idColonia).text(item.colonia));
                    $('#IDcolonia').val(item.idColonia)
                });
                $select.val(coloniaGuardada);
                $('#Colonia').html($select.html()); // Actualiza el contenido del dropdownlist existente
                $('#Colonia').val(coloniaGuardada);



                return data
            });
        }
    }

    /*Para lo de municipio, pais y estado*/
    /*por el momento será como un parche dado que estos datos siempre van a estar llenos*/
    
    var labels = [
        $('label[for="alcaldia o municipio "]'),
        $('label[for="estado "]'),
        $('label[for="pais "]')
    ];

    // Iterar sobre el arreglo y agregar la clase a cada elemento
    $.each(labels, function (index, label) {
        label.addClass('activeDataGris');
    });
    
}

cargarColonia();

//--------------------------------------------------------------//

//nos aseguramos de que el modal siempre este cerrado
//document.getElementById('openModal').style.display = 'none';

let brokerID;
let accion;
let correo;


// esta funcion se encarga de conseguir el Id del documento y convertilar en una varibal global
// con la finalidad de que al dar click en el guardar cambios aplique los cambios en base al Id del documento 

const getBroker = function (id, action, email) {

    brokerID = id;
    accion = action;
    correo = email;

    return brokerID;
    return accion;
    return correo;
}



var funBroker = function (estatus) {
    $(function () {
        //Variable de mensaje 
        var mensajeBCS;
        var acina;
        var swal;
        var spanElement = document.getElementById('EstatusBroker');
        var statusBroker;

        if (estatus == "Suspender") {
            var mensajeSuspendido = $('#mensajeBrokerS').val();
     
            if (mensajeSuspendido == "") {
                return;
            }
        
            mensajeBCS = mensajeSuspendido;
            acina = $('#EstatusSuspender').val();
            statusBroker = $('#SSuspender').val();
        }
        if (estatus == "Bloquear") {
            var mensajeBloqueo = $('#mensajeBrokerB').val();
           
            if (mensajeBloqueo == "") {
                return;
            }
          
            mensajeBCS = mensajeBloqueo;
            acina = $('#EstatusBloquear').val();
            statusBroker = $('#SBloquear').val();
        }
        if (estatus == "Cancelar") {
            var mensajeCancelado = $('#mensajeBrokerC').val();
        
            if (mensajeCancelado == "") {
                return;
            }
         
            mensajeBCS = mensajeCancelado;
            acina = $('#EstatusCancelar').val();
            statusBroker = $('#SCancelar').val();
        }
        //Detectar la accion

        if (acina == "Activo") {
            accion = 1;
        } else {
            accion = 0;
        }

        //Envío de datos 
        $.ajax({
            type: 'POST',
            url: '/Brokers/SeguimientoBroker',
            //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
            data: {
                IDUsuario: brokerID, Accion: accion, StatusB: statusBroker, Mensaje: mensajeBCS, Correo: correo
            },
            success: function (result) {

                /********************************************/
                /* Validaciones para vaciar el menú, resetea
                resetear toogles y dejasr vacíos los campos 
                 de texto */
                /********************************************/

                if (estatus == "Suspender") {

                    /********************************************/
                    /* VACIADO DE CAMPO DEL MODAL */
                    /********************************************/

                    var inputSuspender = $('#EstatusSuspender').val();
                    /*
                    var mensajeSuspendido = $('#mensajeBrokerS').val();
                    mensajeBCS = mensajeSuspendido;
                    */
                    if (inputSuspender == "Inactivo") {
                        $(".suspenderCheck").prop("checked", false);
                        console.log("Dentro del archivo inactivo")
                        spanElement.textContent = 'Afiliado';
                    } else {
                        $(".suspenderCheck").prop("checked", true);
                        spanElement.textContent = 'Suspendido';
                        console.log("AQUI SE ACTIVO EL SKDLJSLK");
                        $(".bloquearCheck").prop("checked", false);
                        $(".cancelarCheck").prop("checked", false);

                        //Se desactivan los otros check

                    }

                    //Cerrando modal
                    $('#suspenderModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    document.getElementById('mensajeBrokerS').value = '';
                }
                if (estatus == "Bloquear") {

                    /********************************************/
                    /* VACIADO DE CAMPO DEL MODAL */
                    /********************************************/

                    var inputBloquear = $('#EstatusBloquear').val();
                    /*
                    var mensajeSuspendido = $('#mensajeBrokerS').val();
                    mensajeBCS = mensajeSuspendido;
                    */
                    if (inputBloquear == "Inactivo") {
                        $(".bloquearCheck").prop("checked", false);
                        console.log("Dentro del archivo inactivo")
                        spanElement.textContent = 'Afiliado';
                    } else {
                        $(".bloquearCheck").prop("checked", true);
                        spanElement.textContent = 'Bloqueado';
                        console.log("AQUI SE ACTIVO EL SKDLJSLK");
                        $(".suspenderCheck").prop("checked", false);
                        $(".cancelarCheck").prop("checked", false);

                        //Se desactivan los otros check

                    }

                    //Cerrando modal
                    $('#bloquearModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    document.getElementById('mensajeBrokerB').value = '';

                }
                if (estatus == "Cancelar") {
                    /********************************************/
                    /* VACIADO DE CAMPO DEL MODAL */
                    /********************************************/

                    var inputCancelar = $('#EstatusCancelar').val();
                    /*
                    var mensajeSuspendido = $('#mensajeBrokerS').val();
                    mensajeBCS = mensajeSuspendido;
                    */
                    if (inputCancelar == "Inactivo") {
                        $(".cancelarCheck").prop("checked", false);
                        console.log("Dentro del archivo inactivo")
                        spanElement.textContent = 'Afiliado';
                    } else {
                        $(".cancelarCheck").prop("checked", true);
                        spanElement.textContent = 'Cancelado';
                        console.log("AQUI SE ACTIVO EL SKDLJSLK");
                        $(".bloquearCheck").prop("checked", false);
                        $(".suspenderCheck").prop("checked", false);

                        //Se desactivan los otros check

                    }

                    //Cerrando modal
                    $('#cancelarModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();


                    document.getElementById('mensajeBrokerC').value = '';

                }

                $('#suspenderModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                Swal.fire({
                    title: '¡Cambio realizado!',
                    icon: 'success',
                    confirmButtonText: "Ok",
                    customClass: {
                        confirmButton: 'button_confirmacion'
                    }
                }).then(function () {
                    location.reload();
                });

            },
            error: function () {
                alert('Hubo un error, por favor, consulte al administrador.');
                console.log('Failed ');
            }
        });

    });

}

function changeStatus(checkBox, estatus) {
    //Variable para detectar el cambio del toogle
    var statusFToggle;
    var estatusBroker = "";

    if (checkBox.checked == true) {
        // El checkbox está marcado
        statusFToggle = "Activo";
        //console.log("Está activo");

    } else {
        // El checkbox no está marcado
        statusFToggle = "Inactivo";
        //console.log("Está Inactivo");
    }

    //Variables para suspender 
    var labelSuspender = document.getElementById('textSuspender');
    var tituloModalSuspender = document.querySelector('.tituloSuspender');
    var inputSuspender = document.getElementById('EstatusSuspender');
    var sSuspender = document.getElementById('SSuspender');

    //Variables para bloquear
    var labelBloquear = document.getElementById('textBloquear');
    var tituloModalBloquear = document.querySelector('.tituloBloquear');
    var inputBloquear = document.getElementById('EstatusBloquear');
    var sBloquear = document.getElementById('SBloquear');

    //Variables para cancelar
    var labelCancelar = document.getElementById('textCancelar');
    var tituloModalCancelar = document.querySelector('.tituloCancelar');
    var inputCancelar = document.getElementById('EstatusCancelar');
    var sCancelar = document.getElementById('SCancelar');


    // Establece el valor del input
    if (estatus == "Suspender") {

        //Condicionales para hacer el cambio de texto 
        if (statusFToggle == "Inactivo") {
            //Cambio en label de formulario
            // Obtén una referencia al elemento label
            //labelElement.textContent = 'Suspender';
            tituloModalSuspender.textContent = 'Reactivar';
            labelSuspender.textContent = 'Deja el motivo por el que quieres reactivar a este broker.';
            inputSuspender.value = 'Inactivo';
            sSuspender.value = 'Afiliar';
            statusFToggle = "Activo";

        } else {
            //Sí se activa el suspender
            //labelElement.textContent = 'Reactivar';
            tituloModalSuspender.textContent = 'Inactivar';
            labelSuspender.textContent = 'Deja el motivo por el que quieres inactivar a este broker.';
            inputSuspender.value = 'Activo';
            statusFToggle = "Inactivo";
            sSuspender.value = "Suspender";
            console.log("AQUI SE ACTIVO EL SUSPENDER");
        }
        //suspenderModal
        var miModal = document.getElementById('suspenderModal');
        $(miModal).modal('show');

    }



    if (estatus == "Bloquear") {
        //Condicionales para hacer el cambio de texto 
        if (statusFToggle == "Inactivo") {
            //Cambio en label de formulario
            // Obtén una referencia al elemento label
            tituloModalBloquear.textContent = 'Desbloquear';
            labelBloquear.textContent = 'Deja el motivo por el que quieres desbloquear a este broker.';
            inputBloquear.value = 'Inactivo';
            sBloquear.value = 'Afiliar';
            statusFToggle = "Activo";

        } else {
            //Sí se activa el bloquear
            //labelElement.textContent = 'Reactivar';
            tituloModalBloquear.textContent = 'Bloquear';
            labelBloquear.textContent = 'Deja el motivo por el que quieres bloquear a este broker.';
            inputBloquear.value = 'Activo';
            statusFToggle = "Inactivo";
            sBloquear.value = "Bloquear";
            console.log("AQUI SE ACTIVO EL BLOQUEAR");
        }

        //bloquearModal
        var miModal = document.getElementById('bloquearModal');
        $(miModal).modal('show');
    }
    if (estatus == "Cancelar") {
        if (statusFToggle == "Inactivo") {
            //Cambio en label de formulario
            // Obtén una referencia al elemento label
            tituloModalCancelar.textContent = 'Reestablecer';
            labelCancelar.textContent = 'Deja el motivo por el que quieres reestablecer a este broker.';
            inputCancelar.value = 'Inactivo';
            sCancelar.value = 'Afiliar';
            statusFToggle = "Activo";

        } else {
            //Sí se activa el cancelar
            //labelElement.textContent = 'Reactivar';
            tituloModalCancelar.textContent = 'Cancelar';
            labelCancelar.textContent = 'Deja el motivo por el que quieres cancelar a este broker.';
            inputCancelar.value = 'Activo';
            sCancelar.value = 'Cancelar';
            statusFToggle = "Inactivo";
            console.log("AQUI SE ACTIVO EL cancelar");
        }

        //cancelarModal
        var miModal = document.getElementById('cancelarModal');
        $(miModal).modal('show');
    }

    /********************************************/
    /* PARA QUITAR EL MODAL */
    /********************************************/

    //Suspendido

    // Obtén una referencia al botón de cerrar el modal
    var closeButton = document.querySelector('.closeSuspender');

    // Agrega un event listener al evento click del botón de cerrar
    closeButton.addEventListener('click', function (event) {
        // Obtén una referencia al modal
        var miModal = document.getElementById('suspenderModal');

        // Agrega un event listener al evento hidden.bs.modal
        miModal.addEventListener('hidden.bs.modal', function (event) {

            if (statusFToggle == "Inactivo") {

                $(".suspenderCheck").prop("checked", false);

            } else {
                console.log("jejeje");
                $(".suspenderCheck").prop("checked", true);
            }
            $('#suspenderModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            console.log('El modal se ha cerrado después de hacer clic en el botón de cerrar.');
            // Resto del código que deseas ejecutar
        });
    });


    //Bloqueado
    // Obtén una referencia al botón de cerrar el modal
    var closeButton = document.querySelector('.closeBloquear');

    // Agrega un event listener al evento click del botón de cerrar
    closeButton.addEventListener('click', function (event) {
        // Obtén una referencia al modal
        var miModal = document.getElementById('bloquearModal');

        // Agrega un event listener al evento hidden.bs.modal
        miModal.addEventListener('hidden.bs.modal', function (event) {

            if (statusFToggle == "Inactivo") {

                $(".bloquearCheck").prop("checked", false);

            } else {

                $(".bloquearCheck").prop("checked", true);
            }
            $('#bloquearModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            console.log('El modal se ha cerrado después de hacer clic en el botón de cerrar. BLOQUEAR');
            // Resto del código que deseas ejecutar
        });
    });

    //Cancelado
    // Obtén una referencia al botón de cerrar el modal
    var closeButton = document.querySelector('.closeCancelar');

    // Agrega un event listener al evento click del botón de cerrar
    closeButton.addEventListener('click', function (event) {
        // Obtén una referencia al modal
        var miModal = document.getElementById('cancelarModal');

        // Agrega un event listener al evento hidden.bs.modal
        miModal.addEventListener('hidden.bs.modal', function (event) {

            if (statusFToggle == "Inactivo") {
                console.log("jijiji");
                $(".cancelarCheck").prop("checked", false);

            } else {
                console.log("jejeje");
                $(".cancelarCheck").prop("checked", true);
            }
            $('#cancelarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            console.log('El modal se ha cerrado después de hacer clic en el botón de cerrar. BLOQUEAR');
            // Resto del código que deseas ejecutar
        });
    });

}