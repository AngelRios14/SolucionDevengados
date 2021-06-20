

$(document).ready(function () {
    //alert("desde vista de ListaServicios");
//    Test("Angel");
    fnListaOrdenesServicio();
});


function Test(msn) {
    alert("desde js Orden de Servicio" + msn);
}


function fnListaOrdenesServicio() {
    //var requrl = '@Url.Action("ListarCampania", "Sisagri")';
    
    
    var requrl = xpath;
    $.ajax({
        type: "POST",
        //url: "Sisagri/ListarCampania",
        url: requrl,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //BloquearBlockUI();
        },
        complete: function () {
            //DesbloquearBlockUI();
        },
        success: function (response) {
            //alert("Respuesta desde el codigo servidor");
            debugger;
            var objLista = response.DataServicio;
            CargarDataTableServicio(objLista);
            //if (objListaCampanias != null) {
            //    if (objListaCampanias.length > 0) {
            //        var nroRegistros = objListaCampanias.length;
            //        for (var i = 0; i < nroRegistros; i++) {
            //            $("<option value='" + objListaCampanias[i].strFecIniCamp + "'>" + objListaCampanias[i].strTxtCampania + "</option>").appendTo("#ddlCampania");
            //        }
            //        $("#ddlCampania").val("08" + anioseleccionado);
            //    }
            //}
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}


function CargarDataTableServicio(LstServicios) {

    dataTable = $('#dtServicios').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button class='btn  btn_tblEditar' style='cursor:pointer; width:70px;'   title='Detalle'>Progra-<br>macion</button>" },

            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Importe", "width": "5%" }
            //            { "data": "AnoEje", "width": "5%" },
            //{ "data": "NroOrden", "width": "5%" },
            //{ "data": "FechaOrden", "width": "5%" },
            //{ "data": "NroContrato", "width": "5%" },//certificado
            //{ "data": "NroContrato", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            ////{ "data": "TipoBien", "width": "5%" },
            ////            { "data": "TipoProveedor", "width": "5%" },

            ////{ "data": "NroContrato", "width": "5%" },
            //{ "data": "Concepto", "width": "30%" },
            ////{ "data": "DocReferencia", "width": "5%" },
            //{ "data": "Monto", "width": "5%", "className": "dt-body-right" }

        ],
        "language": {
            "emptyTable": "--no data found --",
            "url": "/Content/Javascript/plugins/es_es.txt"
        },
        "width": "100%",
        "data": LstServicios
    });
}