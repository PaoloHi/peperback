




function eliminarDoc(IDdoc) {
    console.log(IDdoc);

    Swal.fire({
        title: '�Est� seguro que desea eliminar el archivo?',
        html: "Esta acci�n es irreversible.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S�, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Funci�n para eliminar
            $.ajax({
                type: 'POST',
                url: '/Propiedades/eliminarDoc',
                data: { IDdocPropiedad: IDdoc },
                success: function (result) {
                    Swal.fire(
                        'Documento eliminado',
                        'El documento fue eliminado con �xito.',
                        'success'
                    ).then(function () {
                        //location.reload();
                    })

                },
                error: function () {
                    alert('Failed to receive the Data');
                    console.log('Failed ');
                }
            })

        } else {
            location.reload();
        }

    })
}


$(document).ready(function () {


    $("#TipoPropiedadID").change(function () {
        $.get("/Propiedades/ObtSubtipoProp", { TipoP: $("#TipoPropiedadID").val() }, function (data) {
            // VACIAMOS EL DropDownList
            $("#SubTipoPropiedadID").empty();
            $("#SubTipoPropiedadID").append("<option value> -- Subtipo --</option>")
            // CONSTRUIMOS EL DropDownList A PARTIR DEL RESULTADO Json (data)
            $.each(data, function (index, row) {
                console.log(data);
                $("#SubTipoPropiedadID").append("<option value='" + row.iDsubtipoP + "'>" + row.subtipo + "</option>")
            });
        });
    });


    var TipoPropiedad = @Model.PropiedadEditar.TipoPropiedad;


    $("#TipoPropiedadID").val(@Model.PropiedadEditar.TipoPropiedad);
$("#IDMoneda").val(@Model.PropiedadEditar.Moneda);
$("#UnidadSuperficie").val(@Model.PropiedadEditar.SuperficieUMedida);
$("#UnidadConstruccion").val(@Model.PropiedadEditar.SuperficieContruccionUMedida);
$("#UsoSuelo").val(@Model.PropiedadEditar.UsoSuelo);

document.getElementById('descripcion').value = "@Model.PropiedadEditar.Descripcion";
visualizar();

//document.getElementById("add-new-photo").SetAttribute("Value", "C:\Users\ventu\Downloads\eeveegamer.jpg");


@{
    string texto = "\" Gola \"";
}
// document.getElementById("descripcion").value = @Model.PropiedadEditar.Descripcion ;

$.get("/Propiedades/ObtSubtipoProp", { TipoP: $("#TipoPropiedadID").val() }, function (data) {
    // VACIAMOS EL DropDownList
    $("#SubTipoPropiedadID").empty();
    $("#SubTipoPropiedadID").append("<option value> -- Subtipo --</option>")
    // CONSTRUIMOS EL DropDownList A PARTIR DEL RESULTADO Json (data)
    $.each(data, function (index, row) {
        console.log(data);
        $("#SubTipoPropiedadID").append("<option value='" + row.iDsubtipoP + "'>" + row.subtipo + "</option>");
        $("#SubTipoPropiedadID").val(@Model.PropiedadEditar.subTipoPropiedad);
});
            });

initMap(@Model.PropiedadEditar.txtLat, @Model.PropiedadEditar.txtLng);
    });

$(function () {
    $("#CP, #n_calle, #n_interior, #n_exterior, #colonia, #estado, #alc-muni, #pais").on('change', function () {
        initMap(document.getElementById("txtLat").value, document.getElementById("txtLng").value);
    })
});
