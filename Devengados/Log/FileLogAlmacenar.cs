using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Devengados
{
    public class FileLogAlmacenar
    {
        public void Grabar(ObjetoLog Objeto)
        {
            try
            {

                string fechaActual = DateTime.Now.ToString("dd_MM_yyyy");
                string FilePath = GeneralConfig.LeerAppSettings("LogError");
                StringBuilder textoLog = new StringBuilder();

                textoLog.AppendLine(" ");
                textoLog.AppendFormat("{0} = {1}", "Titulo:", Objeto.TituloError);
                textoLog.AppendLine();
                textoLog.AppendFormat("{0} = {1}", "Fecha:", Objeto.FechaError.ToString());
                textoLog.AppendLine();
                textoLog.AppendFormat("{0} = {1}", "Mensaje:", Objeto.MensajeError);
                textoLog.AppendLine();
                textoLog.AppendFormat("{0} = {1}", "Detalle:", Objeto.DetalleError);
                textoLog.AppendLine();

                textoLog.AppendLine(new String('_', 80));

                System.IO.FileInfo file = new System.IO.FileInfo(FilePath);
                file.Directory.Create(); // If the directory already exists, this method does nothing.            
                using (StreamWriter sw = new StreamWriter(string.Format("{0}Log_{1}.txt", FilePath, fechaActual), true))
                {
                    sw.WriteLine(textoLog.ToString());
                }
                /*
                bool bEnviarCorreo = Config.LeerAppSettings("EnviarCorreoLog") == "1";
                if (bEnviarCorreo)
                {
                    if (Objeto.NivelError == General.Constante.NivelLog.ErrorCritico)
                    {
                        Mail.Mensaje mensaje = new Mail.Mensaje();

                        mensaje.De = Config.LeerAppSettings("FromLog");
                        mensaje.Para = Config.LeerAppSettings("EmailLogCritico");
                        mensaje.Asunto = string.Format("Error critico - {0}", Objeto.TituloError);
                        mensaje.Detalle = textoLog.ToString();

                        using (Mail.MailSMTP sendMail = new Mail.MailSMTP())
                        {
                            sendMail.Send(mensaje);
                        }
                    }
                }*/

            }
            catch (Exception)
            {
                                
            }            
        }
    }
}