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
            public const string sp_ListaServicios = Schema.DEVENGADO_SIAF_DESA +"."+ Package.General + ".SP_ListaServicio";
            public const string sp_ListaOrdenServicio = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaOrdenServicio";
            public const string sp_ListaEntregables = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaEntregables";
            public const string sp_ListaExpedPendixDeveng = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ListaPendientesxDevengar";


            public const string sp_InsertarOrdenServicioEntreg = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_InsertarExpOS";
            public const string sp_ActualizarEntregable = Schema.DEVENGADO_SIAF_DESA + "." + Package.General + ".SP_ActualizarEntregable";
        }


        }
}