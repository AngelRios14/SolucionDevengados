var montosProgramados = [];
var porcentajes = [];

$(document).ready(function () {
    //alert("desde vista de ListaServicios");    
    fnSeleccionarOpcion("idLC");
    $("#txtFecNotiContratoExpOS").datepicker();
    $("#txtFecInicioPlazoExpOS").datepicker();
    $("#txtFecFinPlazoExpOS").datepicker();

    $("#txtFecNotiContratoExpOS").mask("00/00/0000");
    $("#txtFecInicioPlazoExpOS").mask("00/00/0000");
    $("#txtFecFinPlazoExpOS").mask("00/00/0000");

    //----Entregable-------//
    $('#txtFechaVencES').datepicker();
    $('#txtFechaTramiteES').datepicker();
    $('#txtFechaDevengadoSE').datepicker();
    $('#txtFechaPagoSE').datepicker();

    $("#txtFechaVencES").mask("00/00/0000");
    $('#txtFechaTramiteES').mask("00/00/0000");
    $('#txtFechaDevengadoSE').mask("00/00/0000");
    $('#txtFechaPagoSE').mask("00/00/0000");
    fnInicializarValidaciones();
    //---------------------//
    $('#divOrdenServicio').hide();
    $('#divEntregables').hide();
    fnValidarDosDecimales();
    fnListaOrdenesServicio();
    $("#btnGuardarExpedienteOrden").bind("click", fnGuardarExpedienteOrden);
    $("#btnGenerarEntregable").bind("click", fnGenerarEntregable);
    $("#txtFecFinPlazoExpOS").click(function () { fnCalcularFecha(); });
    $("#btnGuardarEntregable").bind("click", fnActualizarEntregable);
    fnCalcularMontoAPagarEntregable();
    fnFormulaMontoProgramado();

});

