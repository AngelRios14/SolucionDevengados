/**************************/
/*Permite validar el ingreso de datos en una caja de texto, se utiliza mediante el método onkeypress
Ejemplo: onkeypress="return validarFormato(event, this, 'Email', 100);"*/
function validarFormato(e, CajaTexto, TipoDato, Longitud) {
    //Teclas especiales solamente se usa en Mozilla Firefox en los otros navegadores las teclas especiales no llegan al evento keypress
    var TeclasEspeciales = ["ENTER", "TAB", "HOME", "END", "INSERT", "DELETE", "ARROWLEFT"
        , "ARROWRIGHT", "ARROWUP", "ARROWDOWN", "BACKSPACE", "ESCAPE"
        , "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
    var Cadena = CajaTexto.value;
    var tecla = e.key;

    //Verificando teclas especiales
    if (TeclasEspeciales.indexOf(tecla.toUpperCase()) > -1) return true;

    //Verificando la longitud de la cadena
    if (Longitud != undefined || Longitud != null) {
        if (Cadena.length >= Longitud) return false;
    }

    switch (TipoDato) {
        case 'Texto':
            //No iniciar con espacio en blanco
            if (Cadena.length == 0 && tecla == ' ') return false;
            //No tener doble espacio
            var strNoDobleEspacio = Cadena[Cadena.length - 1];
            if (strNoDobleEspacio == ' ' && tecla == ' ') return false;

            return true;
        case 'Letras':
            //var patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/; //Letras con espacio en blanco. \s permite ingresar espacio en blanco
            var patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]*$/; //Letras sin espacio en blanco. 
            var rpta = patron.test(Cadena);
            return rpta;            
        case 'NumeroEntero':
            var patron = /[0-9]/;
            var rpta = patron.test(tecla);
            return rpta;            
        case 'NumeroDecimal':
            //No iniciar con espacio punto o coma
            if (Cadena.length == 0 && (tecla == '.' || tecla == ',')) return false;
            //No tener doble punto o coma            
            if (Cadena.indexOf(".") >= 0 && tecla == '.') return false;
            if (Cadena.indexOf(",") >= 0 && tecla == ',') return false;
            var patron = /[0-9.]/;
            var rpta = patron.test(tecla);
            return rpta;            
        case 'Fecha':
            var patron = /[0-9]/;
            var rpta = patron.test(tecla);
            if (rpta == true) {
                if (Cadena.length == 1 || Cadena.length == 4) {
                    CajaTexto.value = Cadena + tecla + '/';
                    return false;
                }
            }
            return rpta;            
        case 'EMail':
            if (tecla == ' ') return false;
            return true;            
        default:
            return true;
    }
}

function ValidarEmail(txtEmail) {
    var patrolEmail = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (patrolEmail.test(txtEmail))
        return true;
    else
        return false;
}

