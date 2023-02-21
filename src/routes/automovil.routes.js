import { Router } from "express";
import * as automovilController from "../controllers/automovil.controller.js";
import { authentification } from "../middlewares/auth.js";
import { validadorAutomovil, validadorAutomovilActualizar } from "../validators/validateAutomovil.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const automovilRouter = Router();

automovilRouter.post('/registro',validadorAutomovil,validateReutilizable, automovilController.post);
automovilRouter.put('/actualizar',validadorAutomovilActualizar,validateReutilizable,authentification, automovilController.put);
//automovilRouter.delete('/eliminar', authentification, authorization, automovilController.drop);
automovilRouter.get('/buscarUno',authentification, automovilController.getOne);
automovilRouter.get('/buscarTodos',authentification, automovilController.getAll);
automovilRouter.get('/buscarActivo',authentification, automovilController.getAllActivo);
automovilRouter.get('/buscarInactivo',authentification, automovilController.getAllInactivo);

export default automovilRouter; 