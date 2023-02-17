import { Router } from "express";
import * as modeloController from "../controllers/modelo.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutomovil, validadorAutomovilActualizar } from "../validators/validateAutomovil.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const modeloRouter = Router();

modeloRouter.post('/registro', modeloController.post); 
modeloRouter.put('/actualizar', modeloController.put);  
modeloRouter.get('/buscarUno', modeloController.getOne); 
modeloRouter.get('/buscarTodos', modeloController.getAll); 
modeloRouter.get('/buscarActivo', modeloController.getAllActivo);
modeloRouter.get('/buscarInactivo', modeloController.getAllInactivo);

export default modeloRouter;