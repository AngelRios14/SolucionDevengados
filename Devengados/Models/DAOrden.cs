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

        public List<BEOrden> ListaOrden(string Connection, string Command, int idExpediente)
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
                        cmd.Parameters.Add("p_id_expediente", OracleDbType.Int32).Value = idExpediente;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEOrden oBe = new BEOrden();

                            oBe.IdOrden = Convert.ToInt32(oRea["ID_ORDEN"]);
                            oBe.NroOrden = Convert.ToString(oRea["NRO_ORDEN"].ToString());
                            oBe.Siaf = Convert.ToString(oRea["SIAF"].ToString());
                            oBe.NroCertificado = Convert.ToString(oRea["NRO_CERTIFICADO"]);
                            oBe.FechaOrden = Convert.ToString(oRea["FECHA_ORDEN"]);                                                        
                            oBe.MontoCompSiaf = oRea["MONTO_COMPROMETIDO_SIAF"] ==DBNull.Value? -1: Convert.ToDecimal(oRea["MONTO_COMPROMETIDO_SIAF"]);                             
                            oBe.MontoDevengado = oRea["MONTO_DEVENGADO_SIAF"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_DEVENGADO_SIAF"]);                            
                            oBe.SaldoSiaf = oRea["SALDO_SIAF"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["SALDO_SIAF"]);                            
                            oBe.Ampliacion = oRea["AMPLIACION"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["AMPLIACION"]);                            
                            oBe.Reduccion = oRea["REDUCCION"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["REDUCCION"]);                            
                            oBe.CantidadEntregables = oRea["CANTIDAD_ENTREGABLES"] == DBNull.Value ? -1 : Convert.ToInt32(oRea["CANTIDAD_ENTREGABLES"]);
                            oBe.Ruc = Convert.ToString(oRea["RUC"].ToString());
                            if (oRea["ID_EXPEDIENTE"] != DBNull.Value)
                                oBe.IdExpedienteOrden = Convert.ToInt32(oRea["ID_EXPEDIENTE"]);
                            
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


        public List<BEEntregable> MontosOrdenxEntregables(string Connection, string Command, int idOrden)
        {
            // Devuelve la sumatoria de montos de los entregables por IdOrden desde la  tabla entregable 
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
                        cmd.Parameters.Add("p_id_orden", OracleDbType.Int32).Value = idOrden;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            
                            BEEntregable oBe = new BEEntregable();

                            oBe.IdOrdenEntregable = Convert.ToInt32(oRea["ID_ORDEN"]);
                            oBe.MontoDevengado = oRea["monto_devengado"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["monto_devengado"]);
                            oBe.MontoProgramado= oRea["monto_programado"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["monto_programado"]);
                            oBe.PenalidadMora= oRea["penalidad_mora"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["penalidad_mora"]);
                            oBe.OtraPenalidad= oRea["penalidad_otros"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["penalidad_otros"]);
                            oBe.NetoPagar= oRea["neto_pagar"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["neto_pagar"]);
                            
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