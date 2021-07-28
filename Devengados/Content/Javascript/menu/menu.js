
function fnMenu() {
    $('#menu-dashboard li').on('click', function (e) {
        //alert("aa");
        // $('#submenu').removeClass('in');

        fnSeleccionarOpcion($(this).attr('id'));
        //$('#menu-dashboard li').toggleClass();
    });
}


function fnSeleccionarOpcion(id) {

    debugger;

    var liOpciones = document.getElementById("navbarSupportedContent").getElementsByClassName("opcion");
    let nroOpc = liOpciones.length;
    let xli;
    let xid = id;
    //alert("seleccionar" + nroOpc);
    for (var i = 0; i < nroOpc; i++) {
        xli = liOpciones[i];
        if (xli.id == xid)
            $('#' + xli.id).addClass('active');
        else
            $('#' + xli.id).removeClass("active");
    }
}
// ---------Responsive-navbar-active-animation-----------
/*function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}
$(document).ready(function () {
    setTimeout(function () { test(); });
});
$(window).on('resize', function () {
    setTimeout(function () { test(); }, 500);
});
$(".navbar-toggler").click(function () {
    setTimeout(function () { test(); });
});*/