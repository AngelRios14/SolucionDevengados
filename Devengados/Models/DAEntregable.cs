using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAEntregable
    {
        public List<BEEntregable> ListaEntregables(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEEntregable> oList = new List<BEEntregable>();
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
                            BEEntregable oBe = new BEEntregable();
                            oBe.IdEntregable = Convert.ToInt32(oRea["INT_EXPE"]);
                            oBe.NroEntregable = Convert.ToString(oRea["TXT_EXPEDIENTE"].ToString());
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