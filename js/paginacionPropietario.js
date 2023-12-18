const busquedasArray = [];
var listaID = [];
const inputField = document.getElementById('autoComplete');
var statusClase = "NP"
var globalArrID = [];
var element = 'div';
var str = "";
var formatoClase = 'carta'

function reiniciarPaginacion(formatoTipo = 'carta', status = statusClase) {
    if (formatoTipo != 'carta') {
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
    formatoClase = 'carta';
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


function paginacion(paginaNum, ArrMostrar = globalArrID) {
    var allCardsArray = [].concat(ArrMostrar);
    globalArrID = [].concat(allCardsArray);

    makePaginationFooter(allCardsArray.length)
    return new Promise((resolve) => {

        for (elemntID of allCardsArray) {
            $("#" + elemntID).removeClass('d-none');
            if (formatoClase == 'carta') {
                $("#" + elemntID).addClass('bg-transparent');
                $("#" + elemntID).addClass('border-0');
            }
        }

        let items = 6;
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


function makePaginationFooter(allCards) {
    items = 6;
    if (allCards > 0) {
        paginadoresNum = Math.ceil(allCards / items);

    } else {
        paginadoresNum = 0;
    }

    footerID = "paginacion" + statusClase + formatoClase;

    var footer = document.getElementById(footerID);
    footer.innerHTML = "";
    for (let i = 0; i < paginadoresNum; i++) {

        footer.innerHTML += `<a onclick="paginacion(${i + 1})" class="d-flex justify-content-center page-link">${i + 1}</a>`
    }

};

