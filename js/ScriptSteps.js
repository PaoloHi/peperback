const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const sameSteps = document.querySelectorAll(".btn-same");
let formStepsNum = 0;

var auxiliar1 = '';
var auxiliar2 = '';
var auxiliar3 = '';
var auxiliar4 = '';




/*
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

sameSteps.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
*/
function Mostrar() {
    document.getElementById("renta").style.display = "inline-block";
}
function Ocultar() {
    document.getElementById("renta").style.display = "none";
}
/* TAMBIEN SE PUEDE HACER DE ESA MANERA
function Mostrar(){
    const hola = document.getElementById('hola');
    hola.style.display = 'block';
}
function Ocultar(){
   const hola = document.getElementById('hola');
    hola.style.display = 'none';
}*/
//Estas funciones son para la imgen de perfil

function mostrarImagen(event) {
    var imagenSource = event.target.result;
    var previewImage = document.getElementById("preview");

    previewImage.src = imagenSource;
}

function procesarArchivo(event) {
    var imagen = event.target.files[0];

    var lector = new FileReader();

    lector.addEventListener('load', mostrarImagen, false);

    lector.readAsDataURL(imagen);
}
document.getElementById("archivo");
document.addEventListener("change", procesarArchivo, false);

//Visualizador

function validarExt() {
    


    if (archivoInput.files && archivoInput.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_1" id="id_1"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" /> </div>';

            auxiliar1 = e.target.result;

        };
        visor.readAsDataURL(archivoInput.files[0]);
    }
}
//Visor
function visorExt() {
    var archivoInput = document.getElementById("archivoInput");




    if (archivoInput.files && archivoInput.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_1" id="id_1"> <embed id="visualizador" src="' + auxiliar1 +
                '" width="270px" height="400px" /> </div>';

            auxiliar1 = e.target.result;
        };
        visor.readAsDataURL(archivoInput.files[0]);
    }
}



// Visualizador 2
function validarExt2() {
    var archivoInput2 = document.getElementById("archivoInput2");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput2.files && archivoInput2.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_2" id="id_2"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" /> </div>';

            auxiliar2 = e.target.result;

        };
        visor.readAsDataURL(archivoInput2.files[0]);
    }
}

//Visor 2
function visorExt2() {
    var archivoInput2 = document.getElementById("archivoInput2");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput2.files && archivoInput2.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_2" id="id_2"> <embed id="visualizador" src="' + auxiliar2 +
                '" width="270px" height="400px" /> </div>';

            auxiliar2 = e.target.result;
        };
        visor.readAsDataURL(archivoInput2.files[0]);
    }
}

//Visualizador 3

function validarExt3() {
    var archivoInput3 = document.getElementById("archivoInput3");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput3.files && archivoInput3.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_3" id="id_3"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" class="" /> </div>';

            auxiliar3 = e.target.result;

        };
        visor.readAsDataURL(archivoInput3.files[0]);
    }
}
//Visor 3
function visorExt3() {
    var archivoInput3 = document.getElementById("archivoInput3");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput3.files && archivoInput3.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_3" id="id_3"> <embed id="visualizador" src="' + auxiliar3 +
                '" width="270px" height="400px" /> </div>';

            auxiliar3 = e.target.result;
        };
        visor.readAsDataURL(archivoInput3.files[0]);
    }
}
//Visualizador 4
function validarExt4() {
    var archivoInput4 = document.getElementById("archivoInput4");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput4.files && archivoInput4.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_4" id="id_4"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" /> </div>';

            auxiliar4 = e.target.result;

        };
        visor.readAsDataURL(archivoInput4.files[0]);
    }
}
//Visor 4
function visorExt4() {
    var archivoInput4 = document.getElementById("archivoInput4");
    var archivoRuta = archivoInput4.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput4.files && archivoInput4.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo").innerHTML =
                '<div class="juanito_4" id="id_4"> <embed id="visualizador" src="' + auxiliar4 +
                '" width="270px" height="400px" /> </div>';

            auxiliar4 = e.target.result;
        };
        visor.readAsDataURL(archivoInput4.files[0]);
    }
}

