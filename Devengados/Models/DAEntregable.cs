using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAEntregable:GeneralBase
    {

        public List<BEEntregable> ListaEntregables(string Connection, string Command, int idOrden)
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
                        cmd.Parameters.Add("p_id_orden", OracleDbType.Int32).Value = idOrden;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEEntregable oBe = new BEEntregable();
                            oBe.IdEntregable = Convert.ToInt32(oRea["ID_ENTREGABLE"]);
                            oBe.NroEntregable = Convert.ToString(oRea["NRO_ENTREGABLE"].ToString());
                            oBe.Plazo = oRea["PLAZO"] == DBNull.Value ? -1 : Convert.ToInt32(oRea["PLAZO"]);
                            //oBe.FechaVencimiento = oRea["FECHA_VENCIMIENTO"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_EJECUTADO"]);
                            oBe.FechaVencimiento = Convert.ToString(oRea["FECHA_VENCIMIENTO"]);
                            oBe.Porcentaje = oRea["PORCENTAJE"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PORCENTAJE"]);

                            oBe.MontoProgramado = oRea["MONTO_PROGRAMADO"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_PROGRAMADO"]);// Convert.ToString(oRea["MONTO_PROGRAMADO"].ToString());
                            oBe.DocTramite = Convert.ToString(oRea["DOC_TRAMITE"].ToString());
                            oBe.FechaTramite = Convert.ToString(oRea["FECHA_TRAMITE"].ToString());
                            oBe.MontoDevengado = oRea["MONTO_DEVENGADO"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_DEVENGADO"]);

                            oBe.PenalidadMora = oRea["PENALIDAD_MORA"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PENALIDAD_MORA"]);
                            oBe.OtraPenalidad = oRea["PENALIDAD_OTROS"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PENALIDAD_OTROS"]);
                            oBe.NetoPagar = oRea["NETO_PAGAR"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["NETO_PAGAR"]);  //Convert.ToString(oRea["NETO_PAGAR"].ToString());
                            oBe.FechaDevengado = Convert.ToString(oRea["FECHA_DEVENGADO"].ToString());
                            oBe.FechaPago = Convert.ToString(oRea["FECHA_PAGO"].ToString());
                            oBe.Observacion = Convert.ToString(oRea["OBSERVACION"].ToString());
                            oBe.IdOrdenEntregable = Convert.ToInt32(oRea["ID_ORDEN"]);

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


        public int ActualizarEntregable(ref Dictionary<string, string> objEntregableOS, string Connection, string Command)
        {
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            string[] strRpta = { };
            OracleConnection cnx = null;
            try
            {
                using (cnx = new OracleConnection(strCadena))
                {                    
                    using (OracleCommand cm = new OracleCommand(Command, cnx))
                    {
                        cm.CommandType = CommandType.StoredProcedure;
                        cm.BindByName = true;

                        /////////////////////////////////////////
                        //if (long.Parse(objEntregableOS["ide"]) != 0) cm.Parameters.Add("p_IDE_USUARIO", objEntregableOS["ide"]);
                        cm.Parameters.Add("p_id_entregable", objEntregableOS["idEntregable"]);
                        cm.Parameters.Add("p_nro_entregable", objEntregableOS["nroEntreg"]);
                        cm.Parameters.Add("p_plazo", objEntregableOS["plazo"]);

                        cm.Parameters.Add("p_fecha_vencimiento", objEntregableOS["fechaVenc"]);
                        cm.Parameters.Add("p_porcentaje", objEntregableOS["porcentaje"]);

                        cm.Parameters.Add("p_monto_programado", objEntregableOS["montoprograma"]);
                        cm.Parameters.Add("p_doc_tramite", objEntregableOS["docTram"]);
                        cm.Parameters.Add("p_fecha_tramite", objEntregableOS["fecTram"]);
                        cm.Parameters.Add("p_monto_devengado", objEntregableOS["montoDeveng"]);
                        cm.Parameters.Add("p_penalidad_mora", objEntregableOS["penalidadMora"]);
                        cm.Parameters.Add("p_penalidad_otros", objEntregableOS["penalidadOtros"]);
                        cm.Parameters.Add("p_neto_pagar", objEntregableOS["montoPagar"]);
                        cm.Parameters.Add("p_fecha_devengado", objEntregableOS["fecDeveng"]);
                        cm.Parameters.Add("p_fecha_pago", objEntregableOS["fecPago"]);
                        cm.Parameters.Add("p_observacion", objEntregableOS["observacion"]);

                        
                        //cm.Parameters.Add("p_numero_contacto", string.IsNullOrEmpty(objEntregableOS["contacto"]) == true ? null : objEntregableOS["contacto"]);
                        //cm.Parameters.Add("p_email", string.IsNullOrEmpty(objEntregableOS["email"]) == true ? null : objEntregableOS["email"]);
                        //if (objEntregableOS.ContainsKey("P_RENIEC")) cm.Parameters.Add("P_RENIEC", objEntregableOS["reniec"].Trim());

                        //cm.Parameters.Add("p_usuario", objEntregableOS["usuario"].Trim());                        

                        //cm.Parameters.Add("p_IdeNuevo", OracleDbType.Int32, ParameterDirection.Output).Size = 8;
                        cm.Parameters.Add("p_resultado", OracleDbType.Int32, ParameterDirection.Output).Size = 8;
                        cm.Parameters.Add("p_errorMsn", OracleDbType.Varchar2, ParameterDirection.Output).Size = 200;
                        cnx.Open();
                        cm.ExecuteNonQuery();


                        int intResultado = int.Parse(cm.Parameters["p_resultado"].Value.ToString());
                        string strDescrError = cm.Parameters["p_errorMsn"].Value.ToString();
                        if (intResultado != 1) throw new Exception(strDescrError);
                        //int intNuevoIde = int.Parse(cm.Parameters["p_IdeNuevo"].Value.ToString());
                        /*if (long.Parse(objEntregableOS["ide"]) == 0)
                        {
                            objEntregableOS["ide"] = intNuevoIde.ToString();
                        }*/

                        return intResultado;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
            finally
            {
                if (cnx.State == ConnectionState.Open) cnx.Close();
            }
        }
    }






}