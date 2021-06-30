

$(document).ready(function () {
    //alert("desde vista de ListaServicios");    
    $('#divOrdenServicio').hide();
    $('#divEntregables').hide();
    fnListaOrdenesServicio();
    $("#btnGenerarEntregable").click(function () { cargarTablaEntregable("", 0); });
    $("#txtFecFinPlazoExpOS").click(function () { fnCalcularFecha(); });  
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

            { "data": "IdExpediente", "title": "Id", "autoWidth": "true", "visible": false },
            
            { "data": null, "defaultContent": "", "title": "Contrato Primigenio", "width": "5%" },
            { "data": null, "defaultContent": "", "title": "Monto Contractual", "width": "5%" },
            { "data": null, "defaultContent": "", "title": "Monto Ejecutado", "width": "5%" },
            { "data": null, "defaultContent": "", "title": "Area Usuaria", "width": "5%" },
            { "data": null, "defaultContent": "", "title": "Nro Orden","width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Expediente", "title": "Expediente",   "width": "5%" },
            //{ "data": null, "defaultContent": "", "width": "5%" },
            { "data": "Proveedor", "title": "Proveedor",  "width": "35%" },
            { "data": "Importe", "title": "Importe", "width": "5%" }
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
        debugger;
        var expedienteOS = table.row($(this).parents('tr')).data();
        
        AbrirDialogoOrden(expedienteOS);
    });
}



function AbrirDialogoOrden(expedienteOS) {
    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').show('slow');
    debugger;
    if (expedienteOS != undefined || expedienteOS != null)
    {
        $('#hdIdExpediente').val(expedienteOS.IdExpediente);
        //Buscar con el Id Expediente la orden que tiene relacionada 
        // funcion BuscarOrden( IdExpediente) { 1::(Si exite orden con IdExp se actualiza) 2::(Sino Existe orden con IdExp s registra uno Nuevo) }

        fnListaOrdenServicio(expedienteOS);

        $('#txtProveedorExpOS').val(expedienteOS.Proveedor);
    }
}


function fnListaOrdenServicio(expedienteOS) {
    //var Ambito = "@MvcHtmlString.Create(ViewBag.CodAmbito)";  DataListaOrdenServ
    
    var params = JSON.stringify({
        idExp: $.trim($('#hdIdExpediente').val())
    });
    var requrl = xpathLstOrdenServ;
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
            debugger;
            var objListaOS = response.DataListaOrdenServ;
            var objListaEntregables = response.DataListaEntregables;            

            if (objListaOS != null) {
                if (objListaOS.length > 0) {
                    
                    $('#txtContratoExpOS').val(expedienteOS.ContratoPrimigenio);
                    $('#txtProcedimientoExpOS').val(expedienteOS.NroProcedimiento);
                    $('#txtDescripcionExpOS').val(expedienteOS.Descripcion);
                    $('#txtProveedorExpOS').val(expedienteOS.Proveedor);
                    $('#txtFecNotiContratoExpOS').val(expedienteOS.FechaNotificacion);
                    $('#txtPlazoExpOS').val(fnEspacioVacio(expedienteOS.Plazo));
                    $('#txtMontoContraVigExpOS').val(fnEspacioVacio(expedienteOS.MontoContractualVig));
                    $('#txtMontoAdjExpOS').val(fnEspacioVacio(expedienteOS.MontoAdjudicado));
                    $('#txtPrestaAdicionalExpOS').val(fnEspacioVacio(expedienteOS.PrestacionAdicional));
                    $('#txtReduccionExpOS').val(fnEspacioVacio( expedienteOS.Reduccion));
                    $('#txtFecInicioPlazoExpOS').val(expedienteOS.FechaInicioPlazo);
                    $('#txtFecFinPlazoExpOS').val(expedienteOS.FechaFinPlazo);
                    //--Orden//
                    $('#txtNroOrdenS').val(objListaOS[0].NroOrden);
                    $('#txtExpSiafS').val(objListaOS[0].Siaf);
                    $('#txtCertificadoS').val(objListaOS[0].NroCertificado);
                    $('#txtMontoCompromSiafS').val( fnEspacioVacio(objListaOS[0].MontoCompSiaf));
                    $('#txtAmpSiafS').val( fnEspacioVacio(objListaOS[0].Ampliacion));
                    $('#txtRebajaSiafS').val(fnEspacioVacio (objListaOS[0].Reduccion));
                    $('#txtMontoDevengadoSiafS').val(fnEspacioVacio(objListaOS[0].MontoDevengado));
                    $('#txtSaldoSiafS').val( fnEspacioVacio(objListaOS[0].SaldoSiaf));
                    $('#txtCantEntregableS').val( fnEspacioVacio( objListaOS[0].CantidadEntregables));

                    //El totalizado de varias ordenes de servicio en caso sean mas de una orden por expediente
                    $('#txtMontoContractualExpOS').val(fnEspacioVacio (expedienteOS.MontoContractual));
                    $('#txtTotalDevengadoExpOS').val( fnEspacioVacio (expedienteOS.MontoDevengadoTotal));
                    $('#txtPenalidadMoraExpOS').val(fnEspacioVacio(expedienteOS.PenalidadMora));
                    $('#txtOtrasPenalidadesExpOS').val(fnEspacioVacio(expedienteOS.PenalidadOtros));
                    $('#txtSaldoPendienteExpOS').val(fnEspacioVacio(expedienteOS.SaldoTotal));

                    //Llenar Grilla de Entregables
                    if (objListaEntregables.length > 0) {

                        $('#dtgEntregables').hide();
                        $('#dtgEntregablesPlg').show();
                        fnCargarDataTableEntregables(objListaEntregables);
                    }
                        

                }
            }

            /*if (objListaProv != null) {
                if (objListaProv.length > 0) {
                    $("#ddlProvincia").empty();
                    var nroRegistros = objListaProv.length;
                    $("<option value='0'>- Seleccione -</option>").appendTo("#ddlProvincia");
                    for (var i = 0; i <= nroRegistros - 1; i++) {
                        $("<option value='" + objListaProv[i].strCodProv + "'>" + objListaProv[i].strDescripProv + "</option>").appendTo("#ddlProvincia");
                    }
                }
            }*/
        },
        error: function (request, status, error) {
            var re = request;
        }
    });
}




