const busquedasArray = [];


const revision = "En revisión";
const Aprobada = "Aprobada";
const EnProceso = "En proceso";
const Cerrada = "Cerrada";


var esVistaTarjeta = true;
var status = revision;

const tarjeta = document.getElementById('card');
const tabla = document.getElementById('table');

tarjeta.addEventListener('click', () => {
    esVistaTarjeta = true; main(status),
        tarjeta.style.backgroundColor = '#CCCCCC';
    tabla.style.backgroundColor = '';
});
tabla.addEventListener('click', () => {
    esVistaTarjeta = false; main(status);
    tabla.style.backgroundColor = '#CCCCCC';
    tarjeta.style.backgroundColor = '';
});

const vendidas = document.getElementById("venta");
const rentadas = document.getElementById("renta");

vendidas.addEventListener('click', () => {
    Operacion = 'Venta'; main(Cerrada); vendidas.style.backgroundColor = '#CCCCCC';
    rentadas.style.backgroundColor = ''
});


rentadas.addEventListener('click', () => {
    Operacion = 'Renta'; main(Cerrada); rentadas.style.backgroundColor = '#CCCCCC';
    vendidas.style.backgroundColor = '' });


var listaIDparaPaginarDefault = [];

var tipoPropiedad;
document.getElementById("TipoPropiedadID").addEventListener("change", function (event) {
    tipoPropiedad = event.target.value
});


const buscarButton = document.getElementById('buscarButton');

