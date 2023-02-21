import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validaCamposUsuario, validaCamposUsuarioActualizar, validateCambioContraseña, validateLogin } from "../validators/validateUsuario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
import { subirImagen } from "../middlewares/subirImagen.js";
import { ImagenUsuarioPerfil } from "../models/imagenUsuarioPerfil.js";
import { ImagenUsuarioFondo } from "../models/imagenUsuarioFondo.js";
import path from 'path';
const usuarioRouter = Router();

usuarioRouter.post('/registro', validaCamposUsuario, validateReutilizable, subirImagen.single('avatar'),  usuarioController.registro);
usuarioRouter.put('/actualizar',validaCamposUsuarioActualizar,validateReutilizable, authentification, authorization, usuarioController.put);
usuarioRouter.put('/cambiarPass',validateCambioContraseña, validateReutilizable, usuarioController.cambiarPass);
//usuarioRouter.delete('/eliminar', authentification, authorization, usuarioController.drop);
usuarioRouter.get('/buscarUno', authentification, authorization, usuarioController.getOne);
usuarioRouter.get('/buscarTodos', authentification, authorization, usuarioController.getAll);
usuarioRouter.post('/login',validateLogin, validateReutilizable, usuarioController.login);
usuarioRouter.get('/buscarActivo', authentification, authorization, usuarioController.getAllActivo);
usuarioRouter.get('/buscarInactivo', authentification, authorization, usuarioController.getAllInactivo);
usuarioRouter.get('/imagenes', subirImagen.single('imagen'));

export default usuarioRouter;