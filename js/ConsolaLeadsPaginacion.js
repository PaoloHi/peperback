var currentLeadsInteresadosPage = {
    'prospecto': 1,
    'oportunidad': 1,
    'entrega': 1,
    'cierre': 1,
    'lealtad': 1,
    'nointeresado': 1
};

HideAllLeadInteresadosRows();
UpdatePageContent('prospecto', currentLeadsInteresadosPage['prospecto']);

async function UpdatePageContent(fase, page) {
    try {
        let leadsInteresadosPageData = await GetLeadsInteresadosPageInformation(fase, page);
        UpdateCurrentPage(fase, page, leadsInteresadosPageData.pagesNumber);
        DeleteOlderPageBoxes(leadsInteresadosPageData.pagesNumber);
        PopulateLeadsInteresadosPagesBoxes(leadsInteresadosPageData.pagesNumber);

        UpdateNuevoLeadsInteresadosCounter(leadsInteresadosPageData.numeroNuevosLeadsInteresados);
        UpdateFaseCounters(leadsInteresadosPageData.faseCounters);

        await FillLeadsInteresadosRows('prospecto', currentLeadsInteresadosPage['prospecto']);
        await FillLeadsInteresadosRows('oportunidad', currentLeadsInteresadosPage['oportunidad']);
        await FillLeadsInteresadosRows('entrega', currentLeadsInteresadosPage['entrega']);
        await FillLeadsInteresadosRows('cierre', currentLeadsInteresadosPage['cierre']);
        await FillLeadsInteresadosRows('lealtad', currentLeadsInteresadosPage['lealtad']);
        await FillLeadsInteresadosRows('NoInteresado', currentLeadsInteresadosPage['nointeresado']);

        async function FillLeadsInteresadosRows(fase, page) {
            let leadsInteresadosData = await GetLeadsInteresadosInformation(fase, page);
            let lastFilledRowIndex = PopulateLeadsInteresadosRows(fase, leadsInteresadosData);
            HideLeadInteresadosEmptyRows(fase, lastFilledRowIndex);
        }

    }
    catch {
        Swal.fire({
            confirmButtonColor: '#ff9800',
            title: 'Hubo un error inesperado',
            html: 'Intente de nuevo mas tarde',
            icon: 'error'
        });
    }
}

async function GetLeadsInteresadosInformation(fase, page) {
    let apiURL = `../Contact/GetLeadsInteresados?fase=${fase}&page=${page}`;
    let requestResponse = await fetch(apiURL, {
        method: 'get'
    });

    if (requestResponse.ok == false) {
        throw new Error('La API no pudo devolver una respuesta exitosa');
    }

    return await requestResponse.json();
}

function PopulateLeadsInteresadosRows(fase, leadsDataCollection) {
    for (i = 0; i < leadsDataCollection.length; i++) {
        let row = document.getElementById(`${fase}-row-${i}`);
        let rowFecha = document.getElementById(`${fase}-fecha-${i}`);
        let rowNombre = document.getElementById(`${fase}-nombre-${i}`);
        let rowCorreo = document.getElementById(`${fase}-correo-${i}`);
        let rowTelefono = document.getElementById(`${fase}-telefono-${i}`);
        let rowEtapa = document.getElementById(`${fase}-etapa-${i}`);
        let rowEstatus = document.getElementById(`${fase}-estatus-${i}`);
        let rowVerMas = document.getElementById(`${fase}-ver-mas-${i}`);

        rowFecha.textContent = new Date(leadsDataCollection[i].Fecha).toISOString().split('T')[0];
        rowNombre.textContent = `${leadsDataCollection[i].Nombre} ${leadsDataCollection[i].ApellidoPaterno}`;
        rowCorreo.textContent = leadsDataCollection[i].Email;
        rowTelefono.textContent = leadsDataCollection[i].Telefono;
        rowEtapa.textContent = leadsDataCollection[i].EtapaNombre;
        rowEstatus.textContent = leadsDataCollection[i].EstatusNombre;
        rowVerMas.href = `/Contact/DetallesDeLeadInteresado?leadInteresadoID=${leadsDataCollection[i].ID}`;

        ApplyStylesToLeadInteresadosEtapaAndEstatus(fase, leadsDataCollection[i].EtapaNombre, leadsDataCollection[i].EstatusNombre, i);
        row.style.display = 'table-row';
    }

    let lastFilledRowIndex = leadsDataCollection.length - 1;
    return lastFilledRowIndex;
}

function HideLeadInteresadosEmptyRows(fase, lastFilledRowIndex) {
    for (i = lastFilledRowIndex + 1; i < 10; i++) {
        let row = document.getElementById(`${fase}-row-${i}`);
        row.style.display = 'none';
    }
}

