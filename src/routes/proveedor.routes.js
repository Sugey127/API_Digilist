import { Router } from "express";
import * as proveedorController from "../controllers/proveedor.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorProveedor, validadorProveedorActualizar } from "../validators/validateProveedor.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const proveedorRouter = Router();

proveedorRouter.post('/registro',validadorProveedor,validateReutilizable,authorization, proveedorController.post); 
proveedorRouter.put('/actualizar', validadorProveedorActualizar,validateReutilizable,authentification,authorization, proveedorController.put); 
//proveedorRouter.delete('/eliminar',authentification,authorization, proveedorController.drop); 
proveedorRouter.get('/buscarUno',authentification,authorization, proveedorController.getOne); 
proveedorRouter.get('/buscarTodos', proveedorController.getAll); 
proveedorRouter.get('/buscarActivo',authentification,authorization, proveedorController.getAllActivo);
proveedorRouter.get('/buscarInactivo',authentification,authorization, proveedorController.getAllInactivo);

export default proveedorRouter;