function fnGuardarExpedienteOrden() {
    if ($('#frmRegOrden').valid() === false) {
        toastr.error("Ingrese todos los datos correctamente", 'Error');
        return;
    }



    var DataExpedienteOS = {

        idExpediente: $.trim($('#hdIdExpediente').val()),
        idOrden: $.trim($('#hdIdOrdenServicio').val()),
        contratoExpOS: $.trim($('#txtContratoExpOS').val()),
        procediExpOS: $.trim($('#txtProcedimientoExpOS').val()),
        descripExpOS: $.trim($('#txtDescripcionExpOS').val()),

        proveExpOS: $.trim($('#txtProveedorExpOS').val()),
        fecNotiContraExpOS: $.trim($('#txtFecNotiContratoExpOS').val()),
        plazoExpOS: $.trim($('#txtPlazoExpOS').val()),
        montoContraVigExpOS: $.trim($('#txtMontoContraVigExpOS').val()).replace(/\,/g, ""),
        montoAdjExpOS: $.trim($('#txtMontoAdjExpOS').val()).replace(/\,/g, ""),
        adicionaExpOS: $.trim($('#txtPrestaAdicionalExpOS').val()).replace(/\,/g, ""),
        reduExpOS: $.trim($('#txtReduccionExpOS').val()).replace(/\,/g, ""),
        fecIniExpOS: $.trim($('#txtFecInicioPlazoExpOS').val()),
        fecFinExpOS: $.trim($('#txtFecFinPlazoExpOS').val()),

        nroOrdenOS: $.trim($('#txtNroOrdenS').val()),
        expSiafOS: $.trim($('#txtExpSiafS').val()),
        certifiOS: $.trim($('#txtCertificadoS').val()),
        montoComprOS: $.trim($('#txtMontoCompromSiafS').val()).replace(/\,/g, ""),
        ampliOS: $.trim($('#txtAmpSiafS').val()).replace(/\,/g, ""),
        rebajaOS: $.trim($('#txtRebajaSiafS').val()).replace(/\,/g, ""),
        montoDevengOS: $.trim($('#txtMontoDevengadoSiafS').val()).replace(/\,/g, ""),
        saldoOS: $.trim($('#txtSaldoSiafS').val()).replace(/\,/g, ""),
        nroEntregOS: $.trim($('#txtCantEntregableS').val()),
        //monto del contrato (contrato = suma de montos de ordenes (servicio y/o compras))

        montoContratoC: $.trim($('#txtMontoContractualExpOS').val()).replace(/\,/g, ""),
        totalDevengadoC: $.trim($('#txtTotalDevengadoExpOS').val()).replace(/\,/g, ""),
        penalidadMoraC: $.trim($('#txtPenalidadMoraExpOS').val()).replace(/\,/g, ""),
        penalidadOtrosC: $.trim($('#txtOtrasPenalidadesExpOS').val()).replace(/\,/g, ""),
        saldoContratoC: $.trim($('#txtSaldoPendienteExpOS').val()).replace(/\,/g, ""),
        dataEntregables: ""//dataCadenaEntregables

    };

    $.post(xpathRegExpOrdenServ, { DataExpedienteOS }, function (data) {

        //return Json(new { Resultado = "1", ListaOrdenes = DataListaOrdenServ, ListaEntregables= DataListaEntregables });//1: ok

        if (data.Resultado == "1") {

            toastr.success("Reporte de Saldo actualizado con éxito!!", 'Confirmación');
            var objListaOS = data.ListaOrdenes;

            // Expediente//??
            $('#hdIdExpediente').val(objListaOS[0].IdExpedienteOrden);
            $('#hdIdOrdenServicio').val(objListaOS[0].IdOrden);
            //--Orden//
            $('#txtNroOrdenS').val(objListaOS[0].NroOrden);
            $('#txtExpSiafS').val(objListaOS[0].Siaf);
            $('#txtCertificadoS').val(objListaOS[0].NroCertificado);

            $('#txtAmpSiafS').val(fnEspacioVacio(objListaOS[0].Ampliacion));
            $('#txtRebajaSiafS').val(fnEspacioVacio(objListaOS[0].Reduccion));
            $('#txtMontoDevengadoSiafS').val(fnEspacioVacio(objListaOS[0].MontoDevengado));
            $('#txtSaldoSiafS').val(fnEspacioVacio(objListaOS[0].SaldoSiaf));
            $('#txtCantEntregableS').val(fnEspacioVacio(objListaOS[0].CantidadEntregables));



            var LstEntregables = data.ListaEntregables;
            $('#dtgEntregables').hide();
            $('#dtgEntregablesPlg').show();
            fnCargarDataTableEntregables(LstEntregables);
            $("#btnGenerarEntregable").prop("disabled", true);//Deshabilitamos el boton una  vez generado los entregables

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

function fnInicializarValidaciones() {
    // Para las fechas se agrega la clase 'date' para validar formato de fechas otra opcion es la funcion "FechaCorrecta"
    $("#frmEntregable").validate({
        ignore: ":hidden",
        rules: {
            //cboTipoDoc: "required",
            //txtNumDoc: { required: true, digits: true, minlength: 8, maxlength: 8 },
            txtFechaVencES: { "required": true, "FechaCorrecta": true },
            txtPorcentajeES: { "required": true, "PorcentajeCorrecto": true, "NoesUnSoloEntregable": true },
            txtProgramadoES: { "required": true, "MontoComprometido": true },
            txtMontoDevengadoSE: { "required": false, "MontoProgramado": true },
            txtPenalidadMoraSE: { "required": false, "MontoProgramado": true },
            txtOtrasPenaSE: { "required": false, "MontoProgramado": true },
            txtMontoPagarSE: { "required": false, "MontoProgramado": true },


            txtFechaDevengadoSE: { "required": false, "FechasMayorAVencimiento": true },
            txtFechaPagoSE: { "required": false, "FechasMayorAVencimiento": true }
            //txtUsuario: { required: true, minlength: 2, maxlength: 40 }
        }
    });


}

function fnCalcularMontoAPagarEntregable() {

    let txtCajas = document.getElementsByClassName("formulaEntreg");
    let nroCajas = txtCajas.length;
    let txt;
    let idcaja;
    for (var i = 0; i < nroCajas; i++) {

        txt = txtCajas[i];
        txt.addEventListener("keyup", function (e) {
            fnFormulaMontoAPagar(this);
        });
    }
}

function fnFormulaMontoAPagar(caja) {
    let idcaja = caja.id;
    //let txtCajas = document.getElementsByClassName("formulaEntreg");
    let rpta = $('#txtMontoDevengadoSE').val().replace(/\,/g, "") * 1 - $('#txtPenalidadMoraSE').val().replace(/\,/g, "") * 1 - $('#txtOtrasPenaSE').val().replace(/\,/g, "") * 1;

    $('#txtMontoPagarSE').val(rpta.toFixed(2));
}

function fnFormulaMontoProgramado() {
    let txt = document.getElementById("txtPorcentajeES");
    let montoOrden;
    debugger;
    txt.addEventListener("keyup", function (e) {
        montoOrden = $('#txtMontoCompromSiafS').val().replace(/\,/g, "") * 1;
        $('#txtProgramadoES').val(((montoOrden * txt.value * 1) / 100).toFixed(2));
    });

}



function fnConfigurarPerdidaEnCrecPastos() {
    let txtCajas = document.getElementsByClassName("FILA04");
    let ntxtCajas = txtCajas.length;
    let txt;
    for (var i = 0; i < ntxtCajas; i++) {
        txt = txtCajas[i];
        //txt.addEventListener("keyup", function (e) {
        //    fnSumaCultivos(CodPastos, this);
        //});
        // OPCION 2: CALCULO DE LA FORMULA COMO EXCEL ( Se dispara el hacer Enter, flechas direccionales, tab y perder el foco)
        txt.addEventListener("keypress", function (e) {
            if (e.which == 13) {
                fnSumaCultivos(CodPastos, this);
                return false;
            }
        });
        //El evento blur es disparado cuando un elemento ha perdido su foco
        txt.addEventListener("blur", function (e) {
            fnSumaCultivos(CodPastos, this);
            return false;
        });
        //FIN OPCION 2
    }
}



function fnGenerarEntregable() {

    if ($('#frmRegOrden').valid() === false) {
        toastr.error("Ingrese todos los datos correctamente", 'Error');
        return;
    }

    //swal({
    //    title: "Seguro que quieres hacer esto?",
    //    text: "Esta acción ya no se podrá deshacer, Así que piénsalo bien.",
    //    type: "warning",
    //    showCancelButton: true,
    //    confirmButtonColor: '#3085d6',
    //    cancelButtonColor: '#d33',
    //    confirmButtonText: 'Si, estoy seguro',
    //    cancelButtonText: "Cancelar"
    //});

    alertify.defaults.transition = "slide";
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";


    //var confirm = alertify.confirm('::Confirmacion de Registro::', '¿Seguro desea grabar?', null, null).set('labels', { ok: 'Confirmar', cancel: 'Cancelar' });
    //confirm.set({ transition: 'slide' });
    //confirm.set('onok', function () { //callbak al pulsar botón positivo
    //    /*var data = new FormData();
    //    data.append("data", ubigeo + "^" + producto + "^" + anioCampania + "^" + contenido + "^" + cadenasust + "^" + idUsuario);
    //    Http.post(urlBase + "Sisagri/GrabarEnBloque", fnMostrarRespuesta, data);*/
    //    cargarTablaEntregable("", 0);
    //    //alertify.success('Has confirmado');
    //});
    //confirm.set('oncancel', function () { //callbak al pulsar botón negativo
    //    alertify.error('Accion Cancelada');
    //}); 

    fnGenerarTablaEntregable();
    fnGuardarOrdenServEntregables();
}



function fnListaOrdenesServicio() {

    var requrl = xpath;
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
            //alert("Respuesta desde el codigo servidor");            
            var objLista = response.DataServicio;
            fnCargarDataTableServicio(objLista);
            //if (objListaCampanias != null) {
            //    if (objListaCampanias.length > 0) {                       

            //}
        },
        error: function (request, status, error) {
            //desbloqObject();
            var re = request;
        }
    });
}




function fnCargarDataTableServicio(LstServicios) {

    $('#divOrdenServicio').hide();

    var nroRegistros = LstServicios.length;
    for (var i = 0; i < nroRegistros; i++) {
        //if (LstEntregables[i].Plazo == -1) LstEntregables[i].Plazo = "";
        //if (LstEntregables[i].Porcentaje == -1) LstEntregables[i].Porcentaje = "";
        LstServicios[i].MontoContractual = FormatoNumero(LstServicios[i].MontoContractual);
        LstServicios[i].MontoEjecutado = FormatoNumero(LstServicios[i].MontoEjecutado);
        LstServicios[i].Importe = FormatoNumero(LstServicios[i].Importe);
        //LstServicios[i].OtraPenalidad = FormatoNumero(LstServicios[i].OtraPenalidad);        
    }

    dataTable = $('#dtServicios').DataTable({
        //"ajax": {
        //    "url": "/OrdenCompraServicio/ListarOrdenes/",
        //    "type": "GET",
        //    "datatype": "json"
        //},

        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditar'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": "IdExpediente", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdOrden", "title": "IdOrden", "autoWidth": "true", "visible": false },
            { "data": "ContratoPrimigenio", "title": "Contrato Primigenio", "width": "5%" },
            { "data": "MontoContractual", "title": "Monto Contractual", "width": "5%", "className": "dt-body-right" },
            { "data": "MontoEjecutado", "title": "Monto Ejecutado", "width": "5%", "className": "dt-body-right" },
            { "data": "AreaUsuaria", "title": "Area Usuaria", "width": "5%" },
            { "data": "NroOrden", "title": "Nro Orden", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Expediente", "title": "Expediente", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Proveedor", "title": "Proveedor", "width": "35%" },
            { "data": "Importe", "title": "Importe", "width": "5%", "className": "dt-body-right" }

            //{ "data": "FechaOrden", "width": "5%" },           

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
        var expedienteOS = table.row($(this).parents('tr')).data();
        AbrirDialogoOrden(expedienteOS);
    });
}

function AbrirDialogoOrden(expedienteOS) {

    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').show('slow');
    if (expedienteOS != undefined || expedienteOS != null) {
        $('#hdIdExpediente').val(expedienteOS.IdExpediente);
        $('#hdIdOrdenServicio').val(expedienteOS.IdOrden);
        if (expedienteOS.IdOrden == -1 || $('#txtCantEntregableS').val() * 1 === 0)
            $("#btnGenerarEntregable").prop("disabled", false);

        else
            $("#btnGenerarEntregable").prop("disabled", true);

        //Buscar con el Id Expediente la orden que tiene relacionada 
        // funcion BuscarOrden( IdExpediente) { 1::(Si exite orden con IdExp se actualiza) 2::(Sino Existe orden con IdExp s registra uno Nuevo) }
        fnObtenerExpediente(expedienteOS);
        $('#txtProveedorExpOS').val(expedienteOS.Proveedor);
    }
}

function fnObtenerExpediente(expedienteOS) {
    // Obtiene un expediente-contrato , este puede tener 1 o mas ordenes (servicio o compra) y esta orden puede tener 1 o mas entregables.
    var params = JSON.stringify({
        idExp: $.trim($('#hdIdExpediente').val())
    });
    var requrl = xpathObtenerExpediente;
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

            var objListaOS = response.DataListaOrdenServ;
            var objListaEntregables = response.DataListaEntregables;
            var objMontosEntregables = response.DataMontosOrden;
            if (expedienteOS != null) {

                $('#txtContratoExpOS').val(expedienteOS.ContratoPrimigenio);
                $('#txtProcedimientoExpOS').val(expedienteOS.NroProcedimiento);
                $('#txtDescripcionExpOS').val(expedienteOS.Descripcion);
                $('#txtProveedorExpOS').val(expedienteOS.Proveedor);
                $('#txtFecNotiContratoExpOS').val(expedienteOS.FechaNotificacion);
                $('#txtPlazoExpOS').val(fnEspacioVacio(expedienteOS.Plazo));
                //$('#txtMontoContraVigExpOS').val(fnEspacioVacio(expedienteOS.MontoContractualVig));
                $('#txtMontoContraVigExpOS').val(fnEspacioVacio(expedienteOS.Importe));

                $('#txtMontoAdjExpOS').val(fnEspacioVacio(expedienteOS.MontoAdjudicado));
                $('#txtPrestaAdicionalExpOS').val(fnEspacioVacio(expedienteOS.PrestacionAdicional));
                $('#txtReduccionExpOS').val(fnEspacioVacio(expedienteOS.Reduccion));
                $('#txtFecInicioPlazoExpOS').val(expedienteOS.FechaInicioPlazo);
                $('#txtFecFinPlazoExpOS').val(expedienteOS.FechaFinPlazo);

                //--Orden//
                //$('#txtMontoCompromSiafS').val(fnEspacioVacio(objListaOS[0].MontoCompSiaf));
                $('#txtMontoCompromSiafS').val(fnEspacioVacio(expedienteOS.Importe));

                //$('#txtMontoContractualExpOS').val(fnEspacioVacio(expedienteOS.MontoContractual));
                $('#txtMontoContractualExpOS').val(fnEspacioVacio(expedienteOS.Importe));

                fnPintarMontosOrden(objMontosEntregables);

            }

            if (objListaOS != null) {
                if (objListaOS.length > 0) {

                    //--Orden//
                    $('#lblNroEntregable').text("Entregable N°: " + objListaOS[0].NroOrden);
                    $('#txtNroOrdenS').val(objListaOS[0].NroOrden);
                    $('#txtExpSiafS').val(objListaOS[0].Siaf);
                    $('#txtCertificadoS').val(objListaOS[0].NroCertificado);

                    $('#txtAmpSiafS').val(fnEspacioVacio(objListaOS[0].Ampliacion));
                    $('#txtRebajaSiafS').val(fnEspacioVacio(objListaOS[0].Reduccion));
                    $('#txtMontoDevengadoSiafS').val(fnEspacioVacio(objListaOS[0].MontoDevengado));
                    $('#txtSaldoSiafS').val(fnEspacioVacio(objListaOS[0].SaldoSiaf));
                    $('#txtCantEntregableS').val(fnEspacioVacio(objListaOS[0].CantidadEntregables));

                    //El totalizado de varias ordenes de servicio en caso sean mas de una orden por expediente                    
                    //Llenar Grilla de Entregables
                    if (objListaEntregables.length > 0) {
                        $('#dtgEntregables').hide();
                        $('#dtgEntregablesPlg').show();
                        fnCargarDataTableEntregables(objListaEntregables);
                    }
                }
            }
        },
        error: function (request, status, error) {
            var re = request;
        }
    });
}

