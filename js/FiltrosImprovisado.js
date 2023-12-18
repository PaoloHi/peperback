const busquedasArray = [];
var listaID = [];
const inputField = document.getElementById('autoComplete');
var statusClase = document.getElementById('default').value;
var controlador = document.getElementById('controlador').value;
var globalArrID = [];
var element = 'div';
var str = "";
var formatoClase = 'card'

function reiniciarPaginacion(formatoTipo = 'card', status = statusClase) {
    if (formatoTipo != 'card') {
        element = 'tr'
    } else {
        element = 'div'
    }
    allCardsNode = document.querySelectorAll(element + '.' + formatoTipo + '.' + status);

    globalArrID = [];
    var allCardsArrayGlobal = Array.from(allCardsNode);
    for (let element of allCardsArrayGlobal) {
        globalArrID.push(element.id)
    }
    str = globalArrID[0];
    return globalArrID;
}
reiniciarPaginacion();



$('.changeCard').on('click', function () {
    const status = this.id;
    statusClase = status;
    formatoClase = 'card';
    reiniciarPaginacion(formatoClase);
    paginacion(1);
    return statusClase;

})
document.addEventListener('DOMContentLoaded', function () {
    // Tu código JavaScript aquí
    // Se ejecutará una vez que se cargue completamente la página


    $('.changeCardTable').on('click', function () {
        const status = this.id;
        statusClase = status;
        formatoClase = 'tableVendidas'
        reiniciarPaginacion('tableVendidas');
        paginacion(1);
        return statusClase;

    })

    $('.changeFormat').on('click', function () {
        const formato = this.id;
        formatoClase = formato;
        reiniciarPaginacion(formatoClase);
        paginacion(1);


    })


});





var busqueda = "";
function ObtenerIDPropiedades() {
    listaID = [];
    busqueda = $("#autoComplete").val();


    var url = "/" + controlador + "/BusquedaFiltros?busqueda=" + busqueda;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,

            success: function (data) {
                for (const value of data) {
                    let pushable = value.busqueda;
                    let IDvalue = value.id;
                    busquedasArray.push(pushable);
                    listaID.push(IDvalue);
                };

                resolve(listaID, busqueda);

            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });

    });

}


// la variable clase se añadio en otra hoja de JS , quiza tu no la veas aqui pero pertenece a las variables del windows en el navegador 
async function AjaxListaPropiedades(clase = statusClase) {
    const listaID = await ObtenerIDPropiedades();

    Identificador = str.match(/^[^\d]+/)[0].trim();

    let cardsDeck = Array.from(allCardsNode);

    cardsDeck.forEach(carta => {
        carta.classList.remove('d-none');
    });

    cartasEliminar = [];
    cartasMostrar = [];
    for (let element of cardsDeck) {
        cartasEliminar.push(element.id)
        cartasMostrar.push(element.id)
    }

    for (let ID of listaID) {
        var IDPropiedad = Identificador + ID;
        cartasEliminar = cartasEliminar.filter(eliminar => eliminar !== IDPropiedad);
    }
    for (let element of cartasEliminar) {
        cartasMostrar = cartasMostrar.filter(mostrar => mostrar !== element)
    }
    console.log(cartasMostrar);

    if (cartasMostrar.length != 0) {
        paginacion(1, cartasMostrar);
    } else {
        paginacion(1)
    }



    //QUE ¡?¡?¡ (⊙_⊙)  existen mas cosas que el for y forEach en JS??

    if (busqueda != "") {
        for (let ID of cartasEliminar) {
            $('#' + ID).addClass('d-none');
        }
    }

}


inputField.addEventListener('input', function () {
    AjaxListaPropiedades();

});


function paginacion(paginaNum, ArrMostrar = globalArrID) {
    var allCardsArray = [].concat(ArrMostrar);
    globalArrID = [].concat(allCardsArray);

    makePaginationFooter(paginaNum - 1, allCardsArray.length)

    //// Eliminar la clase 'active' de todos los elementos 'li'
    //const paginationItems = document.querySelectorAll('.pagination li');
    //paginationItems.forEach(item => {
    //    item.classList.remove('page-location');
    //});

    //// Añadir la clase 'active' al elemento 'li' correspondiente al enlace activo
    //const activeItem = paginationItems[paginaNum - 1];
    //activeItem.classList.add('page-location');

    return new Promise((resolve) => {

        for (elemntID of allCardsArray) {
            $("#" + elemntID).removeClass('d-none');
            if (formatoClase == 'card') {
                $("#" + elemntID).addClass('bg-transparent');
                $("#" + elemntID).addClass('border-0');
            }
        }

        let items = 9;
        posicionesItems = items * (paginaNum - 1);

        allCardsArray.splice(posicionesItems, items);
        console.log(allCardsArray);

        let pagina = paginaNum;
        for (elemntID of allCardsArray) {
            $("#" + elemntID).addClass('d-none')
        }

        resolve(allCardsArray);
    })
}

paginacion(1);

function makePaginationFooter(pagNum, allCards) {
    var items = 9;
    var paginadoresNum = allCards > 0 ? Math.ceil(allCards / items) : 0;
    var footerID = "paginacion" + statusClase + formatoClase;

    var footer = document.getElementById(footerID);
    footer.innerHTML = "";

    var IconoArrowRight = '<i class="fas fa-angle-right"></i>';
    var IconoArrowLeft = '<i class="fas fa-angle-left"></i>';

    function hacerIcono(indice, contenido) {
        return `<li class="page-item ${indice === pagNum ? 'page-location' : ''}"><a class="page-link" onclick="return paginacion(${indice + 1})">${contenido}</a></li>`;
    }

    var indice = pagNum < paginadoresNum * items - items + 1 ? pagNum : paginadoresNum * items - items;

    var numerosMostrados = 3;
    if (pagNum + numerosMostrados > paginadoresNum) {
        indice = Math.max(paginadoresNum - numerosMostrados, 0);
    }

    if (indice > 0) {
        if (pagNum < items) {
            footer.innerHTML += hacerIcono(0, IconoArrowLeft);
        } else {
            footer.innerHTML += hacerIcono(pagNum - items, IconoArrowLeft);
        }
    }

    for (let i = indice; i < indice + numerosMostrados && i < paginadoresNum; i++) {
        footer.innerHTML += hacerIcono(i, i + 1);
    }

    if (pagNum < paginadoresNum - numerosMostrados) {
        footer.innerHTML += hacerIcono(pagNum + numerosMostrados, IconoArrowRight);
    }
};

// Llamada de ejemplo









document.getElementById("NP").click();