/****************************/
/*Restar fechas en formato dd/mm/aaaa, retorna la cantidad de días */
function RestaFechas(f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

/*Obtiene la fecha actual en formato dd/mm/aaaa */
function FechaActualTexto() {
    var fecha = new Date();
    var strDia = ('0' + fecha.getDate()).slice(-2);
    var strMes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    var strAnio = fecha.getFullYear();
    var strFecha = strDia + '/' + strMes + '/' + strAnio;
    return strFecha;
}

/*Convierte una cadena de fecha dd/mm/aaaa  al formato aaaa-mm-dd que se usa para los controles input tipo date */
function ConvertirFechaDMA_AMD(strFecha) {
    var fecha = strFecha.split('/');
    return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
}

/*Convierte una cadena de fecha aaaa-mm-dd al formato dd/mm/aaaa que sirve para mostrar al usuario */
function ConvertirFechaAMD_DMA(strFecha) {
    var fecha = strFecha.split('-');
    return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
}

/*Convierte la cantidad de días a Años y meses, se utiliza para calcular los años y meses de experiencia laboral */
function ConvertirDiasAAniosMeses(nDias) {
    var txtRpta = '';
    var NYears = parseInt(nDias / 360);
    nDias = nDias % 360;
    var NMeses = parseInt(nDias / 30);
    nDias = nDias % 30;

    if (NYears > 0) {
        if (NYears == 1) txtRpta = '1 año';
        else txtRpta = NYears + ' ' + 'años';

    }
    if (NMeses > 0) {
        if (NMeses == 1) txtRpta += ' 1 mes';
        else txtRpta += ' ' + NMeses + ' ' + 'meses';
    }

    if (txtRpta == '') return ' - ';
    else return txtRpta.trim();
}

/*Convierte una fecha tipo Cadena dd/mm/yyyy a Date*/
function ConvertirFechaStringADate(strFecha) {
    var matFecha = strFecha.split('/');
    return new Date(matFecha[2], matFecha[1] - 1, matFecha[0]);
}

/*Convierte una fecha tipo Cadena yyyy-mm-dd a Date*/
function ConvertirFechaStringAMDADate(strFecha) {
    var matFecha = strFecha.split('-');
    return new Date(matFecha[0], matFecha[1] - 1, matFecha[2]);
}


/*Convierte una fecha tipo Date a Fecha Larga: Lima, 03 de marzo del 2017, se usa para las impresiones de Currículo y Declaración Jurada */
function ConvertirDateAFechaLarga(fecha) {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var strFechaLarga = fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear();
    return strFechaLarga;
}

/*Verifica si una fecha con formato dd/mm/yyyy es correcta.
Retorna TRUE si la fecha es valida y FALSE en caso contrario*/
function EsFechaValida(strFecha) {
    var matFecha = strFecha.split('/');
    var fecha = Date.parse(matFecha[2] + '/' + matFecha[1] + '/' + matFecha[0]);
    if (fecha == "Invalid Date" || isNaN(fecha)) {
        return false;
    }
    var fecha1 = new Date(fecha);
    if (isNaN(fecha1)) {
        return false;
    }
    if (fecha1.getDate() != matFecha[0]) {
        return false;
    }
    return true;
}

/*Obtiene el nombre del mes de acuerdo a su número*/
function ObtenerNombreDeMes(numMes) {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");    
    return meses[numMes - 1];
}

function ObtenerFechaActualDDMMAAA() {
    var date = new Date();
    var m = date.getMonth() + 1;
    var dia = ("0" + date.getDate()).slice(-2);
    var mes = ("0" + m).slice(-2);
    var año = date.getFullYear();
    return dia + '/' + mes + '/' + año;
}


function ConvertirCadenaAFecha(strFecha) {
    var diaIni = strFecha.split('/')[0];
    var mesIni = (strFecha.split('/')[1] - 1);
    var periodoIni = strFecha.split('/')[2];
    var fecha = new Date(periodoIni, mesIni, diaIni);
    return fecha;
}

function CalcularEdad(strFechaNac) {
    var fNac = ConvertirCadenaAFecha(strFechaNac);
    var fActual = new Date();
    var edad = (fActual - fNac) / (1000 * 60 * 60 * 24) / 364;

    return Math.trunc(edad);
}


function ConvertirDateAFechaDDMMAAAA(date) {
    var m = date.getMonth() + 1;
    var dia = ("0" + date.getDate()).slice(-2);
    var mes = ("0" + m).slice(-2);
    var año = date.getFullYear();
    return dia + '/' + mes + '/' + año;
}

function ConvertirNumeroADate(numeroDeDias, esExcel) {
    if (esExcel == undefined || esExcel == null) esExcel = false;
    var diasDesde1900 = esExcel == true ? 25567 + 1 : 25567;

    // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    var date = new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    return date;
}

function ConvertirNumeroAFechaStringDDMMAAAA(numeroDeDias, esExcel) {
    if (esExcel == undefined || esExcel == null) esExcel = false;
    var diasDesde1900 = esExcel == true ? 25567 + 1 : 25567;

    // 86400 es el número de segundos en un día, luego multiplicamos por 1000 para obtener milisegundos.
    var date = new Date((numeroDeDias - diasDesde1900) * 86400 * 1000);
    var m = date.getMonth() + 1;
    var dia = ("0" + date.getDate()).slice(-2);
    var mes = ("0" + m).slice(-2);
    var año = date.getFullYear();
    return dia + '/' + mes + '/' + año;
}


function fnValidarDosDecimales() {    


        $('.number').keypress(function (event) {
            var $this = $(this);
            if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
                ((event.which < 48 || event.which > 57) &&
                    (event.which != 0 && event.which != 8))) {
                event.preventDefault();
            }

            var text = $(this).val();
            if ((event.which == 46) && (text.indexOf('.') == -1)) {
                setTimeout(function () {
                    if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                        $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
                    }
                }, 1);
            }

            if ((text.indexOf('.') != -1) &&
                (text.substring(text.indexOf('.')).length > 2) &&
                (event.which != 0 && event.which != 8) &&
                ($(this)[0].selectionStart >= text.length - 2)) {
                event.preventDefault();
            }
        });

        $('.number').bind("paste", function (e) {
            var text = e.originalEvent.clipboardData.getData('Text');
            if ($.isNumeric(text)) {
                if ((text.substring(text.indexOf('.')).length > 3) && (text.indexOf('.') > -1)) {
                    e.preventDefault();
                    $(this).val(text.substring(0, text.indexOf('.') + 3));
                }
            }
            else {
                e.preventDefault();
            }
        });
}




