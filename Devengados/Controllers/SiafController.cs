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

        //CS : Codigo Servidor 
        //OS : Orden de Servicio
        public JsonResult CSListaExpedientesOS()
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
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSListaExpedientesOS", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {
                
            }
            return Json(new { DataServicio }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CSListaOrdenServicioxIdExp(string idExp)
        {
            Object DataListaOrdenServ = null;
            Object DataListaEntregables = null;

            try
            {
                using (DAOrden oDAOrden = new DAOrden())
                {
                   Int32 xIdOrden = 0;
                   DataListaOrdenServ = oDAOrden.ListaOrden(General.Connection.BD_SIAF, General.Procedure.sp_ListaOrdenServicio,Convert.ToInt32(idExp));
                   Int32 cant = ((List<BEOrden>)DataListaOrdenServ).Count;
                    if (cant > 0)
                    {
                        xIdOrden = ((List<BEOrden>)DataListaOrdenServ)[0].IdOrden;
                        using (DAEntregable oDAEntregable = new DAEntregable())
                        {
                            DataListaEntregables = oDAEntregable.ListaEntregables(General.Connection.BD_SIAF,General.Procedure.sp_ListaEntregables,21);
                        }
                    }
                    
                    /*foreach (var item in oLstOrden)
                    {
                        Int32 zzz = item.IdOrden;
                    }*/

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSListaOrdenServicioxIdExp", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataListaOrdenServ, DataListaEntregables }, JsonRequestBehavior.AllowGet);
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


     
        [HttpPost]
        public JsonResult RegistrarExpOrdenServicio(Dictionary<string, string> DataExpedienteOS) 
        {
            try
            {
                DAExpediente oDAExp = new DAExpediente();

                int rpta= oDAExp.RegistrarExpediente( ref DataExpedienteOS, General.Connection.BD_SIAF, General.Procedure.sp_InsertarOrdenServicioEntreg);
                

                return Json(new { Resultado = "OK", Usuario = DataExpedienteOS  });
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "ERROR", Mensaje = ex.Message });                
            }            
        }


        [HttpPost]
        public JsonResult ActualizarEntregable(Dictionary<string, string> DataEntregableOS)
        {
            try
            {
                DAEntregable oDAEntreg = new DAEntregable();

                int rpta = oDAEntreg.ActualizarEntregable(ref DataEntregableOS, General.Connection.BD_SIAF, General.Procedure.sp_ActualizarEntregable);


                return Json(new { Resultado = "OK", Usuario = DataEntregableOS });
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "ERROR", Mensaje = ex.Message });

            }
        }


        public JsonResult ListaExpPendientesxDevengar()
        {
            Object DataPendientesxDevengar = null;

            try
            {
                using (DAConsolidado oDAConsolidado = new DAConsolidado())
                {
                    DataPendientesxDevengar = oDAConsolidado.ListaPendientesxDevengar(General.Connection.BD_SIAF, General.Procedure.sp_ListaExpedPendixDeveng);

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSListaExpedientesOS", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataPendientesxDevengar }, JsonRequestBehavior.AllowGet);
        }



    }
}