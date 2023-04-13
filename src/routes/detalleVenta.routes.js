import { Router } from "express";
import * as detalleVentaController from "../controllers/detalleVenta.controller.js";
import { authentification, authorization } from "../middlewares/auth.js";
import { validadorDetalleVenta, validadorDetalleVentaActualizar } from "../validators/validateDetalleVenta.js";
import { validateReutilizable } from "../validators/validateReutilizable.js";


const detalleVentaRouter = Router();

detalleVentaRouter.post('/registro',validadorDetalleVenta,validateReutilizable,authentification, detalleVentaController.AgregarCarrito); 
detalleVentaRouter.put('/actualizar',validadorDetalleVentaActualizar,validateReutilizable,authentification, detalleVentaController.put); 
detalleVentaRouter.delete('/eliminar',authentification,authorization, detalleVentaController.eliminarProductoCarritoTodo); 
detalleVentaRouter.put('/eliminar-unoPorUno',authentification,authorization, detalleVentaController.eliminarProductoCarritoUno); 
detalleVentaRouter.get('/buscarUno',authentification,authorization, detalleVentaController.getOne); 
detalleVentaRouter.get('/buscarTodos',authentification,authorization, detalleVentaController.getAll); 
detalleVentaRouter.get('/buscarActivo',authentification,authorization, detalleVentaController.getAllActivo);
detalleVentaRouter.get('/buscarInactivo',authentification,authorization, detalleVentaController.getAllInactivo);
export default detalleVentaRouter;