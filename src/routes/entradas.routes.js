import { Router } from "express";
import * as entradasController from "../controllers/entradas.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";

const entradasRouter = Router();

entradasRouter.post('/registro', authentification, authorization, entradasController.post);
entradasRouter.put('/actualizar', authentification, authorization, entradasController.put);
entradasRouter.delete('/eliminar', authentification, authorization, entradasController.drop);
entradasRouter.get('/buscarUno', authentification, entradasController.getOne);
entradasRouter.get('/buscarTodos', authentification, entradasController.getAll);

export default entradasRouter; 