function cargarTablaEntregable(pData, pNroFilas) {
    var oStrHtml = "";
    let xNroEntregables = $.trim($("#txtCantEntregableS").val());
    let xPlazo = $.trim($('#txtPlazoExpOS').val());
    let xFactor = Math.trunc((xPlazo * 1) / (xNroEntregables * 1));
    let xMonto = $.trim($('#txtMontoContraVigExpOS').val());

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
            xArrayMonto[i] = (xMonto * xArrayPorcentajes[i]*1)/100;
        }        
        else {
            xArrayPorcentajes[i] = xParte;
            xArrayPlazos[i] = xFactor * (i + 1);
            xArrayMonto[i] = (xMonto * xArrayPorcentajes[i] * 1)/100;
        }        
    }


    if (xNroEntregables != "") {
        xNroEntregables = xNroEntregables * 1;
        for (var i = 0; i < xNroEntregables; i++)
            oStrHtml = oStrHtml + obtenerNuevaFilaHTML(i + 1, xFactor, xFecInicio, xArrayPorcentajes[i], xArrayPlazos[i], xArrayMonto[i], "", "", xFecInicio, "", "", "", "", "", "", "", "", "", "", "", "");
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


function obtenerNuevaFilaHTML(pIndex,pFactor,pFecInicio,pXPorcet,pXPlazo,pXMonto, pId,pPlazo, pFechaVenc, pPorcentage, pProgramado, pDocTram, pFecEntregaTram, pNroFact, pMontoDevengado, pPenal1, pPenal2, pNetoPagar, pObs, pFecDeveng, pFecPago) {
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
        oNewTrHTML += "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:EditarExpedienteOS(\"" + pId + "\",\"" + pIndex + "\");return false;' src='../Content/Images/btnEdit.gif' ></td>" +
            "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:DeltCompania(\"" + pId + "\",\"" + pPlazo + "\");return false;' src='../Content/Images/btndelete.gif' ></td>";

        //oNewTrHTML += "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:EditarExpedienteOS(\"" + pId + "\");return false;' src='../Content/Images/btnEdit.gif' ></td>" +
          //  "  <td align='center'><input type='image' style='border-width:1px;border-style:None;' onclick='javascript:DeltCompania(\"" + pId + "\",\"" + pPlazo + "\");return false;' src='../Content/Images/btndelete.gif' ></td>";

    }

    oNewTrHTML += "  <td align='right'  class=' tblEntregable Fila" + pIndex + " Columna1'  id ='EntregableF" + pIndex + "C1'   >" + pIndex + "&nbsp;</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna2'  id ='¨PlazoF" + pIndex + "C2'   >" + pPlazo + "&nbsp;</td>" +
        //"  <td align='left'>" + pPlazo + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna3'  id ='FechaVencF" + pIndex + "C3'   >" + xxfecha + "&nbsp;</td>" +
        //"  <td align='left'>" + pFechaVenc + "</td>" +
        "  <td align='right'  class='tblEntregable Fila" + pIndex + " Columna4'  id ='PorcentageF" + pIndex + "C4'   >" + pPorcentage+"%&nbsp;</td>" +
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


function fnEditarEntregableOSPlg( pEntregable) {

    debugger;
    $('#divListaOrdenesServicio').hide();
    $('#divOrdenServicio').hide();
    $('#divEntregables').show('slow');
    $('#hdIdEntregable').val(pEntregable.IdEntregable);
    $('#txtEntregableNroS').val(pEntregable.NroEntregable);
    $('#txtPlazoES').val(pEntregable.Plazo);
    $('#txtFechaVencES').val(pEntregable.FechaVencimiento);
    $('#txtPorcentajeES').val(pEntregable.Porcentaje);
    $('#txtProgramadoES').val(pEntregable.MontoProgramado);
    $('#txtDocTramiteES').val(pEntregable.DocTramite );
    $('#txtFechaTramiteES').val(pEntregable.FechaTramite ); 

    $('#txtFacturaES').val(pEntregable.NroFactura );
    $('#txtMontoDevengadoSE').val(pEntregable.MontoDevengado );
    $('#txtPenalidadMoraSE').val(pEntregable.PenalidadMora);
    $('#txtOtrasPenaSE').val(pEntregable.OtraPenalidad);
    $('#txtMontoPagarSE').val(pEntregable.NetoPagar);
    $('#txtObsSE').val(pEntregable.Observacion );
    $('#txtFechaDevengadoSE').val(pEntregable.FechaDevengado);
    $('#txtFechaPagoSE').val(pEntregable.FechaPago );
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


function sumaFecha (d, fecha) {
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
    if ($.trim($('#txtFecInicioPlazoExpOS').val()) != "" && $.trim($('#txtPlazoExpOS').val()) !=""  ) {

        fechafin = sumaFecha( $.trim($('#txtPlazoExpOS').val()), $.trim($('#txtFecInicioPlazoExpOS').val()));
        $('#txtFecFinPlazoExpOS').val(fechafin);
    }
    
}

function fnGuardarOrdenServ() {
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
                dataCadenaEntregables += xPorcent.substr(0, xPorcent.length-1) + "|";            
            }
                
            else
                dataCadenaEntregables += document.getElementsByClassName("Fila" + p + " Columna" + q)[0].outerText.trim() + "|";            
        }
    }
    dataCadenaEntregables = dataCadenaEntregables.substr(0, dataCadenaEntregables.length - 1);

    // Un Exp. tiene una o mas Ordenes y una Orden tiene una o mas Entregables
    var DataExpedienteOS = {
        //ide: $("#txtNumDoc").attr('ide'),
        idExpediente: $('#hdIdExpediente').val(),
        contratoExpOS: $('#txtContratoExpOS').val(),
        procediExpOS: $('#txtProcedimientoExpOS').val(),
        descripExpOS: $('#txtDescripcionExpOS').val(),
        proveExpOS: $('#txtProveedorExpOS').val(),
        fecNotiContraExpOS: $('#txtFecNotiContratoExpOS').val(),
        plazoExpOS: $('#txtPlazoExpOS').val(),
        montoContraVigExpOS: $('#txtMontoContraVigExpOS').val(),
        montoAdjExpOS: $('#txtMontoAdjExpOS').val(),
        adicionaExpOS: $('#txtPrestaAdicionalExpOS').val(),
        reduExpOS: $('#txtReduccionExpOS').val(),
        fecIniExpOS: $('#txtFecInicioPlazoExpOS').val(),
        fecFinExpOS: $('#txtFecFinPlazoExpOS').val(),

        nroOrdenOS: $('#txtNroOrdenS').val(),
        expSiafOS: $('#txtExpSiafS').val(),
        certifiOS: $('#txtCertificadoS').val(),
        montoComprOS: $('#txtMontoCompromSiafS').val(),
        ampliOS: $('#txtAmpSiafS').val(),
        rebajaOS: $('#txtRebajaSiafS').val(),
        montoDevengOS: $('#txtMontoDevengadoSiafS').val(),
        saldoOS: $('#txtSaldoSiafS').val(),
        nroEntregOS: $('#txtCantEntregableS').val(),
        dataEntregables: dataCadenaEntregables        
        
    };

    $.post(xpathRegExpOrdenServ, { DataExpedienteOS }, function (data) {
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
        toastr.error("Error Registrando Usuario", "Error");
    });
    
    //nrotxtCajasColums = txtCajasColumnas.length;
    
}