function HideAllLeadInteresadosRows() {
    HideRows('prospecto');
    HideRows('oportunidad');
    HideRows('entrega');
    HideRows('cierre');
    HideRows('lealtad');
    HideRows('NoInteresado');

    function HideRows(fase) {
        for (i = 0; i < 10; i++) {
            let row = document.getElementById(`${fase}-row-${i}`);
            row.style.display = 'none';
        }
    }
}

function ApplyStylesToLeadInteresadosEtapaAndEstatus(fase, etapa, estatus, index) {
    let rowEtapa = document.getElementById(`${fase}-etapa-${index}`);
    let rowEstatus = document.getElementById(`${fase}-estatus-${index}`);

    if (rowEtapa.classList.length > 1 && rowEtapa.classList.contains('bg-noInteresados-etapa1') == false) {
        let lastEtapaClass = rowEtapa.classList.item(rowEtapa.classList.length - 1);
        let lastEstatusClass = rowEstatus.classList.item(rowEstatus.classList.length - 1);

        rowEtapa.classList.remove(lastEtapaClass);
        rowEstatus.classList.remove(lastEstatusClass);
    }

    switch (fase) {
        case 'prospecto':
            let prospectoStyleClass = GetLeadsInteresadosProspectoEtapaStyleClass(etapa);
            let prospectoEstatusStyleClass = GetEstatusStyleClass(estatus);
            rowEtapa.classList.add(prospectoStyleClass);
            rowEstatus.classList.add(prospectoEstatusStyleClass);
            break;
        case 'oportunidad':
            let oportunidadStyleClass = GetLeadsInteresadosOportunidadStyleClass(etapa);
            let oportunidadEstatusStyleClass = GetEstatusStyleClass(estatus);
            rowEtapa.classList.add(oportunidadStyleClass);
            rowEstatus.classList.add(oportunidadEstatusStyleClass);
            break;
        case 'entrega':
            let entregaStyleClass = GetLeadsInteresadosEntregaStyleClass(etapa);
            let entregaEstatusStyleClass = GetEstatusStyleClass(estatus);
            rowEtapa.classList.add(entregaStyleClass);
            rowEstatus.classList.add(entregaEstatusStyleClass);
            break;
        case 'cierre':
            let cierreStyleClass = GetLeadsInteresadosCierreStyleClass(etapa);
            let cierreEstatusStyleClass = GetEstatusStyleClass(estatus);
            rowEtapa.classList.add(cierreStyleClass);
            rowEstatus.classList.add(cierreEstatusStyleClass);
            break;
        case 'lealtad':
            let lealtadStyleClass = GetLeadsInteresadosLealtadStyleClass(etapa);
            let lealtadEstatusStyleClass = GetEstatusStyleClass(estatus);
            rowEtapa.classList.add(lealtadStyleClass);
            rowEstatus.classList.add(lealtadEstatusStyleClass);
            break;
    }
}

function GetLeadsInteresadosProspectoEtapaStyleClass(etapa) {
    switch (etapa) {
        case 'Nuevo':
            return 'bg-prospectos-etapa1';

        case 'Informes':
            return 'bg-prospectos-etapa2';

        case 'Visita':
            return 'bg-prospectos-etapa3';
    }
}

function GetLeadsInteresadosOportunidadStyleClass(etapa) {
    switch (etapa) {
        case 'Carta oferta':
            return 'bg-oportunidad-etapa1';

        case 'Anticipo':
            return 'bg-oportunidad-etapa2';

        case 'Contrato compra/venta-renta':
            return 'bg-oportunidad-etapa3';

        case 'Enganche':
            return 'bg-oportunidad-etapa4';

        case 'Enganche a propietario':
            return 'bg-oportunidad-etapa5';
    }
}

function GetLeadsInteresadosEntregaStyleClass(etapa) {
    switch (etapa) {
        case 'Cita con notario':
            return 'bg-entrega-etapa1';

        case 'Pago total del inmueble':
            return 'bg-entrega-etapa2';

        case 'Firma de escritura':
            return 'bg-entrega-etapa3';

        case 'Firma de contrato':
            return 'bg-entrega-etapa4';
    }
}

function GetLeadsInteresadosCierreStyleClass(etapa) {
    switch (etapa) {
        case 'Copia de escritura':
            return 'bg-cierre-etapa1';

        case 'Factura comisión rummet':
            return 'bg-cierre-etapa2';

        case 'Factura comisión broker':
            return 'bg-cierre-etapa3';

        case 'Pago de comisión broker':
            return 'bg-cierre-etapa4';
    }
}


