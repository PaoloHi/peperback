/*SCRIPT PARA FUNCIONALIDAD DE DSCARGA EN PDF */

var PropiedadID = document.getElementById('propiedad').value;


function descargarPDF() {
    $.ajax({
        url: '/Propiedades/GenerarPDF',
        type: 'POST',
        data: { PROPIEDADID: PropiedadID },
        success: function (response) {
            console.log(response.content); // Imprime los datos en la consola
            var arreglo = response.content;

            pdfMake.fonts = {
                Roboto: {
                    normal: 'Roboto-Regular.ttf',
                    bold: 'Roboto-Medium.ttf',
                    italics: 'Roboto-Italic.ttf',
                    bolditalics: 'Roboto-MediumItalic.ttf'
                }
            };

            var header = {
                columns: [
                    {
                        text: 'Información del inmueble',
                        style: 'headerStyle'
                    }
                ]
            };

            var docDefinition = {
                header,
                content: [
                    { text: 'Datos de la propiedad', alignment: 'center', margin: [10, 20], fontSize: 14 },
                    { canvas: [{ type: 'line', x1: 0, y1: -18, x2: 504, y2: -18, lineWidth: 1, lineColor: '#999999', dash: { length: 4 } }] },
                    { text: arreglo[0], fontSize: 13 },
                    { text: 'Dirección: ' + ' ' + arreglo[1], fontSize: 12 },
                    { text: 'Precio: ' + arreglo[2] + ' ' + arreglo[4], fontSize: 12 },
                    { text: 'Descripción', alignment: 'center', margin: [10, 20], fontSize: 14 },
                    { canvas: [{ type: 'line', x1: 0, y1: -18, x2: 504, y2: -18, lineWidth: 1, lineColor: '#999999', dash: { length: 4 } }] },
                    { text: arreglo[3], fontSize: 12 },
                    { text: 'Caracteristicas principales', alignment: 'center', margin: [10, 20], fontSize: 14 },
                    { canvas: [{ type: 'line', x1: 0, y1: -18, x2: 504, y2: -18, lineWidth: 1, lineColor: '#999999', dash: { length: 4 } }] },
                    { text: 'Detalles del inmueble', alignment: 'center', margin: [10, 20], fontSize: 14 },
                    { canvas: [{ type: 'line', x1: 0, y1: -18, x2: 504, y2: -18, lineWidth: 1, lineColor: '#999999', dash: { length: 4 } }] }
                ],
                pageSize: 'A4',
                pageMargins: [40, 60, 40, 60], // Ajusta los márgenes según tus necesidades
                styles: {
                    lineSeparator: {
                        margin: [0, 5, 0, 5], // Ajusta los márgenes verticalmente
                        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 550, y2: 0, lineWidth: 1, lineColor: '#999999', dash: { length: 4 } }]
                    },
                    headerStyle: {
                        fontSize: 18,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 20]
                    }
                }
            };

            pdfMake.createPdf(docDefinition).download('Rummet.pdf');
        },
        error: function (error) {
            console.error('Error al generar el PDF', error);
        }
    });
}



/*
function descargarPDF() {
    var docDefinition = {
        content: [
            '¡Hola desde PDFMake!',
            'Este es un documento PDF generado mediante PDFMake con importaciones CDN.'
        ]
    };

    pdfMake.createPdf(docDefinition).download('documento.pdf');

}*/


