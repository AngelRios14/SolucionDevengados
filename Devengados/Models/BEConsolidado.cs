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
        public string AreaUsuaria { get; set; }
        public string Expediente { get; set; }
        public string Descripcion { get; set; }
        public string Proveedor { get; set; }
        public string Grupo { get; set; }//locador , Otros-asp,
        //Orden
        public int IdOrden { get; set; }
        public string NroOrden { get; set; }
        public string Siaf { get; set; }

        //Entregable
        public int IdEntregable { get; set; }
        public string NroEntregable { get; set; }
        public int Plazo { get; set; }// nro de dias 
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


    }
}