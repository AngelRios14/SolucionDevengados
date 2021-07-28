

var dataClienteOficinas = [];
var dataClienteEstados = [];

$(document).ready(function () {
    fnSeleccionarOpcion("idPPD");
    $("#txtFecDevengadoSiaf").datepicker();    
    $("#txtFecEstado").datepicker();    
    fnListaPendientesxDevengar();
    fnListaOficinas();
    fnListaEstados();
    //$("#btnGenerarEntregable").click(function () { cargarTablaEntregable("", 0); });
    $("#ddlOficina").change(function () {
        fnLLenarComboEstado();
    });
    $("#btnActualizar").click(function () { fnActualizarOrden(); });
    
});



function fnLLenarComboEstado() {
    var idOfi= $("#ddlOficina").val();
    var objLstEstado = dataClienteEstados;
    if (objLstEstado != null)
    {
        if (objLstEstado.length > 0)
        {
            $("#ddlEstado").empty();
            var nroRegistros = objLstEstado.length;
            $("<option value='0'>- Seleccione -</option>").appendTo("#ddlEstado");
            
            for (var i = 0; i <= nroRegistros - 1; i++) {
                if (objLstEstado[i].IdOficina == idOfi)                 
                $("<option value='" + objLstEstado[i].IdEstado + "'>" + objLstEstado[i].NombreEstado + "</option>").appendTo("#ddlEstado");
            }
        }
    }

}



function fnListaOficinas() {

    var requrl = xpathLstOficinas;

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
            
            dataClienteOficinas = response.DataOficinas;

            if (dataClienteOficinas != null) {
                if (dataClienteOficinas.length > 0) {
                    var nroRegistros = dataClienteOficinas.length;
                    for (var i = 0; i < nroRegistros; i++) {
                        $("<option value='" + dataClienteOficinas[i].IdOficina + "'>" + dataClienteOficinas[i].NombreOficina + "</option>").appendTo("#ddlOficina");
                    }
                    
                }
            }
            
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}


