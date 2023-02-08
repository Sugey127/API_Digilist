import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validaCamposUsuario } from "../validators/validateUsuario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
const usuarioRouter = Router();


usuarioRouter.post('/registro', validaCamposUsuario, validateReutilizable, usuarioController.registro);
usuarioRouter.put('/actualizar', authentification, usuarioController.put);
usuarioRouter.delete('/eliminar', authentification, authorization, usuarioController.drop);
usuarioRouter.get('/buscarUno', authentification, authorization, usuarioController.getOne);
usuarioRouter.get('/buscarTodos', authentification, authorization, usuarioController.getAll);
usuarioRouter.post('/login', usuarioController.login);
export default usuarioRouter;
