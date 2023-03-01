import { Router } from "express";
import * as comentarioController from "../controllers/comentario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorComentario, validadorComentarioActualizar } from "../validators/validateComentario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const comentarioRouter = Router();

comentarioRouter.post('/registro',validadorComentario,validateReutilizable, comentarioController.post); 
comentarioRouter.put('/actualizar',validadorComentarioActualizar,validateReutilizable, comentarioController.put); 
//comentarioRouter.delete('/eliminar', comentarioController.drop); 
comentarioRouter.get('/buscarUno', comentarioController.getOne); 
comentarioRouter.get('/buscarTodos', comentarioController.getAll); 
comentarioRouter.get('/buscarActivo', comentarioController.getAllActivo);
comentarioRouter.get('/buscarInactivo', comentarioController.getAllInactivo);
export default comentarioRouter;