function fnPintarMontosOrden(objMontosEntregables) {
    if (objMontosEntregables != null) {
        if (objMontosEntregables.length > 0) {
            var devengado, p1, p2, xnetoPagar;
            devengado = fnEspacioVacio(objMontosEntregables[0].MontoDevengado);
            p1 = fnEspacioVacio(objMontosEntregables[0].PenalidadMora);
            p2 = fnEspacioVacio(objMontosEntregables[0].OtraPenalidad);
            xnetoPagar = fnEspacioVacio(objMontosEntregables[0].NetoPagar);
            $('#txtTotalDevengadoExpOS').val(devengado);
            $('#txtPenalidadMoraExpOS').val(p1);
            $('#txtOtrasPenalidadesExpOS').val(p2);

            saldo = $('#txtMontoContractualExpOS').val().replace(/\,/g, "") * 1 - p1 * 1 - p2 * 1 - xnetoPagar * 1;
            $('#txtSaldoPendienteExpOS').val(fnEspacioVacio(saldo.toFixed(2)));
        }
    }
}

function fnGenerarTablaEntregable() {

    var oStrHtml = "";
    let xNroEntregables = $.trim($("#txtCantEntregableS").val());
    let xPlazo = $.trim($('#txtPlazoExpOS').val());
    let xFactor = Math.trunc((xPlazo * 1) / (xNroEntregables * 1));
    let xMonto = $.trim($('#txtMontoContraVigExpOS').val()).replace(/\,/g, "");
    //var xFecInicio = new Date($("#txtFecNotiContratoExpOS").val());
    var xFecInicio = $("#txtFecNotiContratoExpOS").val();

    let xArrayPorcentajes = [];
    let xArrayPlazos = [];
    let xArrayMonto = [];
    let xParte = Math.trunc(100 / (xNroEntregables * 1));
    for (var i = 0; i < xNroEntregables; i++) {
        if (i == xNroEntregables - 1) {
            xArrayPorcentajes[i] = 100 - (xParte * (xNroEntregables - 1));
            xArrayPlazos[i] = xPlazo * 1;
            xArrayMonto[i] = (xMonto * xArrayPorcentajes[i] * 1) / 100;
        }
        else {
            xArrayPorcentajes[i] = xParte;
            xArrayPlazos[i] = xFactor * (i + 1);
            xArrayMonto[i] = (xMonto * xArrayPorcentajes[i] * 1) / 100;
        }
    }

    if (xNroEntregables != "") {
        xNroEntregables = xNroEntregables * 1;
        for (var i = 0; i < xNroEntregables; i++)
            oStrHtml = oStrHtml + obtenerNuevaFilaHTML(i + 1, xFactor, xFecInicio, xArrayPorcentajes[i], xArrayPlazos[i], xArrayMonto[i], "", "", xFecInicio, "", "", "", "", "", "", "", "", "", "", "", "");
    }

    $("#dtgDatosEntregables").html(oStrHtml);
}


