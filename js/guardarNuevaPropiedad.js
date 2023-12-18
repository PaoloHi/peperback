
class Imagen {
    constructor(file, ordenImagen) {
        this.file = file;
        this.nombre = this.generateGuid();
        this.ordenImagen = ordenImagen
    }

    generateGuid() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 10) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(10);
        });
    }

    setOrden(ordenNuevo) {
        this.ordenImagen = ordenNuevo;
    }

}


const listaImagenes = document.getElementById('imagenesLista')


const alertImgNotSupport = {
    icon: 'error',
    title: 'Ups... algunas imagenes no se puedieron cargar',
    text: 'Solo puedes subir imagenes con extension .jpeg, .png, .gif, .webp',
    confirmButtonColor: '#ff9800'
}


const alertImageSize = {
    icon: 'error',
    title: 'Ups..... algunas imagenes no se pudieron subir',
    text: 'Solo puedes subir imagens con peso menor a 10 MgBytes',
    confirmButtonColor : '#ff9800'
}


//para insertar imagenes

var supportedImages = ["image/jpeg", "image/png", "image/gif", "image/webp"];
var ImagenesGuardar = [];

const TenMegaBytes = 10000000;

$(document).on("change", "#add-new-photo", function () {

    var files = this.files;

    var ImagesNotSupported = false
    var ImageSizeSiNotSupported = false;
    for (file of files) {
        if (file.size > TenMegaBytes) {
            ImageSizeSiNotSupported = true; 
        }
        else if(!supportedImages.includes(file.type)) {
            ImagesNotSupported = true;
        } else {
            const oImagen = new Imagen(file);
            ImagenesGuardar.push(oImagen);
            const ImagenNombre = file.name;
            insertarImg(oImagen.file, oImagen.nombre, ImagenNombre);
        }

    }
    if (ImagesNotSupported) Swal.fire(alertImgNotSupport);
    if (ImageSizeSiNotSupported) Swal.fire(alertImageSize);
    activarCarrusel(carrusel);
    activarCarrusel(miniCarrusel);

    validarNumeroImagenes();
    MoverArrayImagenes(ImagenesGuardar);
});

///////////////// variables 
var miniCarrusel = document.getElementById("lista_imgMini");
var carrusel = document.getElementById("listaImagenes");
const addPhotoContainer = document.getElementById('add-photo-container')


const divMiniCarrusel = (CarruselItemHashId, UrlImage) => {
    return `
  <div class="carousel-item"  id="miniCar${CarruselItemHashId}">
    <img class="d-block img-fluid img-size-mp" src="${UrlImage}">
  </div>`;
}

const divCarrusel = (CarruselItemHashId, UrlImage) => {
    return `<div class="carousel-item image-contain"   id="Car${CarruselItemHashId}"> 
        <img class="d-block vista-border-r size-v-image" src="${UrlImage}" > 
     </div>`;
}

const img = (HashImg, UrlImage, dragableName) => {
    return `
    <div class="col-xl col-lg-2 col-md-3 col-sm-4 col-xs-12" data-id="${dragableName}" id="Img_${HashImg}">
      <div class="image-container">
        <figure>
          <img src="${UrlImage}" alt="Foto del usuario">
          <figcaption onclick="eliminarimgNP('${HashImg}')">
            <i class="fa-solid fa-trash-can"></i>
          </figcaption>
        </figure>
      </div>
    </div>`;
}

const imgDespuesCarrusel = (HashId, UrlImg) => {
    return `<img  id="Car${HashId}" src="${UrlImg}" alt="" class=" vista-border-r  size-v-second-image mt-1 me-3 mb-3">`
}
var DespuesCarContainer = document.getElementById("DespuesCarrusel")


function insertarImg(Image, HashID, dragableName) {

    const Url = URL.createObjectURL(Image);

    if (DespuesCarContainer.childElementCount < 2) {
        DespuesCarContainer.innerHTML += imgDespuesCarrusel(HashID, Url)
    } else {

        carrusel.innerHTML += divCarrusel(HashID, Url)
    }

    const ImgElem = $(img(HashID, Url, dragableName));
    $(ImgElem).insertBefore("#add-photo-container");

    miniCarrusel.innerHTML += divMiniCarrusel(HashID, Url);
}


