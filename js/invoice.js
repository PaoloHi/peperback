

console.log("invoice esta corriendo, atrapalo corre muy rapido")

// Este script es para la pagina de nueva propiedad en la seccion de propietario para ir agregando nuevas tablas o eliminar
$(document).on('ready', funcMain);


function funcMain()
{
	$("#add_row").on('click',newRowTable);

	$("loans_table").on('click','.fa-trash-can',deleteProduct);
	$("body").on('click',".fa-trash-can",deleteProduct);
}


function funcEliminarProductosso(){
	//Obteniendo la fila que se esta eliminando
	var a=this.parentNode.parentNode;
	//Obteniendo el array de todos loe elementos columna en esa fila
	//var b=a.getElementsByTagName("td");
	var cantidad=a.getElementsByTagName("td")
	console.log(a);

	$(this).parent().parent().fadeOut("slow",function(){$(this).remove();});
}


function deleteProduct(){
	//Guardando la referencia del objeto presionado
	var _this = this;
	//Obtener las filas los datos de la fila que se va a elimnar
	var array_fila=getRowSelected(_this);

	//Restar esos datos a los totales mostrados al finales
	//calculateTotals(cantidad, precio, subtotal, impuesto, totalneto, accioneliminar)

	$(this).parent().parent().fadeOut("slow",function(){$(this).remove();});
}




// Esta linea de codigo es para la funcionalidad de Programar agenda 

function getRowSelected(objectPressed){
	//Obteniendo la linea que se esta eliminando
	var a=objectPressed.parentNode.parentNode;
	//b=(fila).(obtener elementos de clase columna y traer la posicion 0).(obtener los elementos de tipo parrafo y traer la posicion0).(contenido en el nodo)
	var codigo=a.getElementsByTagName("td")[0].getElementsByTagName("p")[0].innerHTML;
	var descripcion=a.getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerHTML;
	

	var array_fila = [numero,numero2, codigo, descripcion];

	return array_fila;
	
}



function newRowTable()
{
	var numero = document.getElementById("numero").value;
	var numero2 = document.getElementById("numero2").value;

	var descripcion=document.getElementById("descripcion").value;
	
	var name_table=document.getElementById("tabla_factura");

    var row = name_table.insertRow(0+1);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(1);
    var cell9 = row.insertCell(2);

    
    cell2.innerHTML = '<p name="codigo_p[]" class="non-margin d-flex justify-content-center">'+numero+'</p>';
	
	cell3.innerHTML = '<p name="descuento_p[]" class="non-margin d-flex justify-content-center">' + numero2 + '</p>';

	console.log(cell3)
    cell9.innerHTML = '<span class="fa-solid fa-trash-can d-flex mt-1 justify-content-center"></span>';

    //Para calcular los totales enviando los parametros
   
    //Para calcular los totales sin enviar los parametros, solo adquiriendo los datos de la columna con mismo tipo de datos
    //calculateTotalsBySumColumn()
}










function format(input)
{
	var num = input.value.replace(/\,/g,'');
	if(!isNaN(num)){
		input.value = num;
	}
	else{ alert('Solo se permiten numeros');
		input.value = input.value.replace(/[^\d\.]*/g,'');
	}
}