function fnEspacioVacio(pValor) {

    if (pValor == -1 || pValor == "-1")
        pValor = "";

    return pValor;
}


function fnCargarDataTableEntregables(LstEntregables) {
        
    var nroRegistros = LstEntregables.length;    
    for (var i = 0; i < nroRegistros; i++) {
        if (LstEntregables[i].Plazo == -1) LstEntregables[i].Plazo = "";
        if (LstEntregables[i].Porcentaje == -1) LstEntregables[i].Porcentaje = "";
        if (LstEntregables[i].MontoProgramado == -1) LstEntregables[i].MontoProgramado = "";
        if (LstEntregables[i].MontoDevengado == -1) LstEntregables[i].MontoDevengado = "";
        if (LstEntregables[i].PenalidadMora == -1) LstEntregables[i].PenalidadMora = "";
        if (LstEntregables[i].OtraPenalidad == -1) LstEntregables[i].OtraPenalidad = "";
        if (LstEntregables[i].NetoPagar == -1) LstEntregables[i].NetoPagar = "";            
        }            


    dataTable = $('#dtgEntregablesPlg').DataTable({        
        "columns": [
            { "data": null, "className": "dt-center", "defaultContent": "<button    class='btn-xs btn-primary btn_tblEditarEntregable'  style='cursor:pointer; width:30px;'   title='Detalle'> <span class='fa fa-lg fa-edit'></span> </button>" },

            { "data": "IdEntregable", "title": "Id", "autoWidth": "true", "visible": false },            
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


    $('#dtgEntregablesPlg tbody').on('click', '.btn_tblEditarEntregable', function () {
        var table = $('#dtgEntregablesPlg').DataTable();
        debugger;
        var entregableOS = table.row($(this).parents('tr')).data();

        fnEditarEntregableOSPlg(entregableOS);//AbrirDialogoOrden(entregableOS);
    });   

}



function fnActualizarEntregable() {
    debugger;   

    
    var DataEntregableOS = {


        idEntregable: $.trim($('#hdIdEntregable').val()),
        nroEntreg: $.trim($('#txtEntregableNroS').val()),
        plazo: $.trim($('#txtPlazoES').val()),
        fechaVenc: $.trim($('#txtFechaVencES').val()),
        porcentaje: $.trim($('#txtPorcentajeES').val()),
        montoprograma: $.trim($('#txtProgramadoES').val()),
        docTram: $.trim($('#txtDocTramiteES').val()),
        fecTram: $.trim($('#txtFechaTramiteES').val()),

        factura: $.trim($('#txtFacturaES').val()),
        montoDeveng: $.trim($('#txtMontoDevengadoSE').val()),
        penalidadMora: $.trim($('#txtPenalidadMoraSE').val()),
        penalidadOtros: $.trim($('#txtOtrasPenaSE').val()),
        montoPagar: $.trim($('#txtMontoPagarSE').val()),
        observacion: $.trim($('#txtObsSE').val()),
        fecDeveng: $.trim($('#txtFechaDevengadoSE').val()),
        fecPago: $.trim($('#txtFechaPagoSE').val())
    };

    $.post(xpathActualizarEntregable, { DataEntregableOS }, function (data) {
        //BloquearBlockUI();
        if (data.Resultado == "OK") {

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
        toastr.error("Error Registrando Usuario", "Error");
    });

    //nrotxtCajasColums = txtCajasColumnas.length;

}


