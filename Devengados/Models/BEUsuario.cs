using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class BEUsuario
    {
        public int id_aplicacion { get; set; }
        public int ID_USUARIO { get; set; }
        public int? ID_ENTIDAD { get; set; }
        public int? ID_SEDE { get; set; }
        public int ID_CIUDADANO { get; set; } = 0;
        public int ID_ATENCION { get; set; } = 0;
        public string DNI { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string NOMBRE_ENTIDAD { get; set; }
        public string NOMBRE_SEDE { get; set; }
        public string USUARIO { get; set; }
        public string PASSWORD { get; set; }
        public string CONTRASENA { get; set; }
        public DateTime FECHA_CADUCA { get; set; }
        public int ESTADO_VIGENCIA { get; set; }
        public int FILA { get; set; }
        public int TOTAL { get; set; }
        public int PAGINADO { get; set; }
        public bool Autenticado { get; set; }
        //public List<BEPermiso> Lista_Permiso { get; set; }
        //public List<BERecurso> Lista_Recurso { get; set; }
        public string DSC_ENTIDAD { get; set; }
        public int TIPO_USUARIO { get; set; }
        public string TIPOUSUARIO { get; set; }
        public string USUARIO_REGISTRA { get; set; }
        public string CORREO { get; set; }
        public string TELEFONO { get; set; }
        public string CLAVE { get; set; }

        public string ACCESO { get; set; }
    }
}