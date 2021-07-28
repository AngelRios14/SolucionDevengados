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
                            oBe.IdOrden = Convert.ToInt32(oRea["ID_ORDEN"]);
                            oBe.IdEntregable = Convert.ToInt32(oRea["ID_ENTREGABLE"]);
                            oBe.AreaUsuaria = Convert.ToString(oRea["AREA_USUARIA"].ToString());
                            oBe.Siaf = Convert.ToString(oRea["SIAF"].ToString());
                            oBe.NroOrden = Convert.ToString(oRea["NRO_ORDEN"].ToString());
                            oBe.Descripcion = Convert.ToString(oRea["DESCRIPCION"].ToString());
                            oBe.Proveedor = Convert.ToString(oRea["PROVEEDOR"].ToString());
                            oBe.MontoProgramado = oRea["monto_programado"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["monto_programado"]);
                            oBe.FechaVencimiento = Convert.ToString(oRea["fecha_vencimiento"].ToString());
                            
                            if(oRea["id_oficina"] != DBNull.Value)
                                oBe.IdOficina= Convert.ToInt32(oRea["id_oficina"]);
                            if (oRea["id_estado"] != DBNull.Value)
                                oBe.IdEstado = Convert.ToInt32(oRea["id_estado"]);

                            oBe.NombreEstado= Convert.ToString(oRea["nombre_estado"].ToString());
                            oBe.NombreOficina= Convert.ToString(oRea["nombre_oficina"].ToString());

                            oBe.FechaEstado = Convert.ToString(oRea["fec_estado"].ToString());
                            oBe.FechaDevengado = Convert.ToString(oRea["fecha_devengado"].ToString());   
                            oBe.FechaPago = Convert.ToString(oRea["fecha_pago"].ToString());
                            oBe.Observacion= Convert.ToString(oRea["observacion"].ToString());


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


        public List<BEConsolidado> ListaPendientesDevengados(string Connection, string Command)
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
                            oBe.IdOrden = Convert.ToInt32(oRea["ID_ORDEN"]);
                            oBe.IdEntregable = Convert.ToInt32(oRea["ID_ENTREGABLE"]);
                            oBe.AreaUsuaria = Convert.ToString(oRea["AREA_USUARIA"].ToString());
                            oBe.Siaf = Convert.ToString(oRea["SIAF"].ToString());
                            oBe.NroOrden = Convert.ToString(oRea["NRO_ORDEN"].ToString());
                            oBe.Descripcion = Convert.ToString(oRea["DESCRIPCION"].ToString());
                            oBe.Proveedor = Convert.ToString(oRea["PROVEEDOR"].ToString());
                            oBe.MontoProgramado = oRea["monto_programado"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["monto_programado"]);
                            oBe.FechaVencimiento = Convert.ToString(oRea["fecha_vencimiento"].ToString());

                            if (oRea["id_oficina"] != DBNull.Value)
                                oBe.IdOficina = Convert.ToInt32(oRea["id_oficina"]);
                            if (oRea["id_estado"] != DBNull.Value)
                                oBe.IdEstado = Convert.ToInt32(oRea["id_estado"]);
                            oBe.FechaEstado = Convert.ToString(oRea["fec_estado"].ToString());
                            oBe.FechaDevengado = Convert.ToString(oRea["fecha_devengado"].ToString());
                            oBe.FechaPago = Convert.ToString(oRea["fecha_pago"].ToString());
                            oBe.Observacion = Convert.ToString(oRea["observacion"].ToString());

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