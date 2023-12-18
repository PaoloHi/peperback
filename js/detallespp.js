
$("#EstadoMex").on("change", function () {

    var url = '/Propiedades/ListarMunAlc';
    var EdosMex = $('#EstadoMex').val();

    $("#EstadoMex").val(EdosMex)
    console.log(EdosMex)
    if (EdosMex !== null) {

        if (EdosMex != "") {

            var data = { Estado: EdosMex }

            $.post(url, data).done(function (data) {
                console.log(data);

                $("#MuniAlc").empty();
                $("#MuniAlc").append("<option value> -- Municipio --</option>")
                // CONSTRUIMOS EL DropDownList A PARTIR DEL RESULTADO Json (data)
                $.each(data, function (index, row) {
                    console.log("Esta es la data: " + row.muniAlcal);
                    $("#MuniAlc").append("<option value='" + row.muniAlcal + "'>" + row.muniAlcal + "</option>")
                });

                $('#MuniAlc').html($select.html()); // Actualiza el contenido del dropdownlist existente

                $('#NoNotaria').val("");
                $('#IDNotaria').val("");
                $('#Notario').val("");
                $('#LocalidadNotario').val("");
                $('#DireccionNotario').val("");
                $('#CorreoNotario').val("");
                $('#TelNotario').val("");
                $('#Tel2Notario').val("");

                return
            });

        } else {
            $("#MuniAlc").empty();
            $("#MuniAlc").append("<option value> --Municipio--</option>")
            $("#NotarioS").empty();
            $("#NotarioS").append("<option value> --Notarios--</option>")

            $('#NoNotaria').val("");
            $('#IDNotaria').val("");
            $('#Notario').val("");
            $('#LocalidadNotario').val("");
            $('#DireccionNotario').val("");
            $('#CorreoNotario').val("");
            $('#TelNotario').val("");
            $('#Tel2Notario').val("");
        }

    }


});

$("#MuniAlc").on("change", function () {

    var url = '/Propiedades/ListarNotarios';
    var MuniAlc = $('#MuniAlc').val();
    var EdosMex = $('#EstadoMex').val();

    if (EdosMex !== null) {

        if (MuniAlc != "") {

            var data = { Estado: EdosMex, Munialc: MuniAlc }

            $.post(url, data).done(function (data) {
                console.log(data);

                $("#NotarioS").empty();
                $("#NotarioS").append("<option value> -- Notarios --</option>")
                // CONSTRUIMOS EL DropDownList A PARTIR DEL RESULTADO Json (data)
                $.each(data, function (index, row) {
                    console.log("Esta es la data: " + row.notario);
                    $("#NotarioS").append("<option value='" + row.notario + "'>" + row.notario + "</option>")
                });

                $('#NotarioS').html($select.html()); // Actualiza el contenido del dropdownlist existente

                $('#NoNotaria').val("");
                $('#IDNotaria').val("");
                $('#Notario').val("");
                $('#LocalidadNotario').val("");
                $('#DireccionNotario').val("");
                $('#CorreoNotario').val("");
                $('#TelNotario').val("");
                $('#Tel2Notario').val("");

                return
            });

        } else {
            $("#NotarioS").empty();
            $("#NotarioS").append("<option value> --Notarios--</option>")

            $('#NoNotaria').val("");
            $('#IDNotaria').val("");
            $('#Notario').val("");
            $('#LocalidadNotario').val("");
            $('#DireccionNotario').val("");
            $('#CorreoNotario').val("");
            $('#TelNotario').val("");
            $('#Tel2Notario').val("");

        }

    }


});

$("#NotarioS").on("change", function () {

    var url = '/Propiedades/DatosNotarios';
    var Notario = $('#NotarioS').val();

    if (Notario !== null) {

        if (Notario != "") {
            var data = { Notario: Notario }

            $.post(url, data).done(function (data) {
                console.log(data);
                $('#NoNotaria').val(data[0].no);
                $('#IDNotaria').val(data[0].iDnotario);
                $('#Notario').val(data[0].notario);
                $('#LocalidadNotario').val(data[0].localidad);
                $('#DireccionNotario').val(data[0].direccion);
                $('#CorreoNotario').val(data[0].correo);
                $('#TelNotario').val(data[0].telefono);
                $('#Tel2Notario').val(data[0].telefono2);

                return
            });
        } else {
            $('#NoNotaria').val("");
            $('#IDNotaria').val("");
            $('#Notario').val("");
            $('#LocalidadNotario').val("");
            $('#DireccionNotario').val("");
            $('#CorreoNotario').val("");
            $('#TelNotario').val("");
            $('#Tel2Notario').val("");
        }

    }


});

function GuardarNotario() {

    var IDNotaria = $('#IDNotaria').val();
    var IDPropiedadG = $('#IDPropiedad').val();


            //Función para eliminar
            $.ajax({
                type: 'POST',
                url: '/Propiedades/GuardarNotario',
                //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
                data: { IDPropiedadG: IDPropiedadG, IDNotario: IDNotaria },
                success: function (result) {
                    Swal.fire(
                        'Notaría guardada',
                        'La notaría fue guardada con éxito.',
                        'success'
                    )
/*                        .then(function () {
                        location.reload();
                    })*/
                },
                error: function () {
                    alert('Failed to receive the Data');
                    console.log('Failed ');
                }
            })

}

