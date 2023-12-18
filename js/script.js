//Este script es para el menu lateral aquí encontraras muchas funciones que tengan que ver con el menu lateral


// Función para abrir o cerrar el menú	
function open_close_menu() {
    body.classList.toggle("body_move");
    side_menu.classList.toggle("menu__side_move");
}
// Función para cambiar el tamaño de los elementos	
let smallToggle = 1;
function small() {
    var h6Elements = document.querySelectorAll("a.option h6"); // Definir h6Elements aquí	
    if (smallToggle === 1) {
        for (var i = 0; i < option_menu.length; i++) {
            option_menu[i].classList.add("small");
        }
        h6Elements.forEach(function (h6Element) {
            h6Element.classList.remove("h6Alineado");
        });
        smallToggle = 0;
    } else {
        for (var i = 0; i < option_menu.length; i++) {
            option_menu[i].classList.remove("small");
        }
        h6Elements.forEach(function (h6Element) {
            h6Element.classList.add("h6Alineado");
        });
        smallToggle = 1;
    }
}
// Llamada a la función small cuando se carga el DOM	
document.addEventListener('DOMContentLoaded', function () {
    small();
});
// Función para activar el estilo al hacer clic en un enlace	
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}
// Selección de elementos del DOM	
var side_menu = document.getElementById("side_menu");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");
var option_menu = document.querySelectorAll(".options__menu");
var h6Element = document.querySelectorAll("a.option h6");


// Selección de elementos del DOM para los tooltips de Bootstrap	
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
// Ejecutar funciones en el evento click del botón	
btn_open.addEventListener("click", open_close_menu);
btn_open.addEventListener("click", small);
btn_open.addEventListener("click", activeLink);


//Ejecutar funcion en el evento click

document.getElementById("btn_open").addEventListener("click", small);
btn_open.addEventListener("click", open_close_menu);
btn_open.addEventListener("click", activeLink);

//Declaramos variables


//Función para que funcione la barra de progreso

const steps = document.querySelectorAll(".step");
//Evento para mostrar y ocultar el menu
let active = 1;

//progressNext.addEventListener("click", () => {
//    active++;
//    if (active > steps.length) {
//        active = steps.length;
//    }
//    updateProgress();
//});

//progressPrev.addEventListener("click", () => {
//    active--;
//    if (active < 1) {
//        active = 1;
//    }
//    updateProgress();
//});

const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i < active) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
    progressBar.style.width = ((active - 1) / (steps.length - 1)) * 100 + "%";
    if (active === 1) {
        progressPrev.disabled = true;
    } else if (active === steps.length) {
        progressNext.disabled = true;
    } else {
        progressPrev.disabled = false;
        progressNext.disabled = false;
    }
};

//funciones para hacer la operación de sacar el porcentaje

function percentage_1() {

    var totalFinal = 0;

    var percent = document.getElementById("percent").value;
    //var total = document.getElementById("total").value;
    var num = document.getElementById("num").value;

    

    //document.getElementById("value1").value = (percent * num) / 100;

    totalFinal = (num - ((percent * num) / 100));
    document.getElementById("value1").value = totalFinal;
    

}
// Función de active de los botones de mesa de control



//*+para fijar el hover en la seccion en la que estemos 

