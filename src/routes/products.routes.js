import { Router } from "express";
import * as productController from '../controllers/products.controller.js';
import { authentification, authorization } from "../middlewares/auth.js";
const productRouter = Router();


productRouter.post('/agregarProducto',authentification,authorization, productController.addProduct);  
productRouter.delete('/eliminarProducto',authentification, authorization, productController.deleteProduct);
productRouter.put('/actualizarProducto',authentification,authorization, productController.updateProduct);
productRouter.get('/listaProducto',authentification,authorization, productController.productList);
productRouter.get('/buscarPorductoPorNombre',authentification,authorization, productController.findProductByName);
productRouter.get('/buscarProductoPorCodigo',authentification,authorization, productController.findProductBycode);

 //esto estaba mamtando el progama
export default productRouter; 