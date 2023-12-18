//  ESTE SCRIPT CONTIENE UN WIZARD ESPECIAL PARA EDICION BROKER POR EL BUG QUE TENIA


$(document).ready(function () {
    // Next step functionality
    $(".next-step").click(function (e) {
        var activeTab = $(this).closest(".tab-pane").attr("id");
        $("#" + activeTab).removeClass("active");
        $("#" + activeTab).next().addClass("active");
        nextTab(activeTab);
    });

    // Previous step functionality
    $(".prev-step").click(function (e) {
        var activeTab = $(this).closest(".tab-pane").attr("id");
        $("#" + activeTab).removeClass("active");
        $("#" + activeTab).prev().addClass("active");
        prevTab(activeTab);
    });
});

function nextTab(activeTab) {
    var activeIndex = $(".nav-tabs li.active").index();
    $(".nav-tabs li").eq(activeIndex).removeClass("active");
    $(".nav-tabs li").eq(activeIndex + 1).removeClass("disabled");
    $(".nav-tabs li").eq(activeIndex + 1).addClass("active");
    $(".wizard-inner .connecting-line").eq(activeIndex).addClass("active");
}

function prevTab(activeTab) {
    var activeIndex = $(".nav-tabs li.active").index();
    $(".nav-tabs li").eq(activeIndex).removeClass("active");
    $(".nav-tabs li").eq(activeIndex - 1).addClass("active");
    $(".wizard-inner .connecting-line").eq(activeIndex - 1).removeClass("active");
}



$(document).ready(function () {
    // Cuando se hace clic en un botón del wizard
    $('.wizard-buttons button').on('click', function () {
        // Obtener el ID del div de la barra de navegación
        var navTabID = $(this).data('target');
        // Activar la barra de navegación
        $(navTabID + ' a:first').tab('show');
    });
});



$(document).ready(function () {
    $('.nav-tabs a').on('click', function (event) {
        if ($(this).hasClass('disabled')) {
            event.preventDefault();
            $(this).tab('show').parent().addClass('active').siblings().removeClass('active').children().addClass('disabled');
            $($(this).attr("href")).hide();
            return false;
        }
    });
    $('.nav-tabs').on('click', function (event) {
        event.preventDefault();
        if (!$(event.target).hasClass('moving-tab')) {
            var activeTab = $('.nav-tabs .active a').text();
            $('.wizard-step-title').text(activeTab);
        }
        return false;
    });
    var defaultTab = $('.nav-tabs .active a').text();
    $('.wizard-step-title').text(defaultTab);
});




$('.nav-tabs').on('click', function (event) {
    event.preventDefault();
    if (!$(event.target).hasClass('ripple-container')) {
        var activeTab = $('.nav-tabs .active a').text();
        $('.wizard-step-title').text(activeTab);
        $('.ripple-container').remove(); // Remover el elemento con la clase ripple-container
    }
    return false;
});