function quitarImg(HashID) {
    const ItemMinCar = 'miniCar' + HashID;
    const ItemCar = 'Car' + HashID;
    const ImageItem = 'Img_' + HashID;


    [ImageItem, ItemCar, ItemMinCar].forEach(IdImg => {
        var ImgDelete = document.getElementById(IdImg);
        ImgDelete.remove();
    })
    ImagenesGuardar = ImagenesGuardar.filter(img => img.nombre != HashID);
}



async function MoverArrayImagenes(Imagenes) {
    // Obtener el elemento input
    const inputElement = document.getElementById("add-new-photo");

    const dataTransfer = new DataTransfer();


    for (const img of Imagenes) {
        dataTransfer.items.add(img.file);
    }
    inputElement.files = dataTransfer.files;

}



const SweetAlertConfig = {
    title: '¿Está seguro que desea eliminar esta imagen?',
    html: "Esta acción es irreversible.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff9800',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
}


const SweetAlertEliminada = {
    title: 'Imagen Eliminada',
    html: "La imagen fue eliminada con éxito.",
    icon: 'success',
    confirmButtonColor: '#ff9800'
}
function eliminarimgNP(HashId) {

    Swal.fire(SweetAlertConfig).then((result) => {
        if (result.isConfirmed) {
            quitarImg(HashId);

            var imgGuardar = ImagenesGuardar.filter(img => img.nombre != HashId);
            validarNumeroImagenes();
            MoverArrayImagenes(imgGuardar);
            completarCarrusel()
            activarCarrusel(carrusel);
            activarCarrusel(miniCarrusel);

        }

        /*
        else if (result.isConfirmed && numImgs <= 5) {
            Swal.fire({
                title: 'Debes subir más de 5 imágenes y menos de 20',
                icon: 'warning',
                confirmButtonColor: '#ff9800',
                confirmButtonText: 'Ok',
            })
        }
        */

    })
}



function eliminarimg(IDimg, IndiceVistaImg) {

    Swal.fire(SweetAlertConfig).then((result) => {
        if (result.isConfirmed && numImgs > 5) {

            $.ajax({
                type: 'POST',
                url: '/Propiedades/eliminarImagen',
                data: { IDimgPropiedad: IDimg },
                success: function (result) {
                    Swal.fire(SweetAlertEliminada)
                    quitarImg(IndiceVistaImg);
                    validarNumeroImagenes();
                    completarCarrusel()
                    activarCarrusel(carrusel);
                    activarCarrusel(miniCarrusel);

                },
                error: function () {

                }
            });
        }
        /*
        else if (result.isConfirmed && numImgs <= 5) {
            Swal.fire({
                title: 'Debes subir más de 5 imágenes y menos de 20',
                icon: 'warning',
                confirmButtonColor: '#ff9800',
                confirmButtonText: 'Ok',
            })
        }
        */
    })
}



function activarCarrusel(car) {
    if (car.childElementCount > 0) {
        elementosCarrusel = car.children

        for (ele of elementosCarrusel) {

            var elementClass = ele.classList;
            if (elementClass.value.includes('active')) {
                elementClass.remove('active');
            }
        }
        car.children[0].classList.add('active')
    }
}


function completarCarrusel() {
    if (DespuesCarContainer.childElementCount < 2 && carrusel.childElementCount > 0) {

        var imgEle = carrusel.children[0];

        var url = imgEle.children[0].src
        var hash = imgEle.id.replace("Car", "")
        DespuesCarContainer.innerHTML += imgDespuesCarrusel(hash, url)
        DespuesCarContainer.children[1].classList.add('ms-3')
        imgEle.remove()

    }
}


