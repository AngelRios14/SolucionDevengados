using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAPago
    {

        public List<BEPago> ListaEntregables(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEPago> oList = new List<BEPago>();
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
                            BEPago oBe = new BEPago();
                            oBe.IdPago = Convert.ToInt32(oRea["INT_EXPE"]);
                            oBe.NroComprobante = Convert.ToString(oRea["TXT_EXPEDIENTE"].ToString());
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