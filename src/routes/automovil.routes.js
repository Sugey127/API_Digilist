import { Router } from "express";
import * as automovilController from "../controllers/automovil.controller.js";

const automovilRouter = Router();

automovilRouter.post('/registro', automovilController.post);
automovilRouter.put('/actualizar', automovilController.put);
//automovilRouter.delete('/eliminar', authentification, authorization, automovilController.drop);
automovilRouter.get('/buscarUno', automovilController.getOne);
automovilRouter.get('/buscarTodos', automovilController.getAll);
automovilRouter.get('/buscarActivo', automovilController.getAllActivo);
automovilRouter.get('/buscarInactivo', automovilController.getAllInactivo);

export default automovilRouter; 