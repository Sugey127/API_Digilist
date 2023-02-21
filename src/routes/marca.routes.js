import { Router } from "express";
import * as marcaController from "../controllers/marca.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutomovil, validadorAutomovilActualizar } from "../validators/validateAutomovil.js";
import { validadorMarca, validadorMarcaActualizar } from "../validators/validateMarca.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
 
const marcaRouter = Router();

marcaRouter.post('/registro',validadorMarca,validateReutilizable, marcaController.post); 
marcaRouter.put('/actualizar',validadorMarcaActualizar,validateReutilizable,authentification, marcaController.put);  
marcaRouter.get('/buscarUno',authentification,authorization, marcaController.getOne); 
marcaRouter.get('/buscarTodos',authentification,authorization, marcaController.getAll); 
marcaRouter.get('/buscarActivo',authentification,authorization, marcaController.getAllActivo);
marcaRouter.get('/buscarInactivo',authentification,authorization, marcaController.getAllInactivo);

export default marcaRouter;