const precio = document.getElementById('precioProp');


const porcentaje = document.getElementById('porcentaje');
const comision = document.getElementById('comision');


const mesesComision = document.getElementById('mesesComision');
const mesesTotal = document.getElementById('mesesTotal');


const comisionPactada = document.getElementById('comisionPactadaInput');


const dropdown = document.getElementById('IDMoneda');


var TipoComision;

var comPac = document.getElementById('comisionPactada')


if (comPac.value == '') {

    // Obtén una referencia al elemento input
    const inputComisionTotal = document.getElementById('comisionTotal');

    // Elimina la propiedad "readonly" del input
    inputComisionTotal.removeAttribute('readonly');

    tipoMoneda = window.EditarMoneda.value;

    
    if (typeof (tipoMoneda) != 'undefined' && tipoMoneda != '') {
        monedaFinal = tipoMoneda === "1" ? "MXN" : "USD";
    }

    //dropdown.addEventListener("click", function () {
    //    var tipoMoneda = dropdown.options[dropdown.selectedIndex].value

    //    if (typeof (tipoMoneda) != 'undefined' && tipoMoneda != '') {
    //        monedaFinal = tipoMoneda === "1" ? "MXN" : "USD";
    //    }

        
    //    inputComisionTotal.value = inputComisionTotal.value + monedaFinal

    //    return 
    //});


    inputComisionTotal.value = '0' + monedaFinal

    //inputComisionTotal.addEventListener('input', () => {

    //    setTimeout(function () {
    //        inputComisionTotal.value = inputComisionTotal.value + monedaFinal        }, 100); // 5
 
    //})    
    

} else { 

    comision.addEventListener('input', () => {
        document.getElementById('porcentaje').value = comision.value;
    });


    mesesComision.addEventListener('input', () => {
        document.getElementById('mesesTotal').value = mesesComision.value;
    });

    comisionPactada.addEventListener('input', () => {
        document.getElementById('comisionPactada').value = comisionPactada.value
    })

    //declararion de variables gloables
    var valorPropiedad;
    var comsionPorcentaje;
    var comisionBroker;
    var numeroMeses;
    var monedaFinal;
    var siguiente = true;
    obtenerMoneda();


    function calcularPorcentaje(valorPropiedadValor, CB) {
        const porcentaje = CB / valorPropiedadValor;
        return porcentaje;
    }

    function calcularComisionPactada(valorPropiedadValor, comisionBrokerValor) {
        const CB = valorPropiedadValor * comisionBrokerValor;
        document.getElementById('comisionPactada').value = CB.toFixed(2)

        comisionPactada.value = CB.toFixed(2);
        return CB;
    }



    function calcularComision(valorPropiedadValor, CB, Moneda = monedaFinal) {

        var CR = CB * 0.25;
        var CFB = CB - CR;

        comisionP = document.getElementById('comisionPactada').value;

        if (typeof (Moneda) == 'undefined' && comisionP != '0.00') {
            txtLabel.textContent = "Selecciona el tipo de moneda";
            txtLabel.style.display = "block";
        } else if (valorPropiedadValor == '' && (porcentaje.value != '' || mesesComision.value != '')) {
            txtLabel.textContent = "Ingresa el precio";
            document.getElementById('comisionTotal').value = '0';
            txtLabel.style.display = "block";
        } else {
            txtLabel.style.display = "none"; // Ocultar el mensaje de error
            if (!isNaN(CFB) && Moneda !== undefined) {
                document.getElementById('comisionTotal').value = CFB.toFixed(2) + ' ' + Moneda;
                inputComision.value = CFB.toFixed(2);
            } else if (!isNaN(CFB) && Moneda === undefined) {
                document.getElementById('comisionTotal').value = CFB.toFixed(2);

            } else if (isNaN(CFB)) {
                document.getElementById('comisionTotal').value = '0';
            }
        }
    }

    var txtLabel = document.querySelector('.control-label .text-danger');
    var siguiente = document.getElementsByName('siguiente')



    window.addEventListener('load', function () {

        precio.addEventListener('input', () => {

            valorPropiedad = precio.value;
            comsionPorcentaje = comision.value;
            comisionPactadaValor = comisionPactada.value;

            //esta dentro del condicional por si el usuario ya inserto uno de los dos valores pero se regresa a cambiar el precio 
            if (comsionPorcentaje != "") {
                comisionBroker = comsionPorcentaje / 100;
                obtenerMoneda();
                const CB = calcularComisionPactada(valorPropiedad, comisionBroker)
                calcularComision(valorPropiedad, CB, monedaFinal);

            } else if (mesesComision.value != "") {
                numeroMeses = mesesComision.value;
                obtenerMoneda();

                CB = calcularComisionPactada(valorPropiedad, numeroMeses)

                calcularComision(valorPropiedad, CB, monedaFinal)

            } else {
                comisionBroker = comsionPorcentaje / 100;

                obtenerMoneda();
                calcularPorcentaje()
                calcularComision(valorPropiedad, comisionPactadaValor, monedaFinal);

            }

            return valorPropiedad;
        });

        comision.addEventListener('input', () => {
            valorPropiedad = parseFloat(precio.value === "" ? 0 : precio.value);
            comsionPorcentaje = parseFloat(comision.value === "" ? 0 : comision.value);
            comisionBroker = comsionPorcentaje / 100;
            TipoComision = comisionBroker;


            if (comsionPorcentaje <= 100) {
                mesesComision.value = "";
                mesesTotal.value = null;
                obtenerMoneda();
                var CB = calcularComisionPactada(valorPropiedad, comisionBroker)
                calcularComision(valorPropiedad, CB, monedaFinal);

                siguiente = true;
                return siguiente;

            } else {
                txtLabel.textContent = "El porcentaje de comision debe ser  igual o menor al 100%";
                txtLabel.style.display = "block";
                txtLabel.style.animation = "shake 3s alternate"

                siguiente = false;
                return siguiente;
            }


        });

        mesesComision.addEventListener('input', () => {
            valorPropiedad = parseFloat(precio.value === "" ? 0 : precio.value);
            numeroMeses = parseFloat(mesesComision.value === "" ? 0 : mesesComision.value);

            TipoComision = numeroMeses;

            comision.value = "";
            porcentaje.value = null;


            CB = calcularComisionPactada(valorPropiedad, numeroMeses)
            obtenerMoneda();
            calcularComision(valorPropiedad, CB, monedaFinal)
        });


        comisionPactada.addEventListener('input', () => {

            valorPropiedad = parseFloat(precio.value === "" ? 0 : precio.value);
            comisionPactadaValor = parseFloat(comisionPactada.value === "" ? 0 : comisionPactada.value);


            if (comisionPactadaValor < valorPropiedad) {

                mesesComision.value = "";

                var porcentajeCalculado = calcularPorcentaje(valorPropiedad, comisionPactadaValor);

                TipoComision = porcentajeCalculado;
                porcentaje.value = (porcentajeCalculado * 100);
                comision.value = (porcentajeCalculado * 100).toFixed(5);

                document.getElementById('comisionPactada').value = comisionPactadaValor.toFixed(2)

                obtenerMoneda();

                calcularComision(valorPropiedad, comisionPactadaValor, monedaFinal)

                siguiente = true;
                return siguiente;

            } else {

                txtLabel.textContent = "La comsion pactada debe ser menor al precio del inmueble ";
                txtLabel.style.display = "block";
                txtLabel.style.animation = "shake 3s alternate"

                siguiente = false;
                return siguiente;
            }

        });



    })



    const inputComision = document.getElementById('TotalComision')
    var txtLabel = document.querySelector('.control-label .txtcomision');



    function obtenerMoneda() {
        const tipoMoneda = dropdown.options[dropdown.selectedIndex].value;
        if (typeof (tipoMoneda) != 'undefined' && tipoMoneda !== '') {
            monedaFinal = tipoMoneda === "1" ? "MXN" : "USD";
        }

        return monedaFinal;
    }


    dropdown.addEventListener("click", function () {
        cargarTotalComision();
    });



    function cargarTotalComision() {
        var tipoMoneda = dropdown.options[dropdown.selectedIndex].value
        var comisionMoneda;

        if (typeof (tipoMoneda) != 'undefined' && tipoMoneda != '') {
            monedaFinal = tipoMoneda === "1" ? "MXN" : "USD";
        }


        CB = calcularComisionPactada(precio.value, TipoComision)
        calcularComision(precio.value, CB, monedaFinal);
        return monedaFinal;
    }


    var mensaje = document.querySelector('.mensaje-comision');


    setTimeout(function () {
        mensaje.classList.add('mostrar');
    }, 9000);



    tipoMoneda = window.EditarMoneda.value;

    if (typeof (tipoMoneda) != 'undefined' && tipoMoneda != '') {
        monedaFinal = tipoMoneda === "1" ? "MXN" : "USD";
    }


    if (comision.value != "") {
        TipoComision = comision.value / 100;
    } else {
        TipoComision = mesesComision.value;
    }
    comision.value = parseFloat(comision.value).toFixed(5)

    cargarTotalComision();



}

