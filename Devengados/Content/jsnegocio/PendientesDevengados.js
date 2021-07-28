var dataClienteOficinas = [];
var dataClienteEstados = [];

$(document).ready(function () {
    fnMenu();
    //$('#idPP').addClass('active');
    fnSeleccionarOpcion("idPP");
    $("#txtFecDevengadoSiaf").datepicker();
    $("#txtFecEstado").datepicker();    
    $("#txtFecPago").datepicker();    
    fnListaOficinas();
    fnListaEstados();
    $("#ddlOficina").change(function () {
        fnLLenarComboEstado();
    });
    fnListaPendientesDevengados();    
    $("#btnActualizarPP").click(function () { fnActualizarOrdenPago(); });    
    
});


function fnListaPendientesDevengados() {

    var requrl = xpathLstPendientesDevengados;

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
            var objLista = response.DataPendientesDevengados;
            fnCargarTablaPendientesDevengados(objLista);
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}



function fnCargarTablaPendientesDevengados(LstPendientesDevengados) {

    var nroRegistros = LstPendientesDevengados.length;
    for (var i = 0; i < nroRegistros; i++) {
        if (LstPendientesDevengados[i].MontoProgramado === -1) LstEntregables[i].MontoProgramado = "";
    }

    dataTable = $('#dtPendientesDevengados').DataTable({
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button  type='button'   class='btn-xs btn-primary btn_tblEditarConsolidado' data-toggle='modal'   data-target='#exampleModalCenter'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

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
            { "data": "IdOficina", "title": "IdOficina", "width": "5%", "visible": false },
            { "data": "IdEstado", "title": "IdEstado", "width": "5%", "visible": false },
            { "data": "FechaEstado", "title": "Fecha Estado", "width": "5%", "visible": false },
            { "data": "FechaDevengado", "title": "Fecha Devengado", "width": "5%" },
            { "data": "FechaPago", "title": "Fecha Pago", "width": "5%" },
            { "data": "Observacion", "title": "Observacion", "width": "5%" }
        ],
        "language": {
            "emptyTable": "--no data found --",
            "url": "/Content/Javascript/plugins/es_es.txt"
        },
        "width": "100%",
        "data": LstPendientesDevengados
    });

    $('#dtPendientesDevengados tbody').on('click', '.btn_tblEditarConsolidado', function () {
        var table = $('#dtPendientesDevengados').DataTable();        
        var consolidado = table.row($(this).parents('tr')).data();
        $('#hdIdEntregable').val(consolidado.IdEntregable);
        //$("#ddlOficina").val(consolidado.IdOficina);
        
        $("#ddlOficina").val(8);
        fnLLenarComboEstado();
        //$("#ddlEstado").val(consolidado.IdEstado);        
        $("#ddlEstado").val(85);                
        //$('#txtFecEstado').val(consolidado.FechaEstado);
        //$('#txtFecDevengadoSiaf').val(consolidado.FechaDevengado);                       
        $('#txtFecPago').val(FechaActualTexto());
        //$('#txtObservacion').val(consolidado.Observacion); 
         
    });
}

function fnActualizarOrdenPago() {
    var DataExpedienteOrden = {
        //ide: $("#txtNumDoc").attr('ide'),
        idEntregable: $('#hdIdEntregable').val(),
        idOficina: $('#ddlOficina').val(),
        idEstado: $('#ddlEstado').val(),
        fecEstado: $('#txtFecEstado').val(),
        fecDevengado: $('#txtFecDevengadoSiaf').val(),
        fecPago: $('#txtFecPago').val(),
        observacion: $('#txtObservacion').val()
    };

    $.post(xpathLstActualizarEntregablePago, { DataExpedienteOrden }, function (data) {

        if (data.Resultado == "1") {
            
            toastr.success("Se actualizo con éxito!!", 'Confirmación');
            var LstData = data.ListaPendientesDevengados;
            $('#dtPendientesDevengados').DataTable().clear().draw();
            $('#dtPendientesDevengados').DataTable().rows.add(LstData).draw();
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
        toastr.error("Error Registrando ", "Error");
    });

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
            fnLlenarComboOficina();
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}


function fnLlenarComboOficina() {
    if (dataClienteOficinas !== null) {
        if (dataClienteOficinas.length > 0) {
            var nroRegistros = dataClienteOficinas.length;
            for (var i = 0; i < nroRegistros; i++) {
                $("<option value='" + dataClienteOficinas[i].IdOficina + "'>" + dataClienteOficinas[i].NombreOficina + "</option>").appendTo("#ddlOficina");
            }
            $("#ddlOficina").val(8);
        }
    }
}


function fnListaEstados() {

    var requrl = xpathLstEstadosxOficina;

    var params = JSON.stringify({
        //idOficina: $.trim($('#ddlEstado').val())
        idOficina: 0
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

function fnLLenarComboEstado() {
    var idOfi = $("#ddlOficina").val();
    var objLstEstado = dataClienteEstados;
    if (objLstEstado != null) {
        if (objLstEstado.length > 0) {
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
