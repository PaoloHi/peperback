/*##########################################################################################################################*/
/*textarea altura*/
document.getElementById("commentInput").addEventListener("input", function () {
    if (this.value.length > 500) {
        this.value = this.value.slice(0, 500);
    }

    updateMessageSectionHeight();
});

function updateMessageSectionHeight() {
    var commentInput = document.getElementById("commentInput");
    var messageSection = document.getElementById("message_Seccion");

    // Establece temporalmente la altura de messageSection a "auto" para obtener la altura real
    messageSection.style.height = "auto";

    // Ajusta la altura según el contenido del textarea
    messageSection.style.height = messageSection.scrollHeight + "px";

    // Verifica si hay un desplazamiento vertical en commentInput
    if (commentInput.scrollHeight > commentInput.clientHeight) {
        // Calcula la diferencia de altura suavizada
        var heightDifference = commentInput.scrollHeight - commentInput.clientHeight;

        // Establece la altura de messageSection con suavizado
        messageSection.style.height = (messageSection.clientHeight + heightDifference) + "px";
    } else {
        // Restablece la altura de messageSection a "auto" si no hay desplazamiento
        messageSection.style.height = "";
    }
}

window.addEventListener("load", function () {
    updateMessageSectionHeight();
});

document.getElementById("commentInput").addEventListener("scroll", function () {
    updateMessageSectionHeight();
});



/*############################################################################################################################### */
/*checkbox del no interesado*/
function toggleCheckbox(button) {
    var btnCheck = document.getElementsByClassName("checkbox-button")[0];
    var mensajeRechazo = document.getElementById('mensajeRechazo').value;


    if (mensajeRechazo.trim() !== '') {
        btnCheck.classList.toggle('checked');
    }

}
/*################################################################################################# */

/*para agregar comentarios */
LoadComments();







function crearComentario(commentData) {

    // Formatea la fecha
    let fechaFormateada = new Date(commentData.ComentarioFecha).toLocaleString();


    // Mapea el estatus a una clase CSS
    const estatusClass = getEstatusClass(commentData.Estatus);

    // Guarda el valor de la fase actual
    const faseActual = commentData.Fase;



    return `
                <div class="comment_item mx-auto">
                    <div class="row">
                        <div class="d-flex status_id_comment w-auto justify-content-end ms-auto ${estatusClass}">
                            <p class="m-auto px-3 py-1"> ${commentData.Etapa} | ${commentData.Estatus}</p>
                        </div>
                    </div>  
                    
                    <div class="contenedorP fw-loght mt-1">
                        <p>${commentData.Comentario}</p>
                    </div>
                    <div class="row row-cols-2 .justify-content-between">
                        <div class="col d-inline-flex"><p>Fecha: <span class="span_comment">${fechaFormateada}</span></p></div>
                        <div class="col d-inline-flex"><p>Usuario: <span class="span_comment">${commentData.AutorNombre} ${commentData.AutorApellidoPaterno} ${commentData.AutorApellidoMaterno}</span></p></div>
                    </div>
                </div>
        `



}




//var cierreEtapa = (commentData) => {
//    return
//};

async function SaveComment() {
    const currentQueryString = window.location.search;
    const apiURL = '../Contact/SaveComment';
    let requestBody = {
        IDInteresado: new URLSearchParams(currentQueryString).get('leadInteresadoID'),
        Mensaje: document.getElementById("commentInput").value
    };

    let requestResponse = await fetch(apiURL, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    if (requestResponse.status == 500) {
        console.error('No fue posible guardar el comentario');
        return;
    }




    let comentario = await LoadComment();


    PopulateComments(comentario[comentario.length-1]);
    function PopulateComments(commentData) {
        var comentarioHTML = crearComentario(commentData);

        let fase = document.getElementById("depositoDeSelect").getAttribute("data-active-stage")

        // Utiliza insertAdjacentHTML para insertar el contenido HTML
        let divComentarios = document.getElementById("Comentarios" + fase);
        divComentarios.insertAdjacentHTML('beforeend', comentarioHTML);

        document.getElementById("commentInput").value = null;
        updateMessageSectionHeight();
    }

}

async function LoadComments() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');
    let apiURL = `../Contact/GetComments?interesadoID=${leadInteresadoID}`;

    let requestResponse = await fetch(apiURL, {
        method: 'get',
    });

    if (requestResponse.ok == false) {
        console.error('No fue obtener los comentarios');
        return;
    }

    let commentsData = await requestResponse.json();
    agregarComentario(commentsData);
}

