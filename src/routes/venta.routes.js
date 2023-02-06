import { Router } from "express";
import * as ventaController from "../controllers/venta.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const ventaRouter = Router();

ventaRouter.post('/registro',authentification, ventaController.post); 
ventaRouter.put('/actualizar',authentification,authorization, ventaController.put); 
ventaRouter.delete('/eliminar',authentification,authorization, ventaController.drop); 
ventaRouter.get('/buscarUno',authentification,authorization, ventaController.getOne); 
ventaRouter.get('/buscarTodos',authentification,authorization, ventaController.getAll); 
export default ventaRouter;