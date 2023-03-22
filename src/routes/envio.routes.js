import { Router } from "express";
import * as envioController from "../controllers/envio.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorEnvio, validadorEnvioActualizar } from "../validators/validateEnvio.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const envioRouter = Router();

envioRouter.post('/registro',validadorEnvio,validateReutilizable,authentification, envioController.post); 
envioRouter.put('/actualizar',validadorEnvioActualizar,validateReutilizable,authentification, envioController.put); 
//envioRouter.delete('/eliminar',authentification,authorization, envioController.drop); 
envioRouter.get('/buscarUno',authentification,authorization, envioController.getOne); 
envioRouter.get('/buscarTodos',authentification,authorization, envioController.getAll); 
envioRouter.get('/buscarActivo',authentification,authorization, envioController.getAllActivo);
envioRouter.get('/buscarInactivo',authentification,authorization, envioController.getAllInactivo);

export default envioRouter;