async function LoadComment() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');
    let apiURL = `../Contact/GetComments?interesadoID=${leadInteresadoID}`;

    let requestResponse = await fetch(apiURL, {
        method: 'get',
    });

    if (requestResponse.ok == false) {
        console.error('No fue obtener los comentarios');
        return;
    }

    let commentsData = await requestResponse.json();
    return commentsData;
}
// Función para cambiar el color según la fase



function cambiarColorSegunFase(faseActual, FechaInicio, FechaCierre) {
    const faseHTML = {
        "Prospectos": "fase-prospecto",
        "Oportunidad": "fase-oportunidad",
        "Entrega": "fase-entrega",
        "Cierre": "fase-cierre",
        "Lealtad": "fase-lealtad",
    };

    const claseFase = faseHTML[faseActual];





    if (claseFase) {
        return `
            <div class="row row-cols-3 my-2 d-flex mt-4 justify-content-between">
                <div class="d-flex elemento">
                    <div class="fecha">${FechaInicio}</div>
                </div>
                <div class="d-flex elemento">
                    <div class="etapa ${claseFase}">${faseActual}</div>
                </div>
                <div class="d-flex elemento">
                    <div class="fecha">${FechaCierre}</div>
                </div>
            </div>`

            ;
    }

    return "";
}




// Función auxiliar para obtener la clase CSS según el estatus activo
function getEstatusClass(estatus) {
    switch (estatus) {
        case "Pendiente":
            return "status-pendiente";
        case "Informes":
        case "Nuevo":
            return "status-nuevo";
        case "Cancelada":
            return "status-cancelada";
        case "Agendada":
            return "status-agendada";
        case "Re agendada":
            return "status-re_agendada";
        case "Enviado":
            return "status-enviado";
        case "No firmado":
            return "status-no_firmado";
        case "Firmado":
            return "status-firmado";
        case "Recibido":
        case "Recibida":
            return "status-recibido";
        case "Fallido":
            return "status-cancelada"; // ¿Es correcto asignar la misma clase que "Cancelada"?
        case "Realizada":
            return "status-realizada";
        case "No realizada":
            return "status-no_realizada";
        case "Cerrada":
            return "status-cerrada";
        case "Enviada":
            return "status-enviado";
        default:
            return ""; // Devuelve una cadena vacía si no se encuentra ninguna coincidencia
    }
}

// Función para cambiar el color según la fase

async function agregarComentario(commentsData, idseed) {
    var dropAreaComment = document.getElementById("dropAreaComment");


    for (let i = 0; i < commentsData.length; i++) {

        PopulateComments(commentsData[i]);
    }

    function PopulateComments(commentData) {
        var comentarioHTML = crearComentario(commentData);

        // Utiliza insertAdjacentHTML para insertar el contenido HTML
        let divComentarios = document.getElementById("Comentarios" + commentData.Fase);
        divComentarios.insertAdjacentHTML('beforeend', comentarioHTML);

        document.getElementById("commentInput").value = null;
        updateMessageSectionHeight();
    }

    var Etapas = ['Prospectos', 'Oportunidad', 'Entrega', 'Cierre', 'Lealtad'];

    var Fase = 'Prospectos';
    var x = 0;

    fechas = await FechasyEtapas();
    let faseActual = document.getElementById("depositoDeSelect").getAttribute("data-active-stage");
    while (Fase != faseActual) {
        let FechaInicio = fecha[Fase.toLowerCase()].fechaInicio.split('T')[0];
        let FechaCierre = fecha[Fase.toLowerCase()].fechaFinal.split('T')[0];

        // Invertir el orden de día y año
        let FechaInicioFormateada = invertirOrdenFecha(FechaInicio);
        let FechaCierreFormateada = invertirOrdenFecha(FechaCierre);

        function invertirOrdenFecha(fecha) {
            const [year, month, day] = fecha.split('-');
            return `${day}-${month}-${year}`;
        }


        let etiquetaCierre = cambiarColorSegunFase(Fase, FechaInicioFormateada, FechaCierreFormateada, idseed);
        let divComentarios = document.getElementById("Comentarios" + Fase);
        divComentarios.insertAdjacentHTML('beforeend', etiquetaCierre);

        x++;
        Fase = Etapas[x];
    }
}


