import { Router } from "express";
import * as autoparteController from "../controllers/autoparte.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorAutoparte, validadorAutoparteActualizar } from "../validators/validateAutopartes.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const autoparteRouter = Router();

autoparteRouter.post('/registro',validadorAutoparte,validateReutilizable, authorization, autoparteController.post);
autoparteRouter.put('/actualizar', validadorAutoparteActualizar, validateReutilizable, authentification, authorization, autoparteController.put);
//autoparteRouter.delete('/eliminar', authentification, authorization, autoparteController.drop);
autoparteRouter.get('/buscarUno', authentification,authorization, autoparteController.getOne);
autoparteRouter.get('/buscarTodos', authentification,authorization, autoparteController.getAll);
autoparteRouter.get('/buscarActivo', authentification,authorization, autoparteController.getAllActivo);
autoparteRouter.get('/buscarInactivo', authentification,authorization, autoparteController.getAllInactivo);

export default autoparteRouter; 