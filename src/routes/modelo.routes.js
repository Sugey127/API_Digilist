import { Router } from "express";
import * as modeloController from "../controllers/modelo.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorModelo, validadorModeloActualizar } from "../validators/validateModelo.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const modeloRouter = Router();

modeloRouter.post('/registro',validadorModelo,validateReutilizable, modeloController.post); 
modeloRouter.put('/actualizar',validadorModeloActualizar,validateReutilizable, modeloController.put);  
modeloRouter.get('/buscarUno', modeloController.getOne); 
modeloRouter.get('/buscarTodos', modeloController.getAll); 
modeloRouter.get('/buscarActivo', modeloController.getAllActivo);
modeloRouter.get('/buscarInactivo', modeloController.getAllInactivo);
modeloRouter.get('/buscarMarca',modeloController.getMarca);
modeloRouter.get('/buscarYear',modeloController.getYear);

export default modeloRouter;