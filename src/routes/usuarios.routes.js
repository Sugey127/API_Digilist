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

usuarioRouter.post('/registro',authentification, validaCamposUsuario, validateReutilizable, usuarioController.registro);
usuarioRouter.put('/actualizar',authentification, validaCamposUsuarioActualizar, validateReutilizable, authentification, usuarioController.put);
usuarioRouter.put('/cambiarPass',authentification, validateCambioContraseña, validateReutilizable, usuarioController.cambiarPass);
//usuarioRouter.delete('/eliminar', authentification, authorization, usuarioController.drop);
usuarioRouter.get('/buscarUno',authentification, usuarioController.getOne);
usuarioRouter.get('/buscarTodos',authentification, usuarioController.getAll);
usuarioRouter.post('/login',authentification, validateLogin, validateReutilizable, usuarioController.login);
usuarioRouter.get('/buscarActivo',authentification, usuarioController.getAllActivo);
usuarioRouter.get('/buscarInactivo',authentification, usuarioController.getAllInactivo);
usuarioRouter.post('/olvidarContraseña',authentification, forgotPassword);
usuarioRouter.put('/verificarContraseña/:codigo',authentification, usuarioController.cambiarContrasena);
usuarioRouter.put('/cambiar-foto-perfil', subirImagen.single('perfil'),
 usuarioController.updatePerfil);

// usuarioRouter.post('/cambiar-imagen-fondo',authentification, subirImagen.single('fondo'), usuarioController.rendiImagenFondo);


export default usuarioRouter;