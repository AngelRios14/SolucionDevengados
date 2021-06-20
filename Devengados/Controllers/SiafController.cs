using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Devengados.Controllers
{
    public class SiafController : Controller
    {
        // GET: Siaf
        private string NombreControladora = "Siaf";
        

        public ActionResult ListaServicios()
        {            
            try
            {

            }
            catch (Exception objException)
            {

                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }

            return View();
        }


        public JsonResult CSListaOrdenesServicio()
        {
            Object DataServicio = null;            
            
            try
            {                
                using (DAExpediente oDAExpediente= new DAExpediente())
                {
                    DataServicio = oDAExpediente.ListaExpedientes(General.Connection.BD_SIAF,General.Procedure.sp_ListaServicios);
                    
                }                
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSListaOrdenesServicio", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {
                
            }
            return Json(new { DataServicio }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ListaCompras()
        {
            return View();
        }


        public ActionResult ListaContratos()
        {
            return View();
        }


        public ActionResult PendientesPorDevengar()
        {
            return View();
        }

        public ActionResult PendientesDevengados()
        {
            return View();
        }


    }
}