//ESTE SCRIPT ES PARA CAMBIAR DE VISTA EN EL TABLRERO DE MESA DE CONTROL
btns()
function btns() {
    const btnOnboarding = document.getElementById('btnOnboarding'),
        btnVenta = document.getElementById('btnVenta'),
        btnEntrega = document.getElementById('btnEntrega'),
        btnPostventa = document.getElementById('btnPostventa');

    const tblOnboarding = document.getElementById('tblOnboarding'),
        tblVenta = document.getElementById('tblVenta'),
        tblEntrega = document.getElementById('tblEntrega'),
        tblPostventa = document.getElementById('tblPostventa');

    // funcion boton Onboarding 
    btnOnboarding.onclick = function () {
        btnOnboarding.classList.add("active2")

        btnVenta.classList.remove("active2")

        btnEntrega.classList.add("active2")

        tblOnboarding.classList.add("active")

        btnEntrega.classList.remove("active2")
        btnPostventa.classList.remove("active2")

        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
        tblPostventa.classList.remove("active")
    }

    // funcion boton venta
    btnVenta.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.add("active")
        btnVenta.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.remove("active2")
        tblEntrega.classList.remove("active")
        btnPostventa.classList.remove("active2")
        tblPostventa.classList.remove("active")
    }

    // funcion boton entrega
    btnEntrega.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.add("active")
        btnVenta.classList.remove("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.add("active2")
        btnPostventa.classList.remove("active2")
        tblPostventa.classList.remove("active")
    }

    // funcion boton postventa
    btnPostventa.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
        btnPostventa.classList.add("active2")
        btnVenta.classList.remove("active2")
        btnEntrega.classList.remove("active2")
        btnOnboarding.classList.remove("active2")
        tblPostventa.classList.add("active")
    }
}


