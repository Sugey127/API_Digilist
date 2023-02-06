import { Router } from "express";
import * as proveedorController from "../controllers/proveedor.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const proveedorRouter = Router();

proveedorRouter.post('/registro',authentification,authorization, proveedorController.post); 
proveedorRouter.put('/actualizar',authentification,authorization, proveedorController.put); 
proveedorRouter.delete('/eliminar',authentification,authorization, proveedorController.drop); 
proveedorRouter.get('/buscarUno',authentification,authorization, proveedorController.getOne); 
proveedorRouter.get('/buscarTodos',authentification,authorization, proveedorController.getAll); 

export default proveedorRouter;