function obtenerNuevaFilaHTML(pIndex, pFactor, pFecInicio, pXPorcet, pXPlazo, pXMonto, pId, pPlazo, pFechaVenc, pPorcentage, pProgramado, pDocTram, pFecEntregaTram, pNroFact, pMontoDevengado, pPenal1, pPenal2, pNetoPagar, pObs, pFecDeveng, pFecPago) {
    var oNewTrHTML = "<tr class='celdas' style='height:18px;'>";
    pPlazo = pIndex * 1 * pFactor * 1;
    pPorcentage = pXPorcet;
    pPlazo = pXPlazo;
    pProgramado = pXMonto;
    var xxfecha = sumaFecha(pPlazo, pFechaVenc);


    if (false) {
        //if (pId == "") {
        oNewTrHTML += "  <td align='center'></td>" +
            "  <td align='center'></td>";
    }
    else {
        oNewTrHTML += "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:EditarExpedienteOS(\"" + pId + "\",\"" + pIndex + "\");return false;' src='../Content/Images/btnEdit.gif' ></td>";
        //  "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:DeltCompania(\"" + pId + "\",\"" + pPlazo + "\");return false;' src='../Content/Images/btndelete.gif' ></td>";

        //oNewTrHTML += "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:EditarExpedienteOS(\"" + pId + "\");return false;' src='../Content/Images/btnEdit.gif' ></td>" +
        //  "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:DeltCompania(\"" + pId + "\",\"" + pPlazo + "\");return false;' src='../Content/Images/btndelete.gif' ></td>";

    }

    oNewTrHTML += "  <td align='right'  class=' tblEntregable Fila" + pIndex + " Columna1'  id ='EntregableF" + pIndex + "C1'   >" + pIndex + "&nbsp;</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna2'  id ='¨PlazoF" + pIndex + "C2'   >" + pPlazo + "&nbsp;</td>" +
        //"  <td align='left'>" + pPlazo + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna3'  id ='FechaVencF" + pIndex + "C3'   >" + xxfecha + "&nbsp;</td>" +
        //"  <td align='left'>" + pFechaVenc + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna4'  id ='PorcentageF" + pIndex + "C4'   >" + pPorcentage + "%&nbsp;</td>" +
        //"  <td align='left'>" + pPorcentage + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna5'  id ='ProgramadoF" + pIndex + "C5'   >" + pProgramado + "&nbsp;</td>" +
        //"  <td align='left'>" + pProgramado + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna6'  id ='DocTramiteF" + pIndex + "C6'   >" + pDocTram + "&nbsp;</td>" +
        //"  <td align='left'>" + pDocTram + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna7'  id ='FecEntreTram" + pIndex + "C7'   >" + pFecEntregaTram + "&nbsp;</td>" +
        //"  <td align='left'>" + pFecEntregaTram + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna8'  id ='NroFactF" + pIndex + "C8'   >" + pNroFact + "&nbsp;</td>" +
        //"  <td align='left'>" + pNroFact + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna9'  id ='MontoDevengadoF" + pIndex + "C9'   >" + pMontoDevengado + "&nbsp;</td>" +
        //"  <td align='left'>" + pMontoDevengado + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna10'  id ='Penal1F" + pIndex + "C10'   >" + pPenal1 + "&nbsp;</td>" +
        //"  <td align='left'>" + pPenal1 + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna11'  id ='Penal2F" + pIndex + "C11'   >" + pPenal2 + "&nbsp;</td>" +
        //"  <td align='left'>" + pPenal2 + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna12'  id ='NetoPagarF" + pIndex + "C12'   >" + pNetoPagar + "&nbsp;</td>" +
        //"  <td align='left'>" + pNetoPagar + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna13'  id ='ObsF" + pIndex + "C13'   >" + pObs + "&nbsp;</td>" +
        //"  <td align='left'>" + pObs + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna14'  id ='FecDevengF" + pIndex + "C14'   >" + pFecDeveng + "&nbsp;</td>" +
        //"  <td align='left'>" + pFecDeveng + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna15'  id ='FecPagoF" + pIndex + "C15'   >" + pFecPago + "&nbsp;</td>";
    //"  <td align='left'>" + pFecPago + "</td>";   

    return oNewTrHTML + "</tr>";
}

