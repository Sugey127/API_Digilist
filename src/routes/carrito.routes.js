import { Router } from "express";
import carritoController from "../controllers/carrito.controller.js";

const carritoRouter = Router();
const carrito = new carritoController(); // crea una instancia de la clase

carritoRouter.get('/agregar-producto/:code_autoparte', (req, res) => {
    carrito.agregarProductos(req, res); // llama al método de la instancia de la clase
});

carritoRouter.get('/quitar-producto/:code_autoparte', (req, res) => {
    carrito.quitarItem(req, res); // llama al método de la instancia de la clase
});

carritoRouter.get('/listarCarrito', (req, res) => {
    carrito.mostrarCarro(req, res); // llama al método de la instancia de la clase
});

// carritoRouter.get('/agregar-producto/:external_code_autoparte', carritoController.cargarProductos);
// carritoRouter.get('/quitar-producto/:external_code_autoparte', carritoController.quitarItem);
// carritoRouter.get('/listarCarrito', carritoController.mostrarCarro);

export default carritoRouter;