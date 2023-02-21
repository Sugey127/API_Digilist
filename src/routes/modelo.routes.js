import { Router } from "express";
import * as modeloController from "../controllers/modelo.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorModelo, validadorModeloActualizar } from "../validators/validateModelo.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const modeloRouter = Router();

modeloRouter.post('/registro',validadorModelo,validateReutilizable, modeloController.post); 
modeloRouter.put('/actualizar',validadorModeloActualizar,validateReutilizable,authentification, modeloController.put);  
modeloRouter.get('/buscarUno',authentification,authorization, modeloController.getOne); 
modeloRouter.get('/buscarTodos',authentification,authorization, modeloController.getAll); 
modeloRouter.get('/buscarActivo',authentification,authorization, modeloController.getAllActivo);
modeloRouter.get('/buscarInactivo',authentification,authorization, modeloController.getAllInactivo);

export default modeloRouter;