import { Router } from "express";
import * as autoparteController from "../controllers/autoparte.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutoparte, validadorAutoparteActualizar } from "../validators/validateAutopartes.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const autoparteRouter = Router();

autoparteRouter.post('/registro',validadorAutoparte,validateReutilizable,authentification,authorization, autoparteController.post); 
autoparteRouter.put('/actualizar',validadorAutoparteActualizar,validateReutilizable,authentification,authorization, autoparteController.put); 
autoparteRouter.delete('/eliminar',authentification,authorization, autoparteController.drop); 
autoparteRouter.get('/buscarUno',authentification, autoparteController.getOne); 
autoparteRouter.get('/buscarTodos',authentification, autoparteController.getAll); 

export default autoparteRouter;