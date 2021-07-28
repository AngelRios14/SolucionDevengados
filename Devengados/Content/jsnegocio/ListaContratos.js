
$(document).ready(function () {
    fnSeleccionarOpcion("idCC");
    $('#divOrdenServicio').hide();
    $('#divEntregables').hide();
    fnListaContratos();
    //Contratos= listado servicios + listdo compras
});

function fnListaContratos() {   


    var requrl = xpathExpContratos;
    $.ajax({
        type: "POST",        
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
            
            var objLista = response.DataContratos;
            CargarDataTableServicio(objLista);
            
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}


function CargarDataTableServicio(LstExpContratos) {

    var nroRegistros = LstExpContratos.length;
    for (var i = 0; i < nroRegistros; i++) {
        if (LstExpContratos[i].MontoAdjudicado == -1) LstExpContratos[i].MontoAdjudicado = "";
        if (LstExpContratos[i].PrestacionAdicional == -1) LstExpContratos[i].PrestacionAdicional = "";
        if (LstExpContratos[i].Reduccion == -1) LstExpContratos[i].Reduccion = "";
        if (LstExpContratos[i].MontoContractualVig == -1) LstExpContratos[i].MontoContractualVig = "";
        if (LstExpContratos[i].MontoEjecutado == -1) LstExpContratos[i].MontoEjecutado = "";

        if (LstExpContratos[i].PenalidadMora == -1) LstExpContratos[i].PenalidadMora = "";
        if (LstExpContratos[i].PenalidadOtros == -1) LstExpContratos[i].PenalidadOtros = "";
        if (LstExpContratos[i].SaldoTotal == -1) LstExpContratos[i].SaldoTotal = "";
    }
    
    //$("#btnGenerarEntregable").bind("click", Nuevo);     
    dataTable = $('#dtContratos').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
    //        { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditar'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": "IdExpediente", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "ContratoPrimigenio", "title": "Contrato ", "width": "5%" },
            { "data": "NroProcedimiento", "title": "Procedimiento ", "width": "5%" },
            { "data": "Descripcion", "title": "Objeto de Contratacion", "width": "5%" },
            
            { "data": "AreaUsuaria",  "title": "Area Usuaria", "width": "5%" },
            //{ "data": null, "defaultContent": "", "title": "Nro Orden", "width": "5%" },                                    
            { "data": "Proveedor", "title": "Contratista", "width": "35%" },
            { "data": "FechaNotificacion", "title": "Fecha Suscripcion", "width": "5%" },
            { "data": "FechaInicioPlazo", "title": "Inicio", "width": "5%" },
            { "data": "FechaFinPlazo", "title": "Fin", "width": "5%" },
            { "data": "MontoAdjudicado", "title": "Monto Adjudicado(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "PrestacionAdicional", "title": "Prestacion Adicional(S/)", "width": "5%", "className": "dt-body-right" },
            { "data": "Reduccion", "title": "Reduccion(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "MontoContractualVig", "title": "Monto Contrato Vigente(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "MontoEjecutado", "title": "Monto Ejecutado(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "PenalidadMora", "title": "Penalidad Mora(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "PenalidadOtros", "title": "Otras Penalidades(S/)", "width": "5%", "className": "dt-body-right"},
            { "data": "SaldoTotal", "title": "Saldo del Contrato(S/)", "width": "5%", "className": "dt-body-right"}            

        ],
        "language": {
            "emptyTable": "--no data found --",
            "url": "/Content/Javascript/plugins/es_es.txt"
        },
        "width": "100%",
        "data": LstExpContratos
    });


    
}



