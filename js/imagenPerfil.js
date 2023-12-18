//para obtener la foto del usuario
url = "/Accesos/ObtenerImagenPerfil"
data = {}

$.ajax({
    url: url,
    type: 'GET',
    data: data,

    success: function (data) {

        let imagenPerfil = document.getElementById("imagenPerfil");

        if (data.usuariosModel.txtBase64) {
            imagenPerfil.src = data.usuariosModel.txtBase64;
        }

    }
})