//Eliminar archivo
/* function clearcontent(elementID) {
  document.getElementById(elementID).innerHTML = "";
} */
/*  document.getElementById("archivoInput").reset();*/
//Funcion borrar 1
$(document).ready(function () {

    $("#archivoInput").change(function () {
    })
    //Función 1
    $("#archivoInput_delete").click(function () {
        if ($("#archivoInput").val() != "") {
            $("#archivoInput").val("");

            $(".juanito_1").hide(3000);
            $(".juanito_1").hide("fast");

            $("#visorArchivo").append("");
            console.log("Boton 3");
        }
    });
    //Función de borrar 2
    $("#archivoInput_delete2").click(function () {

        console.log("ESTE ES EL VALOR DEL INPUT2" + $("#archivoInput2").val());
        if ($("#archivoInput2").val() != "") {
            $("#archivoInput2").val("");

            $(".juanito_2").hide(3000);
            $(".juanito_2").hide("fast");

            $("#visorArchivo").append("");
            console.log("Botón 2");
        }

    });

    //Funcion de borrar 3
    $("#archivoInput_delete3").click(function () {
        if ($("#archivoInput3").val() != "") {
            $("#archivoInput3").val("");

            $(".juanito_3").hide(3000);
            $(".juanito_3").hide("fast");

            $("#visorArchivo").append("");
            console.log("Boton 3");
        }

    });
    //Funcion de borrar 4
    $("#archivoInput_delete4").click(function () {
        if ($("#archivoInput4").val() != "") {
            $("#archivoInput4").val("");

            $(".juanito_4").hide(3000);
            $(".juanito_4").hide("fast");

            $("#visorArchivo").append("");
            console.log("Boton 4");
        }

    });
});



//Funciones para el visualizador de varias imagenes
//Genera las previsualizaciones
function createPreview(file) {
    var imgCodified = URL.createObjectURL(file);
    var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="fa-solid fa-trash-can"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore("#add-photo-container");
}

// Abrir el inspector de archivos

$(document).on("click", "#add-photo", function () {
    $("#add-new-photo").click();
});

// -> Abrir el inspector de archivos

// Tomamos el evento change

$(document).on("change", "#add-new-photo", function () {

    console.log(this.files);
    var files = this.files;
    var element;
    var supportedImages = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    var seEncontraronElementoNoValidos = false;

    for (var i = 0; i < files.length; i++) {
        element = files[i];

        if (supportedImages.indexOf(element.type) != -1) {
            createPreview(element);
        }
        else {
            seEncontraronElementoNoValidos = true;
        }
    }

    if (seEncontraronElementoNoValidos) {
        showMessage("Se encontraron archivos no validos.");
    }
    else {
        showMessage("Todos los archivos se subieron correctamente.");
    }

});

// -> Cachamos el evento change

// Eliminar previsualizaciones

$(document).on("click", "#Images .image-container", function (e) {
    $(this).parent().remove();
});

// -> Eliminar previsualizaciones

// Funciones para el modal que de las alertas para el visualizador de varias imagenes

function showModal(card) {
    $("#" + card).show();
    $(".modal").addClass("show");
}

function closeModal() {
    $(".modal").removeClass("show");
    setTimeout(function () {
        $(".modal .modal-card").hide();
    }, 300);
}

function loading(status, tag) {
    if (status) {
        $("#loading .tag").text(tag);
        showModal("loading");
    }
    else {
        closeModal();
    }
}

function showMessage(message) {
    $("#Message .tag").text(message);
    showModal("Message");
}

//funciones para hacer la operación de sacar el porcentaje

function percentage_1() {


    var percent = document.getElementById("percent").value;


    var num = document.getElementById("num").value;
    document.getElementById("value1")
        .value = (num / 100) * percent;


}

function percentage_2() {

    // Method returns the element of num1 id
    var num1 = document.getElementById("num1").value;

    // Method returns the elements of num2 id
    var num2 = document.getElementById("num2").value;
    document.getElementById("value2")
        .value = (num1 * 100) / num2 + "%";
}

//Seleccion de estados para la seccion de zona en nuevo usuario
$(document).ready(function () {

    $('[name="checks[]"]').click(function () {

        var arr = $('[name="checks[]"]:checked').map(function () {
            return this.value;
        }).get();

        var str = arr.join(',');

        $('#arr').text(JSON.stringify(arr));

        $('#str').text(str);

    });

});

/*Nuevo progress step*/

$(document).ready(function () {

    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
});

// Acordeon
$('.acordeon').on('click', 'h2', function () {
    var t = $(this);
    var tp = t.next();
    var p = t.parent().siblings().find('p');
    tp.slideToggle();
    p.slideUp();
});
