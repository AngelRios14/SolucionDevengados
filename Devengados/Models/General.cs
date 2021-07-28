using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class General
    {
        /// <summary>
        /// Constantes relacionado a los Parametros de conexión
        /// </summary>
        public struct Connection
        {
            //Cadena de conexion en webconig            
            public const string BD_SIAF = "BD_SIAF";
        }


        /// <summary>
        /// Constantes relacionado a los Schema con los que trabaja la Aplicación
        /// </summary>
        private struct Schema
        {
            //public const string DEVENGADO_SIAF_DESA = "HR";    //DESARROLLO    IDOSGD        
            public const string DEVENGADO_SIAF_DESA = "ARIOS";    //DESARROLLO    
            public const string DEVENGADO_SIAF_QA = "";  //CALIDAD            
            public const string DEVENGADO_SIAF_PROD = "";  //PRODUCCION              
        }

        /// <summary>
        /// Constantes relacionado a los Package con los que trabaja la aplicación
        /// </summary>
        private struct Package
        {
            public const string General = "PKG_DEVENGADOS";
            
        }

        /// <summary>
        /// Constantes relacionado a los Stored Procedures con los que trabaja la aplicación
        /// </summary>
        public struct Procedure
        {
            //public const string prcInsertarData = Schema.SISAGRI_DESA + Package.Sisagri + ".AGR_SP_I_AGDETF1";            
            public const string sp_ListaUsuarios = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaUsuarios";
            public const string sp_ActualizarClave = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ActualizarClave";

            public const string sp_ListaServiciosyCompras = Schema.DEVENGADO_SIAF_DESA +"."+ Package.General + ".SP_ListaServiciosyCompras";
            public const string sp_ListaOrdenServicio = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaOrdenServicio";
            public const string sp_ListaEntregables = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaEntregables";
            public const string sp_ListaExpedPendixDeveng = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaPendientesxDevengar";
            public const string sp_ListaExpedPendiDevengados = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaPendientesDevengados";

            public const string sp_ListaOficinas = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaOficinas";
            public const string sp_ListaEstadosxOficina = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaEstadosxOficina";
            public const string sp_ListaTiposComprobante = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaTiposComprobantes";
            

            public const string sp_MontosxOrden = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_MontosxOrden";            

            public const string sp_InsertarOrdenServicioEntreg = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_InsertarExpOS";
            public const string sp_ActualizarEntregable = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ActualizarEntregable";
            public const string sp_ActualizarEntregableEstado = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ActualizarEntregableEstado";
            public const string sp_ActualizarEntregablePago = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ActualizarEntregablePago";

            public const string sp_EliminarEntregable = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_EliminarEntregable";

            //SP_EliminarEntregable
        }


        }
}