function GetLeadsInteresadosLealtadStyleClass(etapa) {
    switch (etapa) {
        case 'Encuesta de satisfacción':
            return 'bg-lealtad-etapa1';
    }
}

function GetEstatusStyleClass(estatus) {
    switch (estatus) {
        case 'Pendiente':
            return 'bg-pendiente';
        case 'Re agendada':
            return 'bg-reagendada';
        case 'Cerrada':
            return 'bg-cerrado';
        case 'Enviado':
        case 'Enviada':
            return 'bg-enviado';
        case 'Firmado':
            return 'bg-firmado';
        case 'Recibido':
        case 'Recibida':
        case 'Realizada':
            return 'bg-recibido';
        case 'Agendada':
            return 'bg-agendada';
        case 'Nuevo':
            return 'bg-prospectos-nuevo';
        case 'Informes':
            return 'bg-prospectos-informes';
        default:
            return 'bg-negativo';
    }
}

async function GetLeadsInteresadosPageInformation() {
    const apiURL = '../Contact/GetLeadsInteresadosPageInformation';
    let requestResponse = await fetch(apiURL, {
        method: 'get'
    });

    if (requestResponse.ok == false) {
        throw new Error('La API no pudo devolver una respuesta exitosa');
    }

    return await requestResponse.json();
}

function UpdateCurrentPage(fase, desiredPage, pagesData) {
    currentLeadsInteresadosPage[fase] = desiredPage;

    FixCurrentPage('prospecto');
    FixCurrentPage('oportunidad');
    FixCurrentPage('entrega');
    FixCurrentPage('cierre');
    FixCurrentPage('lealtad');
    FixCurrentPage('NoInteresado');

    function FixCurrentPage(fase) {
        if (currentLeadsInteresadosPage[fase] > pagesData[fase] && pagesData[fase] != 0) {
            currentLeadsInteresadosPage[fase] = pagesData[fase];
        }
    }
}

function DeleteOlderPageBoxes() {
    DeleteBucle('prospecto');
    DeleteBucle('oportunidad');
    DeleteBucle('entrega');
    DeleteBucle('cierre');
    DeleteBucle('lealtad');
    DeleteBucle('nointeresado');

    function DeleteBucle(fase) {
        let pagesBoxesContainer = document.getElementById(`${fase}-pages-boxes-container`);
        while (pagesBoxesContainer.childElementCount > 0) {
            pagesBoxesContainer.removeChild(pagesBoxesContainer.lastChild);
        }
    }
}

function PopulateLeadsInteresadosPagesBoxes(pagesNumberDictionary) {
    PopulateBucle('prospecto');
    PopulateBucle('oportunidad');
    PopulateBucle('entrega');
    PopulateBucle('cierre');
    PopulateBucle('lealtad');
    PopulateBucle('nointeresado');

    function PopulateBucle(fase) {
        let pagesBoxesContainer = document.getElementById(`${fase}-pages-boxes-container`);
        let childNumber = pagesBoxesContainer.childElementCount == 0 ? 1 : pagesBoxesContainer.childElementCount;

        for (i = childNumber; i <= pagesNumberDictionary[fase]; i++) {
            let childElement = `<li class="page-item"><a class="page-link" onclick="UpdatePageContent(\'${fase}\', ${i})">${i}</a></li>`
            pagesBoxesContainer.insertAdjacentHTML("beforeend", childElement);
        }
    }
}

function UpdateNuevoLeadsInteresadosCounter(counter) {
    let nuevoLeadsInteresadosCounter = document.getElementById('cart-count-interesados');
    nuevoLeadsInteresadosCounter.textContent = counter;
}
function UpdateFaseCounters(faseCountersDictionary) {
    let prospectoCounter = document.getElementById('prospecto-counter');
    let oportunidadCounter = document.getElementById('oportunidad-counter');
    let entregaCounter = document.getElementById('entrega-counter');
    let cierreCounter = document.getElementById('cierre-counter');
    let lealtadCounter = document.getElementById('lealtad-counter');
    let noInteresadoCounter = document.getElementById('NoInteresado-counter');

    prospectoCounter.textContent = `${faseCountersDictionary['prospecto']}`;
    oportunidadCounter.textContent = `${faseCountersDictionary['oportunidad']}`;
    entregaCounter.textContent = `${faseCountersDictionary['entrega']}`;
    cierreCounter.textContent = `${faseCountersDictionary['cierre']}`;
    lealtadCounter.textContent = `${faseCountersDictionary['lealtad']}`;
    noInteresadoCounter.textContent = `${faseCountersDictionary['nointeresado']}`;
}