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
        public List<BEConsolidado> ListaExpedientes(string Connection, string Command, string tipoOrden)
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
                        cmd.Parameters.Add("p_tporden", OracleDbType.Varchar2).Value = tipoOrden;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEConsolidado oBe = new BEConsolidado();
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

                            // -1 : Indica que no tiene orden de servicio o orden de compra
                            oBe.IdOrden= oRea["id_orden"] == DBNull.Value ? -1 : Convert.ToInt32(oRea["id_orden"]);

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

                            oBe.NroOrden= Convert.ToString(oRea["NRO_ORDEN"].ToString());


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
                        cm.Parameters.Add("p_id_orden", objExpedienteOS["idOrden"]);
                        
                        cm.Parameters.Add("p_contrato_primig", objExpedienteOS["contratoExpOS"]);
                        cm.Parameters.Add("p_procedimiento", objExpedienteOS["procediExpOS"]);

                        cm.Parameters.Add("p_descripcion", objExpedienteOS["descripExpOS"]);
                        cm.Parameters.Add("p_proveedor", objExpedienteOS["proveExpOS"]);

                        cm.Parameters.Add("p_fecNotifica", objExpedienteOS["fecNotiContraExpOS"]);
                        cm.Parameters.Add("p_plazo", objExpedienteOS["plazoExpOS"]);
                        //cm.Parameters.Add("p_email", string.IsNullOrEmpty(objUsuario["email"]) == true ? null : objUsuario["email"]);
                        
                        if(string.IsNullOrEmpty( objExpedienteOS["montoContraVigExpOS"]) == true)
                            cm.Parameters.Add("p_montoContraVig",  objExpedienteOS["montoContraVigExpOS"]);
                        else
                            cm.Parameters.Add("p_montoContraVig",  Convert.ToDecimal( objExpedienteOS["montoContraVigExpOS"]));

                        
                        if (string.IsNullOrEmpty(objExpedienteOS["montoAdjExpOS"]) == true)
                            cm.Parameters.Add("p_montoAdj", objExpedienteOS["montoAdjExpOS"]);
                        else
                            cm.Parameters.Add("p_montoAdj", Convert.ToDecimal(objExpedienteOS["montoAdjExpOS"]));



                        if (string.IsNullOrEmpty(objExpedienteOS["adicionaExpOS"]) == true)
                            cm.Parameters.Add("p_adicional", objExpedienteOS["adicionaExpOS"]);
                        else
                            cm.Parameters.Add("p_adicional", Convert.ToDecimal(objExpedienteOS["adicionaExpOS"]));


                        if (string.IsNullOrEmpty(objExpedienteOS["reduExpOS"]) == true)
                            cm.Parameters.Add("p_reduccion", objExpedienteOS["reduExpOS"]);
                        else
                            cm.Parameters.Add("p_reduccion", Convert.ToDecimal(objExpedienteOS["reduExpOS"]));
                        
                        cm.Parameters.Add("p_fecIni", objExpedienteOS["fecIniExpOS"]);
                        cm.Parameters.Add("p_fecFin", objExpedienteOS["fecFinExpOS"]);
                        cm.Parameters.Add("p_nroOrdenOS", objExpedienteOS["nroOrdenOS"]);
                        cm.Parameters.Add("p_expSiafOS", objExpedienteOS["expSiafOS"]);
                        cm.Parameters.Add("p_certificadoOS", objExpedienteOS["certifiOS"]);


                        if (string.IsNullOrEmpty(objExpedienteOS["montoComprOS"]) == true)
                            cm.Parameters.Add("p_montoComproOS", objExpedienteOS["montoComprOS"]);
                        else
                            cm.Parameters.Add("p_montoComproOS", Convert.ToDecimal(objExpedienteOS["montoComprOS"]));




                        if (string.IsNullOrEmpty(objExpedienteOS["ampliOS"]) == true)
                            cm.Parameters.Add("p_ampliOS", objExpedienteOS["ampliOS"]);
                        else
                            cm.Parameters.Add("p_ampliOS", Convert.ToDecimal(objExpedienteOS["ampliOS"]));

                        if (string.IsNullOrEmpty(objExpedienteOS["rebajaOS"]) == true)
                            cm.Parameters.Add("p_rebajaOS", objExpedienteOS["rebajaOS"]);
                        else
                            cm.Parameters.Add("p_rebajaOS", Convert.ToDecimal(objExpedienteOS["rebajaOS"]));

                        if (string.IsNullOrEmpty(objExpedienteOS["montoDevengOS"]) == true)
                            cm.Parameters.Add("p_montoDevengOS", objExpedienteOS["montoDevengOS"]);
                        else
                            cm.Parameters.Add("p_montoDevengOS", Convert.ToDecimal(objExpedienteOS["montoDevengOS"]));


                        if (string.IsNullOrEmpty(objExpedienteOS["saldoOS"]) == true)
                            cm.Parameters.Add("p_saldoOS", objExpedienteOS["saldoOS"]);
                        else
                            cm.Parameters.Add("p_saldoOS", Convert.ToDecimal(objExpedienteOS["saldoOS"]));


                        cm.Parameters.Add("p_nrosEntregablesOS", objExpedienteOS["nroEntregOS"]);


                        if (string.IsNullOrEmpty(objExpedienteOS["montoContratoC"]) == true)
                            cm.Parameters.Add("p_montoContrato", objExpedienteOS["montoContratoC"]);
                        else
                            cm.Parameters.Add("p_montoContrato", Convert.ToDecimal(objExpedienteOS["montoContratoC"]));



                        if (string.IsNullOrEmpty(objExpedienteOS["totalDevengadoC"]) == true)
                            cm.Parameters.Add("p_devengadoContrato", objExpedienteOS["totalDevengadoC"]);
                        else
                            cm.Parameters.Add("p_devengadoContrato", Convert.ToDecimal(objExpedienteOS["totalDevengadoC"]));

                        if (string.IsNullOrEmpty(objExpedienteOS["penalidadMoraC"]) == true)
                            cm.Parameters.Add("p_penaMoraContrato", objExpedienteOS["penalidadMoraC"]);
                        else
                            cm.Parameters.Add("p_penaMoraContrato", Convert.ToDecimal(objExpedienteOS["penalidadMoraC"]));

                        if (string.IsNullOrEmpty(objExpedienteOS["penalidadOtrosC"]) == true)
                            cm.Parameters.Add("p_penaOtrosContrato", objExpedienteOS["penalidadOtrosC"]);
                        else
                            cm.Parameters.Add("p_penaOtrosContrato", Convert.ToDecimal(objExpedienteOS["penalidadOtrosC"]));

                        if (string.IsNullOrEmpty(objExpedienteOS["saldoContratoC"]) == true)
                            cm.Parameters.Add("p_saldoContrato", objExpedienteOS["saldoContratoC"]);
                        else
                            cm.Parameters.Add("p_saldoContrato", Convert.ToDecimal(objExpedienteOS["saldoContratoC"]));


                        cm.Parameters.Add("p_dataEntregable", objExpedienteOS["dataEntregables"]);


                        //cm.Parameters.Add("p_numero_contacto", string.IsNullOrEmpty(objExpedienteOS["contacto"]) == true ? null : objExpedienteOS["contacto"]);
                        //cm.Parameters.Add("p_email", string.IsNullOrEmpty(objExpedienteOS["email"]) == true ? null : objExpedienteOS["email"]);
                        //if (objExpedienteOS.ContainsKey("P_RENIEC")) cm.Parameters.Add("P_RENIEC", objExpedienteOS["reniec"].Trim());

                        //cm.Parameters.Add("p_usuario", objExpedienteOS["usuario"].Trim());                        

                        cm.Parameters.Add("p_idOrdenNuevo", OracleDbType.Int32, ParameterDirection.Output).Size = 10;
                        cm.Parameters.Add("p_resultado", OracleDbType.Int32, ParameterDirection.Output).Size = 8;
                        cm.Parameters.Add("p_errorMsn", OracleDbType.Varchar2, ParameterDirection.Output).Size = 200;
                        cnx.Open();
                        cm.ExecuteNonQuery();


                        int intResultado = int.Parse(cm.Parameters["p_resultado"].Value.ToString());
                        string strDescrError = cm.Parameters["p_errorMsn"].Value.ToString();
                        if (intResultado != 1) throw new Exception(strDescrError);
                        int intNuevoIdOrden = int.Parse(cm.Parameters["p_idOrdenNuevo"].Value.ToString());
                        /*if (long.Parse(objExpedienteOS["ide"]) == 0)
                        {
                            objExpedienteOS["ide"] = intNuevoIde.ToString();
                        }*/

                        return intNuevoIdOrden;
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