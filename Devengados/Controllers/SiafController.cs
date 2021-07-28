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

        #region Vistas del Sistema

        public ActionResult ListaServicios()
        {
            try
            {
                BEUsuario objetoSesion = (BEUsuario)Session["UserSession"];
                if (objetoSesion == null)
                {
                    return RedirectToAction("Index","Login");
                }               
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }
            return View();
        }

        public ActionResult ListaCompras()
        {
            try
            {
                BEUsuario objetoSesion = (BEUsuario)Session["UserSession"];
                if (objetoSesion == null)
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }
            return View();
        }

        public ActionResult ListaContratos()
        {
            try
            {
                BEUsuario objetoSesion = (BEUsuario)Session["UserSession"];
                if (objetoSesion == null)
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }
            return View();
        }

        public ActionResult PendientesPorDevengar()
        {
            try
            {
                BEUsuario objetoSesion = (BEUsuario)Session["UserSession"];
                if (objetoSesion == null)
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }
            return View();
        }

        public ActionResult PendientesDevengados()
        {
            try
            {
                BEUsuario objetoSesion = (BEUsuario)Session["UserSession"];
                if (objetoSesion == null)
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
            }
            return View();
        }

        #endregion



        //CS : Codigo Servidor 
        //OS : Orden de Servicio
        public JsonResult CSListaExpedientesOS()
        {
            Object DataServicio = null;            
            
            try
            {                
                using (DAExpediente oDAExpediente= new DAExpediente())
                {
                    //1: Lista de Ordenes de servicio
                    DataServicio = oDAExpediente.ListaExpedientes(General.Connection.BD_SIAF,General.Procedure.sp_ListaServiciosyCompras,"1");
                    
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

        public JsonResult CSListaExpedientesOC()
        {
            Object DataCompra = null;

            try
            {
                using (DAExpediente oDAExpediente = new DAExpediente())
                {
                    //2: Lista de Ordenes de compra
                    DataCompra = oDAExpediente.ListaExpedientes(General.Connection.BD_SIAF, General.Procedure.sp_ListaServiciosyCompras, "2");

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSListaExpedientesOC", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataCompra }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CSObtenerExpediente(string idExp)
        {
            Object DataListaOrdenServ = null , DataListaEntregables = null, DataMontosOrden=null;            
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
                            DataListaEntregables = oDAEntregable.ListaEntregables(General.Connection.BD_SIAF,General.Procedure.sp_ListaEntregables,xIdOrden);
                        }
                        DataMontosOrden = oDAOrden.MontosOrdenxEntregables(General.Connection.BD_SIAF, General.Procedure.sp_MontosxOrden, xIdOrden);
                    }                                
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/CSObtenerExpediente", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataListaOrdenServ, DataListaEntregables, DataMontosOrden }, JsonRequestBehavior.AllowGet);
        }

        

     
        [HttpPost]
        public JsonResult RegistrarExpOrdenServicio(Dictionary<string, string> DataExpedienteOS) 
        {
            Object DataListaOrdenServ = null;
            Object DataListaEntregables = null;
            try
            {
                DAExpediente oDAExp = new DAExpediente();
                int intNuevoIdOrden= oDAExp.RegistrarExpediente( ref DataExpedienteOS, General.Connection.BD_SIAF, General.Procedure.sp_InsertarOrdenServicioEntreg);
                                
                int intIdExpediente =  Convert.ToInt32(DataExpedienteOS["idExpediente"]);
                DAOrden oDAOrden = new DAOrden();
                DataListaOrdenServ = oDAOrden.ListaOrden(General.Connection.BD_SIAF, General.Procedure.sp_ListaOrdenServicio, Convert.ToInt32(intIdExpediente));
                //Int32 cant = ((List<BEOrden>)DataListaOrdenServ).Count;                
                    
                using (DAEntregable oDAEntregable = new DAEntregable())
                {
                    DataListaEntregables = oDAEntregable.ListaEntregables(General.Connection.BD_SIAF, General.Procedure.sp_ListaEntregables, intNuevoIdOrden);
                }               


                return Json(new { Resultado = "1", ListaOrdenes = DataListaOrdenServ,ListaEntregables= DataListaEntregables });//1: ok
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "0", Mensaje = ex.Message });                
            }            
        }

        [HttpPost]
        public JsonResult ActualizarEntregable(Dictionary<string, string> DataEntregableOS)
        {
            Object DataMontosOrden = null, DataListaEntregables=null;                        
            try
            {
                int idOrden = Convert.ToInt32(DataEntregableOS["idOrden"]);                
                using (DAEntregable oDAEntreg = new DAEntregable()) 
                {
                    int rpta = oDAEntreg.ActualizarEntregable(ref DataEntregableOS, General.Connection.BD_SIAF, General.Procedure.sp_ActualizarEntregable);
                    DataListaEntregables = oDAEntreg.ListaEntregables(General.Connection.BD_SIAF, General.Procedure.sp_ListaEntregables, idOrden);
                }
                using (DAOrden oDA = new DAOrden())
                {                                     
                    DataMontosOrden = oDA.MontosOrdenxEntregables(General.Connection.BD_SIAF, General.Procedure.sp_MontosxOrden, idOrden);                    
                }
                return Json(new { Resultado = "1", DataConsolidadoEntregables = DataMontosOrden, ListaEntregables= DataListaEntregables });//ok
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "0", Mensaje = ex.Message });// error
            }
        }

        [HttpPost]
        public JsonResult ActualizarEntregableEstado(Dictionary<string, string> DataExpedienteOrden)
        {
            Object DataPendientesxDevengar = null;
            try
            {
                DAEntregable oDAEntreg = new DAEntregable();
                int rpta = oDAEntreg.ActualizarEntregableEstado(ref DataExpedienteOrden, General.Connection.BD_SIAF, General.Procedure.sp_ActualizarEntregableEstado);

                using (DAConsolidado oDAConsolidado = new DAConsolidado())
                {
                    DataPendientesxDevengar = oDAConsolidado.ListaPendientesxDevengar(General.Connection.BD_SIAF, General.Procedure.sp_ListaExpedPendixDeveng);
                }


                return Json(new { Resultado = "1", ListaPendientesxDevengar = DataPendientesxDevengar });//1: ok
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "0", Mensaje = ex.Message });//0:error

            }
        }


        [HttpPost]
        public JsonResult ActualizarEntregablePago(Dictionary<string, string> DataExpedienteOrden)
        {
            //PendientesDevengados = Pendientes de Pago
            Object DataPendientesDevengados = null;
            try
            {
                DAEntregable oDAEntreg = new DAEntregable();
                int rpta = oDAEntreg.ActualizarEntregablePago(ref DataExpedienteOrden, General.Connection.BD_SIAF, General.Procedure.sp_ActualizarEntregablePago);



                using (DAConsolidado oDAConsolidado = new DAConsolidado())
                {
                    DataPendientesDevengados = oDAConsolidado.ListaPendientesDevengados(General.Connection.BD_SIAF, General.Procedure.sp_ListaExpedPendiDevengados);

                }

                return Json(new { Resultado = "1", ListaPendientesDevengados = DataPendientesDevengados });//1: ok
            }
            catch (Exception ex)
            {
                return Json(new { Resultado = "0", Mensaje = ex.Message });//0:error

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
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaExpPendientesxDevengar", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataPendientesxDevengar }, JsonRequestBehavior.AllowGet);
        }



        public JsonResult ListaExpPendientesDevengados()
        {
            Object DataPendientesDevengados = null;

            try
            {
                using (DAConsolidado oDAConsolidado = new DAConsolidado())
                {
                    DataPendientesDevengados = oDAConsolidado.ListaPendientesDevengados(General.Connection.BD_SIAF, General.Procedure.sp_ListaExpedPendiDevengados);

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaExpPendientesDevengados", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataPendientesDevengados }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ListaExpedientesContratos()
        {//Contratos=lista de orden servicios + lista de orden compras
            Object DataContratos = null;

            try
            {
                using (DAExpediente oDAExpediente = new DAExpediente())
                {
                    // 3: Lista de COntratos
                    DataContratos = oDAExpediente.ListaExpedientes(General.Connection.BD_SIAF, General.Procedure.sp_ListaServiciosyCompras,"3");

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaExpedientesContratos", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataContratos }, JsonRequestBehavior.AllowGet);
        }



        public JsonResult ListaOficinas()
        {
            Object DataOficinas = null;

            try
            {
                using (DAOfcina oDAOficina = new DAOfcina())
                {
                    DataOficinas = oDAOficina.ListaOficinas(General.Connection.BD_SIAF, General.Procedure.sp_ListaOficinas);

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaOficinas", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataOficinas }, JsonRequestBehavior.AllowGet);
        }



        public JsonResult ListaEstadosxOficina(string IdOficina)
        {
            Object DataEstadosxOficina = null;

            try
            {
                using (DAEstado oDAEstado = new DAEstado())
                {
                    DataEstadosxOficina = oDAEstado.ListaEstadosxOficina(General.Connection.BD_SIAF, General.Procedure.sp_ListaEstadosxOficina, Convert.ToInt32(IdOficina));

                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaEstadosxOficina", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataEstadosxOficina }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListaTiposComprobantes()
        {
            Object DataTpComprobante = null;
            try
            {
                using (DAComprobante oDAComprobante = new DAComprobante())
                {
                    DataTpComprobante = oDAComprobante.ListaTiposComprobantes(General.Connection.BD_SIAF, General.Procedure.sp_ListaTiposComprobante);
                }
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/ListaTiposComprobantes", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
            }
            finally
            {

            }
            return Json(new { DataTpComprobante }, JsonRequestBehavior.AllowGet);
        }

        //EliminarEntregable

        [HttpPost]
        public JsonResult EliminarEntregable(string IdEntregable , string IdOrden)
        {            
            int intRespuesta = 0;
            Object DataListaEntregables = null;

            try
            {
                using (DAEntregable oDAEntregable = new DAEntregable())
                {
                    intRespuesta = oDAEntregable.EliminarEntregable(General.Connection.BD_SIAF, General.Procedure.sp_EliminarEntregable, Convert.ToInt32(IdEntregable));
                    DataListaEntregables = oDAEntregable.ListaEntregables(General.Connection.BD_SIAF, General.Procedure.sp_ListaEntregables, Convert.ToInt32( IdOrden));
                }
                
                return Json(new { Resultado = "1" , ListaEntregables = DataListaEntregables });//1: ok
            }
            catch (Exception objException)
            {
                ObjetoLog objLog = new ObjetoLog(NombreControladora + "/EliminarEntregable", objException.Message, objException.StackTrace);
                FileLogAlmacenar objFileLog = new FileLogAlmacenar();
                objFileLog.Grabar(objLog);
                //sRespuesta = "0";
                return Json(new { Resultado = "0" });//0: error
                //return Json(new { Resultado = "ERROR", Mensaje = ex.Message });
            }
            finally
            {

            }            

        }

    }
}