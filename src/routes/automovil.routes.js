import { Router } from "express";
import * as automovilController from "../controllers/automovil.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const automovilRouter = Router();

automovilRouter.post('/registro',authentification,authorization, automovilController.post); 
automovilRouter.put('/actualizar',authentification,authorization, automovilController.put); 
automovilRouter.delete('/eliminar',authentification,authorization, automovilController.drop); 
automovilRouter.get('/buscarUno',authentification,authorization, automovilController.getOne); 
automovilRouter.get('/buscarTodos',authentification,authorization, automovilController.getAll); 

export default automovilRouter;