function btns() {
    const btnOnboarding = document.getElementById('btnOnboarding'),
        btnVenta = document.getElementById('btnVenta'),
        btnEntrega = document.getElementById('btnEntrega');

    const tblOnboarding = document.getElementById('tblOnboarding'),
        tblVenta = document.getElementById('tblVenta'),
        tblEntrega = document.getElementById('tblEntrega');

    // funcion boton Onboarding 
    btnOnboarding.onclick = function () {
        btnOnboarding.classList.add("active2")
        btnVenta.classList.remove("active2")
        btnEntrega.classList.remove("active2")

        tblOnboarding.classList.add("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
    }

    // funcion boton venta
    btnVenta.onclick = function () {
        btnVenta.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.remove("active2")

        tblOnboarding.classList.remove("active")
        tblVenta.classList.add("active")
        tblEntrega.classList.remove("active")
    }

    // funcion boton entrega
    btnEntrega.onclick = function () {
        btnEntrega.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnVenta.classList.remove("active2")

        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.add("active")
    }
}


/*Para la funcion de los checkbox para telefono y correo*/
/*Este es para el modal de interesado --------------------------------------------------*/
function manejarOpcionesDeContacto() {
    const checkValidar = document.querySelectorAll(".checkboxContact");
    const inputTelefono = document.querySelector(".telefono-interesado");
    const inputCorreo = document.querySelector(".correo-interesado");

    function actualizarVisibilidadInputs(opcion) {
        if (opcion.id === "chkTelefono" && opcion.checked) {
            inputTelefono.style.display = "block";
            document.getElementById('lead-email').value = null;
            inputCorreo.style.display = "none";
        } else if (opcion.id === "chkCorreo" && opcion.checked) {
            document.getElementById('lead-telefono').value = null;
            inputTelefono.style.display = "none";
            inputCorreo.style.display = "block";
        } else if (opcion.id === "chkAmbos" && opcion.checked) {
            inputTelefono.style.display = "block";
            inputCorreo.style.display = "block";
        }
    }

    function ocultarInputsAlInicio() {
        inputTelefono.style.display = "none";
        inputCorreo.style.display = "none";
    }

    checkValidar.forEach((opcion) => {
        opcion.addEventListener("click", function () {
            actualizarVisibilidadInputs(opcion);
        });
    });
}

// Llamada a la función para inicializar el comportamiento
manejarOpcionesDeContacto();

/*---------------------------------------------------------------*/



function manejarOpcionesBroker() {
    /*Este es para el modal del broker*/
    const checkValidarBroker = document.querySelectorAll(".checkboxContactBroker");
    const telefonoBroker = document.querySelector(".telefonoBroker");
    const correoBroker = document.querySelector(".correoBroker");

    function actualizarVisibilidadInputs(opcion) {
        if (opcion.id === "chkTelefonoBroker" && opcion.checked) {
            telefonoBroker.style.display = "block";
            correoBroker.style.display = "none";
        } else if (opcion.id === "chkCorreoBroker" && opcion.checked) {
            telefonoBroker.style.display = "none";
            correoBroker.style.display = "block";
        } else if (opcion.id === "chkAmbosBroker" && opcion.checked) {
            telefonoBroker.style.display = "block";
            correoBroker.style.display = "block";
        }
    }

    function ocultarInputsAlInicio() {
        telefonoBroker.style.display = "none";
        correoBroker.style.display = "none";
    }

    ocultarInputsAlInicio();

    checkValidarBroker.forEach((opcion) => {
        opcion.addEventListener("click", function () {
            actualizarVisibilidadInputs(opcion);
        });
    });
}

manejarOpcionesBroker();


function manejarOpcionesContacto() {
    /*Este es para el modal del broker*/
    const checkValidarContacto = document.querySelectorAll(".checkboxContacto");
    const telefonoContacto = document.querySelector(".telefono-contacto");
    const correoContacto = document.querySelector(".correo-contacto");

    function actualizarVisibilidadInputs(opcion) {
        if (opcion.id === "chkTelefonoContacto" && opcion.checked) {
            telefonoContacto.style.display = "block";
            correoContacto.style.display = "none";
        } else if (opcion.id === "chkCorreoContacto" && opcion.checked) {
            telefonoContacto.style.display = "none";
            correoContacto.style.display = "block";
        } else if (opcion.id === "chkAmbosContacto" && opcion.checked) {
            telefonoContacto.style.display = "block";
            correoContacto.style.display = "block";
        }
    }

    function ocultarInputsAlInicio() {
        telefonoContacto.style.display = "none";
        correoContacto.style.display = "none";
    }

    ocultarInputsAlInicio();

    checkValidarContacto.forEach((opcion) => {
        opcion.addEventListener("click", function () {
            actualizarVisibilidadInputs(opcion);
        });
    });
}

manejarOpcionesContacto();

async function SaveLeadInteresado() {
    let leadTelefono = document.getElementById('lead-telefono').value.trim();
    let leadEmail = document.getElementById('lead-email').value.trim();
    let leadData;

    if ((leadTelefono != null && leadTelefono != '') || (leadEmail != null && leadEmail != '')) {
        leadData = {
            Nombre: document.getElementById('lead-nombre').value,
            ApellidoPaterno: document.getElementById('lead-apellido-paterno').value,
            ApellidoMaterno: document.getElementById('lead-apellido-materno').value,
            MedioContacto: {
                Email: leadEmail,
                Telefono: leadTelefono,
            },
            Mensaje: document.getElementById('lead-mensaje').value,
            IDPropiedad: document.getElementById('lead-id-propiedad').value,
            FechaLlamadaAgendada: document.getElementById('lead-fecha-agendada').value,
            IDMedioOrigen: document.getElementById('lead-id-medio-origen').value,
        };
    }
    else {
        leadData = {
            Nombre: document.getElementById('lead-nombre').value,
            ApellidoPaterno: document.getElementById('lead-apellido-paterno').value,
            ApellidoMaterno: document.getElementById('lead-apellido-materno').value,
            MedioContacto: null,
            Mensaje: document.getElementById('lead-mensaje').value,
            IDPropiedad: document.getElementById('lead-id-propiedad').value,
            FechaLlamadaAgendada: document.getElementById('lead-fecha-agendada').value,
            IDMedioOrigen: document.getElementById('lead-id-medio-origen').value,
        };
    }


    const apiURL = '../Contact/AddLeadInteresado';
    let requestResponse;

    try {
        requestResponse = await fetch(apiURL, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leadData)
        });
    }
    catch {
        DisplayErrorSweetAlert('Hubo un error inesperado', 'Intente mas tarde');
        return;
    }

    if (requestResponse.status == 200) {
        Swal.fire({
            title: 'Registro exitoso',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#ff9800',

            customClass: {
                confirmButton: 'button_confirmacion'
            }
        }).then(function () {
            document.location.reload();
        });
    }

    else if (requestResponse.status == 422) {
        DisplayErrorSweetAlert('Los datos son invalidos', 'Verifique que todo cumpla el formato requerido');
    }

    else if (requestResponse.status == 400) {
        DisplayErrorSweetAlert('No fue posible guardar el nuevo lead', 'Intente mas tarde');
    }
}

function DisplayOkSweetAlert(title, text) {
    Swal.fire({
        title: title,
        html: `<span>${text}</span>`,
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
        html: `<span>${text}</span>`,
        icon: 'error'
    });
}

let configurations = {
    selector: "#lead-id-propiedad",
    placeHolder: "Busca un ID de propiedad",
    threshold: 2,
    debounce: 200,
    diacritics: true,
    data: {
        src: async (query) => {
            query = autoCompleteAPIPath = `../Contact/SearchPropiedadesID?propiedadIDPattern=${document.getElementById('lead-id-propiedad').value}`;
            let requestResponse = await fetch(query, {
                method: 'get'
            });

            let propiedadesIDs = await requestResponse.json();
            return propiedadesIDs;
        },
        cache: false,
    },
    resultsList: {
        element: (list, data) => {
            if (!data.results.length) {
                // Create "No Results" message element
                const message = document.createElement("div");
                // Add class to the created element
                message.setAttribute("class", "no_result");
                // Add message text content
                message.innerHTML = `<span>No se encontraron resultados para ${data.query}</span>`;

                // Append message element to the results list
                list.prepend(message);
            }
        },
        id: "propiedades_id_list",
        noResults: true,
        maxResults: 5
    },
    resultItem: {
        highlight: true,
        element: (item, data) => {
            item.setAttribute("onclick", `mostrarMensaje('${data.value}')`)
        }
    }
};

new autoComplete(configurations);

function mostrarMensaje(optionValue) {

    const inputBuscar = document.getElementById("lead-id-propiedad");
    inputBuscar.value = optionValue;

    getIDBySearch();
}