/*FUNCIONES PARA CAMBIAR DE ETAPA ###################################################### */
document.addEventListener("DOMContentLoaded", function () {
    var opcionDelSelect = document.getElementById("depositoDeSelect");
    var actualPhases = document.querySelectorAll(".phase .phase-label");
    var faseActual;

    /*almacenando el valor anterior */
    var faseAnterior = opcionDelSelect.getAttribute("data-active-stage");


    if (opcionDelSelect.getAttribute("data-active-stage") === "phase-prospecto") {
        opcionDelSelect.setAttribute("data-active-stage", "Prospectos");
    } else if (opcionDelSelect.getAttribute("data-active-stage") === "phase-oportunidad") {
        opcionDelSelect.setAttribute("data-active-stage", "Oportunidad");
    } else if (opcionDelSelect.getAttribute("data-active-stage") === "phase-entrega") {
        opcionDelSelect.setAttribute("data-active-stage", "Entrega");
    } else if (opcionDelSelect.getAttribute("data-active-stage") === "phase-cierre") {
        opcionDelSelect.setAttribute("data-active-stage", "Cierre");
    } else if (opcionDelSelect.getAttribute("data-active-stage") === "phase-lealtad") {
        opcionDelSelect.setAttribute("data-active-stage", "Lealtad");
    }

    var filteredPhases = Array.from(actualPhases).filter(function (phaseLabel) {
        return opcionDelSelect.getAttribute("data-active-stage") === phaseLabel.textContent;

    });


    function actualizarFase() {
        document.querySelectorAll(".phase").forEach(function (phase) {
            phase.classList.remove("active-phase");

            if (faseAnterior !== opcionDelSelect.getAttribute("data-active-stage")) {
                faseAnterior = opcionDelSelect.getAttribute("data-active-stage");
                cambiarColorSegunFase(phase);
            }


        });

        filteredPhases.forEach(function (filteredPhase) {
            var phaseElement = filteredPhase.closest(".phase");

            if (phaseElement) {
                phaseElement.classList.add("active-phase");
                // Obtener la variable CSS definida en :root
                var root = document.documentElement;



                // Cambiar el valor de la variable
                if (opcionDelSelect.getAttribute("data-active-stage") === "Prospectos") {
                    root.style.setProperty('--enfacis', '#FFC000');
                } else if (opcionDelSelect.getAttribute("data-active-stage") === "Oportunidad") {
                    root.style.setProperty('--enfacis', '#004B23');
                } else if (opcionDelSelect.getAttribute("data-active-stage") === "Entrega") {
                    root.style.setProperty('--enfacis', '#EB611C');
                } else if (opcionDelSelect.getAttribute("data-active-stage") === "Lealtad") {
                    root.style.setProperty('--enfacis', '#3C096C');
                } else if (opcionDelSelect.getAttribute("data-active-stage") === "Cierre") {
                    root.style.setProperty('--enfacis', '#102234');
                }

            }


        });

    }


    opcionDelSelect.addEventListener("change", function () {
        // Llama a ambas funciones cuando hay un cambio en el select
        actualizarFase();
        // Obtiene la fase actual del select
        var faseActual = opcionDelSelect.value;

        // Llama a cambiarColorSegunFase con la fase actual
        cambiarColorSegunFase(faseActual);
    });



    // Síncrono: Ejecutar la función cuando la página se carga
    actualizarFase();

});

