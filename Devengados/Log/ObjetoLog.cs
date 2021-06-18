using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class ObjetoLog
    {

        public ObjetoLog(string Titulo, string Mensaje, string Detalle)
        {
            TituloError = Titulo;
            MensajeError = Mensaje;
            DetalleError = Detalle;
            FechaError = DateTime.Now;
        }
        public string TituloError { get; set; }
        public string MensajeError { get; set; }
        public string DetalleError { get; set; }
        public DateTime FechaError { get; set; }
    }
}