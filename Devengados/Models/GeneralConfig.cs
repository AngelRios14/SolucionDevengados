using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Devengados
{
    public class GeneralConfig
    {
        public static string LeerAppSettings(string Clave)
        {
            try
            {
                return System.Configuration.ConfigurationManager.AppSettings[Clave];
            }
            catch
            {
                return null;
            }
        }

        public static string LeerConnectionStrings(string Nombre)
        {
            try
            {
                return System.Configuration.ConfigurationManager.ConnectionStrings[Nombre].ConnectionString;
            }
            catch
            {
                return null;
            }
        }
    }
}