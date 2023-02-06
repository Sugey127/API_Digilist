import { Router } from "express";
import * as detalleVentaController from "../controllers/detalleVenta.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const detalleVentaRouter = Router();

detalleVentaRouter.post('/registro',authentification, detalleVentaController.post); 
detalleVentaRouter.put('/actualizar',authentification, detalleVentaController.put); 
detalleVentaRouter.delete('/eliminar',authentification,authorization, detalleVentaController.drop); 
detalleVentaRouter.get('/buscarUno',authentification,authorization, detalleVentaController.getOne); 
detalleVentaRouter.get('/buscarTodos',authentification,authorization, detalleVentaController.getAll); 
export default detalleVentaRouter;