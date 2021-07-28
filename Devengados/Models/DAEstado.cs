using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Data;

namespace Devengados
{
    public class DAEstado:GeneralBase
    {

        public List<BEEstado> ListaEstadosxOficina(string Connection, string Command, int idOficina)
        {
            OracleDataReader oRea = null;
            List<BEEstado> oList = new List<BEEstado>();
            string strCadena = GeneralConfig.LeerConnectionStrings(Connection);
            try
            {
                using (OracleConnection con = new OracleConnection(strCadena))
                {
                    using (OracleCommand cmd = new OracleCommand(Command, con))
                    {
                        cmd.Connection = con;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("p_id_oficina", OracleDbType.Int32).Value = idOficina;
                        cmd.Parameters.Add("p_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                        con.Open();
                        oRea = cmd.ExecuteReader();
                        while (oRea.Read() && oRea.HasRows)
                        {
                            BEEstado oBe = new BEEstado();
                            oBe.IdEstado = Convert.ToInt32(oRea["ID_ESTADO"]);
                            oBe.NombreEstado = Convert.ToString(oRea["NOMBRE_ESTADO"].ToString());                            
                            oBe.IdOficina = Convert.ToInt32(oRea["ID_OFICINA"]);
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