document.addEventListener("DOMContentLoaded", function () {
    const btnFinish = document.querySelector(".btn-finish");
    numImgs = miniCarrusel.childElementCount

    btnFinish.addEventListener("click", function () {
        if (numImgs != 0 && (numImgs < 5 || numImgs > 20)) {
            Swal.fire({
                title: 'Debes subir más de 5 imágenes y menos de 20',
                icon: 'warning',
                confirmButtonColor: '#ff9800',
                confirmButtonText: 'Ok',
            })
        }
    });
});




function validarNumeroImagenes() {
    botonFinalizar = $("#btn-finalizar");
    numImgs = miniCarrusel.childElementCount;

    if (numImgs != 0 && (numImgs < 5 || numImgs > 20)) {
        botonFinalizar.attr("type", "button");
    } else {
        botonFinalizar.attr("type", "submit");
    }
}




$(document).ready(function () {
    $("#TipoPropiedadID").change(function () {
        $.get("/Propiedades/ObtSubtipoProp", { TipoP: $("#TipoPropiedadID").val() }, function (data) {
            // VACIAMOS EL DropDownList
            $("#SubTipoPropiedadID").empty();
            $("#SubTipoPropiedadID").append("<option value> -- Subtipo --</option>")
            // CONSTRUIMOS EL DropDownList A PARTIR DEL RESULTADO Json (data)
            $.each(data, function (index, row) {
                $("#SubTipoPropiedadID").append("<option value='" + row.iDsubtipoP + "'>" + row.subtipo + "</option>")
            });
        });
    });
});




$(function () {
    $("#CP, #n_calle, #n_interior, #n_exterior, #Colonia, #estado, #alc-municipio, #pais").on('change', function () {
        moveMap(document.getElementById("txtLat").value, document.getElementById("txtLng").value);
    })
});

//estas funciones hay que reutilizarlas del documento googleMaps.js 
function movePin() { // funcion para cambiar mapa con los campos ingresados de los inputs
    var geocoder = new google.maps.Geocoder();
    var textCalle = document.getElementById("n_calle").value;
    var textColonia = document.getElementById("colonia").value;
    var textNumInt = document.getElementById("n_interior").value;
    var textNumExt = document.getElementById("n_exterior").value;
    var textAlcMuni = document.getElementById("alc-municipio").value;
    var textEstado = document.getElementById("estado").value;
    var textPais = document.getElementById("pais").value;
    var textCP = document.getElementById("CP").value;
    var direccionCompleta = textCalle + ' ' + textNumExt +' '+ textColonia + ' ' + textAlcMuni + ' ' + textEstado + ' ' + textPais + ' ' + textCP; // varaible con el valor de los inputs juntos
    console.log(direccionCompleta);

    // Igresando texto de direccion completa en el input de direccion completa
    if (textNumInt == "") {
        var txtInputDireccionCompleta = direccionCompleta;
        document.getElementById('direccion_completa').value = txtInputDireccionCompleta;
    } else {
        var txtInputDireccionCompleta = direccionCompleta;
        document.getElementById('direccion_completa').value = txtInputDireccionCompleta;
    }
}



$(function () {
    $("#nombre_propiedad, #TipoPropiedadID, #precioProp, #IDMoneda, #descripcion, #CP, #n_calle, #n_interior, #n_exterior, #Colonia, #estado, #alc-municipio, #pais,#direccion_completa, #Superficieval, #UnidadSuperficie, #SuperficieContruccion, #UnidadConstruccion,#valueantiguedad, #banosval, #recamarasval, #estacionamientoval, #add-new-photo, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #valBodegas, #valClosets, #valElevadores").on('change', function () {
        visualizar();
        movePin();
    })

});


var caractTab = document.getElementById('caracteristicas');
var camposCarac = caractTab.querySelectorAll('input')

camposCarac.forEach(function (input) {
    input.addEventListener('change', function () {
        visualizar();
    });

});




var verClassTipoEliminar = 'title-cards-mp-depto'

