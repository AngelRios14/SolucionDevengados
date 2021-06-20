using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;

namespace Devengados
{
    public class DAExpediente
    {
        public List<BEExpediente> ListaExpedientes(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEExpediente> oList = new List<BEExpediente>();
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
                            BEExpediente oBe = new BEExpediente();
                            oBe.IdExpediente = Convert.ToInt32(oRea["INT_EXPE"]);
                            oBe.ContratoPrimigenio= Convert.ToString(oRea["CONTRATO_PRIMIGENIO"].ToString());
                            oBe.MontoContractual= Convert.ToDecimal(oRea["MONTO_CONTRACTUAL"].ToString());
                            oBe.AreaUsuaria = Convert.ToString(oRea["TXT_EXPEDIENTE"].ToString());
                            oBe.Expediente = Convert.ToString(oRea["TXT_EXPEDIENTE"].ToString());                            
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