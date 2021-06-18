using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAComprobante
    {
        public List<BEComprobante> ListaEntregables(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEComprobante> oList = new List<BEComprobante>();
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            try
            {
                using (OracleConnection con = new OracleConnection(strCadena))
                {
                    using (OracleCommand cmd = new OracleCommand(Command, con))
                    {
                        cmd.Connection = con;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("REFCURSOR", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEComprobante oBe = new BEComprobante();
                            oBe.IdComprobante = Convert.ToInt32(oRea["INT_EXPE"]);
                            oBe.Descripcion = Convert.ToString(oRea["TXT_EXPEDIENTE"].ToString());
                            oList.Add(oBe);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                try { if (oRea != null) { oRea.Close(); oRea.Dispose(); } }
                catch (Exception e) { }
                finally { oRea = null; }
            }

            return oList;
        }
    }
}