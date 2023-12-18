const busquedasArray = [];
var listaIDPropiedades = [];
const inputField = document.getElementById('autoComplete');
var statusClase = document.getElementById('default');
var globalArrID = [];
var busqueda = "";
var formatoClase = "carta"
var formatoElemento = "div"
var str = "";


function reiniciarPaginacion() {
    if (formatoClase != 'carta') {
        formatoElemento = 'tr'
    } else {
        formatoElemento = 'div'
    }


    allCardsNode = document.querySelectorAll(formatoElemento + '.' + formatoClase);

    globalArrID = [];
    var allCardsArrayGlobal = Array.from(allCardsNode);
    for (let element of allCardsArrayGlobal) {
        globalArrID.push(element.id)
    }

    str = globalArrID[0];
    return globalArrID;
}
reiniciarPaginacion();




$('.changeFormat').on('click', function () {
    const formato = this.id;
    formatoClase = formato;

    reiniciarPaginacion(formatoClase);
    paginacion(1);


})


function ObtenerIDPropiedades() {
    listaIDPropiedades = [];

    busqueda = $("#autoComplete").val();

    var url = "/Usuarios/BusquedaUsuario?busqueda=" + busqueda;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,

            success: function (data) {
                for (const value of data) {
                    let pushable = value.busqueda;
                    let ID = value.idUsuarios;
                    busquedasArray.push(pushable);
                    listaIDPropiedades.push(ID);
                };

                resolve(listaIDPropiedades);

            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });

    });

}


// la variable clase se añadio en otra hoja de JS , quiza tu no la veas aqui pero pertenece a las variables del windows en el navegador 
async function AjaxListaPropiedades() {
    const listaIDPropiedades = await ObtenerIDPropiedades();

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

    for (let ID of listaIDPropiedades) {
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
        reiniciarPaginacion();
        paginacion(1)
    }


    if (busqueda != "") {

        //QUE ¡?¡?¡ (⊙_⊙)  existen mas cosas que el for y forEach en JS??
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

    return new Promise((resolve) => {

        for (elemntID of allCardsArray) {
            $("#" + elemntID).removeClass('d-none')
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
    items = 9;
    if (allCards > 0) {
        paginadoresNum = Math.ceil(allCards / items);
    } else {
        paginadoresNum = 0;
    }

    footerID = "paginacion" + statusClase + formatoClase;

    var footer = document.getElementById("paginacion" + formatoClase)
    footer.innerHTML = "";


    var IconoArrowRight = '<i class="fa-solid fa-angle-right"></i>'
    var IconoArrowLeft = '<i class="fa-solid fa-angle-left"></i>'
    var Icono;
    var Indicepaginacion;
    var IconoPag = `<li class="page-item"> <a onclick=" return paginacion(${Indicepaginacion + 1})" class="page-link href="#">${Icono}</a>`

    function HacerIcono(indice, Icono) {
        IconoPag = `<li class="page-item ${indice === pagNum ? 'page-location' : ' '}"> <a onclick="return paginacion(${indice + 1})" class="page-link" href="#">${Icono}</a>`
        return IconoPag;
    }

    if (pagNum < paginadoresNum * items - items + 1) {
        indice = pagNum;
    } else {
        indice = paginadoresNum * items - items;
    }

    var numerosMostrados = 3
    if (pagNum + numerosMostrados > paginadoresNum) {
        indice = paginadoresNum - numerosMostrados;
        if (indice < 0) {
            indice = 0;
        }
    }
    if (indice > 0) {
        if (pagNum < items) {
            IconoFlechaIzquierda = HacerIcono(0, IconoArrowLeft)
            footer.innerHTML += IconoFlechaIzquierda
        } else {
            IconoFlechaIzquierda = HacerIcono(pagNum - items, IconoArrowLeft)
            footer.innerHTML += IconoFlechaIzquierda
        }
    }

    for (let i = indice; i < indice + numerosMostrados; i++) {
        if (i < paginadoresNum) {
            Indicepaginacion = i + 1;
            Icono = i + 1
            const IconoNumero = HacerIcono(i, i + 1)
            footer.innerHTML += IconoNumero
        }
    }

    if (pagNum < paginadoresNum - numerosMostrados) {
        IconoFlechaDerecha = HacerIcono(pagNum + numerosMostrados, IconoArrowRight)
        footer.innerHTML += IconoFlechaDerecha
    }
};

