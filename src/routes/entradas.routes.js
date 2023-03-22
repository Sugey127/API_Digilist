import { Router } from "express";
import * as entradasController from "../controllers/entradas.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorEntrada, validadorEntradaActualizar } from "../validators/validateEntrada.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const entradasRouter = Router();  

entradasRouter.post('/registro',validadorEntrada,validateReutilizable, entradasController.post);
entradasRouter.put('/actualizar',validadorEntradaActualizar,validateReutilizable, authentification, authorization, entradasController.put);
//entradasRouter.delete('/eliminar', authentification, authorization, entradasController.drop);
entradasRouter.get('/buscarUno', authentification, entradasController.getOne);
entradasRouter.get('/buscarTodos', authentification, entradasController.getAll);
entradasRouter.get('/buscarActivo',authentification,authorization, entradasController.getAllActivo);
entradasRouter.get('/buscarInactivo',authentification,authorization, entradasController.getAllInactivo);

export default entradasRouter; 