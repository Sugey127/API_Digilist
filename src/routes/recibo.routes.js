import { Router } from "express";
import * as reciboController from "../controllers/recibo.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorRecibo } from "../validators/validateRecibo.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const reciboRouter = Router();

reciboRouter.post('/registro',validadorRecibo,validateReutilizable,authentification, reciboController.post); 
// reciboRouter.put('/actualizar',authentification,authorization, reciboController.put); 
// reciboRouter.delete('/eliminar',authentification,authorization, reciboController.drop); 
reciboRouter.get('/buscarUno',authentification,authorization, reciboController.getOne); 
reciboRouter.get('/buscarTodos',authentification,authorization, reciboController.getAll); 

export default reciboRouter;