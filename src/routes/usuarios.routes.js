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

// userRouter.post('/login', userController.login);
// userRouter.delete('/deleteAccount', userController.deleteAccount);
// userRouter.put('/updateProfile', userController.updateProfile);
// userRouter.get('/userList', userController.userList);
// userRouter.get('/findUsersByName', userController.findUsersByName);
// userRouter.get('/findUserByEmail', userController.findUserByEmail);


export default usuarioRouter;

//http:localhost:4000/users/resgsiter