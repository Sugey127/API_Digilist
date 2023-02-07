import { Router } from "express";
import * as ventaController from "../controllers/venta.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
import { validadorVenta, validadorVentaActualizar } from "../validators/validateVenta.js";

const ventaRouter = Router();

ventaRouter.post('/registro',validadorVenta,validateReutilizable,authentification, ventaController.post); 
ventaRouter.put('/actualizar',validadorVentaActualizar,validateReutilizable,authentification,authorization, ventaController.put); 
ventaRouter.delete('/eliminar',authentification,authorization, ventaController.drop); 
ventaRouter.get('/buscarUno',authentification,authorization, ventaController.getOne); 
ventaRouter.get('/buscarTodos',authentification,authorization, ventaController.getAll); 

export default ventaRouter;