function fnListaEstados() {

    var requrl = xpathLstEstadosxOficina;

    var params = JSON.stringify({
        //idOficina: $.trim($('#ddlEstado').val())
        idOficina:0
    });
    $.ajax({
        type: "POST",
        url: requrl,
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //BloquearBlockUI();
        },
        complete: function () {
            //DesbloquearBlockUI();
        },
        success: function (response) {
                        
            dataClienteEstados = response.DataEstadosxOficina;            
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}




function fnListaPendientesxDevengar() {    

    var requrl = xpathLstPendientesxDeveng;

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
    /*
    buttons: [
        { text: '', titleAttr: 'Agregar Usuario', className: 'btn-default fa fa-lg fa-plus-circle', action: function (e, dt, node, config) { AbrirDlgUsuario(null); } },
        { extend: 'excel', text: '', titleAttr: 'Excel', className: 'btn-default fa fa-lg fa-file-excel-o', exportOptions: { columns: ':not(:lt(2))' } },
        { extend: 'pdf', text: '', titleAttr: 'PDF', className: 'btn-default fa fa-lg fa-file-pdf-o', exportOptions: { columns: ':not(:lt(2))' } },
        { extend: 'print', text: '', titleAttr: 'Imprimir', className: 'btn-default fa fa-lg fa-print', exportOptions: { columns: ':not(:lt(2))' } },
        { extend: 'colvis', text: '', titleAttr: 'Columnas', className: 'btn-default fa fa-lg fa-list', exportOptions: { columns: ':not(:lt(2))' } }
    ],*/

        //"extend": "pdfHtml5", "title": "Data export", "exportOptions": [{ "columns": ':not(:lt(2))' }, { "columns": ':not(:lt(3))' }]
                    //"extend": "pdfHtml5", "title": "Data export", "exportOptions": [3, 4, 5, 6, 7, 8, 9, 10, 11]

        dataTable = $('#dtPendientesxDevengar').DataTable({
            "dom": "Bfrtip",
            "pagingType": "full_numbers",
            "buttons": [
                {
                    "extend": "excelHtml5", "title": "Data export", "exportOptions": { "columns": ':visible' } 
                } ,
                {

                    "extend": "pdfHtml5", "title": "Data export", "exportOptions": { "columns":':visible'}
                    
                }
            ],
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditarConsolidado'  data-toggle='modal'   data-target='#exampleModalCenter'   style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": "IdExpediente", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdOrden", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdEntregable", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "Descripcion", "title": "Glosa", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Grupo", "title": "Grupo", "width": "35%" },
            { "data": "Siaf", "title": "Expediente SIAF", "width": "5%" },
            { "data": "Proveedor", "title": "Proveedor", "width": "30%" },
            { "data": "NroOrden", "title": "Nro Orden", "width": "5%" },
            { "data": "AreaUsuaria", "title": "Area Usuaria", "width": "5%" },
            { "data": "MontoProgramado", "title": "Monto por Devengar", "width": "5%" },
            { "data": "FechaVencimiento", "title": "Fecha Vencimiento", "width": "5%" },
            { "data": "Logistico", "title": "Logistico", "width": "5%" },            

            { "data": "NombreEstado", "title": "Estado", "width": "5%" },            
            { "data": "NombreOficina", "title": "Ubicacion", "width": "5%" },            
            
            { "data": "IdOficina", "title": "IdOficina", "width": "5%", "visible": false },
            { "data": "IdEstado", "title": "IdEstado", "width": "5%", "visible": false },
            { "data": "FechaEstado", "title": "Fecha Estado", "width": "5%", "visible": false },
            { "data": "FechaDevengado", "title": "Fecha Devengado", "width": "5%", "visible": false },
            { "data": "FechaPago", "title": "Fecha Pago", "width": "5%", "visible": false },
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
        $('#hdIdEntregable').val(consolidado.IdEntregable);
        $("#ddlOficina").val(consolidado.IdOficina);
        fnLLenarComboEstado();
        $("#ddlEstado").val(consolidado.IdEstado);
        $('#txtFecEstado').val(consolidado.FechaEstado);
        $('#txtFecDevengadoSiaf').val(consolidado.FechaDevengado);
        $('#txtObservacion').val(consolidado.Observacion);       

        //fnEditarEntregableOSPlg(entregableOS);//AbrirDialogoOrden(entregableOS);
    });

}


function fnActualizarOrden() {
    var DataExpedienteOrden = {
        //ide: $("#txtNumDoc").attr('ide'),
        idEntregable: $('#hdIdEntregable').val(),
        idOficina: $('#ddlOficina').val(),
        idEstado: $('#ddlEstado').val(),
        fecEstado: $('#txtFecEstado').val(),
        fecDevengado: $('#txtFecDevengadoSiaf').val(),
        observacion: $('#txtObservacion').val()             
    };

    $.post(xpathActualizarEntregable, { DataExpedienteOrden }, function (data) {

        debugger;
        if (data.Resultado == "1") {

            var LstData = data.ListaPendientesxDevengar;
            $('#dtPendientesxDevengar').DataTable().clear().draw();
            $('#dtPendientesxDevengar').DataTable().rows.add(LstData).draw();
            toastr.success("Se actualizo con éxito!!", 'Confirmación');
        }
        else {
            toastr.error(data.Mensaje, "Error");
        }

        //if (data.Resultado == "OK") {
        //    var Usuario = data.Usuario;
        //    var lstUsuarios = data.Lista;
        //    var lista = JSON.parse(data.Lista);

        //    $("#txtNumDoc").attr('ide', Usuario.ide);
        //    $('#dtUsuarios').DataTable().clear().draw();
        //    $('#dtUsuarios').DataTable().rows.add(lista).draw();
        //    if (UsuarioNuevo == 1) {
        //        if (Usuario.email == '' || Usuario.email == undefined) {
        //            toastr.success("Usuario registrado con éxito!!", 'Confirmación');
        //        }
        //        else {
        //            toastr.success("Usuario registrado con éxito!!. Se ha enviado las credenciales de acceso al correo.", 'Confirmación');
        //        }

        //    }
        //    else {
        //        toastr.success("Usuario actualizado con éxito!!", 'Confirmación');
        //    }
        //    $('#divUsuarioPerfil').show('slow');
        //}
        //else {
        //    toastr.error(data.Mensaje, "Error");
        //}
        //DesbloquearBlockUI();
    }).fail(function (err) {
        //DesbloquearBlockUI();
        toastr.error("Error Registrando Reporte Saldo", "Error");
    });

}
