function loadDataTable(lstEntregables) {

    //var lstUsuarios = JSON.parse('@MvcHtmlString.Create(ViewBag.Usuarios)');

    dataTable = $('#tblEntregables').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button class='btn btn-success text-white btn_tblEditar' style='cursor:pointer; width:70px;'   title='Detalle'>Ver Detalle</button>" },
            { "data": "AnoEje", "width": "5%" },
            { "data": "NroOrden", "width": "5%" },
            { "data": "TipoBien", "width": "5%" },
            //            { "data": "TipoProveedor", "width": "5%" },
            { "data": "FechaOrden", "width": "5%" },
            { "data": "NroContrato", "width": "5%" },
            { "data": "DocReferencia", "width": "5%" },
            { "data": "Monto", "width": "5%" },
            { "data": "Concepto", "width": "30%" }

        ],
        "language": {
            "emptyTable": "--no data found --"
        },
        "width": "100%",
        "data": lstEntregables
    });


    //Ver Detalle 
    $('#tblEntregables tbody').on('click', '.btn_tblEditar', function () {
        var table = $('#tblEntregables').DataTable();

        alert("Hola");
        //var usuario = table.row($(this).parents('tr')).data();
        //AbrirDialogoOrden(usuario);
        AbrirDialogoOrden();
    });
}

function AbrirDialogoOrden() {
    $('#divOrdenes').hide();
    $('#divActualizarOrden').show('slow');
}