document.addEventListener("DOMContentLoaded", function () {
    var selectDelStatus = document.getElementById("avalible-status-container");

    // Función para actualizar los status del select  clases según la opción seleccionada
    function actualizarClases() {
        // Obtener la cadena de texto de la opción seleccionada
        var obtenerTexto = Array.from(selectDelStatus.options).find((opt) => opt.selected).text;

        // Limpiar todas las clases
        selectDelStatus.classList.remove(
            "status-pendiente",
            "status-nuevo",
            "status-cancelada",
            "status-agendada",
            "status-re_agendada",
            "status-enviado",
            "status-no_firmado",
            "status-firmado",
            "status-recibido",
            "status-realizada",
            "status-no_realizada",
            "status-cerrada"
        );

        switch (obtenerTexto) {
            case "Pendiente":
                selectDelStatus.classList.add("status-pendiente");
                break;
            case "Informes":
            case "Nuevo":
                selectDelStatus.classList.add("status-nuevo");
                break;
            case "Cancelada":
                selectDelStatus.classList.add("status-cancelada");
                break;
            case "Agendada":
                selectDelStatus.classList.add("status-agendada");
                break;
            case "Re agendada":
                selectDelStatus.classList.add("status-re_agendada");
                break;
            case "Enviado":
                selectDelStatus.classList.add("status-enviado");
                break;
            case "No firmado":
                selectDelStatus.classList.add("status-no_firmado");
                break;
            case "Firmado":
                selectDelStatus.classList.add("status-firmado");
                break;
            case "Recibido":
            case "Recibida":
                selectDelStatus.classList.add("status-recibido");
                break;
            case "Fallido":
                selectDelStatus.classList.add("status-cancelada");
                break;
            case "Realizada":
                selectDelStatus.classList.add("status-realizada");
                break;
            case "No realizada":
                selectDelStatus.classList.add("status-no_realizada");
                break;
            case "Cerrada":
                selectDelStatus.classList.add("status-cerrada");
                break;
            case "Enviada":
                selectDelStatus.classList.add("status-enviado");
                break;
            default:
            // Manejar el caso por defecto si es necesario
        }
        console.log(obtenerTexto);
    }

    // Agregar un evento de cambio al elemento select
    selectDelStatus.addEventListener("change", actualizarClases);

    // Llamar a la función para aplicar las clases al cargar la página
    actualizarClases();
});
/*####################################################################################################################*/
//// Obtener el elemento que contiene la información de la fase
//var depositoDeSelect = document.getElementById('depositoDeSelect');

//// Obtener el ID anterior desde localStorage o establecerlo como nulo si es la primera vez
//var idAnterior = localStorage.getItem('idAnterior') || null;

//// Función para mostrar un alert cuando cambia la fase
//function mostrarAlertaNuevaFase() {
//    // Obtener el valor actual de la fase
//    var nuevoId = depositoDeSelect.getAttribute('data-active-stage');

//    // Verificar si el ID anterior es diferente al ID actual
//    if (idAnterior !== nuevoId) {
//        //// Mostrar un alert con el nuevo y antiguo valor de la fase
//        //alert('La fase ha cambiado de: ' + idAnterior + ' a: ' + nuevoId);

//        // Actualizar el ID anterior en localStorage
//        localStorage.setItem('idAnterior', nuevoId);
//    }
//}

//// Escuchar cambios en el elemento y llamar a la función mostrarAlertaNuevaFase
//var observer = new MutationObserver(mostrarAlertaNuevaFase);

//// Configurar las opciones para observar cambios en el atributo 'data-active-stage'
//var options = { attributes: true, attributeFilter: ['data-active-stage'] };

