import { Router } from "express";
import * as sugeyControladora from "../controllers/usuario.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validaCamposUsuario } from "../validators/validateUsuario.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";
import { subirImagen } from "../middlewares/subirImagen.js";
import { ImagenUsuario } from "../models/imagenUsuario.js";
import { Imagenes } from "../models/imagenes.js";
import path from 'path';
const usuarioRouter = Router();

usuarioRouter.post('/registro', validaCamposUsuario, validateReutilizable, subirImagen.single('avatar'),  sugeyControladora.registro);
usuarioRouter.put('/actualizar', authentification, sugeyControladora.put);
usuarioRouter.put('/cambiarPass', sugeyControladora.cambiarPass);
//usuarioRouter.delete('/eliminar', authentification, authorization, sugeyControladora.drop);
usuarioRouter.get('/buscarUno', authentification, authorization, sugeyControladora.getOne);
usuarioRouter.get('/buscarTodos', authentification, authorization, sugeyControladora.getAll);
usuarioRouter.post('/login', sugeyControladora.login);
usuarioRouter.get('/buscarActivo', sugeyControladora.getAllActivo);
usuarioRouter.get('/buscarInactivo', sugeyControladora.getAllInactivo);
usuarioRouter.get('/imagenes', subirImagen.single('imagen'));

export default usuarioRouter;