//Para la seccion de vista previa 
function visualizar() {

    // Borra todos los datos almacenados en localStorage
    localStorage.clear();

    // Datos
    var verNombreProp = document.getElementById('nombre_propiedad').value;
    var verTipoProp = document.getElementById('TipoPropiedadID').value;
    var valPrecio = document.getElementById('precioProp').value;
    var valMoneda = document.getElementById('IDMoneda').value;
    var valDescripcion = document.getElementById('descripcion').value;


    /*convirtiendo el precio de vista previa a formato numerico */
    var valor = document.getElementById("precioProp").value;
    var numero = parseFloat(valor);
    var valorFormateado = numero.toLocaleString();

    var valorFormateadoG = numero.toLocaleString();



    var valCalle = document.getElementById('n_calle').value;
    var valNoInt = document.getElementById('n_interior').value;
    var valNoExt = document.getElementById('n_exterior').value;
    var valColonia = document.getElementById('colonia').value;
    var valMunicipio = document.getElementById('alc-municipio').value;
    var valCP = document.getElementById('CP').value;
    var valEstado = document.getElementById('estado').value;
    var valPais = document.getElementById('pais').value;

    var valDireccionC = valColonia + ' ' + valMunicipio + ' ' + valEstado;
    var valSuperficie = document.getElementById('Superficieval').value;
    var valUnidadSuperficie = document.getElementById('UnidadSuperficie').value;
    var valConstruccion = document.getElementById('SuperficieContruccion').value;
    var antiguedad = document.getElementById('valueantiguedad').value;
    var valUnidadConstruccion = document.getElementById('UnidadConstruccion').value;

    var valBanos = document.getElementById('Baños').value;
    if (!valBanos) {
        valBanos = 0;
    }

    var valRecamaras = document.getElementById('Recámaras').value;
    if (!valRecamaras) {
        valRecamaras = 0;
    }
    var valEstacionamiento = document.getElementById('Estacionamientos').value;
    if (!valEstacionamiento) {
        valEstacionamiento = 0;
    }

    // Variables para la obtencion de imagenes
    var imgPropiedad = document.querySelector("#add-new-photo");
    var imagenPrevisualizacion = document.querySelector("#imgPrevisualizacion");

    //var verNombreProp = $("#nombre_propiedad").val();
    //var verTipoProp = $("#TipoPro piedadID").val();
    //var valPrecio = $("#precioProp").val();
    //var valColonia = $("#colonia").val();
    //var valMunicipio = $("#alc-muni").val();
    //var valEstado = $("#estado").val();


    //console.log(verNombreProp, verTipoProp, valPrecio, valColonia, valvalMunicipio, valEstado);



    //CARACTERISTICAS SELECCIONADAS QUE SE MUESTRAN EN VISTA PREVIA 
    var algunaCaracteristicaSeleccionada = false;



    //GENERALES*****************************************************************
    // Obtén todas las casillas de verificación de características generales
    var caracteristicasGeneralesCheckboxes = document.querySelectorAll('.caracteriticasGeneralesJS');
    var caracteristicasSeleccionadasGenerales = document.getElementById('caracteristicasSeleccionadasGenerales');

    // Vacía la lista actual para mostrar solo las características seleccionadas
    caracteristicasSeleccionadasGenerales.innerHTML = '';

    // Recorre las casillas de verificación de características generales
    caracteristicasGeneralesCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var caracteristicaTexto = checkbox.parentNode.querySelector('label').textContent;
            var listItem = document.createElement('li');
            listItem.textContent = caracteristicaTexto;
            caracteristicasSeleccionadasGenerales.appendChild(listItem);
            algunaCaracteristicaSeleccionada = true;
        }
    });

    //verificando si existe alguna caracteristica seleccionada para mostrar o no mostrar el div
    var generalesDiv = document.getElementById('generalesDiv');
    if (caracteristicasSeleccionadasGenerales.children.length > 0) {
        generalesDiv.style.display = 'block';
    } else {
        generalesDiv.style.display = 'none';

    }


    //SERVICIOS*****************************************************************
    var caracteristicasServiciosCheckboxes = document.querySelectorAll('.caracteristicasServicios');

    var caracteristicasSeleccionadasServicios = document.getElementById('caracteristicasSeleccionadasServicios');
    caracteristicasSeleccionadasServicios.innerHTML = "";

    caracteristicasServiciosCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var caracteristicaTexto = checkbox.parentNode.querySelector('label').textContent;
            var listItem = document.createElement('li');
            listItem.textContent = caracteristicaTexto;
            caracteristicasSeleccionadasServicios.appendChild(listItem);
            algunaCaracteristicaSeleccionada = true;
        }
    })

    //verificando si existe alguna caracteristica seleccionada para mostrar o no mostrar el div
    var serviciosDiv = document.getElementById('serviciosDiv');
    if (caracteristicasSeleccionadasServicios.children.length > 0) {
        serviciosDiv.style.display = 'block';
    } else {
        serviciosDiv.style.display = 'none';

    }

    //EXTERIORES********************************************************************
    var caracteristicasExterioresCheckboxes = document.querySelectorAll('.caracteristicasExteriores');
    var caracteristicasSeleccionadasExteriores = document.getElementById('caracteristicasSeleccionadasExteriores');
    caracteristicasSeleccionadasExteriores.innerHTML = "";

    caracteristicasExterioresCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var caracteristicaTexto = checkbox.parentNode.querySelector('label').textContent;
            var listItem = document.createElement('li');
            listItem.textContent = caracteristicaTexto;
            caracteristicasSeleccionadasExteriores.appendChild(listItem);
            algunaCaracteristicaSeleccionada = true;
        }
    })

    var exterioresDiv = document.getElementById('exterioresDiv');
    if (caracteristicasSeleccionadasExteriores.children.length > 0) {
        exterioresDiv.style.display = 'block';
    } else {
        exterioresDiv.style.display = 'none';

    }

    //AMBIENTES***********************
    var caracteristicasAmbientesCheckboxes = document.querySelectorAll('.caracteristicasAmbientes');
    var caracteristicasSeleccionadasAmbientes = document.getElementById('caracteristicasSeleccionadasAmbientes');
    caracteristicasSeleccionadasAmbientes.innerHTML = "";

    caracteristicasAmbientesCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var caracteristicaTexto = checkbox.parentNode.querySelector('label').textContent;
            var listItem = document.createElement('li');
            listItem.textContent = caracteristicaTexto;
            caracteristicasSeleccionadasAmbientes.appendChild(listItem);
            algunaCaracteristicaSeleccionada = true;
        }
    });

    var ambientesDiv = document.getElementById('ambientesDiv');
    if (caracteristicasSeleccionadasAmbientes.children.length > 0) {
        ambientesDiv.style.display = 'block';
    } else {
        ambientesDiv.style.display = 'none';

    }

    //ADICIONALES*********************************
    // Obtener los elementos de entrada y la lista donde mostrar las características seleccionadas
    //var valBodegas = document.getElementById('Bodega(s)').value;
    //var verBodegas = document.getElementById('Bodega(s)');
    //var txtBodegas = '';
    //var adicionalesDiv = document.getElementById('adicionalesDiv');


    //if (valBodegas == 1) {
    //    txtBodegas = ' Bodega';
    //} else {
    //    txtBodegas = ' Bodegas';
    //}

    //if (valBodegas == 0) {
    //    verBodegas.innerHTML = '';
    //    /*
    //     verBodegas.style.visibility = 'hidden';
    //    verBodegas.style.overflow = 'hidden';
    //    verBodegas.style.position = 'absolute';
    //    */

    //}
    //else {
    //    verBodegas.innerHTML = valBodegas + txtBodegas;
    //    /*
    //      verBodegas.style.visibility = 'visible';
    //    verBodegas.style.overflow = 'visible';
    //    verBodegas.style.position = 'static';
    //    */

    //}


    //var valClosets = document.getElementById('Closets').value;
    //var verClosets = document.getElementById('Closets');
    //var txtClosets = '';


    //if (valClosets == 1) {
    //    txtClosets = ' Closet';
    //} else {
    //    txtClosets = ' Closets';
    //}

    //if (valClosets == 0) {
    //    verClosets.innerHTML = '';
    //    /*
    //     verClosets.style.visibility = 'hidden';
    //    verClosets.style.overflow = 'hidden';
    //    verClosets.style.position = 'absolute';
    //    */

    //}
    //else {
    //    verClosets.innerHTML = valClosets + txtClosets;
    //    /*
    //       verClosets.style.visibility = 'visible';
    //    verClosets.style.overflow = 'visible';
    //    verClosets.style.position = 'static';
    //    */

    //}


    //var valElevadores = document.getElementById('Elevadores').value;
    //var verElevadores = document.getElementById('Elevadores');
    //var txtElevadores = '';


    //if (valClosets == 1) {
    //    txtElevadores = ' Elevador';
    //} else {
    //    txtElevadores = ' Elevadores';
    //}

    //if (valElevadores == 0) {
    //    verElevadores.innerHTML = '';
    //    /*
    //    verElevadores.style.visibility = 'hidden';
    //    verElevadores.style.overflow = 'hidden';
    //    verElevadores.style.position = 'absolute';
    //    */

    //}
    //else {
    //    verElevadores.innerHTML = valElevadores + txtElevadores;
    //    /*
    //    verElevadores.style.visibility = 'visible';
    //    verElevadores.style.overflow = 'visible';
    //    verElevadores.style.position = 'static';
    //    */

    //}


    //////////////////////////////////////////////////////////////////////////////////////////////
    var caracteristicasAdicionalesInputNumber = document.querySelectorAll('.caracteristicasAdicionales');
    var caracteristicasSeleccionadasAdicionales = document.getElementById('caracteristicasSeleccionadasAdicionales');
    var adicionalesDiv = document.getElementById('adicionalesDiv');
    caracteristicasSeleccionadasAdicionales.innerHTML = "";
    var numerosSeleccionadosAdiccionales = false;

    caracteristicasAdicionalesInputNumber.forEach(function (inputNumerico) {
        const valor = inputNumerico.value + " " + inputNumerico.id;

        if (inputNumerico.value > 0) {
            var listItem = document.createElement('li');
            listItem.textContent = valor;
            caracteristicasSeleccionadasAdicionales.appendChild(listItem);
            algunaCaracteristicaSeleccionada = true;
            numerosSeleccionadosAdiccionales = true;
        }
    });

    if (numerosSeleccionadosAdiccionales) {
        adicionalesDiv.style.display = "block";
        algunaCaracteristicaSeleccionada = true;
    } else {
        adicionalesDiv.style.display = "none";
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //TODAS LAS SECCIONES OCULTAS Y MOSTRANDO EL TEXTO 
    var caracteristicasCollapsable = document.getElementById("caracteristicasCollapsable");
    if (algunaCaracteristicaSeleccionada) {
        caracteristicasCollapsable.style.display = "none"; // Si hay alguna característica seleccionada === oculta el mensaje
    } else {
        caracteristicasCollapsable.style.display = "block"; // Si no hay características seleccionadas === muestra el mensaje
    }


    // Agregando nombre de la propiedad en vista
    document.getElementById('verNombre').innerHTML = verNombreProp;
    document.getElementById('verNombre2').innerHTML = verNombreProp;


    //para nueva y edicion	
    /*seleccionando inputs de tipo de opercion y el etiquetado donde depositaremos el resultado */
    var TipoDeOperacion = document.querySelectorAll('input[name="Operacion"]');
    var etiquetadoOperacion = document.querySelector('.etiquetadoOperacion');
    var etiquetadoOperacionXL = document.querySelector('.etiquetadoOperacionXL');
    var txtOperacionElements = document.querySelectorAll('.txtOperacion');
    function actualizarEtiquetasOperacion() {
        var valorSeleccionado = document.querySelector('input[name="Operacion"]:checked').value;
        etiquetadoOperacion.classList.toggle('operacionVenta', valorSeleccionado === "1");
        etiquetadoOperacionXL.classList.toggle('operacionVenta', valorSeleccionado === "1");
        etiquetadoOperacion.classList.toggle('operacionRenta', valorSeleccionado !== "1");
        etiquetadoOperacionXL.classList.toggle('operacionRenta', valorSeleccionado !== "1");
        var nuevoContenido = (valorSeleccionado === "1") ? "Venta" : "Renta";
        txtOperacionElements.forEach(function (element) {
            element.innerHTML = nuevoContenido;
        });
    }
    //para cargar el valor de operacion que tenga inicialmetne	
    actualizarEtiquetasOperacion();
    // para actualizarlo cada vesz que cambie  	
    TipoDeOperacion.forEach(function (operacion) {
        operacion.addEventListener('change', actualizarEtiquetasOperacion);
    });



    document.getElementById('etiquetadoSM').classList.remove(verClassTipoEliminar);
    document.getElementById('etiquetadoXX').classList.remove(verClassTipoEliminar);
    // Agregnado Tipo Propiedad en vista/// 

    const propiedades = {
        1: { abrev: 'Depto', txt: 'Departamento', class: 'title-cards-mp-depto' },
        2: { abrev: 'Bodega', txt: 'Bodega', class: 'title-cards-mp-bodega' },
        3: { abrev: 'Casa', txt: 'Casa', class: 'title-cards-mp-casa' },
        4: { abrev: 'Edif', txt: 'Edificio', class: 'title-cards-mp-edificio' },
        5: { abrev: 'Huerta', txt: 'Huerta', class: 'title-cards-mp-huerta' },
        6: { abrev: 'Local', txt: 'Local comercial', class: 'title-cards-mp-local' },
        7: { abrev: 'Nave', txt: 'Nave industrial', class: 'title-cards-mp-nave' },
        8: { abrev: 'Ofic', txt: 'Oficina', class: 'title-cards-mp-oficina' },
        9: { abrev: 'Quinta', txt: 'Quinta', class: 'title-cards-mp-quinta' },
        10: { abrev: 'Rancho', txt: 'Rancho', class: 'title-cards-mp-rancho' },
        11: { abrev: 'Terreno', txt: 'Terreno/Lote', class: 'title-cards-mp-terreno' },
        12: { abrev: 'Villa', txt: 'Villa', class: 'title-cards-mp-villa' },
        13: { abrev: 'Hosp.', txt: 'Hospital', class: 'title-cards-mp-hospital' },
        14: { abrev: 'Esc.', txt: 'Escuela', class: 'title-cards-mp-escuela' }
    };


    const verAbrevTipo = propiedades[verTipoProp]?.abrev || '';
    const verTxtProp = propiedades[verTipoProp]?.txt || '';
    const verClassTipo = propiedades[verTipoProp]?.class || 'title-cards-mp-depto';
    verClassTipoEliminar = verClassTipo;

    document.getElementById('verTipoProp').innerHTML = verAbrevTipo;
    document.getElementById('verTipoProp2').innerHTML = verTxtProp;
    document.getElementById('etiquetadoSM').classList.add(verClassTipo);
    document.getElementById('etiquetadoXX').classList.add(verClassTipo);


    //    document.getElementById('etiquetaTipo2').classList.add(verClassTipo);


    // Agregar ver Precio

    var verAbrevMoneda = '';
    if (valMoneda == 1) {
        verAbrevMoneda = 'MXN';
    } if (valMoneda == 2) {
        verAbrevMoneda = 'USD';
    }



    var valorFormateadoG = numero.toLocaleString();

    document.getElementById('verPrecio').innerHTML = valorFormateado + ' ' + verAbrevMoneda;
    document.getElementById('verPrecio2').innerHTML = valorFormateadoG + ' ' + verAbrevMoneda;




    // Agregar ver Ubicacion

    document.getElementById('verUbicacion').innerHTML = valDireccionC;
    /* document.getElementById('verEstado').innerHTML = valEstado;*/

    document.getElementById('verCalle').innerHTML = valColonia + ' ' + valMunicipio + ' ' + valEstado;
    //document.getElementById('verNoInt').innerHTML = valNoInt;
    //document.getElementById('verNoExt').innerHTML = valNoExt;
    //document.getElementById('verColonia').innerHTML = valColonia;
    //document.getElementById('verCP').innerHTML = valCP;
    //document.getElementById('verMunicipio').innerHTML = valMunicipio;
    //document.getElementById('verPais').innerHTML = valPais;

    // Agregar Superficie

    var Unidad = '';
    if (valUnidadSuperficie == 1) {
        Unidad = 'm2';
    } if (valUnidadSuperficie == 2) {
        Unidad = 'ha';
    }

    var UnidadCons = '';
    if (valUnidadConstruccion == 1) {
        UnidadCons = 'm2';
    } if (valUnidadConstruccion == 2) {
        UnidadCons = 'ha';
    }

    document.getElementById('verSuperficie').innerHTML = valSuperficie + ' ' + Unidad;
    document.getElementById('verSuperficie2').innerHTML = valSuperficie + ' ' + Unidad;
    document.getElementById('verConstruccion').innerHTML = valConstruccion + ' ' + UnidadCons;
    document.getElementById('outputAntiguedad').innerHTML = antiguedad + ' ' + 'años ';

    // Agregando datos de caracteristicas
    var txtBanos = ' Baño';
    var txtEstacionamiento = ' Estacionamiento';
    var txtRecamaras = ' Recámaras';
    if (valBanos > 1) {
        txtBanos = ' Baños';
    } if (valEstacionamiento > 1) {
        txtEstacionamiento = ' Estacionamientos';
    }
    if (valRecamaras > 1) {
        txtRecamaras = ' Recámaras';
    }

    document.getElementById('verBanos').innerHTML = valBanos;
    document.getElementById('verBanos2').innerHTML = valBanos + txtBanos;

    document.getElementById('verEstacionamiento').innerHTML = valEstacionamiento;
    document.getElementById('verEstacionamiento2').innerHTML = valEstacionamiento + txtEstacionamiento;

    document.getElementById('verRecamaras').innerHTML = valRecamaras;
    document.getElementById('verRecamaras2').innerHTML = valRecamaras + txtRecamaras;

    // Agregnado Descipcion
    document.getElementById('verDescripcion').innerHTML = valDescripcion;

    return verClassTipoEliminar
}

