function BloquearBlockUI(Mensaje) {
    var url =  "../Content/Images/loader.gif";
    if (Mensaje) {
        $.blockUI({ message: '<img src="' + url + '" /><p><b>' + Mensaje + '</b></p>', baseZ: 2000 });
    }
    else $.blockUI({ message: '<img src="' + url + '" /><p><b> Procesando... Por favor espere</b></p>', baseZ: 2000 });

}
function DesbloquearBlockUI() {
    $.unblockUI();
}