using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class BEEntregable
    {
        public int IdEntregable { get; set; }
        public string NroEntregable { get; set; }
        public  int Plazo { get; set; }// nro de dias 
        public string FechaVencimiento { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal MontoProgramado { get; set; }
        public string DocTramite { get; set; }
        public string FechaTramite { get; set; }
        public decimal MontoDevengado { get; set; }
        public decimal PenalidadMora { get; set; }
        public decimal OtraPenalidad { get; set; }
        public decimal NetoPagar { get; set; }
        public string FechaDevengado { get; set; }
        public string FechaPago { get; set; }
        public string Observacion { get; set; }
        public int IdOrdenEntregable { get; set; }


    }   
}