function EditarExpedienteOS(id, fila) {

    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').hide();
    $('#divEntregables').show('slow');
    $('#txtEntregableNroS').val($('#EntregableF' + fila + 'C1').text());
    $('#txtPlazoES').val($('#PlazoF' + fila + 'C2').text());
    $('#txtFechaVencES').val($('#FechaVencF' + fila + 'C3').text());
    $('#txtPorcentajeES').val($('#PorcentageF' + fila + 'C4').text());
    $('#txtProgramadoES').val($('#ProgramadoF' + fila + 'C5').text());
    $('#txtDocTramiteES').val($('#DocTramiteF' + fila + 'C6').text());
    $('#txtFechaTramiteES').val($('#FecEntreTram' + fila + 'C7').text());


    $('#txtFacturaES').val($('#NroFactF' + fila + 'C8').text());
    $('#txtMontoDevengadoSE').val($('#MontoDevengadoF' + fila + 'C9').text());
    $('#txtPenalidadMoraSE').val($('#Penal1F' + fila + 'C10').text());
    $('#txtOtrasPenaSE').val($('#Penal2F' + fila + 'C11').text());
    $('#txtMontoPagarSE').val($('#NetoPagarF' + fila + 'C12').text());
    $('#txtObsSE').val($('#ObsF' + fila + 'C13').text());
    $('#txtFechaDevengadoSE').val($('#FecDevengF' + fila + 'C14').text());
    $('#txtFechaPagoSE').val($('#FecPagoF' + fila + 'C15').text());
}

function fnNuevoEntregable() {
    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').hide();
    $('#divEntregables').show('slow');
    alert();
}


function fnEditarEntregableOSPlg(pEntregable) {

    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').hide();
    $('#divEntregables').show('slow');
    $('#hdIdEntregable').val(pEntregable.IdEntregable);
    $('#txtEntregableNroS').val(pEntregable.NroEntregable);
    $('#hdIdSecuencia').val(pEntregable.NroSecuencia);
    $('#txtPlazoES').val(pEntregable.Plazo);
    $('#txtFechaVencES').val(pEntregable.FechaVencimiento);
    $('#txtPorcentajeES').val(pEntregable.Porcentaje);
    $('#txtProgramadoES').val(pEntregable.MontoProgramado);
    $('#txtDocTramiteES').val(pEntregable.DocTramite);
    $('#txtFechaTramiteES').val(pEntregable.FechaTramite);

    $('#txtFacturaES').val(pEntregable.NroFactura);
    $('#txtMontoDevengadoSE').val(pEntregable.MontoDevengado);
    $('#txtPenalidadMoraSE').val(pEntregable.PenalidadMora);
    $('#txtOtrasPenaSE').val(pEntregable.OtraPenalidad);
    $('#txtMontoPagarSE').val(pEntregable.NetoPagar);
    $('#txtObsSE').val(pEntregable.Observacion);
    $('#txtFechaDevengadoSE').val(pEntregable.FechaDevengado);
    $('#txtFechaPagoSE').val(pEntregable.FechaPago);
}



function fnEliminarEntregable(pEntregable) {
    swal({
        title: "Está seguro?",
        html: "<h3>Se ELIMINARA el entregable Nro: <b>" + pEntregable.NroEntregable + "</b></h3>",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-default',
        buttonsStyling: false
    }).then(function (isConfirm) {

        if (isConfirm.value == true) {

            //BloquearBlockUI();
            let xNroEntregables = $.trim($("#txtCantEntregableS").val()) * 1 - 1;
            $("#txtCantEntregableS").val(xNroEntregables);
            fnGenerarTablaEntregable();

            $.post(xpathEliminarEntregable, { IdEntregable: pEntregable.IdEntregable, IdOrden: pEntregable.IdOrdenEntregable }, function (data) {
                if (data.Resultado == "1") {
                    var lista = data.ListaEntregables;

                    $("#txtCantEntregableS").val(lista.length);
                    $('#dtgEntregablesPlg').DataTable().clear().draw();
                    $('#dtgEntregablesPlg').DataTable().rows.add(lista).draw();
                    toastr.success("Entregable eliminado con éxito!.", 'Confirmación');
                }
                else {
                    toastr.error(data.Mensaje, "Error");
                }
                //DesbloquearBlockUI();
            }).fail(function (err) {
                //DesbloquearBlockUI();
                toastr.error("Error ", "Error");
            });

        }

    });

}

