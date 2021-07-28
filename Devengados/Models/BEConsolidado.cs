using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    //BEConsolidado = Expediente + Orden + Entregable
    public class BEConsolidado
    {
        //Expediente
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
        public int Plazo { get; set; }//Nro de dias a nivel de expediente -contrato
        public string FechaInicioPlazo { get; set; }
        public string FechaFinPlazo { get; set; }
        public string FechaNotificacion { get; set; }
        public string Grupo { get; set; }//locador , Otros-asp,

        //Orden
        public int IdOrden { get; set; }
        public string NroOrden { get; set; }
        public string Siaf { get; set; }

        //Entregable
        public int IdEntregable { get; set; }
        public string NroEntregable { get; set; }
        
        public string FechaVencimiento { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal MontoProgramado { get; set; }
        public decimal MontoDevengado { get; set; }                
        public decimal NetoPagar { get; set; }
        public string FechaDevengado { get; set; }
        public string FechaPago { get; set; }
        public string Observacion { get; set; }
        public string Logistico { get; set; }//equipo responsable
        public string UbicacionEstado { get; set; }//
        public string FecActEstado { get; set; }//Fecha de cuando se cambio de estado

        public string NombreOficina { get; set; }//Ubicacion
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
        public int IdOficina { get; set; }
        public string FechaEstado { get; set; }


    }
}