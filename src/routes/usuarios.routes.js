import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validaCamposUsuario, validaCamposUsuarioActualizar, validateCambioContraseña, validateLogin } from "../validators/validateUsuario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
import { subirImagen } from "../middlewares/subirImagen.js";
import path from 'path';

import { Usuario } from "../models/usuario.js";
import { Imagenes } from "../models/avatares.js";
import { forgotPassword } from "../middlewares/emailAuth.js";
const usuarioRouter = Router();

usuarioRouter.post('/registro', validaCamposUsuario, validateReutilizable, usuarioController.registro);
usuarioRouter.put('/actualizar', validaCamposUsuarioActualizar, validateReutilizable, authentification, usuarioController.put);
usuarioRouter.put('/cambiarPass', validateCambioContraseña, validateReutilizable, usuarioController.cambiarPass);
//usuarioRouter.delete('/eliminar', authentification, authorization, usuarioController.drop);
usuarioRouter.get('/buscarUno', usuarioController.getOne);
usuarioRouter.get('/buscarTodos', usuarioController.getAll);
usuarioRouter.post('/login', validateLogin, validateReutilizable, usuarioController.login);
usuarioRouter.get('/buscarActivo', usuarioController.getAllActivo);
usuarioRouter.get('/buscarInactivo', usuarioController.getAllInactivo);
usuarioRouter.post('/olvidarContraseña',forgotPassword);
usuarioRouter.put('/verificarContraseña/:codigo', usuarioController.cambiarContrasena);
usuarioRouter.put('/cambiar-foto-perfil', subirImagen.single('perfil'),
 usuarioController.updatePerfil);

// usuarioRouter.post('/cambiar-imagen-fondo',authentification, subirImagen.single('fondo'), usuarioController.rendiImagenFondo);


export default usuarioRouter;