function FormatoNumero(numero) {
    var valor;
    if (numero === "-1" || numero === -1 )//
        valor = "";
    else {
        numero = (numero.toString().replace(/\,/g, "")) * 1;
        valor = numero.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 6 });//Los decimales .00 necesitan tener configuracion eN la BD 
        //valor = numero.toLocaleString("en", {  maximumFractionDigits: 6 });
        //valor = parseFloat(valor).toFixed(2);//pinta todo a  dos  decimales                
    }

    return valor;
    //return numero.toFixed(oCultura.NumeroDecimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1' + oCultura.SimboloSeparadorMiles);
}




/*UBIGEO*/
/*LISTAS*/
function ListarProvincias($cboRegion, $cboProvincia, $cboDistrito, addTodos) {
    var ideRegion = $cboRegion.val();
    if (ideRegion != '' && ideRegion != 'TODOS') {
        LlenarUbigeoCombo($cboProvincia, ideRegion,addTodos);
        $cboDistrito.children().remove().end().append("<option value='' selected>Seleccione Distrito</option>");        
        if ($cboDistrito.hasClass('selectpicker')) $cboDistrito.selectpicker('refresh');
    }
    else {
        $cboProvincia.children().remove().end().append("<option value='' selected>Seleccione Provincia</option>");
        $cboDistrito.children().remove().end().append("<option value='' selected>Seleccione Distrito</option>");
        if ($cboProvincia.hasClass('selectpicker')) $cboProvincia.selectpicker('refresh');
        if ($cboDistrito.hasClass('selectpicker')) $cboDistrito.selectpicker('refresh');
    }    
    
}

function ListarDistritos($cboProvincia, $cboDistrito, addTodos) {
    var ideProvincia = $cboProvincia.val();
    if (ideProvincia != '' && ideProvincia != 'TODOS') {
        LlenarUbigeoCombo($cboDistrito, ideProvincia, addTodos);
    }
    else {
        $cboDistrito.children().remove().end().append("<option value='' selected>Seleccione Distrito</option>");
        if ($cboDistrito.hasClass('selectpicker')) $cboDistrito.selectpicker('refresh');
    }
}

function LlenarUbigeoCombo($cbo, UbigeoPadre, addTodos) {
    var url = "ObtenerUbigeoCombo";
    var objUbigeo = {
        UbigeoPadre: UbigeoPadre
    };
    $.ajax({
        type: "POST",
        cache: false,
        url: url,
        data: JSON.stringify(objUbigeo),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (rpta) {
            if (rpta.Resultado == "OK") {
                var ListaOpciones = rpta.Lista;
                var opciones = '';

                for (var i = 0; i < ListaOpciones.length; i++) {
                    opciones = opciones + '<option value="' + ListaOpciones[i].strCodigo + '" Opciones = "' + ListaOpciones[i].strOpciones + '">' + ListaOpciones[i].strDescripcion + '</option>';
                    if (i == 0 && addTodos == true)
                        opciones = opciones + '<option value="TODOS" Opciones = "">TODOS</option>';
                };

                if (opciones == '') opciones = "<option value='' selected>No hay items</option>";

                //Actualizando las listas
                $cbo.children().remove().end().append(opciones);                                
                if ($cbo.hasClass('selectpicker')) $cbo.selectpicker('refresh');                
            }
            else {
                $cbo.children().remove().end().append("<option value='' selected>--" + rpta.Mensaje + "--</option>");
                if ($cbo.hasClass('selectpicker')) $cbo.selectpicker('refresh');
            }
        },
        error: function (error) {
            $cbo.children().remove().end().append("<option value='' selected>--" + error.statusText + "--</option>");
            if ($cbo.hasClass('selectpicker')) $cbo.selectpicker('refresh');
        }
    });
}


/********BLOCKUI***************************************/
function BloquearBlockUI(Mensaje) {
    var url = strRutaRaiz + "Content/Imagenes/loader.gif";
    if (Mensaje) {
        $.blockUI({ message: '<img src="' + url + '" /><p><b>' + Mensaje + '</b></p>', baseZ: 2000 });
    }
    else $.blockUI({ message: '<img src="' + url + '" /><p><b> Procesando... Por favor espere</b></p>', baseZ: 2000 });

}
function DesbloquearBlockUI() {
    $.unblockUI();
}

