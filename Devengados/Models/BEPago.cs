using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class BEPago
    {
        public int IdPago { get; set; }
        public string NroComprobante { get; set; }
        public decimal Monto { get; set; }
        public int IdEntregablePago { get; set; }
        public int IdComprobante { get; set; }
    }
}