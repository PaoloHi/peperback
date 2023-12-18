
/*ESTA PARTE ES DE LOS SELECT Y LOS INPUT*/

const inputFields = document.querySelectorAll(".input-fieldData");
const inputLabels = document.querySelectorAll(".input-labelData");

/*para quen no haya problemas con los select ya que a lada se le quito los labels*/

const selectores = document.querySelectorAll(".selector-con-label");
const labelsSelectores = document.querySelectorAll(".input-labelData-select");

// CICLO PARA LOS SELECT
selectores.forEach((selector, index) => {

    if (selector.value !== "0") {
        labelsSelectores[index].classList.add("opcionSeleccionada");
    }

    selector.addEventListener("focus", function () {
        labelsSelectores[index].classList.add("activeSelect");
        labelsSelectores[index].classList.remove("opcionSeleccionada");
    });

    selector.addEventListener("blur", function () {
        if (selector.value === "0") {
            labelsSelectores[index].classList.remove("activeSelect");
            labelsSelectores[index].classList.remove("opcionSeleccionada");
        }
        else {
            labelsSelectores[index].classList.remove("activeSelect");
            labelsSelectores[index].classList.add("opcionSeleccionada");
        }
    });
});
    function isInputFieldEmpty(inputField) {
        return inputField.value.trim() === "";
    }

    inputFields.forEach((inputField, index) => {
        // Función para actualizar el estado de la etiqueta
        function updateLabel() {
            if (isInputFieldEmpty(inputField)) {
                inputLabels[index].classList.remove("activeData");
                inputLabels[index].style.color = "#626161";
            } else {
                inputLabels[index].classList.add("activeData");
                inputLabels[index].style.color = "#626161";
            }
        }


        // Evento de enfoque
        inputField.addEventListener("focus", function () {
            inputLabels[index].classList.add("activeData");
            inputLabels[index].classList.remove("activeDataGris");
        });

        // Evento de entrada
        inputField.addEventListener("input", function () {
            inputLabels[index].style.color = "#ff7f40";
        });

        // Evento de pérdida de foco
        inputField.addEventListener("blur", function () {
            if (isInputFieldEmpty(inputField)) {
                inputLabels[index].classList.remove("activeData");
                inputLabels[index].classList.remove("activeDataGris");
                inputLabels[index].style.color = "#626161";
            } else {
                inputLabels[index].classList.add("activeDataGris");
                inputLabels[index].style.color = "#626161";
            }
        });

        // Añade un evento de "blur" para verificar si el campo de fecha está vacío al perder el foco
        if (inputField.classList.contains("fechaNacimiento")) {
            inputField.addEventListener("blur", function () {
                if (isInputFieldEmpty(inputField)) {
                    inputLabels[index].classList.remove("activeData");
                    inputLabels[index].classList.remove("activeDataGris");
                    inputLabels[index].style.color = "#626161";
                    inputField.type = "text"; // Cambia a type text si está vacío
                } else {
                    inputField.type = "date"; // Mantén como type date si no está vacío
                }
            });
            inputField.addEventListener("input", function () {
                if (isInputFieldEmpty(inputField)) {
                    inputLabels[index].classList.remove("activeData");
                    inputLabels[index].classList.remove("activeDataGris");
                    inputLabels[index].style.color = "#626161";
                }
            });
        }

        // Llama a la función para actualizar el estado inicial de la etiqueta
        updateLabel();
    });




/*FUNCIONES PARA LIMITAR LOS CAMPOS DE REGISTROS*/
function limitarLetrasConAcentos(input) {
    var valor = input.value;
    var valorFiltrado = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    input.value = valorFiltrado;
}

function limitarLetrasYNumeros(input) {
    // Obtén el valor actual del input
    var valor = input.value;

    // Reemplaza todo lo que no sea letra o número con una cadena vacía
    var valorFiltrado = valor.replace(/[^a-zA-Z0-9]/g, '');

    // Actualiza el valor del input con el valor filtrado
    input.value = valorFiltrado;
}

// FUNCION PARA SOLO NUMEROS
function validarNumeros(input) {
    // Elimina cualquier carácter que no sea un número utilizando una expresión regular
    input.value = input.value.replace(/[^0-9]/g, '');
}

function togglePasswordVisibility1() {
    var passwordInput = document.getElementById("modalResetPassword");
    var passwordToggle = document.querySelector(".password-toggle1");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class="far fa-eye-slash"></i>'; // Cambia el icono a un ojo tachado
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class="far fa-eye"></i>'; // Cambia el icono a un ojo
    }
}
function togglePasswordVisibility2() {
    var passwordInput = document.getElementById("modalconfirmPassword");
    var passwordToggle = document.querySelector(".password-toggle2");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class="far fa-eye-slash"></i>'; // Cambia el icono a un ojo tachado
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class="far fa-eye"></i>'; // Cambia el icono a un ojo
    }
}


/*PARA CARGAR LA IMAGEN*/
function cargarImagen() {
    var archivoSeleccionado = document.getElementById('archivo').files[0];
    const canvasButton = document.querySelector(".bottomBar");

    // Verificar si se ha seleccionado un archivo
    if (archivoSeleccionado) {
        // Obtener la extensión del archivo
        var extension = obtenerExtension(archivoSeleccionado.name);

        // Verificar si la extensión es una de las permitidas
        if (esExtensionPermitida(extension)) {
            var lector = new FileReader();

            lector.onload = function (evento) {
                var imagenPerfil = document.getElementById('preview');
                imagenPerfil.src = evento.target.result;
            }

            lector.readAsDataURL(archivoSeleccionado);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, sube solo una imagen",
                confirmButtonColor: '#f4971c'
            });
            
        }
    }
}

