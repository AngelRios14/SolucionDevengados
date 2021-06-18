using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;


namespace Devengados
{
    public class DAOrden:GeneralBase
    {
        public List<BEOrden> ListaOrdenes(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEOrden> oList = new List<BEOrden>();
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            try
            {
                using (OracleConnection con = new OracleConnection(strCadena))
                {
                    using (OracleCommand cmd = new OracleCommand(Command, con))
                    {
                        cmd.Connection = con;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEOrden oBe = new BEOrden();
                            oBe.IdOrden = Convert.ToInt32(oRea["ID_ORDEN"]);
                            oBe.NroOrden = Convert.ToString(oRea["NRO_ORDEN"].ToString());
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