
//Este Ajax es para la parte del verificar el propietario en la seccion Nueva Propiedad y Editar Propiedad

$(function () {
    $('#btncorreo').click(function () {

        verificarPropietario();
    });
});

function verificarPropietario() {
    var url = '/Propiedades/Verificar';
    var correo = $('#email').val();

    // Oculta el mesaje del propietario verificado o no verificado si el imput del correo electrónico está vacío
    if (correo === "") {
        $('#datosPropietarioNoExistente').addClass('d-none');
        $('#labelNoVerif').addClass('d-none');
        $('#labelVerif').addClass('d-none');
        return;
    }

    $('#datosPropietarioNoExistente').removeClass('d-none');
    var data = { correoPropietario: correo };
    $.post(url, data).done(function (data) {
        if (data.success) {
            var oPropietario = data.verificarCorreo;

            $('#labelNoVerif').addClass('d-none');
            $('#datosPropietarioNoExistente').removeClass('d-none');
            $('#labelVerif').removeClass('d-none');

            $('#nombre').addClass('no-pointer-events');
            $('#nombre').val(oPropietario.nombre);
            $("#nombre").prop("disabled", true);

            $('#apellidoPaterno').addClass('no-pointer-events');
            $('#apellidoPaterno').val(oPropietario.apellidoPaterno);
            $("#apellidoPaterno").prop("disabled", true);

            $('#apellidoMaterno').addClass('no-pointer-events');
            $('#apellidoMaterno').val(oPropietario.apellidoMaterno);
            $("#apellidoMaterno").attr("disabled", "");

            $('#telefono').addClass('no-pointer-events');
            $('#telefono').val(oPropietario.telefono)
            $("#telefono").attr("disabled", "");

            $('#Existente').val("Existe");

            console.log("Aquí el usuario existe");
        }
        else {
            $('#nombre').val("");
            $("#nombre").prop("disabled", false);

            $('#apellidoMaterno').val("");
            $("#apellidoMaterno").prop("disabled", false);

            $('#apellidoPaterno').val("");
            $("#apellidoPaterno").prop("disabled", false);

            $('#telefono').val("");
            $("#telefono").prop("disabled", false);

            $('#datosPropietarioNoExistente').removeClass('d-none');
            $('#labelNoVerif').removeClass('d-none');
            $('#labelVerif').addClass('d-none');
            console.log(data.message);

            $('#inpGuardarPropietario').removeClass('d-none');
            $('#Existente').val("No existe");
            console.log("Aquí el usuario no existe");
        }
    }).fail(function () {
        console.log("Error: no se pudo completar el AJAX");
    });
}


verificarPropietario();


// Esta es la parete de listar Colonias
const coloniasHashMap = {};
//declaramos esta variable para que el AJAX no se ejecute si el input esta vacio 
const inputVacio = "";   

$("#CP").on("change", function () {


    var url = '/Propiedades/ListarColonias';

    var CP = $('#CP').val() ;

    $("#CP").val(CP)


    if (CP !== inputVacio) {
        var data = { CodigoPostal: CP }

        $.post(url, data).done(function (data) {


            if (data.legnth === 0) {
                $('#CPInvalid').removeClass('d-none')
            } else (
                $('#CPInvalid').addClass('d-none')
            )

            $('#n_Municipio').val(data[0].muniAlca);
            $('#estado').val(data[0].estado);
            $('#pais').val(data[0].pais);


            var $select = $('<select>');
            $select.append($('<option>').val('').text('Seleccione una colonia')); // Agrega una opción en blanco
            $.each(data, function (i, item) {
                $select.append($('<option>').val(item.idColonia).text(item.colonia));
                $('#IDcolonia').val(item.idColonia)
                coloniasHashMap[item.idColonia] = item.colonia;

            });

            $('#Colonia').html($select.html()); // Actualiza el contenido del dropdownlist existente

            return data, coloniasHashMap;
        });
    }
});


$('#Colonia').on('change', function () {
    var selectedValue = $(this).val();

    $('#colonia').val(coloniasHashMap[selectedValue]);


    idColonia = $('#IDColonia').val(selectedValue); 

    coloniaMaps = $('#IDcolonia').val(selectedValue);
});



$("#CP").on("change", function () {

    var url2 = '/Propiedades/VerificarMunicipio';
    var CP = $('#CP').val() ;
    $("#CP").val(CP)
    if (CP !== inputVacio) {
        var data2 = { CODIGOPOSTAL: CP };

        $.post(url2, data2).done(function (data2) {
            var municipio = data2.municipioCorrecto.municipio
            $('#alc-municipio').val(municipio)
        });
    }
});


//esta funcion es para que traiga las colonias relacionadas en editar sin necesidad de un evento 

function verificarMunicipio() {
    

    var url = '/Propiedades/ListarColonias';

    var coloniaGuardada = $('#colonia').val()


    var CP = $('#CP').val() ;


    if (CP !== inputVacio) {
        var data = { CodigoPostal: CP }

        $.post(url, data).done(function (data) {


            if (data.legnth === 0) {
                $('#CPInvalid').removeClass('d-none')
            } else (
                $('#CPInvalid').addClass('d-none')
            )

            var $select = $('<select>');

            var IDColonia = $('#IDcolonia').val();

            $.each(data, function (i, item) {
                
                if (IDColonia == item.idColonia) {
                    var option = $('<option selected>').val(item.idColonia).text(item.colonia)
                    $select.append(option);
                    $('#IDcolonia').val(item.idColonia)
                    coloniasHashMap[item.idColonia] = item.colonia;
                } else {
                    $select.append($('<option>').val(item.idColonia).text(item.colonia));
                    $('#IDcolonia').val(item.idColonia)
                    coloniasHashMap[item.idColonia] = item.colonia;
                }
            });

            $('#colonia').val(coloniasHashMap[IDColonia]);
           
            $('#Colonia').html($select.html()); // Actualiza el contenido del dropdownlist existente


            return data
        });
    };
};

// Llamar a la función verificarMunicipio en cualquier momento que sea necesario
verificarMunicipio();


