$(document).ready(function () {
    
    fnListaPendientesxDevengar();
    //$("#btnGenerarEntregable").click(function () { cargarTablaEntregable("", 0); });

});


function fnListaPendientesxDevengar() {    

    var requrl = xpathLstPendientesxDeveng;

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
            var objLista = response.DataPendientesxDevengar;
            fnCargarTablaPendientesxDevengar(objLista);            
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}



function fnCargarTablaPendientesxDevengar(LstPendientesxDevengar) {

    var nroRegistros = LstPendientesxDevengar.length;
    for (var i = 0; i < nroRegistros; i++) {
                
        if (LstPendientesxDevengar[i].MontoProgramado == -1) LstEntregables[i].MontoProgramado = "";
        
        
    }


    dataTable = $('#dtPendientesxDevengar').DataTable({
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditarConsolidado'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": "IdExpediente", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdOrden", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdEntregable", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "Descripcion", "title": "Glosa", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Grupo", "title": "Grupo", "width": "35%" },
            { "data": "Siaf", "title": "Expediente SIAF", "width": "5%" },
            { "data": "Proveedor", "title": "Proveedor", "width": "5%" },
            { "data": "NroOrden", "title": "Nro Orden", "width": "5%" },
            { "data": "AreaUsuaria", "title": "Area Usuaria", "width": "5%" },
            { "data": "MontoProgramado", "title": "Monto por Devengar", "width": "5%" },
            { "data": "FechaVencimiento", "title": "Fecha Vencimiento", "width": "5%" },
            { "data": "Logistico", "title": "Logistico", "width": "5%" },
            { "data": "Ubicacion Estado", "title": "Ubicacion/Estado", "width": "5%" },
            { "data": "FecActEstado", "title": "Fecha Estado", "width": "5%" },                       
            { "data": "Observacion", "title": "Observacion", "width": "5%" }
        ],
        "language": {
            "emptyTable": "--no data found --",
            "url": "/Content/Javascript/plugins/es_es.txt"
        },
        "width": "100%",
        "data": LstPendientesxDevengar
    });


    $('#dtPendientesxDevengar tbody').on('click', '.btn_tblEditarConsolidado', function () {
        var table = $('#dtPendientesxDevengar').DataTable();
        debugger;
        var consolidado = table.row($(this).parents('tr')).data();

        //fnEditarEntregableOSPlg(entregableOS);//AbrirDialogoOrden(entregableOS);
    });

}
