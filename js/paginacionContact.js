//de la vista 1
const onboarding_ = document.querySelectorAll('.onboarding')

//de la vista 2
const venta_ = document.querySelectorAll('.venta')

/*Vista 3*/
const entrega_ = document.querySelectorAll('.entrega')

/*botones para cambiar la vista*/
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


const etiquetas = [onboarding_, venta_, entrega_]
var etiquetaIndice = 1;
var etiqueta = etiquetas[etiquetaIndice];


var Identificador = "";

var filtro = "suscripcion"

//function paginarBotones(boton) {
//    for (let i = 0; i < boton.length; i++) {
//        tabla = boton[i]
//        var elementosID = []
//        for (let element of tabla) {
//            elementosID.push(element.id)
//        }

//        str = elementosID[0]
//        Identificador = str.match(/^[^\d]+/)[0].trim();
//        paginacion(1, elementosID);
//    }
//}

function Etiquetas(numero) {
    var apartado = etiquetas[numero];
    paginarBoton(apartado);
}


function paginarBoton(tabla, pagina = 1) {
    var elementosID = []
    for (let element of tabla) {
        elementosID.push(element.id)
    }
    str = elementosID[0]
    Identificador = str.match(/^[^\d]+/)[0].trim();
    paginacion(pagina, elementosID);
}

Etiquetas(0);



document.addEventListener('DOMContentLoaded', function () {
    // Tu c�digo JavaScript aqu�
    // Se ejecutar� una vez que se cargue completamente la p�gina
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


function paginacion(paginaNum, ArrMostrar = globalArrID) {

    var allCardsArray = [].concat(ArrMostrar);
    globalArrID = [].concat(allCardsArray);


    makePaginationFooter(paginaNum, allCardsArray.length);

    return new Promise((resolve) => {

        for (elemntID of allCardsArray) {
            $("#" + elemntID).removeClass('d-none');

        }

        let items = 5;
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

    // Calcular el rango de p�ginas a mostrar (bloques de 4)
    const startPage = Math.max(1, paginaNum - 2);
    const endPage = Math.min(startPage + 3, paginadoresNum);

    // Agregar flecha izquierda solo si no estamos en la primera p�gina y hay m�s de 4 p�ginas
    if (paginaNum > 1 && paginadoresNum > 4) {
        footer.innerHTML += `<li class="page-item"><a class="page-link" onclick="paginarBoton(${Identificador}, 1)">${IconoArrowLeft}</a></li>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === paginaNum ? 'page-location' : '';
        footer.innerHTML += `<li class="page-item ${isActive}"><a class="page-link" onclick="paginarBoton(${Identificador}, ${i})">${i}</a></li>`;
    }

    // Agregar flecha derecha solo si no estamos en la �ltima p�gina y hay m�s de 4 p�ginas
    if (paginaNum < paginadoresNum && paginadoresNum > 4) {
        footer.innerHTML += `<li class="page-item"><a class="page-link" onclick="paginarBoton(${Identificador}, ${paginadoresNum})">${IconoArrowRight}</a></li>`;
    }
}



