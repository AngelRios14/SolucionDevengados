var dataTable;


function InicializarTablas(lstOrdenes) {

    var strRutaRaiz = "";
    $('#tblOrdenes').dataTable({
        language: {
            "url": strRutaRaiz + "Content/Javascript/plugins/es_es.txt"
        },
        dom: "<'row'<'col-lg-4'l><'col-lg-4'f><'col-lg-4 text-right'B>><'row'<'col-lg-12'tr>><'row'<'col-lg-5'i><'col-lg-7'p>>",
        procesing: true,
        serverSide: false,
        filter: true,
        orderMulti: false,
        paging: true,
        /*buttons: [
            { text: '', titleAttr: 'Agregar Usuario', className: 'btn-default fa fa-lg fa-plus-circle', action: function (e, dt, node, config) { AbrirDlgUsuario(null); } },
            { extend: 'excel', text: '', titleAttr: 'Excel', className: 'btn-default fa fa-lg fa-file-excel-o', exportOptions: { columns: ':not(:lt(2))' } },
            { extend: 'pdf', text: '', titleAttr: 'PDF', className: 'btn-default fa fa-lg fa-file-pdf-o', exportOptions: { columns: ':not(:lt(2))' } },
            { extend: 'print', text: '', titleAttr: 'Imprimir', className: 'btn-default fa fa-lg fa-print', exportOptions: { columns: ':not(:lt(2))' } },
            { extend: 'colvis', text: '', titleAttr: 'Columnas', className: 'btn-default fa fa-lg fa-list', exportOptions: { columns: ':not(:lt(2))' } }
        ],*/
        columnDefs: [
            { target: [0], searchable: false, orderable: false, visible: true },
            { target: [4], searchable: true, orderable: true, visible: true },
        ],
        columns: [
            {
                data: "Acción", title: "Opciones", className: "dt-center"
                , defaultContent: "<button class='btn-xs btn-primary btn_tblEditar' title='Editar'><span class='fa fa-lg fa-edit'></span></button>"
                    + "&nbsp;"
                    + "<button class='btn-xs btn-danger btn_tblEliminar' title='Eliminar'><span class='fa fa-lg fa-trash'></span></button>"
                    + "&nbsp;"
                    + "<button class='btn-xs btn-warning btn_tblGenerarClave' title='Generar Clave'><span class='fa fa-lg fa-key'></span></button>"
            },
            { data: "AnoEje", title: "Ide", autoWidth: true },
            { data: "NroOrden", title: "Usuario", autoWidth: true },
            { data: "NroOrden", title: "Nro Doc", autoWidth: true },
            //{ data: "NroOrden", title: "Nombre", autoWidth: true },
            //{ data: "NroOrden", title: "Nro Contacto", autoWidth: true },
            //{ data: "NroOrden", title: "Email", autoWidth: true }
        ],
        data: lstOrdenes
    });
}

//$(document).ready(function () {
//    debugger;
//    loadDataTable();
//});

function loadDataTable(lstOrdenes) {

    //var lstUsuarios = JSON.parse('@MvcHtmlString.Create(ViewBag.Usuarios)');

    dataTable = $('#tblOrdenes').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button class='btn btn-success text-white btn_tblEditar' style='cursor:pointer; width:70px;'   title='Detalle'>Ver Detalle</button>"  },
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
        "data": lstOrdenes
    });


    //Ver Detalle 
    $('#tblOrdenes tbody').on('click', '.btn_tblEditar', function () {
        var table = $('#dtUsuarios').DataTable();

        
        //var usuario = table.row($(this).parents('tr')).data();
        //AbrirDialogoOrden(usuario);
        AbrirDialogoOrden();
    });
}

function loadDataTableEntregable(lstEntregables) {

    //var lstUsuarios = JSON.parse('@MvcHtmlString.Create(ViewBag.Usuarios)');

    dataTable = $('#tblEntregables').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button class='btn btn-success text-white btn_tblEditarEntregable' style='cursor:pointer; width:70px;'   title='Detalle'>Editar</button>" },
            { "data": "NroEntregable", "width": "5%" },
            { "data": "Plazo", "width": "5%" },
            { "data": "FechaVencimiento", "width": "5%" },
            { "data": "CantidadPorcentaje", "width": "5%" },

            { "data": "DocTramite", "width": "5%" },
            { "data": "FechaEntregaTramite", "width": "5%" },

            { "data": "NroFacturaRxH", "width": "5%" },
            { "data": "ImporteDevengado", "width": "5%" },
            { "data": "Penalidad", "width": "5%" },
            { "data": "NetoAPagar", "width": "5%" },
            { "data": "Observaciones", "width": "30%" }

        ],
        "language": {
            "emptyTable": "--no data found --"
        },
        "width": "100%",
        "data": lstEntregables
    });


    //Ver Detalle 
    $('#tblOrdenes tbody').on('click', '.btn_tblEditar', function () {
        var table = $('#dtUsuarios').DataTable();

        
        //var usuario = table.row($(this).parents('tr')).data();
        //AbrirDialogoOrden(usuario);
        AbrirDialogoOrden();
    });

    $('#tblEntregables tbody').on('click', '.btn_tblEditarEntregable', function () {
        //var table = $('#dtUsuarios').DataTable();
        //var usuario = table.row($(this).parents('tr')).data();
        //AbrirDialogoOrden(usuario);
        //$("#mostrarmodal").modal("show");
        bandera = "1";
        AbrirDialogoEntregable();
    });
}

function AbrirDialogoEntregable() {

    debugger;
    $('#divOrdenes').hide();
    $('#divActualizarOrden').hide();
    $('#divActualizarEntregable').show('slow');
}



function AbrirDialogoOrden() {
    $('#divOrdenes').hide();
    $('#divActualizarOrden').show('slow');
}


function CerrarDlgUsuario() {
    $('#divActualizarOrden').hide();
    $('#divOrdenes').show('slow');

}


function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}