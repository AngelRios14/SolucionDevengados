using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAConsolidado:GeneralBase
    {


        public List<BEConsolidado> ListaPendientesxDevengar(string Connection, string Command)
        {
            OracleDataReader oRea = null;
            List<BEConsolidado> oList = new List<BEConsolidado>();
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
                            BEConsolidado oBe = new BEConsolidado();
                            oBe.IdExpediente = Convert.ToInt32(oRea["ID_EXPEDIENTE"]);
                            oBe.IdOrden= Convert.ToInt32(oRea["id_orden"]);
                            oBe.IdEntregable= Convert.ToInt32(oRea["id_entregable"]);
                            oBe.AreaUsuaria = Convert.ToString(oRea["AREA_USUARIA"].ToString());
                            oBe.Expediente = Convert.ToString(oRea["EXPEDIENTE"].ToString());
                            oBe.NroOrden = Convert.ToString(oRea["nro_orden"].ToString());
                            oBe.Descripcion = Convert.ToString(oRea["DESCRIPCION"].ToString());                                                        
                            oBe.Proveedor = Convert.ToString(oRea["PROVEEDOR"].ToString());                                                                                                                
                            oBe.MontoProgramado = oRea["monto_programado"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["monto_programado"]);    
                            oBe.FechaVencimiento = Convert.ToString(oRea["fecha_vencimiento"].ToString());                            
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