// Este script viene sus funciones para los visualizadores tambien viene la función de ocultar el periodo de la propiedad en la sección general de la pagina de nueva propiedad 
// Tambien esta la función para poder subir una imagen de perfil en la pagina de nuevo usuario o edición de usuario
//Tambien esta la función del acordeon que se ocupo en la sección de caracteristicas en la pagina de nueva propiedad
// Al igual que la seleccion de estados para la seccion de zona en edición usuario

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

var auxiliar5 = '';
var auxiliar6 = '';
var auxiliar7 = '';





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


//Visualizador5

function validarExt5() {
    var archivoInput5 = document.getElementById("archivoInput5");




    if (archivoInput5.files && archivoInput5.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_5" id="id_5"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" /> </div>';

            auxiliar5 = e.target.result;

        };
        visor.readAsDataURL(archivoInput5.files[0]);
    }
}
//Visor5
function visorExt5() {
    var archivoInput5 = document.getElementById("archivoInput5");




    if (archivoInput5.files && archivoInput5.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_5" id="id_5"> <embed id="visualizador" src="' + auxiliar5 +
                '" width="270px" height="400px" /> </div>';

            auxiliar5 = e.target.result;
        };
        visor.readAsDataURL(archivoInput5.files[0]);
    }
}



// Visualizador 6
function validarExt6() {
    var archivoInput6 = document.getElementById("archivoInput6");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput6.files && archivoInput6.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_6" id="id_6"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" /> </div>';

            auxiliar6 = e.target.result;

        };
        visor.readAsDataURL(archivoInput6.files[0]);
    }
}

//Visor 6
function visorExt6() {
    var archivoInput6 = document.getElementById("archivoInput6");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput6.files && archivoInput6.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_6" id="id_6"> <embed id="visualizador" src="' + auxiliar6 +
                '" width="270px" height="400px" /> </div>';

            auxiliar2 = e.target.result;
        };
        visor.readAsDataURL(archivoInput6.files[0]);
    }
}

//Visualizador 7

function validarExt7() {
    var archivoInput7 = document.getElementById("archivoInput7");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput7.files && archivoInput7.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_7" id="id_7"> <embed id="visualizador" src="' +
                e.target.result +
                '" width="270px" height="400px" class="" /> </div>';

            auxiliar7 = e.target.result;

        };
        visor.readAsDataURL(archivoInput7.files[0]);
    }
}
//Visor 7
function visorExt7() {
    var archivoInput7 = document.getElementById("archivoInput7");
    var archivoRuta = archivoInput.value;
    var extPermitidas = /(.jpg|.pdf|.PNG|.JPEG)$/i;



    if (archivoInput7.files && archivoInput7.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            document.getElementById("visorArchivo2").innerHTML =
                '<div class="juanito_7" id="id_7"> <embed id="visualizador" src="' + auxiliar7 +
                '" width="270px" height="400px" /> </div>';

            auxiliar7 = e.target.result;
        };
        visor.readAsDataURL(archivoInput7.files[0]);
    }
}


//Funcion borrar 1
$(document).ready(function () {

 
  //Función 1
  $("#archivoInput_delete").click(function () {
    if($("#archivoInput").val() != ""){
      $("#archivoInput").val(""); 

    $(".juanito_1").hide(3000);
    $(".juanito_1").hide("fast");

    $("#visorArchivo").append("");
    console.log("Boton 3");
  }
  });
  //Función de borrar 2
  $("#archivoInput_delete2").click(function () {

    console.log("ESTE ES EL VALOR DEL INPUT2" + $("#archivoInput2").val() );
    if($("#archivoInput2").val() != ""){
      $("#archivoInput2").val("");

      $(".juanito_2").hide(3000);
      $(".juanito_2").hide("fast");
  
      $("#visorArchivo").append("");
      console.log("Botón 2");
    }

  });

//Funcion de borrar 3
$("#archivoInput_delete3").click(function () {
  if($("#archivoInput3").val() != ""){
    $("#archivoInput3").val("");

  $(".juanito_3").hide(3000);
  $(".juanito_3").hide("fast");

  $("#visorArchivo").append("");
  console.log("Boton 3");
}

});
//Funcion de borrar 4
$("#archivoInput_delete4").click(function () {
  if($("#archivoInput4").val() != ""){
    $("#archivoInput4").val("");

  $(".juanito_4").hide(3000);
  $(".juanito_4").hide("fast");

  $("#visorArchivo").append("");
  console.log("Boton 4");
}

});
    //Funcion de borrar 5
    $("#archivoInput_delete5").click(function () {
        if ($("#archivoInput5").val() != "") {
            $("#archivoInput5").val("");

            $(".juanito_5").hide(3000);
            $(".juanito_5").hide("fast");

            $("#visorArchivo2").append("");
            console.log("Boton 5");
        }

    });

    //Funcion de borrar 6
    $("#archivoInput_delete6").click(function () {
        if ($("#archivoInput6").val() != "") {
            $("#archivoInput6").val("");

            $(".juanito_6").hide(3000);
            $(".juanito_6").hide("fast");

            $("#visorArchivo2").append("");
            console.log("Boton 6");
        }

    });

    //Funcion de borrar 7
    $("#archivoInput_delete7").click(function () {
        if ($("#archivoInput7").val() != "") {
            $("#archivoInput7").val("");

            $(".juanito_7").hide(3000);
            $(".juanito_7").hide("fast");

            $("#visorArchivo2").append("");
            console.log("Boton 7");
        }

    });
});




 // Abrir el inspector de archivos


// -> Abrir el inspector de archivos

// Tomamos el evento change


// -> Cachamos el evento change

// Eliminar previsualizaciones

$(document).on("click", "#Images .image-container", function(e){
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



function percentage_2() {

  // Method returns the element of num1 id
  var num1 = document.getElementById("num1").value;
    
  // Method returns the elements of num2 id
  var num2 = document.getElementById("num2").value;
  document.getElementById("value2")
      .value = (num1 * 100) / num2 + "%";
}
/*
//Seleccion de estados para la seccion de zona en nuevo usuario
$(document).ready(function() {

  $('[name="checks[]"]').click(function() {
      
    var arr = $('[name="checks[]"]:checked').map(function(){
      return this.value;
    }).get();
    
    var str = arr.join(',');
    
    $('#arr').text(JSON.stringify(arr));
    
    $('#str').text(str);
  
  });

});
*/
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

  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid){
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
$('.acordeon').on('click','h2',function(){
	var t = $(this);
	var tp = t.next();
	var p = t.parent().siblings().find('p');
	tp.slideToggle();
	p.slideUp();
});