function IDPropiedadesBusqueda(status) {
    const busqueda = $("#autoComplete").val();
    let IDsencontrados = [];

    data = { busqueda, tipoPropiedad };

    if (busqueda != "" || typeof tipoPropiedad != 'undefined') {
        var url = "/Propiedades/BusquedaFiltros/";
        return new Promise((resolve, reject) => {
            $.ajax({
                data: data,
                url: url,
                success: function (data) {
                    for (const Propiedad of data) {
                        let PropiedadID = Propiedad.propiedadID
                        IDsencontrados.push(PropiedadID)
                    };

                    resolve(IDsencontrados);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });

    }
    else {

        return listaIDparaPaginarDefault;

    }

}




// la variable clase se añadio en otra hoja de JS , quiza tu no la veas aqui pero pertenece a las variables del windows en el navegador 
async function PaginarPorBusqeuda(estado = status) {
    await lockMain.lock();

    let listaID = await IDPropiedadesBusqueda(estado);
    listaID = listaID.filter(elemento => listaIDparaPaginarDefault.includes(elemento));
    paginacion(0, listaID);

    lockMain.unlock();

};



const inputBuscar = document.getElementById("autoComplete")
const selectTipoProp = document.getElementById("TipoPropiedadID");
console.log(selectTipoProp);

[inputBuscar, selectTipoProp].forEach(element => {
    element.addEventListener('change', async function (e) {

        await lock.lock();
        e.preventDefault(); // Evita que la página se reinicie al presionar Enter

        const busqueda = $("#autoComplete").val();

        if (busqueda != "" || tipoPropiedad != 0) {
            PaginarPorBusqeuda(estado = status);

        } else {
            listaIDparaPaginarDefault = [];
            main(status);
        }
        lock.unlock();

    });
})




function makePaginationFooter(pagNum, allCards) {
    items = 9;
    if (allCards > 0) {
        paginadoresNum = Math.ceil(allCards / items);
    } else {
        paginadoresNum = 0;
    }

    footerID = "paginacion";

    var footer = document.getElementById(footerID);
    footer.innerHTML = "";


    var IconoArrowRight = '<i class="fa-solid fa-angle-right"></i>'
    var IconoArrowLeft = '<i class="fa-solid fa-angle-left"></i>'
    var Icono;
    var Indicepaginacion;
    var IconoPag = `<li class="page-item"> <a class="page-link" href="#" onclick="return paginacion(${Indicepaginacion}, this)" data-page="(${Indicepaginacion})">${Icono}</a></li>`

    function HacerIcono(indice, Icono) {
        /*lo que hace la modificación*/
        /*evalua si indice es igual a pagNum, si es verdadero coloca la clase page-location, si no, coloca la clase vacia para no causar problemas*/
        /*chatGPT menciona que ? y : son operadores ternario*/
        const IconoPag = `<li class="page-item ${indice === pagNum ? 'page-location' : ''}"> <a class="page-link" href="#" onclick="return paginacion(${indice})" data-page="(${indice})">${Icono}</a></li>`;
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
            Icono = i + 1;
            const IconoNumero = HacerIcono(i, Icono);
            footer.innerHTML += IconoNumero;
        }
    }


    if (pagNum < paginadoresNum - numerosMostrados) {
        IconoFlechaDerecha = HacerIcono(pagNum + numerosMostrados, IconoArrowRight)
        footer.innerHTML += IconoFlechaDerecha
    }

};


var userId = "";
var Operacion = null;

function ObtenerIDPropiedadesStatus(status, userId, operacion = Operacion) {
    return new Promise(function (resolve, reject) {
        data = { status, userId, operacion }

        $.ajax({
            type: "GET",
            url: "/Propiedades/DevolverListaPropiedadesID/",
            data: data,
            success: function (result) {
                resolve(result.listaPropiedadesID);
                userId = result.userId;
            },
            error: function (errorData) {
                reject(errorData);
            }
        });
    });
}

//para obtener la lista con las 
var ObjetoListasPropiedadID = new Object();
const Listastatus = [[revision, null], [Aprobada, null], [EnProceso, null], [Cerrada, 'Venta'], [Cerrada, 'Renta']];


async function cargarPropiedades() {
    for (estado of Listastatus) {

        const ListaID = await ObtenerIDPropiedadesStatus(estado[0], userId, estado[1]);
        const op = (estado[1] == null ? '' : estado[1]);
        ObjetoListasPropiedadID[estado[0] + op] = ListaID
    }
}

//para crear las tarjetas

var objetoTarjetas = new Object();
async function MostrarTarjeta(IdPropiedad) {
    const viemHTMLPagina = objetoTarjetas[IdPropiedad]
    if (typeof (viemHTMLPagina) != 'undefined') {
        $("#contenedorTarjetas").append(viemHTMLPagina);
    } else {
        var viemHTMLPag = await VistaHTMLTarjeta(IdPropiedad);
        objetoTarjetas[IdPropiedad] = viemHTMLPag;
        $("#contenedorTarjetas").append(viemHTMLPag);
    }
}

//devuelve la vista como HTML 
function VistaHTMLTarjeta(PropiedadID) {
    return new Promise(function (resolve, reject) {
        data = { PropiedadID, status }

        $.ajax({
            type: "GET",
            url: "/Propiedades/DevolverTarjeta/",
            data: data,
            success: function (viewHTML) {
                resolve(viewHTML);
            },
            error: function (errorData) {
                reject(errorData);
            }
        });
    });
}



function VistaHTMLtabla(PropiedadID) {
    return new Promise(function (resolve, reject) {

        data = { PropiedadID, status }

        $.ajax({
            type: "POST",
            url: "/Propiedades/DevolverFila/",
            data: data,
            success: function (viewHTML) {
                resolve(viewHTML);
            },
            error: function (errorData) {
                reject(errorData);
            }
        });
    });
}

var objetoTabla = new Object();
async function MostrarTabla(PropiedadID) {
    const viemHTMLPaginaTabla = objetoTabla[PropiedadID]
    if (typeof (viemHTMLPaginaTabla) != 'undefined') {
        $("#contenedorTabla").append(viemHTMLPaginaTabla);
    } else {
        var viemHTMLPagTabla = await VistaHTMLtabla(PropiedadID);
        objetoTabla[PropiedadID] = viemHTMLPagTabla;
        $("#contenedorTabla").append(viemHTMLPagTabla);
    }
}

async function ListaID(status) {
    if (!Object.keys(objetoTarjetas).length > 0) {
        await cargarPropiedades();
    }
    const ListaPropiedadesID = ObjetoListasPropiedadID[status];
    return ListaPropiedadesID;
}


var Pagina = document.getElementById("contenedoPropiedades")
async function paginacion(paginaNum, ListaIdParaPaginar = listaIDparaPaginarDefault) {
    await lockPaginacion.lock();
    const items = 9;
    Pagina.innerHTML = "";

    const paso = items * paginaNum;

    makePaginationFooter(paginaNum, ListaIdParaPaginar.length);

    IDsporPagina = [];
    for (let i = paso; i < paso + items; i++) {
        if (ListaIdParaPaginar.length > i) {
            let PropID = ListaIdParaPaginar[i];
            IDsporPagina.push(PropID);
        } else { break; }
    }


    if (esVistaTarjeta) {
        Pagina.innerHTML = contenedorTarjetas;

        for (let propiedadid of IDsporPagina) {
            await MostrarTarjeta(propiedadid);
        }

    } else {

        const contenedorTabla = mapaMarcoTablaStatus.get(status);
        Pagina.innerHTML = contenedorTabla;
        for (let propiedadid of IDsporPagina) {
            await MostrarTabla(propiedadid);

        }
    }

    lockPaginacion.unlock()

}




class AsyncLock {
    constructor() {
        this.isLocked = false;
        this.resolve = null;
    }

    async lock() {
        while (this.isLocked) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Espera hasta que se desbloquee
        }
        this.isLocked = true;
    }

    unlock() {
        this.isLocked = false;
        if (this.resolve) {
            this.resolve();
            this.resolve = null;
        }
    }
}

const lock = new AsyncLock();
const lockMain = new AsyncLock();
const lockPaginacion = new AsyncLock();

async function main(estado) {
    await lockMain.lock();

    const ops = (Operacion == null ? '' : Operacion);
    status = estado + ops;

    const ListaIdParaPaginar = await ListaID(status);
    listaIDparaPaginarDefault = [];
    listaIDparaPaginarDefault = listaIDparaPaginarDefault.concat(ListaIdParaPaginar);
    await paginacion(0, ListaIdParaPaginar);

    lockMain.unlock();
}

SeccionRevision = document.getElementById("PropiedasesNoPublicadas");
SeccionAprobadas = document.getElementById("PropiedadesPublicadas");
SeccionEnProceso = document.getElementById("PropiedadesEnProceso");
SeccionCerradas = document.getElementById("PropiedadesCerradas");

SeccionRevision.addEventListener("click", async function () {
    await lock.lock();
    document.getElementById('autoComplete').value = ''
    Operacion = null;
    mostrarOcultarBotones('noCerradasButons', 'CerradasButons')
    document.getElementById("noCerradasButons")
    await main(revision);
    lock.unlock();
});

SeccionAprobadas.addEventListener("click", async function () {
    await lock.lock();
    document.getElementById('autoComplete').value = ''
    Operacion = null;
    mostrarOcultarBotones('noCerradasButons', 'CerradasButons')
    await main(Aprobada);
    lock.unlock();
});

SeccionEnProceso.addEventListener("click", async function () {
    await lock.lock();
    document.getElementById('autoComplete').value = ''
    Operacion = null;
    mostrarOcultarBotones('noCerradasButons', 'CerradasButons')
    await main(EnProceso);
    lock.unlock();
});

SeccionCerradas.addEventListener("click", async function () {
    await lock.lock();
    document.getElementById('autoComplete').value = ''
    esVistaTarjeta = false;
    mostrarOcultarBotones('CerradasButons', 'noCerradasButons');
    Operacion = 'Venta'
    await main(Cerrada);

    lock.unlock();
});

main(revision);

function mostrarOcultarBotones(mostrar, ocultar) {

    const mostrarEle = document.getElementById(mostrar)
    const mostrarClass = mostrarEle.classList;

    if (mostrarClass.value.includes("d-none")) {
        mostrarClass.remove("d-none");
    }

    const ocultarEle = document.getElementById(ocultar)
    const ocultarClass = ocultarEle.classList;

    if (!ocultarClass.value.includes("d-none")) {
        ocultarClass.add("d-none");
    }

}
//////////////////////////



var UsuarioTienePermisos = window.UsuarioTienepermiso

let columnaBroker = '';


if (UsuarioTienePermisos) {
    columnaBroker = `<th scope="col" class="text-center">Broker</th>`
}

const contenedorTarjetas = `<div id="contenedorTarjetas" class="row row-cols-xxl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 responsiveExtraSmall" style="margin: 0px 11px;"></div>`;


const marcoTablaRevision = `
<div id="Tabla" class="tabcontent  bg-light mt-3">
    <div class="table-wrapper-scroll-y my-custom-scrollbar table-responsive mt-2 bg-light rounded ">
        <table class="table tabla-hover ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="text-center col-3">Nombre</th>
                    <th scope="col" class="text-center col-5">Dirección</th>`
    + columnaBroker +
    `
                    <th scope="col" class="text-center my-2" style="width:8rem;">Estatus</th>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id='contenedorTabla'>
            </tbody>
        </table>
    </div>
</div>
`;


const marcoTablaAprobada = `
<div class="tabcontent4 bg-light mt-3">
    <div class="table-wrapper-scroll-y my-custom-scrollbar table-responsive mt-2 bg-light rounded">
        <table class="table tabla-hover ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="text-center">Nombre</th>
                    <th scope="col" class="text-center">Dirección</th>
                    `+ columnaBroker + `
                    <th scope="col" class="text-center">Tiempo publicada</th>
                    <th scope="col" class="text-center">Vistas</th>
                    <th scope="col" class="text-center">Visitas</td>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id="contenedorTabla">
            </tbody>
        </table>
    </div>
</div>
`;

const marcoTablaEnProceso = `
<!--Tabla-->
<div id="Tablaproceso" class="tabcontent5 bg-light mt-3">
    <div class="table-wrapper-scroll-y my-custom-scrollbar table-responsive mt-2 bg-light rounded">
        <table class="table tabla-hover ">
            <thead>
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Nombre</th>
                    <th scope="col" class="text-center">Dirección</th>
                    `+ columnaBroker + `
                    <th scope="col" class="text-center">Tipo de operación</th>
                    <th scope="col" class="text-center">Etapa</th>
                    <th scope="col" class="text-center">Acciones</th>

                </tr>
            </thead>
            <tbody id="contenedorTabla">

            </tbody>

        </table>
    </div>
</div>

`;


const marcoTablaCerradasRenta = `
<div id="TablaCerradasRenta" class="tabcontent3 mt-3 bg-light">
    <div class="table-wrapper-scroll-y my-custom-scrollbar table-responsive mt-2 bg-light rounded">
        <table class="table tabla-hover ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="text-center">Fecha cierre</th>
                    <th scope="col" class="text-center">Propiedad</th>
                    <th scope="col" class="text-center">Precio</th>
                    <th scope="col" class="text-center">Comisión</th>
                    <th scope="col" class="text-center">Cliente</th>
                    <th scope="col" class="text-center">Acciones</th>

                </tr>
            </thead>
            <tbody id="contenedorTabla">
            </tbody>
        </table>
    </div>
</div>`;



const marcoTablaCerradasVenta = `
<div  class="tabcontent3 mt-3 bg-light">
    <div class="table-wrapper-scroll-y my-custom-scrollbar table-responsive mt-2 bg-light rounded">
        <table class="table tabla-hover ">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="text-center">Fecha cierre</th>
                    <th scope="col" class="text-center">Propiedad</th>
                    <th scope="col" class="text-center">Precio</th>
                    `+ columnaBroker + `
                    <th scope="col" class="text-center">Comisión</th>
                    <th scope="col" class="text-center">Cliente</th>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id="contenedorTabla">
            </tbody
        </table>
    </div>
</div>
`;



const mapaMarcoTablaStatus = new Map();
mapaMarcoTablaStatus.set("En revisión", marcoTablaRevision);
mapaMarcoTablaStatus.set("Aprobada", marcoTablaAprobada);
mapaMarcoTablaStatus.set("En proceso", marcoTablaEnProceso);
mapaMarcoTablaStatus.set("CerradaVenta", marcoTablaCerradasVenta);
mapaMarcoTablaStatus.set("CerradaRenta", marcoTablaCerradasRenta);
