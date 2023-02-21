import { Router } from "express";
import * as comentarioController from "../controllers/comentario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorComentario, validadorComentarioActualizar } from "../validators/validateComentario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const comentarioRouter = Router();

comentarioRouter.post('/registro',validadorComentario,validateReutilizable,authentification, comentarioController.post); 
comentarioRouter.put('/actualizar',validadorComentarioActualizar,validateReutilizable,authentification, comentarioController.put); 
//comentarioRouter.delete('/eliminar',authentification,authorization, comentarioController.drop); 
comentarioRouter.get('/buscarUno',authentification,authorization, comentarioController.getOne); 
comentarioRouter.get('/buscarTodos',authentification,authorization, comentarioController.getAll); 
comentarioRouter.get('/buscarActivo',authentification,authorization, comentarioController.getAllActivo);
comentarioRouter.get('/buscarInactivo',authentification,authorization, comentarioController.getAllInactivo);
export default comentarioRouter;