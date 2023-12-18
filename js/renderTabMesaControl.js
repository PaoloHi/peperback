//ESTE SCRIPT ES PARA CAMBIAR DE VISTA EN EL TABLRERO DE MESA DE CONTROL
btns()
function btns() {
    const btnOnboarding = document.getElementById('btnOnboarding'),
        btnVenta = document.getElementById('btnVenta'),
        btnEntrega = document.getElementById('btnEntrega'),
        btnPostventa = document.getElementById('btnPostventa');

    const tblOnboarding = document.getElementById('tblOnboarding'),
        tblVenta = document.getElementById('tblVenta'),
        tblEntrega = document.getElementById('tblEntrega'),
        tblPostventa = document.getElementById('tblPostventa');

    // funcion boton Onboarding 
    btnOnboarding.onclick = function () {
        btnOnboarding.classList.add("active2")

        btnVenta.classList.remove("active2")

        btnEntrega.classList.add("active2")

        tblOnboarding.classList.add("active")

        btnEntrega.classList.remove("active2")
        btnPostventa.classList.remove("active2")

        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
        tblPostventa.classList.remove("active")
    }

    // funcion boton venta
    btnVenta.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.add("active")
        btnVenta.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.remove("active2")
        tblEntrega.classList.remove("active")
        btnPostventa.classList.remove("active2")
        tblPostventa.classList.remove("active")
    }

    // funcion boton entrega
    btnEntrega.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.add("active")
        btnVenta.classList.remove("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.add("active2")
        btnPostventa.classList.remove("active2")
        tblPostventa.classList.remove("active")
    }

    // funcion boton postventa
    btnPostventa.onclick = function () {
        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
        btnPostventa.classList.add("active2")
        btnVenta.classList.remove("active2")
        btnEntrega.classList.remove("active2")
        btnOnboarding.classList.remove("active2")
        tblPostventa.classList.add("active")
    }
}



function btns() {
    const btnOnboarding = document.getElementById('btnOnboarding'),
        btnVenta = document.getElementById('btnVenta'),
        btnEntrega = document.getElementById('btnEntrega');

    const tblOnboarding = document.getElementById('tblOnboarding'),
        tblVenta = document.getElementById('tblVenta'),
        tblEntrega = document.getElementById('tblEntrega');

    // funcion boton Onboarding 
    btnOnboarding.onclick = function () {
        btnOnboarding.classList.add("active2")
        btnVenta.classList.remove("active2")
        btnEntrega.classList.remove("active2")

        tblOnboarding.classList.add("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.remove("active")
    }

    // funcion boton venta
    btnVenta.onclick = function () {
        btnVenta.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnEntrega.classList.remove("active2")

        tblOnboarding.classList.remove("active")
        tblVenta.classList.add("active")
        tblEntrega.classList.remove("active")
    }

    // funcion boton entrega
    btnEntrega.onclick = function () {
        btnEntrega.classList.add("active2")
        btnOnboarding.classList.remove("active2")
        btnVenta.classList.remove("active2")

        tblOnboarding.classList.remove("active")
        tblVenta.classList.remove("active")
        tblEntrega.classList.add("active")
    }
}
