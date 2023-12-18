



            // Script para tab de tablero de brokers
            function openCity(evt, cityName) {
                var i, tabcontent, tablinks;
                tabcontent = document.getElementsByClassName("tabcontent");
                for (i = 0; i < tabcontent.length; i++) {
                    tabcontent[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablinks");
                for (i = 0; i < tablinks.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" active", "");
                }
                document.getElementById(cityName).style.display = "block";
                evt.currentTarget.className += " active";
            }

            // Get the element with id="defaultOpen" and click on it
            document.querySelector(".tarjetaNoPublicadasDefault").click();





            /*Función 2 para ocultar las tablas*/
            function vertablas(evt, vertablas) {

                var i, tabcontent2, tablinks2;
                tabcontent2 = document.getElementsByClassName("tabcontent2");
                for (i = 0; i < tabcontent2.length; i++) {
                    var juanito = tabcontent2[i].style.display = "none";
                    tabcontent2[i].style.display = "none";
                }
                tablinks2 = document.getElementsByClassName("tablinks2");
                for (i = 0; i < tablinks2.length; i++) {
                    tablinks2[i].className = tablinks2[i].className.replace(" active", "");
                }
                document.getElementById(vertablas).style.display = "block";
                evt.currentTarget.className += " active";

            }
            var status = document.getElementById('default').value;

            // Get the element with id="defaultOpen" and click on it
            document.getElementById(status).click();


            /*Función 3 para ocultar contenedores*/
            function vercontenedor(evt, vercontenedor) {
                var i, tabcontent3, tablinks3;
                tabcontent3 = document.getElementsByClassName("tabcontent3");
                for (i = 0; i < tabcontent3.length; i++) {
                    tabcontent3[i].style.display = "none";
                }
                tablinks3 = document.getElementsByClassName("tablinks3");
                for (i = 0; i < tablinks3.length; i++) {
                    tablinks3[i].className = tablinks3[i].className.replace(" active", "");
                }
                document.getElementById(vercontenedor).style.display = "block";
                evt.currentTarget.className += " active";
            }

            // Get the element with id="defaultOpen" and click on it
     






            /*Función 4 para ocultar las tablas*/
            function vercontenedor2(evt, vercontenedor2) {
                var i, tabcontent4, tablinks4;
                tabcontent4 = document.getElementsByClassName("tabcontent4");
                for (i = 0; i < tabcontent4.length; i++) {
                    tabcontent4[i].style.display = "none";
                }
                tablinks4 = document.getElementsByClassName("tablinks4");
                for (i = 0; i < tablinks4.length; i++) {
                    tablinks4[i].className = tablinks4[i].className.replace(" active", "");
                }
                document.getElementById(vercontenedor2).style.display = "block";
                evt.currentTarget.className += " active";
            }

            // Get the element with id="defaultOpen" and click on it
            document.querySelector(".tarjetaPublicadasDefault").click();
            

        /*Función 5 para ocultar las tablas*/
        function vercontenedor3(evt, vercontenedor3) {
            var i, tabcontent5, tablinks5;
            tabcontent5 = document.getElementsByClassName("tabcontent5");
            for (i = 0; i < tabcontent5.length; i++) {
                tabcontent5[i].style.display = "none";
            }
            tablinks5 = document.getElementsByClassName("tablinks5");
            for (i = 0; i < tablinks5.length; i++) {
                tablinks5[i].className = tablinks5[i].className.replace(" active", "");
            }
            document.getElementById(vercontenedor3).style.display = "block";
            evt.currentTarget.className += " active";
        }

        // Get the element with id="defaultOpen" and click on it
         document.querySelector(".tarjetaProcesoDefault").click();

function validateDataDelate(Propiedad) {

    console.log(Propiedad);
    Swal.fire({
        title: '¿Está seguro que desea eliminar esta propiedad?',
        text: "Esta acción es irreversible.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Función para eliminar
            $.ajax({
                type: 'POST',
                url: '/Propiedades/Eliminar',
                //contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // when we use .serialize() this generates the data in query string format. this needs the default contentType (default content type is: contentType: 'application/x-www-form-urlencoded; charset=UTF-8') so it is optional, you can remove it
                data: { IDPropiedadG: Propiedad },
                success: function (result) {
                    Swal.fire(
                        'Registro eliminado',
                        'La propiedad fue eliminada con éxito.',
                        'success'
                    ).then(function () {
                        location.reload();
                    })

                },
                error: function () {
                    alert('Failed to receive the Data');
                    console.log('Failed ');
                }
            })

        }
    })
}

