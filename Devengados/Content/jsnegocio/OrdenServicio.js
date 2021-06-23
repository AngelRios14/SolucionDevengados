

$(document).ready(function () {
    //alert("desde vista de ListaServicios");
//    Test("Angel");
    fnListaOrdenesServicio();
    $("#btnGenerarEntregable").click(function () { cargarTablaEntregable("", 0); });
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

    $('#divOrdenServicio').hide();
    //$("#btnGenerarEntregable").bind("click", Nuevo);  
    

    dataTable = $('#dtServicios').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditar'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            { "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Expediente",  "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Proveedor", "width": "35%" },
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

    
    $('#dtServicios tbody').on('click', '.btn_tblEditar', function () {
        var table = $('#dtServicios').DataTable();

        //var usuario = table.row($(this).parents('tr')).data();
        //AbrirDialogoOrden(usuario);

        AbrirDialogoOrden();
    });


}

function AbrirDialogoOrden() {
    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').show('slow');
}


function cargarTablaEntregable(pData, pNroFilas) {
    var oStrHtml = "";
    var xNroEntregables = $.trim($("#txtCantEntregableS").val());

    if (xNroEntregables != "") {
        xNroEntregables = xNroEntregables * 1;
        for (var i = 0; i < xNroEntregables; i++)
            oStrHtml = oStrHtml + obtenerNuevaFilaHTML("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    }
        

    //if (pNroFilas == 0) {
    //    for (var i = 0; i < 5; i++)
    //        oStrHtml = oStrHtml + obtenerNuevaFilaHTML("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
    //}
    //else {
    //    for (var i = 0; i < pData.length; i++)
    //        oStrHtml = oStrHtml + obtenerNuevaFilaHTML(i + 1, pData[i].PARAM, pData[i].RAZON, pData[i].DIRECCION, pData[i].TELEFONO);
    //}

    $("#dtgDatosEntregables").html(oStrHtml);
}


function obtenerNuevaFilaHTML(pIndex, pId,pPlazo, pFechaVenc, pPorcentage, pProgramado, pDocTram, pFecEntregaTram, pNroFact, pMontoDevengado, pPenal1, pPenal2, pNetoPagar, pObs, pFecDeveng, pFecPago) {
    var oNewTrHTML = "<tr class='celdas' style='height:18px;'>";

    if (false) {
        //if (pId == "") {
        oNewTrHTML += "  <td align='center'></td>" +
            "  <td align='center'></td>";
    }
    else {
        oNewTrHTML += "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:EditCompania(\"" + pId + "\");return false;' src='../Content/Images/btnEdit.gif' ></td>" +
            "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:DeltCompania(\"" + pId + "\",\"" + pPlazo + "\");return false;' src='../Content/Images/btndelete.gif' ></td>";
    }

    oNewTrHTML +="  <td align='right'>" + pIndex + "&nbsp;</td>" +
        "  <td align='left'>" + pPlazo + "</td>" +
        "  <td align='left'>" + pFechaVenc + "</td>" +
        "  <td align='left'>" + pPorcentage + "</td>" +
        "  <td align='left'>" + pProgramado + "</td>" +
        "  <td align='left'>" + pDocTram + "</td>" +
        "  <td align='left'>" + pFecEntregaTram + "</td>" +
        "  <td align='left'>" + pNroFact + "</td>" +
        "  <td align='left'>" + pMontoDevengado + "</td>" +
        "  <td align='left'>" + pPenal1 + "</td>" +
        "  <td align='left'>" + pPenal2 + "</td>" +
        "  <td align='left'>" + pNetoPagar + "</td>" +
        "  <td align='left'>" + pObs + "</td>" +
        "  <td align='left'>" + pFecDeveng + "</td>" +
        "  <td align='left'>" + pFecPago + "</td>";   

    return oNewTrHTML + "</tr>";
}