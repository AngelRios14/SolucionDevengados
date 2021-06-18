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

    }
}