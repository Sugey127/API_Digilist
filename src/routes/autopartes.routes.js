import { Router } from "express";
import * as autoparteController from "../controllers/autoparte.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { subirImagen, subirImagenAutoparte } from "../middlewares/subirImagen.js";
import { validadorAutoparte, validadorAutoparteActualizar } from "../validators/validateAutopartes.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const autoparteRouter = Router();

autoparteRouter.post('/registro', validadorAutoparte, validateReutilizable, authorization, autoparteController.post);
autoparteRouter.put('/actualizar', validadorAutoparteActualizar, validateReutilizable, authentification, authorization, autoparteController.put);
//autoparteRouter.delete('/eliminar', authentification, authorization, autoparteController.drop);
autoparteRouter.get('/buscarUno', authentification, authorization, autoparteController.getOne);
autoparteRouter.get('/buscarTodos', autoparteController.getAll);
autoparteRouter.get('/buscarActivo', authentification, authorization, autoparteController.getAllActivo);
autoparteRouter.get('/buscarInactivo', authentification, authorization, autoparteController.getAllInactivo);
autoparteRouter.put('/agregarImagenes/:code', authentification, authorization, subirImagenAutoparte.array('autopartes', 10), autoparteController.agregarImagenAutoparte);

export default autoparteRouter; 