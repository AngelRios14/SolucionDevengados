using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class BEOrden
    {
        public int IdOrden { get; set; }
        public string NroOrden { get; set; }
        public string Siaf { get; set; }
        public string NroCertificado { get; set; }
        public string FechaOrden { get; set; }
        public decimal MontoCompSiaf { get; set; }
        public decimal MontoDevengado { get; set; }
        public decimal SaldoSiaf { get; set; }
        public decimal Ampliacion { get; set; }
        public decimal Reduccion { get; set; }
        public int CantidadEntregables { get; set; }
        public string Ruc { get; set; }
        public int IdExpedienteOrden { get; set; }


    }
}