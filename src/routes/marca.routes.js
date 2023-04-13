import { Router } from "express";
import * as marcaController from "../controllers/marca.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutomovil, validadorAutomovilActualizar } from "../validators/validateAutomovil.js";
import { validadorMarca, validadorMarcaActualizar } from "../validators/validateMarca.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
 
const marcaRouter = Router();

marcaRouter.post('/registro',authorization,validadorMarca,validateReutilizable, marcaController.post); 
marcaRouter.put('/actualizar',authorization,validadorMarcaActualizar,validateReutilizable, marcaController.put);  
marcaRouter.get('/buscarUno', marcaController.getOne); 
marcaRouter.get('/buscarTodos', marcaController.getAll); 
marcaRouter.get('/buscarActivo', marcaController.getAllActivo);
marcaRouter.get('/buscarInactivo', marcaController.getAllInactivo);

export default marcaRouter;