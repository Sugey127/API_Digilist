import { Router } from "express";
import * as envioController from "../controllers/envio.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const envioRouter = Router();

envioRouter.post('/registro',authentification, envioController.post); 
envioRouter.put('/actualizar',authentification, envioController.put); 
envioRouter.delete('/eliminar',authentification,authorization, envioController.drop); 
envioRouter.get('/buscarUno',authentification,authorization, envioController.getOne); 
envioRouter.get('/buscarTodos',authentification,authorization, envioController.getAll); 
export default envioRouter;