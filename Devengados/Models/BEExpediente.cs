using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class BEExpediente
    {
        public int IdExpediente { get; set; }
        public string ContratoPrimigenio { get; set; }
        public decimal MontoContractual { get; set; }
        public decimal MontoEjecutado { get; set; }
        public string AreaUsuaria { get; set; }
        public string Expediente { get; set; }
        public string Descripcion { get; set; }
        public decimal Importe { get; set; }
        public string NroProcedimiento { get; set; }
        public string Proveedor { get; set; }
        public decimal MontoAdjudicado { get; set; }
        public decimal MontoContractualVig { get; set; }
        public decimal PrestacionAdicional { get; set; }
        public decimal Reduccion { get; set; }
        public decimal MontoDevengadoTotal { get; set; }
        public decimal PenalidadMora { get; set; }
        public decimal PenalidadOtros { get; set; }
        public decimal SaldoTotal { get; set; }
        public string AnoEjecucion { get; set; }
        public int Plazo { get; set; }
        public string FechaInicioPlazo { get; set; }
        public string FechaFinPlazo { get; set; }
        public string FechaNotificacion { get; set; }

    }
}