var paragraphLabel = document.querySelector('label[for="comisión"] p');

//function Mostrar() {
//    document.getElementById("renta").style.display = "inline-block";
//    //document.getelementbyid("renta2").style.display = "inline-block";
//    //document.getElementById("renta3").style.display = "inline-block";
//    document.getElementById("comisionOpcion").style.display = "block";
//    paragraphLabel.textContent = "Obtén tu comisión de acuerdo al porcentaje o al número de meses.";
//}

//function Ocultar() {
//    document.getElementById("renta").style.display = "none";
//    //document.getElementById("renta2").style.display = "none";
//    //document.getElementById("renta3").style.display = "none";
//    document.getElementById("comisionOpcion").style.display = "none";
//    paragraphLabel.textContent = "";
//}



$("#nombreBroker").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: '/Propiedades/ListarBrokers',
            dataType: "json",
            data: {
                term: request.term
            },
            success: function (data) {

                if (data.length === 0) {
                    $("#nombreBrokerLabel").text("No se encontraron resultados.");
                    // Remover la clase "miClase" del elemento con ID "miDiv"
                    $("#nombreBrokerLabel").removeClass("d-none");
                    $("#emailBroker").val(0);
                    //vaciar el campo si no se encuentra broker 

                } else {
                    $("#nombreBrokerLabel").empty();
                    response(data);


                }
            }
        });
    },
    minlength: 2,
    select: function (event, ui) {
        // Asigna el valor del nombre completo al campo de entrada
        $("#nombreBroker").val(ui.item.value);
        // Asigna el ID correspondiente al atributo data-id del campo de entrada
        $("#emailBroker").val(ui.item.email);
        // Realiza cualquier acción adicional que desees al seleccionar una opción
        return false; // Evita el comportamiento por defecto de completar el valor
    }
});



$("#nombreBroker").on("input", function () {
    var inputValue = $(this).val();

    if (inputValue === "") {
        $("#nombreBrokerLabel").empty();
        $("#emailBroker").val(0);

    };
});

function quitarAcentos(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


