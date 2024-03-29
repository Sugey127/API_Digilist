import { Router } from "express";
import * as autoparteController from "../controllers/autoparte.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { subirImagen } from "../middlewares/subirImagen.js";
import { validadorAutoparte, validadorAutoparteActualizar } from "../validators/validateAutopartes.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";

const autoparteRouter = Router();

autoparteRouter.post('/registro',validadorAutoparte, validateReutilizable, subirImagen.array('autopartes', 10), autoparteController.post);
autoparteRouter.put('/actualizar', authorization, validadorAutoparteActualizar, validateReutilizable, authentification, authorization, autoparteController.put);
//autoparteRouter.delete('/eliminar', authentification, authorization, autoparteController.drop);
autoparteRouter.get('/buscarUno', authentification, authorization, autoparteController.getOne);
autoparteRouter.get('/buscarTodos', autoparteController.getAll);
autoparteRouter.get('/buscarActivo', autoparteController.getAllActivo);
autoparteRouter.get('/buscarInactivo', authentification, authorization, autoparteController.getAllInactivo);
autoparteRouter.put('/agregarImagenes/:code', authentification, authorization, subirImagen.array('autopartes', 10), autoparteController.agregarImagenAutoparte);
autoparteRouter.get('/busquedaFiltrado', autoparteController.busquedaFiltrado);


export default autoparteRouter; 
