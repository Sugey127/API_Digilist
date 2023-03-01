import { Router } from "express";
import * as yearsController from "../controllers/year.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorYear, validadorYearActualizar } from "../validators/validateYear.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";  
export const yearsRouter = Router();

yearsRouter.post('/registro',validadorYear,validateReutilizable, yearsController.post); 
yearsRouter.put('/actualizar',validadorYearActualizar,validateReutilizable, yearsController.put);  
yearsRouter.get('/buscarUno', yearsController.getOne); 
yearsRouter.get('/buscarTodos', yearsController.getAll); 
yearsRouter.get('/buscarActivo', yearsController.getAllActivo);
yearsRouter.get('/buscarInactivo', yearsController.getAllInactivo);
