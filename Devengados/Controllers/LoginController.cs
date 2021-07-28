using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Devengados.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {            

            Session["UserSession"] = null;
            GeneralModels models = new GeneralModels();
            models.MensajeResult = "";
            models.iRecordCount = 0;
            return View(models);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Index(GeneralModels models)
        {
            try
            {
                if ( string.IsNullOrEmpty(models.strUsuario) || string.IsNullOrEmpty(models.strClave)  )
                {
                    models.MensajeResult = "Ingrese usuario y/o clave.";
                    return View(models);
                }
                else {
                    Object DataUsuario = null;
                    DAUsuario oDAUsuario = new DAUsuario();
                    DataUsuario = oDAUsuario.ListaUsuarios(General.Connection.BD_SIAF, General.Procedure.sp_ListaUsuarios, models.strUsuario, models.strClave);
                    Int32 cant = ((List<BEUsuario>)DataUsuario).Count;
                    if (cant == 1)
                    {
                        BEUsuario oBEUsuario = new BEUsuario();
                        oBEUsuario.ACCESO = ((List<BEUsuario>)DataUsuario)[0].ACCESO;
                        oBEUsuario.USUARIO = ((List<BEUsuario>)DataUsuario)[0].USUARIO;
                        oBEUsuario.CLAVE = ((List<BEUsuario>)DataUsuario)[0].CLAVE;
                        oBEUsuario.NOMBRE = ((List<BEUsuario>)DataUsuario)[0].NOMBRE;
                        oBEUsuario.ID_USUARIO= ((List<BEUsuario>)DataUsuario)[0].ID_USUARIO;

                        Session["UserSession"] = oBEUsuario;

                        if (oBEUsuario.ACCESO == "1")// primera vez que ingresa al sistema
                        {
                            return RedirectToAction("CambioClave", "Login");
                        }
                        else
                            return RedirectToAction("ListaServicios", "Siaf");
                    }
                    else
                    {
                        models.MensajeResult = "El usuario y/o clave son inválidos";
                        return View(models);
                    }
                }
            }
            catch (Exception objException)
            {

                ObjetoLog objLog = new ObjetoLog("LoginController" + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                return RedirectToAction("Index", "Login");
            }


            /*
            if (models != null)
            {
                if (string.IsNullOrEmpty(models.strCapcha) && models.iRecordCount > 2)
                    models.MensajeResult = "Por favor ingrese un código Captcha";

                else if (Session["genCCod"] == null && models.iRecordCount > 2)
                    models.MensajeResult = "Ocurrió un error al obtener el código Captcha. Por favor recargue la página.";

                else
                {

                    bool parsedFlag = false;
                    Boolean.TryParse(ConfigurationManager.AppSettings["ByPassCaptchaCode"], out parsedFlag);
                    //if (!parsedFlag && models.iRecordCount>2)
                    //{
                    if (String.Compare(models.strCapcha, (string)Session["genCCod"], StringComparison.OrdinalIgnoreCase) != 0 && models.iRecordCount > 2)
                    {
                        models.MensajeResult = "No coincide con el texto de la imagen.";

                    }
                    else
                    {
                        string mensaje = string.Empty;
                        bool autenticado = SiteSpecificAuthenticationMethod(models.strUsuario, models.strClave, ref mensaje);
                        //bool autenticado = true;

                        if (!(string.IsNullOrEmpty(mensaje)))
                            models.MensajeResult = mensaje;

                        models.MensajeResult = "El usuario y/o clave son inválidos";
                        models.Autentificado = autenticado;
                    }
                    //models.iRecordCount = models.iRecordCount + 1;
                }

                //}
            }*/

            //if (models.Autentificado)
            //{
            //    BEUsuario oBEUsuario = Session["UserSession"] as BEUsuario;
            //    if (oBEUsuario != null)
            //    {
            //        Session["nombreUsuario"] = string.Concat(oBEUsuario.NOMBRE, " ", oBEUsuario.APELLIDO_PATERNO, " ", oBEUsuario.APELLIDO_MATERNO);


            //    }                

            //    if (oBEUsuario != null)                
            //           return RedirectToAction("Index","Login");
            //    else
            //          return RedirectToAction("ListaServicios", "Siaf");


            //    //else
            //        //return View(models);
            //}
            //else
            //{
            //    models.iRecordCount = models.iRecordCount + 1;
            //    // models.MensajeResult = "El usuario y/o clave son inválidos";
            //    return View(models);
            //}

        }


        public ActionResult CambioClave()
        {
            GeneralModels models = new GeneralModels();
            BEUsuario oBEUsuario = Session["UserSession"] as BEUsuario;
            models.strUsuario = oBEUsuario.USUARIO;
            models.strClave = oBEUsuario.CLAVE;
            models.idUsuario = oBEUsuario.ID_USUARIO;                       
            models.MensajeResult = "";
            return View(models);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult CambioClave(GeneralModels models)
        {
            BEUsuario oBEUsuario = Session["UserSession"] as BEUsuario;
            models.idUsuario = oBEUsuario.ID_USUARIO;

            if (string.IsNullOrEmpty(models.strNuevaClave) || string.IsNullOrEmpty(models.strCopiaNuevaClave))
            {
                models.MensajeResult = "Ingrese la Nueva Contraseña, no deje en blanco los casilleros.";                
            }
            else if (models.strNuevaClave.Trim().Length < 8)
            {
                models.MensajeResult = "La nueva contraseña debe tener mas de 8 digitos.";
            }
            else if (models.strNuevaClave.Trim() == models.strClave.Trim())
            {
                models.MensajeResult = "La nueva contraseña no debe ser igual que la contraseña anterior.";
            }
            else if (models.strNuevaClave.Trim() != models.strCopiaNuevaClave.Trim())
            {
                models.MensajeResult = "La nueva contraseña no coincide con la repeticion de su nueva contraseña.";
            }
            else
            {
                DAUsuario oDAUsuario = new DAUsuario();
                int idResultado = oDAUsuario.ActualizarClave(General.Connection.BD_SIAF, General.Procedure.sp_ActualizarClave, models.idUsuario, models.strNuevaClave);
                if (idResultado==1)
                    return RedirectToAction("Index", "Login");
                else
                    return View(models);
            }

            return View(models);
        }



        [HttpPost]
        public JsonResult GenerarCaptcha()
        {
            string codigo, imagenBase64;

            #region GenerarCapcha

            StringBuilder sb = new StringBuilder();
            Random oAzar = new Random();

            for (int i = 0; i < 4; i++)
            {
                sb.Append((char)(oAzar.Next(0, 26) + 65));
            }
            Bitmap bmp = new Bitmap(200, 80, PixelFormat.Format32bppArgb);
            Graphics grafico = Graphics.FromImage(bmp);
            grafico.SmoothingMode = SmoothingMode.Default;
            Rectangle rect = new Rectangle(0, 0, 200, 80);
            HatchBrush oHatchBrush = new HatchBrush(HatchStyle.Divot, Color.DimGray, Color.White);
            grafico.FillRectangle(oHatchBrush, rect);
            SizeF size;
            float fontSize = rect.Height + 5;
            Font font;

            do
            {
                fontSize--;
                font = new Font(FontFamily.GenericSansSerif, fontSize, FontStyle.Bold);
                size = grafico.MeasureString(sb.ToString(), font);
            } while (size.Width > rect.Width);

            grafico.DrawString(sb.ToString(), font, Brushes.DarkGreen, 0, 5);

            Point punto1;
            Point punto2;
            //for (int i = 0; i < 5; i++)
            //{
            //    punto1 = new Point(oAzar.Next(200), oAzar.Next(80));
            //    punto2 = new Point(oAzar.Next(200), oAzar.Next(80));
            //    grafico.DrawLine(new Pen(Brushes.White, 5), punto1, punto2);
            //}
            codigo = sb.ToString();
            using (MemoryStream ms = new MemoryStream())
            {
                bmp.Save(ms, ImageFormat.Png);
                imagenBase64 = Convert.ToBase64String(ms.ToArray());
            }
            font.Dispose();
            oHatchBrush.Dispose();
            grafico.Dispose();

            #endregion

            Session["genCCod"] = codigo;

            return Json(imagenBase64, JsonRequestBehavior.AllowGet);
        }



        public bool SiteSpecificAuthenticationMethod(string userName, string password, ref string sMensaje)
        {
            BEUsuario oBEUsuario = new BEUsuario();
            oBEUsuario.USUARIO = userName;
            oBEUsuario.CONTRASENA = password;
            oBEUsuario.id_aplicacion = 1;
            oBEUsuario.Autenticado = false;

            try
            {

                // Consultar  con  el usuario y psw a una bd o al active directory o a un web service para validar el usuario 


                #region "AutentificarUsuario"
                BEUsuario objetoBEUsuario = new BEUsuario()
                {
                    ID_USUARIO = 1,
                    id_aplicacion = 1,
                    USUARIO = "OTI13",
                    NOMBRE = "Angel Rios",
                    CONTRASENA = "limaperu",
                    Autenticado = true                                        
                };

                Session["UserSession"] = oBEUsuario;


                #endregion


                //oBEUsuario = new BLUsuario().AutentificarUsuario(oBEUsuario);
                //#region "AutentificarUsuario"
                //List<BEPermiso> lstBEPermiso = new List<BEPermiso>();
                //lstBEPermiso.Add(new BEPermiso() { PERMISO_ID = 1, PERMISO = "Modifica", ROL = "Administrador" });
                //lstBEPermiso.Add(new BEPermiso() { PERMISO_ID = 2, PERMISO = "Registra", ROL = "Administrador" });
                //lstBEPermiso.Add(new BEPermiso() { PERMISO_ID = 3, PERMISO = "Consulta", ROL = "Administrador" });

                //List<BERecurso> lstBERecurso = new List<BERecurso>();
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 1, ID_RECURSO_PARENT = 0, ORDEN = 1, TITULO = "Configuración" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 2, ID_RECURSO_PARENT = 0, ORDEN = 2, TITULO = "Atención Ciudadano" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 3, ID_RECURSO_PARENT = 1, ORDEN = 1, TITULO = "Administrar Usuario", PAGINA = "AdminUsuario", URLMENU = "Index", AREA = "Configuracion" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 4, ID_RECURSO_PARENT = 1, ORDEN = 2, TITULO = "Administrar Sede", PAGINA = "AdminSede", URLMENU = "Index", AREA = "Configuracion" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 5, ID_RECURSO_PARENT = 1, ORDEN = 3, TITULO = "Administrar Entidad", PAGINA = "AdminEntidad", URLMENU = "Index", AREA = "Configuracion" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 6, ID_RECURSO_PARENT = 2, ORDEN = 1, TITULO = "Identificación Ciudadano", PAGINA = "AtenderCiudadano", URLMENU = "Index", AREA = "AtencionCiudadano" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 7, ID_RECURSO_PARENT = 1, ORDEN = 4, TITULO = "Administrar Servicio", PAGINA = "AdminServicio", URLMENU = "Index", AREA = "Configuracion" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 8, ID_RECURSO_PARENT = 0, ORDEN = 1, TITULO = "Generar Reportes" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 9, ID_RECURSO_PARENT = 8, ORDEN = 1, TITULO = "Reportes Atención de Mensual y Anual", PAGINA = "ReportesAtencion", URLMENU = "Index", AREA = "Reportes" });
                //lstBERecurso.Add(new BERecurso() { ID_RECURSO = 9, ID_RECURSO_PARENT = 8, ORDEN = 2, TITULO = "Reportes Atención por Entidad", PAGINA = "ReportesAtencion", URLMENU = "Entidad", AREA = "Reportes" });
                ////lstBERecurso.Add(new BERecurso() { RECURSO_ID = 10, RECURSO_PARENT_ID = 1, ORDEN = 5, TITULO = "Prueba combo multiple", PAGINA = "Prueba", UrlMenu = "Index", AREA = "Configuracion" });


                

                Session["UserSession"] = oBEUsuario;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return oBEUsuario.Autenticado;
        }


    }
}