// Función para obtener la extensión de un nombre de archivo
function obtenerExtension(nombreArchivo) {
    return nombreArchivo.split('.').pop().toLowerCase();
}

// Función para verificar si la extensión es una de las permitidas
function esExtensionPermitida(extension) {
    var extensionesPermitidas = ['jpg', 'png', 'gif', 'tiff', 'psd', 'bmp', 'jpeg'];
    return extensionesPermitidas.includes(extension);
}



/*funcion para la contraseña*/
function comprobarPassword() {
    /*variables a usar*/
    const nuevaContra = document.getElementById("modalResetPassword");
    const confirmarContra = document.getElementById("modalconfirmPassword");
    const alertaContra = document.getElementById("mensajeAlertaContra");
    const condiciones = {
        caracteres8: false,
        valfa: false,
        cespecial: false,
        cmayus: false
    };

    /*funcion para actualizar las condiciones y quitar o aplicar la clase*/
    function actualizarCondiciones(condicion, esValido) {
        condiciones[condicion] = esValido;
        const elementosCondicionales = document.getElementsByClassName(condicion);

        // Verifica si se encontraron elementos con la clase dada
        if (elementosCondicionales.length > 0) {
            // Itera sobre la colección de elementos
            for (let i = 0; i < elementosCondicionales.length; i++) {
                const elemento = elementosCondicionales[i];
                // Aplica la clase según la condición
                if (esValido) {
                    elemento.classList.add("tareaConfirmada");
                } else {
                    elemento.classList.remove("tareaConfirmada");
                }
            }
        }
    }

    /*funcion para evaluar las condiciones de la contraseña*/
    function evaluarCondicion() {
        /*longitud*/
        actualizarCondiciones("caracteres8", nuevaContra.value.length >= 8);
        /*un caracter alfanumerico*/
        actualizarCondiciones("valfa", /\d/.test(nuevaContra.value) && /[a-zA-Z]/.test(nuevaContra.value));
        /*al menos un caracter especial*/
        actualizarCondiciones("cespecial", /[@#$%^&*()_+={}|\[\]:;<>,.?~¡¿!¡¿"']/.test(nuevaContra.value));
        /*al menos un caracter en mayusculas*/
        actualizarCondiciones("cmayus", /[A-Z]/.test(nuevaContra.value));
    }

    /*funcion para validar las contraseñas al hacer clic en guardar cambios*/
    function validarGuardarCambios() {
        const contrainicial = nuevaContra.value;
        const confirmacion = confirmarContra.value;

        for (const condicion of Object.values(condiciones)) {
            if (!condicion) {
                showAlert("Favor de cumplir con lo que se pide", "alert-danger mensajeError mx-auto text-center w-50");
                return;
            }
        }

        // Comparar contraseñas cuando se hace clic en guardar cambios
        compararContraseñas(contrainicial, confirmacion);
    }

    /*funcion para comparar las contraseñas*/
    function compararContraseñas(contrainicial, confirmacion) {
        if (contrainicial !== confirmacion) {
            showAlert("Las contraseñas no coinciden", "alert-danger mensajeError mx-auto text-center w-50");
        } else {
            showAlert("Contraseña valida", "alert-success mensajeError mx-auto text-center w-50");
        }
    }

    /*funcion para mostrar la alerta*/

    function showAlert(mensaje, claseCambia) {
        alertaContra.textContent = mensaje;
        alertaContra.className = `alert ${claseCambia}`;
        alertaContra.style.display = "block";
    }

    /*evento para escuchar el input de la contraseña*/
    nuevaContra.addEventListener('input', function () {
        evaluarCondicion();
    });

    /*evento para escuchar el input de confirmación de contraseña*/
    confirmarContra.addEventListener('input', function () {
        evaluarCondicion();

        // Comparar contraseñas al escribir en el input de confirmación
        compararContraseñas(nuevaContra.value, confirmarContra.value);
    });

    /*boton para guardar cambios*/
    const guardarCambios = document.getElementById("btnEnviarContraseña");
    guardarCambios.addEventListener("click", function () {
        /*validarGuardarCambios();*/
    });
}


comprobarPassword();






    	document.getElementById('btnEnviarContraseña').addEventListener('click', function () {
		var password = document.getElementById('modalResetPassword').value;
		var confirmPassword = document.getElementById('modalconfirmPassword').value;

		console.log(confirmPassword);
		if (password !== confirmPassword) {
				} else {
			var user = $('#CorreoPE').val();
					if (password.length < 8) {
					} else {
				var newPassword = confirmPassword;
				$.ajax({
					type: 'POST',
					url: '/Usuarios/ResetPassword',
					data: {
						emailUser: user,
						newPassword: password
					},
					success: function (result) {
						if (result) {
							Swal.fire({
								title: '¡Registro exitoso!',
								html: 'La contraseña se actualizó correctamente.',
								icon: 'success',
								confirmButtonText: "Ok",
								customClass: {
									confirmButton: 'button_confirmacion'
								}
							}).then(function () {
								location.reload();
							});
						} else {
							Swal.fire({
								icon: "error",
								title: "Ups...",
								text: "Hubo un problema intenta nuevamente",
							});
						}
					},
					error: function (xhr, textStatus, errorThrown) {
						// Manejar el resultado no exitoso aquí
						console.log('Error:', textStatus);
						console.log('Error lanzado:', errorThrown);
					}
				});
			}
		}
	});
