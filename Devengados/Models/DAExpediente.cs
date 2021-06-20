using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;

namespace Devengados
{
    public class DAExpediente:GeneralBase
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
                            oBe.IdExpediente = Convert.ToInt32(oRea["ID_EXPEDIENTE"]);
                            oBe.ContratoPrimigenio= Convert.ToString(oRea["CONTRATO_PRIMIGENIO"].ToString());
                            oBe.MontoContractual = oRea["MONTO_CONTRACTUAL"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_CONTRACTUAL"]);                            
                            oBe.MontoEjecutado= oRea["MONTO_EJECUTADO"] == DBNull.Value ? -1 :  Convert.ToDecimal(oRea["MONTO_EJECUTADO"]);
                            oBe.AreaUsuaria = Convert.ToString(oRea["AREA_USUARIA"].ToString());
                            oBe.Expediente = Convert.ToString(oRea["EXPEDIENTE"].ToString());                            
                            oBe.Descripcion = Convert.ToString(oRea["DESCRIPCION"].ToString());
                            oBe.Importe = oRea["IMPORTE"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["IMPORTE"]);                            
                            oBe.NroProcedimiento= Convert.ToString(oRea["NRO_PROCEDIMIENTO"].ToString());
                            oBe.Proveedor = Convert.ToString(oRea["PROVEEDOR"].ToString());

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