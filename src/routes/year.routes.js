import { Router } from "express";
import * as yearsController from "../controllers/year.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorYear, validadorYearActualizar } from "../validators/validateYear.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";  
export const yearsRouter = Router();

yearsRouter.post('/registro',validadorYear,validateReutilizable, yearsController.post); 
yearsRouter.put('/actualizar',validadorYearActualizar,validateReutilizable,authentification, yearsController.put);  
yearsRouter.get('/buscarUno',authentification,authorization, yearsController.getOne); 
yearsRouter.get('/buscarTodos',authentification,authorization, yearsController.getAll); 
yearsRouter.get('/buscarActivo',authentification,authorization, yearsController.getAllActivo);
yearsRouter.get('/buscarInactivo',authentification,authorization, yearsController.getAllInactivo);
