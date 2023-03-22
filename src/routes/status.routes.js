import { Router } from "express";
import * as statusController from "../controllers/status.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutomovil, validadorAutomovilActualizar } from "../validators/validateAutomovil.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
  
const statusRouter = Router();

statusRouter.post('/registro', statusController.post); 
statusRouter.put('/actualizar', statusController.put);  
// statusRouter.get('/buscarUno', statusController.getOne); 
// statusRouter.get('/buscarTodos', statusController.getAll); 

export default statusRouter;