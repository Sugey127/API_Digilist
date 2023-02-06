import { Router } from "express";
import * as comentarioController from "../controllers/comentario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const comentarioRouter = Router();

comentarioRouter.post('/registro',authentification, comentarioController.post); 
comentarioRouter.put('/actualizar',authentification, comentarioController.put); 
comentarioRouter.delete('/eliminar',authentification,authorization, comentarioController.drop); 
comentarioRouter.get('/buscarUno',authentification,authorization, comentarioController.getOne); 
comentarioRouter.get('/buscarTodos',authentification,authorization, comentarioController.getAll); 

export default comentarioRouter;