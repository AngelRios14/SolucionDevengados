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
                            oBe.ContratoPrimigenio = Convert.ToString(oRea["CONTRATO_PRIMIGENIO"].ToString());
                            oBe.MontoContractual = oRea["MONTO_CONTRACTUAL"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_CONTRACTUAL"]);
                            oBe.MontoEjecutado = oRea["MONTO_EJECUTADO"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_EJECUTADO"]);
                            oBe.AreaUsuaria = Convert.ToString(oRea["AREA_USUARIA"].ToString());
                            oBe.Expediente = Convert.ToString(oRea["EXPEDIENTE"].ToString());
                            oBe.Descripcion = Convert.ToString(oRea["DESCRIPCION"].ToString());
                            oBe.Importe = oRea["IMPORTE"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["IMPORTE"]);
                            oBe.NroProcedimiento = Convert.ToString(oRea["NRO_PROCEDIMIENTO"].ToString());
                            oBe.Proveedor = Convert.ToString(oRea["PROVEEDOR"].ToString());

                            oBe.MontoAdjudicado = oRea["MONTO_ADJUDICADO"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_ADJUDICADO"]);
                            oBe.MontoContractualVig = oRea["MONTO_CONTRACTUAL_VIGENTE"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_CONTRACTUAL_VIGENTE"]);
                            oBe.PrestacionAdicional = oRea["PRESTACION_ADICIONAL"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PRESTACION_ADICIONAL"]);
                            oBe.Reduccion = oRea["REDUCCION"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["REDUCCION"]);
                            oBe.MontoDevengadoTotal = oRea["MONTO_DEVENGADO_TOTAL"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["MONTO_DEVENGADO_TOTAL"]);
                            oBe.PenalidadMora = oRea["PENALIDAD_MORA"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PENALIDAD_MORA"]);
                            oBe.PenalidadOtros = oRea["PENALIDAD_OTROS"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["PENALIDAD_OTROS"]);
                            oBe.SaldoTotal = oRea["SALDO_TOTAL"] == DBNull.Value ? -1 : Convert.ToDecimal(oRea["SALDO_TOTAL"]);
                            oBe.AnoEjecucion = Convert.ToString(oRea["ANO_EJECUCION"].ToString());
                            oBe.Plazo = oRea["PLAZO"] == DBNull.Value ? -1 : Convert.ToInt32(oRea["PLAZO"]);
                            oBe.FechaInicioPlazo = Convert.ToString(oRea["FECHA_INICIO_PLAZO"].ToString()); 
                            oBe.FechaFinPlazo = Convert.ToString(oRea["FECHA_FIN_PLAZO"].ToString());
                            oBe.FechaNotificacion = Convert.ToString(oRea["FECHA_NOTIFICACION"].ToString());


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

       

       


        public int RegistrarExpediente(ref Dictionary<string, string> objExpedienteOS, string Connection, string Command)
        {
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            string[] strRpta = { };
            OracleConnection cnx = null;
            try
            {
                using (cnx = new OracleConnection(strCadena))
                {
                    //actualizado SISAGRI
                    using (OracleCommand cm = new OracleCommand(Command, cnx))
                    {
                        cm.CommandType = CommandType.StoredProcedure;
                        cm.BindByName = true;

                        /////////////////////////////////////////
                        //if (long.Parse(objExpedienteOS["ide"]) != 0) cm.Parameters.Add("p_IDE_USUARIO", objExpedienteOS["ide"]);
                        cm.Parameters.Add("p_id_expediente", objExpedienteOS["idExpediente"]);
                        cm.Parameters.Add("p_contrato_primig", objExpedienteOS["contratoExpOS"]);
                        cm.Parameters.Add("p_procedimiento", objExpedienteOS["procediExpOS"]);

                        cm.Parameters.Add("p_descripcion", objExpedienteOS["descripExpOS"]);
                        cm.Parameters.Add("p_proveedor", objExpedienteOS["proveExpOS"]);

                        cm.Parameters.Add("p_fecNotifica", objExpedienteOS["fecNotiContraExpOS"]);
                        cm.Parameters.Add("p_plazo", objExpedienteOS["plazoExpOS"]);
                        cm.Parameters.Add("p_montoContraVig", objExpedienteOS["montoContraVigExpOS"]);
                        cm.Parameters.Add("p_montoAdj", objExpedienteOS["montoAdjExpOS"]);
                        cm.Parameters.Add("p_adicional", objExpedienteOS["adicionaExpOS"]);
                        cm.Parameters.Add("p_reduccion", objExpedienteOS["reduExpOS"]);
                        cm.Parameters.Add("p_fecIni", objExpedienteOS["fecIniExpOS"]);
                        cm.Parameters.Add("p_fecFin", objExpedienteOS["fecFinExpOS"]);
                        cm.Parameters.Add("p_nroOrdenOS", objExpedienteOS["nroOrdenOS"]);
                        cm.Parameters.Add("p_expSiafOS", objExpedienteOS["expSiafOS"]);
                        cm.Parameters.Add("p_certificadoOS", objExpedienteOS["certifiOS"]);
                        cm.Parameters.Add("p_montoComproOS", objExpedienteOS["montoComprOS"]);
                        cm.Parameters.Add("p_ampliOS", objExpedienteOS["ampliOS"]);
                        cm.Parameters.Add("p_rebajaOS", objExpedienteOS["rebajaOS"]);
                        cm.Parameters.Add("p_montoDevengOS", objExpedienteOS["montoDevengOS"]);
                        cm.Parameters.Add("p_saldoOS", objExpedienteOS["saldoOS"]);
                        cm.Parameters.Add("p_nrosEntregablesOS", objExpedienteOS["nroEntregOS"]);
                        cm.Parameters.Add("p_dataEntregable", objExpedienteOS["dataEntregables"]);


                        //cm.Parameters.Add("p_numero_contacto", string.IsNullOrEmpty(objExpedienteOS["contacto"]) == true ? null : objExpedienteOS["contacto"]);
                        //cm.Parameters.Add("p_email", string.IsNullOrEmpty(objExpedienteOS["email"]) == true ? null : objExpedienteOS["email"]);
                        //if (objExpedienteOS.ContainsKey("P_RENIEC")) cm.Parameters.Add("P_RENIEC", objExpedienteOS["reniec"].Trim());

                        //cm.Parameters.Add("p_usuario", objExpedienteOS["usuario"].Trim());                        

                        //cm.Parameters.Add("p_IdeNuevo", OracleDbType.Int32, ParameterDirection.Output).Size = 8;
                        cm.Parameters.Add("p_resultado", OracleDbType.Int32, ParameterDirection.Output).Size = 8;
                        cm.Parameters.Add("p_errorMsn", OracleDbType.Varchar2, ParameterDirection.Output).Size = 200;
                        cnx.Open();
                        cm.ExecuteNonQuery();


                        int intResultado = int.Parse(cm.Parameters["p_resultado"].Value.ToString());
                        string strDescrError = cm.Parameters["p_errorMsn"].Value.ToString();
                        if (intResultado != 1) throw new Exception(strDescrError);
                        //int intNuevoIde = int.Parse(cm.Parameters["p_IdeNuevo"].Value.ToString());
                        /*if (long.Parse(objExpedienteOS["ide"]) == 0)
                        {
                            objExpedienteOS["ide"] = intNuevoIde.ToString();
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