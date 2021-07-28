using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;


namespace Devengados
{
    public class DAUsuario:GeneralBase
    {

        public List<BEUsuario> ListaUsuarios(string Connection, string Command, String Usuario ,string Clave)
        {
            OracleDataReader oRea = null;
            int indice = 0;
            List<BEUsuario> oList = new List<BEUsuario>();
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            try
            {
                using (OracleConnection con = new OracleConnection(strCadena))
                {
                    using (OracleCommand cmd = new OracleCommand(Command, con))
                    {
                        cmd.Connection = con;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("p_usuario", OracleDbType.Varchar2,40).Value = Usuario;
                        cmd.Parameters.Add("p_clave", OracleDbType.Varchar2, 40).Value = Clave;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEUsuario oBe = new BEUsuario();
                            oBe.ID_USUARIO = Convert.ToInt32(oRea["id_usuario"]);
                            oBe.USUARIO = Convert.ToString(oRea["usuario"].ToString());
                            oBe.ACCESO = Convert.ToString(oRea["acceso"].ToString());
                            oBe.CLAVE = Convert.ToString(oRea["clave"].ToString());
                            oBe.NOMBRE = Convert.ToString(oRea["nombre"].ToString());                       
                                                        
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


        public int ActualizarClave(string Connection, string Command,int idUsuario, string nuevaClave)
        {
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);            
            OracleConnection cnx = null;
            try
            {
                using (cnx = new OracleConnection(strCadena))
                {
                    using (OracleCommand cm = new OracleCommand(Command, cnx))
                    {
                        cm.CommandType = CommandType.StoredProcedure;
                        cm.BindByName = true;

                        cm.Parameters.Add("p_idusuario", OracleDbType.Int32).Value = idUsuario;
                        cm.Parameters.Add("p_clave", OracleDbType.Varchar2, 40).Value = nuevaClave.ToString();
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