//// Iniciar la observación del elemento
//observer.observe(depositoDeSelect, options);
/*####################################################################################################################*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

var avalibleStatusContainer = document.getElementById('avalible-status-container');
avalibleStatusContainer.addEventListener('change', UpdateLeadInteresadoStatus);

async function UpdateLeadInteresadoStatus() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');

    let apiURL = `../Contact/UpdateLeadInteresadoStatus?leadInteresadoID=${leadInteresadoID}&newStatusID=${avalibleStatusContainer.value}`
    let requestResponse;

    try {
        requestResponse = await fetch(apiURL, {
            method: 'put'
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (requestResponse.status == 200) {
        DisplayOkSweetAlert('El estatus se actualiz\u00F3 correctamente', '');
    }

    else if (requestResponse.status == 303) {
        document.location.reload();
    }

    else if (requestResponse.status == 400) {
        DisplayErrorSweetAlert('No fue posible actualizar el estatus del usuario', 'Intente mas tarde');
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function UpdateLeadInteresadoData() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');

    let updatedLeadInteresadoData = {
        LeadInteresadoID: leadInteresadoID,
        Nombre: document.getElementById('lead-nombre').value,
        ApellidoPaterno: document.getElementById('lead-apellido-paterno').value,
        ApellidoMaterno: document.getElementById('lead-apellido-materno').value,
        Email: document.getElementById('lead-email').value,
        Telefono: document.getElementById('lead-telefono').value,
        MedioContacto: document.getElementById('lead-medio-contacto').value
    };

    const apiURL = '../Contact/UpdateLeadInteresado'
    let requestResponse;

    try {
        requestResponse = await fetch(apiURL, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedLeadInteresadoData)
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (requestResponse.status == 200) {
        DisplayOkSweetAlert('Registro exitoso', '');
    }

    else if (requestResponse.status == 422) {
        DisplayErrorSweetAlert('Los datos son invalidos', 'Verifique que todo cumpla con el formato requerido');
    }

    else if (requestResponse.status == 400) {
        DisplayErrorSweetAlert('No fue posible actualizar la información del lead', 'Intente mas tarde');
    }
}

async function SaveFechaContacto() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');

    let fechaContacto = document.getElementById('fecha-contacto').value;
    let requestBody = {
        LeadInteresadoID: leadInteresadoID,
        FechaContacto: fechaContacto
    }
    const apiURL = '../Contact/SaveFechaContacto';
    let requestResponse;

    try {
        requestResponse = await fetch(apiURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (requestResponse.status == 200) {
        DisplayOkSweetAlert('Registro exitoso', '');
    }

    else if (requestResponse.status == 422) {
        DisplayErrorSweetAlert('Los datos son invalidos', 'Verifique que la fecha cumpla con el formato requerido');
    }

    else if (requestResponse.status == 400) {
        DisplayErrorSweetAlert('No fue posible guardar la fecha de contacto', 'Intente mas tarde');
    }
}

var fecha;

async function FechasyEtapas() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');


    const apiURL = `/Contact/GetFechasFases?leadInteresadoID=${leadInteresadoID}`;

    let requestResponse;

    try {
        requestResponse = await fetch(apiURL).then(response => {
            if (!response.ok) {
                throw new Error(`La solicitud falló con estado: ${response.status}`);
            }
            return response.json(); // Puedes cambiar a response.text() si esperas una respuesta de texto en lugar de JSON
        })
            .then(data => {
                fecha = data;
                // Aquí puedes realizar operaciones con los datos recibidos
            })
            .catch(error => {
                DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
                return;
            });
    }
    catch {
        if (requestResponse.status == 200) {
            DisplayOkSweetAlert('Registro exitoso', '');


        }

        else if (requestResponse.status == 422) {
            DisplayErrorSweetAlert('Los datos son invalidos', 'Verifique que la fecha cumpla con el formato requerido');
        }

        else if (requestResponse.status == 400) {
            DisplayErrorSweetAlert('No fue posible guardar la fecha de contacto', 'Intente mas tarde');
        }

    }

    return requestResponse;

};

async function leadVisit() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');

    let fechaVisita = document.getElementById('dateVisit').value;


    let body = {
        FechaVisita: fechaVisita,
        leadInteresadoID: leadInteresadoID
    }
    const apiURLVisit = '../Contact/GuardarFechaVisita';

    let solicitudRespuestaVisit;
    try {
        solicitudRespuestaVisit = await fetch(apiURLVisit, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (solicitudRespuestaVisit.status == 200) {
        DisplayOkSweetAlert('Registro exitoso', '');
    }

    else if (solicitudRespuestaVisit.status == 422) {
        DisplayErrorSweetAlert('Los datos son invalidos', 'Verifique que la fecha cumpla con el formato requerido');
    }

    else if (solicitudRespuestaVisit.status == 400) {
        DisplayErrorSweetAlert('No fue posible guardar la fecha de visita', 'Intente mas tarde');
    }
}

function DisplayOkSweetAlert(title, text) {
    Swal.fire({
        title: title,
        html: text,
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#ff9800',

        customClass: {
            confirmButton: 'button_confirmacion'
        }
    });
}

function DisplayErrorSweetAlert(title, text) {
    Swal.fire({
        confirmButtonColor: '#ff9800',
        title: title,
        html: text,
        icon: 'error'
    });
}

document.getElementById('rechazar-button').addEventListener('click', SetLeadAsNoInteresado);

async function SetLeadAsNoInteresado() {
    const currentQueryString = window.location.search;
    const leadInteresadoID = new URLSearchParams(currentQueryString).get('leadInteresadoID');    

    let requestBody = {
        LeadInteresadoID: leadInteresadoID,
        MotivoDesinteres: document.getElementById('mensajeRechazo').value
    }
    const apiURLVisit = '../Contact/SetLeadInteresadoAsNoInteresado';

    let requestResponse;
    try {
        requestResponse = await fetch(apiURLVisit, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (requestResponse.status == 200) {
        DisplayOkSweetAlert('Registro exitoso', '');
    }

    else if (requestResponse.status == 403) {
        DisplayErrorSweetAlert('No fue posible actualizar el estatus', 'Intente mas tarde');
    }
}