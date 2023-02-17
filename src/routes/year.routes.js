import { Router } from "express";
import * as yearsController from "../controllers/year.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";



export const yearsRouter = Router();

yearsRouter.post('/registro', yearsController.post); 
yearsRouter.put('/actualizar', yearsController.put);  
yearsRouter.get('/buscarUno', yearsController.getOne); 
yearsRouter.get('/buscarTodos', yearsController.getAll); 
yearsRouter.get('/buscarActivo', yearsController.getAllActivo);
yearsRouter.get('/buscarInactivo', yearsController.getAllInactivo);