function CerrarDlgOrdenServ() {
    $('#divListaOrdenesServicio').show('slow');
    $('#divOrdenServicio').hide();
    $('#divEntregables').hide();
}

function CerrarDlgEntregable() {

    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').show('slow');
    $('#divEntregables').hide();
}


function sumaFecha(d, fecha) {
    d = d * 1 - 1;
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;
    return (fechaFinal);
}

function fnCalcularFecha() {
    var fechafin;
    if ($.trim($('#txtFecInicioPlazoExpOS').val()) != "" && $.trim($('#txtPlazoExpOS').val()) != "") {

        fechafin = sumaFecha($.trim($('#txtPlazoExpOS').val()), $.trim($('#txtFecInicioPlazoExpOS').val()));
        $('#txtFecFinPlazoExpOS').val(fechafin);
    }

}

function fnGuardarOrdenServEntregables() {
    debugger;
    let txtCajas = document.getElementById("dtgDatosEntregables").getElementsByClassName("tblEntregable");
    let txtCajasFila1 = document.getElementById("dtgDatosEntregables").getElementsByClassName("Fila1");
    let nroColumnas = txtCajasFila1.length;
    let txtCajasColumna1 = document.getElementById("dtgDatosEntregables").getElementsByClassName("Columna1");
    let nroFilas = txtCajasColumna1.length;
    let dataCadenaEntregables = "";
    let p = 0, q = 0;
    let xPorcent = "";


    for (var i = 0; i < nroFilas; i++) {
        p = i + 1;
        for (var j = 0; j < nroColumnas; j++) {
            q = j + 1;
            if (q == nroColumnas)
                dataCadenaEntregables += document.getElementsByClassName("Fila" + p + " Columna" + q)[0].outerText.trim() + "~";
            else if (q == 4)// columna porcentaje quitar el porcentaje 
            {
                xPorcent = document.getElementsByClassName("Fila" + p + " Columna" + q)[0].outerText.trim();
                dataCadenaEntregables += xPorcent.substr(0, xPorcent.length - 1) + "|";
            }

            else
                dataCadenaEntregables += document.getElementsByClassName("Fila" + p + " Columna" + q)[0].outerText.trim() + "|";
        }
    }
    dataCadenaEntregables = dataCadenaEntregables.substr(0, dataCadenaEntregables.length - 1);

    //sumDen += (txt.value.replace(/\,/g, "")) * 1;
    // Un Exp. tiene una o mas Ordenes y una Orden tiene una o mas Entregables
    //idEntregable: $.trim($('#hdIdEntregable').val()),

    // Saldo a nivel de Contrato
    var montoContrato = $.trim($('#txtMontoContractualExpOS').val()).replace(/\,/g, "") * 1;
    var totalDevengado = $.trim($('#txtTotalDevengadoExpOS').val()).replace(/\,/g, "") * 1;
    var penalidadMora = $.trim($('#txtPenalidadMoraExpOS').val()).replace(/\,/g, "") * 1;
    var penalidadOtros = $.trim($('#txtOtrasPenalidadesExpOS').val()).replace(/\,/g, "") * 1;
    //$.trim($('#txtSaldoPendienteExpOS').val()).replace(/\,/g, "") * 1;
    var saldoContrato = montoContrato - totalDevengado - penalidadMora - penalidadOtros;
    $('#txtSaldoPendienteExpOS').val(saldoContrato);

    var DataExpedienteOS = {
        //ide: $("#txtNumDoc").attr('ide'),
        idExpediente: $.trim($('#hdIdExpediente').val()),
        idOrden: $.trim($('#hdIdOrdenServicio').val()),
        contratoExpOS: $.trim($('#txtContratoExpOS').val()),
        procediExpOS: $.trim($('#txtProcedimientoExpOS').val()),
        descripExpOS: $.trim($('#txtDescripcionExpOS').val()),

        proveExpOS: $.trim($('#txtProveedorExpOS').val()),
        fecNotiContraExpOS: $.trim($('#txtFecNotiContratoExpOS').val()),
        plazoExpOS: $.trim($('#txtPlazoExpOS').val()),
        montoContraVigExpOS: $.trim($('#txtMontoContraVigExpOS').val()).replace(/\,/g, ""),
        montoAdjExpOS: $.trim($('#txtMontoAdjExpOS').val()).replace(/\,/g, ""),
        adicionaExpOS: $.trim($('#txtPrestaAdicionalExpOS').val()).replace(/\,/g, ""),
        reduExpOS: $.trim($('#txtReduccionExpOS').val()).replace(/\,/g, ""),
        fecIniExpOS: $.trim($('#txtFecInicioPlazoExpOS').val()),
        fecFinExpOS: $.trim($('#txtFecFinPlazoExpOS').val()),

        nroOrdenOS: $.trim($('#txtNroOrdenS').val()),
        expSiafOS: $.trim($('#txtExpSiafS').val()),
        certifiOS: $.trim($('#txtCertificadoS').val()),
        montoComprOS: $.trim($('#txtMontoCompromSiafS').val()).replace(/\,/g, ""),
        ampliOS: $.trim($('#txtAmpSiafS').val()).replace(/\,/g, ""),
        rebajaOS: $.trim($('#txtRebajaSiafS').val()).replace(/\,/g, ""),
        montoDevengOS: $.trim($('#txtMontoDevengadoSiafS').val()).replace(/\,/g, ""),
        saldoOS: $.trim($('#txtSaldoSiafS').val()).replace(/\,/g, ""),
        nroEntregOS: $.trim($('#txtCantEntregableS').val()),
        //monto del contrato (contrato = suma de montos de ordenes (servicio y/o compras))

        montoContratoC: $.trim($('#txtMontoContractualExpOS').val()).replace(/\,/g, ""),
        totalDevengadoC: $.trim($('#txtTotalDevengadoExpOS').val()).replace(/\,/g, ""),
        penalidadMoraC: $.trim($('#txtPenalidadMoraExpOS').val()).replace(/\,/g, ""),
        penalidadOtrosC: $.trim($('#txtOtrasPenalidadesExpOS').val()).replace(/\,/g, ""),
        saldoContratoC: $.trim($('#txtSaldoPendienteExpOS').val()).replace(/\,/g, ""),


        dataEntregables: dataCadenaEntregables

    };

    $.post(xpathRegExpOrdenServ, { DataExpedienteOS }, function (data) {

        //return Json(new { Resultado = "1", ListaOrdenes = DataListaOrdenServ, ListaEntregables= DataListaEntregables });//1: ok

        if (data.Resultado == "1") {

            toastr.success("Reporte de Saldo actualizado con éxito!!", 'Confirmación');
            var objListaOS = data.ListaOrdenes;

            // Expediente//??
            $('#hdIdExpediente').val(objListaOS[0].IdExpedienteOrden);
            $('#hdIdOrdenServicio').val(objListaOS[0].IdOrden);
            //--Orden//
            $('#txtNroOrdenS').val(objListaOS[0].NroOrden);
            $('#txtExpSiafS').val(objListaOS[0].Siaf);
            $('#txtCertificadoS').val(objListaOS[0].NroCertificado);

            $('#txtAmpSiafS').val(fnEspacioVacio(objListaOS[0].Ampliacion));
            $('#txtRebajaSiafS').val(fnEspacioVacio(objListaOS[0].Reduccion));
            $('#txtMontoDevengadoSiafS').val(fnEspacioVacio(objListaOS[0].MontoDevengado));
            $('#txtSaldoSiafS').val(fnEspacioVacio(objListaOS[0].SaldoSiaf));
            $('#txtCantEntregableS').val(fnEspacioVacio(objListaOS[0].CantidadEntregables));



            var LstEntregables = data.ListaEntregables;
            $('#dtgEntregables').hide();
            $('#dtgEntregablesPlg').show();
            fnCargarDataTableEntregables(LstEntregables);
            $("#btnGenerarEntregable").prop("disabled", true);//Deshabilitamos el boton una  vez generado los entregables

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

    //nrotxtCajasColums = txtCajasColumnas.length;

}

function fnEspacioVacio(pValor) {

    if (pValor === -1 || pValor === "-1")
        pValor = "";

    return pValor;
}


function fnFormatearListaEntregables(LstEntregables) {
    var nroRegistros = LstEntregables.length;
    for (var i = 0; i < nroRegistros; i++) {
        montosProgramados[i] = LstEntregables[i].MontoProgramado;
        porcentajes[i] = LstEntregables[i].Porcentaje;
        if (LstEntregables[i].Plazo == -1) LstEntregables[i].Plazo = "";
        if (LstEntregables[i].Porcentaje == -1) LstEntregables[i].Porcentaje = "";
        LstEntregables[i].MontoProgramado = FormatoNumero(LstEntregables[i].MontoProgramado);
        LstEntregables[i].MontoDevengado = FormatoNumero(LstEntregables[i].MontoDevengado);
        LstEntregables[i].PenalidadMora = FormatoNumero(LstEntregables[i].PenalidadMora);
        LstEntregables[i].OtraPenalidad = FormatoNumero(LstEntregables[i].OtraPenalidad);
        LstEntregables[i].NetoPagar = FormatoNumero(LstEntregables[i].NetoPagar);
    }
    return LstEntregables;
}

function fnCargarDataTableEntregables(LstEntregables) {

    LstEntregables = fnFormatearListaEntregables(LstEntregables);
    dataTable = $('#dtgEntregablesPlg').DataTable({
        /*"buttons": [

            { "text": '', "titleAttr": "Agregar Entregable", "className": "btn-default fa fa-lg fa-plus-circle", action: "function (e, dt, node, config) { fnNuevoEntregable(null); }" }
        ],*/
        "columns": [
            {
                "data": null, "className": "dt-center", "defaultContent": "<button   type='button' class='btn-xs btn-primary btn_tblEditarEntregable'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>"

            },
            { "data": null, "className": "dt-center", "defaultContent": "<button  type='button'  class='btn-xs btn-danger btn_tblEliminar' title='Eliminar'><span class='fa fa-lg fa-save'></span></button>" },
            { "data": "IdEntregable", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "NroSecuencia", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "IdOrdenEntregable", "title": "Id", "autoWidth": "true", "visible": false },
            { "data": "NroEntregable", "title": "N° Entregable", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Plazo", "title": "Plazo", "width": "35%" },
            { "data": "FechaVencimiento", "title": "Fecha Vencimiento", "width": "5%" },
            { "data": "Porcentaje", "title": "Porcentaje", "width": "5%" },
            { "data": "MontoProgramado", "title": "Monto Programado", "width": "5%" },
            { "data": "DocTramite", "title": "Doc. Tramite", "width": "5%" },
            { "data": "FechaTramite", "title": "Fecha Tramite", "width": "5%" },
            { "data": "MontoDevengado", "title": "Monto Devengado", "width": "5%" },
            { "data": "PenalidadMora", "title": "Penalidad Mora", "width": "5%" },
            { "data": "OtraPenalidad", "title": "Otras Penalidades", "width": "5%" },
            { "data": "NetoPagar", "title": "Neto a Pagar", "width": "5%" },
            { "data": "FechaDevengado", "title": "Fecha Devengado", "width": "5%" },
            { "data": "FechaPago", "title": "Fecha Pago", "width": "5%" },
            { "data": "Observacion", "title": "Observacion", "width": "5%" }
        ],
        "language": {
            "emptyTable": "--no data found --",
            "url": "/Content/Javascript/plugins/es_es.txt"
        },
        "width": "100%",
        "data": LstEntregables
    });

    //Editar Entregable
    $('#dtgEntregablesPlg tbody').on('click', '.btn_tblEditarEntregable', function () {
        debugger;
        var table = $('#dtgEntregablesPlg').DataTable();
        var entregableOS = table.row($(this).parents('tr')).data();

        fnEditarEntregableOSPlg(entregableOS);//
        //AbrirDialogoOrden(entregableOS);
        //return false;
    });
    //Elimar Entregable

    $('#dtgEntregablesPlg tbody').on('click', '.btn_tblEliminar', function () {

        debugger;
        var table = $('#dtgEntregablesPlg').DataTable();
        var entregableOS = table.row($(this).parents('tr')).data();
        //table.row($(this).parents('tr')).remove().draw();
        fnEliminarEntregable(entregableOS);
    });

}



function fnActualizarEntregable() {
    debugger;

    if ($('#frmEntregable').valid() === false) {
        toastr.error("Ingrese todos los datos correctamente", 'Error');
        return;
    }

    // saldoOS: $.trim($('#txtSaldoSiafS').val()).replace(/\,/g, ""),

    var DataEntregableOS = {


        idEntregable: $.trim($('#hdIdEntregable').val()),
        nroEntreg: $.trim($('#txtEntregableNroS').val()),
        plazo: $.trim($('#txtPlazoES').val()),
        fechaVenc: $.trim($('#txtFechaVencES').val()),
        porcentaje: $.trim($('#txtPorcentajeES').val()),
        montoprograma: $.trim($('#txtProgramadoES').val()).replace(/\,/g, ""),
        docTram: $.trim($('#txtDocTramiteES').val()),
        fecTram: $.trim($('#txtFechaTramiteES').val()),

        factura: $.trim($('#txtFacturaES').val()),
        montoDeveng: $.trim($('#txtMontoDevengadoSE').val()),
        penalidadMora: $.trim($('#txtPenalidadMoraSE').val()),
        penalidadOtros: $.trim($('#txtOtrasPenaSE').val()),
        montoPagar: $.trim($('#txtMontoPagarSE').val()),
        observacion: $.trim($('#txtObsSE').val()),
        fecDeveng: $.trim($('#txtFechaDevengadoSE').val()),
        fecPago: $.trim($('#txtFechaPagoSE').val()),
        idOrden: $.trim($('#hdIdOrdenServicio').val())
    };

    $.post(xpathActualizarEntregable, { DataEntregableOS }, function (data) {
        //BloquearBlockUI();
        if (data.Resultado === "1") {
            debugger;

            var dataResumen = data.DataConsolidadoEntregables;
            var LstEntregables = data.ListaEntregables;
            LstEntregables = fnFormatearListaEntregables(LstEntregables);
            $('#dtgEntregablesPlg').DataTable().clear().draw();
            $('#dtgEntregablesPlg').DataTable().rows.add(LstEntregables).draw();

            fnPintarMontosOrden(dataResumen);
            //dataResumen[0].NetoPagar;
            toastr.success("Entregable actualizado con éxito!!", 'Confirmación');
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
        toastr.error("Error Actualizando Entregable", "Error");
    });

    //nrotxtCajasColums = txtCajasColumnas.length;

}


///---- Validacion de Entregable -----/////


function fnValidarMontoProgramado(pParcial, pIndice) {
    var montoTotal = 0, nuevoMontoTotal = 0;
    var nroRegistros = montosProgramados.length;
    for (var i = 0; i < nroRegistros; i++) {
        montoTotal = montoTotal + montosProgramados[i];
    }

    montosProgramados[pIndice] = pParcial;

    for (var j = 0; j < nroRegistros; j++) {
        nuevoMontoTotal = nuevoMontoTotal + montosProgramados[j];
    }

    if (montoTotal === nuevoMontoTotal)
        return true;
    else
        return false;
}


function fnValidarPorcentajeProgramado(pParcial, pIndice) {
    var porcentajeTotal = 0, nuevoPorcentajeTotal = 0;
    var nroRegistros = porcentajes.length;
    for (var i = 0; i < nroRegistros; i++) {
        montoTotal = montoTotal + porcentajes[i];
    }

    porcentajes[pIndice] = pParcial;

    for (var j = 0; j < nroRegistros; j++) {
        nuevoMontoTotal = nuevoMontoTotal + porcentajes[j];
    }

    if (montoTotal === nuevoMontoTotal)
        return true;
    else
        return false;
}

///-----------------------------------/////

///------Validaciones de Orden y Entregable-------////////
$.validator.addMethod(
    "MontoComprometido",
    function (value, element) {
        //Monto a nivel de orden (servicio o compra)
        var montoTotal_Orden = $.trim($('#txtMontoContraVigExpOS').val()).replace(/\,/g, "") * 1;
        if (value > montoTotal_Orden)
            return false;
        else
            return true;
    },
    "La cantidad ingresada no puede superar el Monto Comprometido."
);


$.validator.addMethod(
    "MontoProgramado",
    function (value, element) {
        //Monto a  nivel de entregable
        var montoProgramado = $.trim($('#txtProgramadoES').val()).replace(/\,/g, "") * 1;
        if (value > montoProgramado)
            return false;
        else
            return true;
    },
    "La cantidad ingresada no puede superar el Monto Programado."
);


$.validator.addMethod(
    "FechasMayorAVencimiento",
    function (value, element) {

        if (value.length === 0) return true;
        if (EsFechaValida(value) === false) return false;
        var fecha = ConvertirCadenaAFecha(value);
        //var fActual = new Date();

        var fecVencimientoEntregable = $.trim($('#txtFechaVencES').val());
        if (fecVencimientoEntregable.length === 0) return true;
        if (EsFechaValida(fecVencimientoEntregable) === false) return false;
        fecVencimientoEntregable = ConvertirCadenaAFecha(fecVencimientoEntregable);

        if (fecha <= fecVencimientoEntregable) return false;

        return true;
    },
    "La fecha ingresada  no debe ser menor a la fecha de Vencimiento."
);

$.validator.addMethod(
    "NoesUnSoloEntregable",
    function (value, element) {
        var xvalor = value * 1;
        var nroEntreg = $.trim($('#txtCantEntregableS').val()) * 1;
        if (xvalor < 100 && nroEntreg >= 1)
            return true;
        else if (xvalor === 100 && nroEntreg === 1)
            return true;
        else
            return false;
    },
    "El expediente tiene mas de un entregable."
);



///--------------------------------------------------/////
