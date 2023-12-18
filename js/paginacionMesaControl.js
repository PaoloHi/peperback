//de la vista 1
const suscripcion_ = document.querySelectorAll('.suscripcion')
const documentos_ = document.querySelectorAll('.documentos')
const contratos_ = document.querySelectorAll('.contratos')

//de la vista 2
const docprop_ = document.querySelectorAll('.docprop')
const propietarios_ = document.querySelectorAll('.propietarios')
const aliados_ = document.querySelectorAll('.Aliados')
const contratoInter_ = document.querySelectorAll(".ContratoInter")

/*de la vista 3*/
const entregaPropiedad_ = document.querySelectorAll('.EntregaPropiedad')

/*estas variables contienen a las anteriores en forma de arreglo*/
const onBoardingBroker = [suscripcion_, documentos_, contratos_];
const inventarioProducto = [docprop_, propietarios_, aliados_ , contratoInter_];
const entrega = [entregaPropiedad_];


btnOnboarding = document.getElementById('btnOnboarding')
btnVenta = document.getElementById('btnVenta')
btnEntrega = document.getElementById('btnEntrega')

btnOnboarding.addEventListener("click", function () {
    Etiquetas(0);
});

btnVenta.addEventListener("click", function () {
    Etiquetas(1);
});

btnEntrega.addEventListener("click", function () {
    Etiquetas(2);
});

const etiquetas = [onBoardingBroker, inventarioProducto, entrega]
var etiquetaIndice = 1;
var etiqueta = etiquetas[etiquetaIndice];
var Identificador = "";

function Etiquetas(numero) {
    var apartado = etiquetas[numero];
    for (let i = 0; i < apartado.length; i++) {
        var table = apartado[i];
        paginarBoton(table);
    }
}

function paginarBoton(tabla, pagina = 1) {
    var elementosID = [];
    for (let element of tabla) {
        elementosID.push(element.id);
    }
    const str = elementosID[0];
    Identificador = str.match(/^[^\d]+/)[0].trim();

    paginacion(pagina, elementosID);
}

Etiquetas(0);
Etiquetas(1);
Etiquetas(2);

document.addEventListener('DOMContentLoaded', function () {
    // Tu código JavaScript aquí
    // Se ejecutará una vez que se cargue completamente la página

    $('.changeCardTable').on('click', function () {
        const status = this.id;
        statusClase = status;
        formatoClase = 'tableVendidas';
        reiniciarPaginacion('tableVendidas');
        paginacion(1);
        return statusClase;
    });

    $('.changeFormat').on('click', function () {
        const formato = this.id;
        formatoClase = formato;
        reiniciarPaginacion(formatoClase);
        paginacion(1);
    });
});


function paginacion(paginaNum, ArrMostrar = globalArrID) {

    var allCardsArray = [].concat(ArrMostrar);
    globalArrID = [].concat(allCardsArray);

    makePaginationFooter(paginaNum, allCardsArray.length)

    return new Promise((resolve) => {
        for (elemntID of allCardsArray) {
            $("#" + elemntID).removeClass('d-none');
        }

        let items = 5;
        posicionesItems = items * (paginaNum - 1);

        allCardsArray.splice(posicionesItems, items);
        /*console.log(allCardsArray);*/

        let pagina = paginaNum;
        for (elemntID of allCardsArray) {
            $("#" + elemntID).addClass('d-none')
        }
        resolve(allCardsArray);
    })
}

function makePaginationFooter(paginaNum, allCards) {
    items = 5;
    if (allCards > 0) {
        paginadoresNum = Math.ceil(allCards / items);
    } else {
        paginadoresNum = 0;
    }

    const footerID = "paginacion" + Identificador;
    var footer = document.getElementById(footerID);
    footer.innerHTML = "";

    var IconoArrowRight = '<i class="fa-solid fa-angle-right"></i>';
    var IconoArrowLeft = '<i class="fa-solid fa-angle-left"></i>';

    // Agregar flecha izquierda solo si no estamos en la primera página
    if (paginaNum > 1 && paginadoresNum > 4) {
        footer.innerHTML += `<li class="page-item"><a class="page-link" onclick="paginarBoton(${Identificador}, 1)">${IconoArrowLeft}</a></li>`;
    }

    // Calcular el rango de páginas a mostrar (bloques de 4)
    const startPage = Math.max(1, paginaNum - 2);
    const endPage = Math.min(startPage + 3, paginadoresNum);

    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === paginaNum ? 'page-location' : '';
        footer.innerHTML += `<li class="page-item ${isActive}"><a class="page-link" onclick="paginarBoton(${Identificador}, ${i})">${i}</a></li>`;
    }

    // Agregar flecha derecha solo si no estamos en la última página
    if (paginaNum < paginadoresNum && paginadoresNum > 4) {
        footer.innerHTML += `<li class="page-item"><a class="page-link" onclick="paginarBoton(${Identificador}, ${paginadoresNum})">${IconoArrowRight}</a></li>`;
    }
}


