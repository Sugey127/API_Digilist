import { Router } from "express";
import * as detalleVentaController from "../controllers/detalleVenta.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorDetalleVenta, validadorDetalleVentaActualizar } from "../validators/validateDetalleVenta.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const detalleVentaRouter = Router();

detalleVentaRouter.post('/registro',validadorDetalleVenta,validateReutilizable,authentification, detalleVentaController.post); 
detalleVentaRouter.put('/actualizar',validadorDetalleVentaActualizar,validateReutilizable,authentification, detalleVentaController.put); 
detalleVentaRouter.delete('/eliminar',authentification,authorization, detalleVentaController.drop); 
detalleVentaRouter.get('/buscarUno',authentification,authorization, detalleVentaController.getOne); 
detalleVentaRouter.get('/buscarTodos',authentification,authorization, detalleVentaController.getAll); 
export default detalleVentaRouter;