/**********CARGAR HTML**********************************/
function cargar_html(url, div) {
    if (url.startsWith("/")) {
        url = url.substring(1);
    }
    console.log('cargar html');
    BloquearBlockUI();
    $.post(strRutaRaiz + url, function (data) {
        if (data == '') {
            $("#" + div).html("<br/><br/><h3 class='text-danger'>ERROR: Ha ocurrido un error cargando la página '" + url + "'</h3>");
            $("#" + div).show();        
        }
        else {
            $("#" + div).html(data);
            $("#" + div).show();
        }
        DesbloquearBlockUI();
    }).fail(function (xhr, textStatus, errorThrown) {
        $("#" + div).html("<br/><br/><h3 class='text-danger'>ERROR: " + xhr.responseText + "</h3>");
        $("#" + div).show(); 
        DesbloquearBlockUI();
    });        
}

/**********AGREGAR METODOS VALIDATE***********************/
function ValidarFechaNacimiento(value) {
    if (EsFechaValida(value) == false) return false;
    var edad = CalcularEdad(value);
    if (edad < 14 || edad > 100) return false;

    return true;
}

//Participante
$.validator.addMethod(
    "FechaCorrecta",
    function (value, element) {

        return EsFechaValida(value);
    },
    "Ingrese una fecha Correcta."
);

$.validator.addMethod(
    "PorcentajeCorrecto",
    function (value, element) {
        var xvalor = value * 1;
        if (xvalor > 100)
            return false;
        else
            return true;        
    },
    "El porcentaje máximo es 100%."
);


//$.validator.addMethod(
//    "FechaNoAnterior",
//    function (value, element) {
//        if (value.length == 0) return true;
//        if (EsFechaValida(value) == false) return false;
//        var fecha = ConvertirCadenaAFecha(value);
//        var fActual = new Date();

//        if (fecha <= fActual) return false;

//        return true;
//    },
//    "La fecha no debe ser anterior o igual a la actual."
//);

//$.validator.addMethod(
//    "FechaNoPosterior",
//    function (value, element) {
//        if (value.length == 0) return true;
//        if (EsFechaValida(value) == false) return false;
//        var fecha = ConvertirCadenaAFecha(value);
//        var fActual = new Date();

//        if (fecha > fActual) return false;

//        return true;
//    },
//    "La fecha no debe ser posterior a la actual."
//);
//$.validator.addMethod(
//    "NumeroPositivo",
//    function (value, element) {
//        if (value.length == 0) return true;

//        if ($.isNumeric(value) == false) return false;
//        var num = parseFloat(value);
//        if (num == NaN || num == undefined) return false;
//        if (num < 0) return false;

//        return true;
//    },
//    "Debe ser número"
//);
//$.validator.addMethod(
//    "NumeroPositivoMayorACero",
//    function (value, element) {
//        if (value.length == 0) return false;

//        if ($.isNumeric(value) == false) return false;
//        var num = parseFloat(value);
//        if (num == NaN || num == undefined) return false;
//        if (num <= 0) return false;

//        return true;
//    },
//    "Número mayor a cero"
//);

/************ORDENAR SELECT/COMBOS****************/
function ordenarSelect(id_componente, ascendente) {
    var selectToSort = jQuery('#' + id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
        if (ascendente == true) return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
        else return a.text === b.text ? 0 : a.text > b.text ? -1 : 1;
    })).val(optionActual);
}

function BuscarTextEnCombo($cbo, item) {
    for (i = 0; i < $cbo[0].length; i++) {
        if ($cbo[0][i].text == item) {
            return $cbo[0][i].value;
        }
    }
}

function ObtenerItemsDeCombo($cbo) {
    var lstItems = '';
    for (i = 0; i < $cbo[0].length; i++) {
        if (i == 0) lstItems = $cbo[0][i].text;        
        else lstItems = lstItems + ',' + $cbo[0][i].text;        
    }
    return lstItems;
}

function CargarCombo_ListaJSON(combo, ListaOpciones ) {
    var opciones = '';
    for (var i = 0; i < ListaOpciones.length; i++) {
        var keys = Object.keys(ListaOpciones[i]);
        opciones = opciones + '<option value="' + ListaOpciones[i][keys[0]] + '">' + ListaOpciones[i][keys[1]] + '</option>';        
    };

    if (opciones == '') opciones = "<option value='' selected>No hay items</option>";

    //Actualizando las listas
    $('#' + combo).children().remove().end().append(opciones);
    //if ($cbo.hasClass('selectpicker')) $cbo.selectpicker('refresh');
}

