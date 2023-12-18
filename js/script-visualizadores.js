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
var auxiliar8 = '';




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



$(document).ready(function () {

  $("#archivoInput").change(function(){
  })
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


//Funciones para el visualizador de varias imagenes
//Genera las previsualizaciones
function createPreview(file) {
  var imgCodified = URL.createObjectURL(file);
  var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="fa-solid fa-trash-can"></i> </figcaption> </figure> </div></div>');
  $(img).insertBefore("#add-photo-container");
}

 // Abrir el inspector de archivos
    
 $(document).on("click", "#add-photo", function(){
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

$(document).on("click", "#Images .image-container", function(e){
  $(this).parent().remove();
});

// -> Eliminar previsualizaciones

// Funciones para el modal que de las alertas para el visualizador de varias imagenes


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



//Función para los dos select para una categoria y su sub categoria

function getCategory() {
    const selectedCategory = document.getElementById("categories").value;
    const subCategoriesElement = document.getElementById("subcategories");
    
    const categories = {
        "CDMX": ['Carlos Cataño Muro Sandoval', 'Erik Namur Campesino', 'Gonzálo Treviño Sada', 'Jorge Sanchez Pruneda','Jose Alfredo Dominguez Martinez','Jorge António Sánchez Cordero Dávila','Jose Antonio Sosa Castañeda','Carlos A. Sotelo Regil Hernández','Andrés Jiménez Cruz','Luis Eduardo Paredes Sánchez','Enrique Almanza Pedraza','José Luis Villavicencio Castañeda','Marco Antonio Ruiz Aguirre','Jose Alfredo Dominguez Martinez','Alejandro Moncada Álvarez'],
      "EdoMex": ['Jose Ruben Valdez Abascal'],
      "Morelos": ['Gregorio Alejandro Gomez Maldonado']
    };
   
    const subCategories = categories[selectedCategory];
    
    const htmlOptions = subCategories
        .map(item => `<option value=${item}>${item}</option>`)
        .join('');
    
    subCategoriesElement.innerHTML = htmlOptions;
    
  }
  
  const categoriesElement = document.getElementById("categories");
  const event = new Event('change');
  
  categoriesElement.addEventListener("change", getCategory);
  categoriesElement.dispatchEvent(event);