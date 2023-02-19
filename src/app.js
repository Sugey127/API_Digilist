//aqui va la configuracion de la aplicacion
import express from 'express';
import dotevn from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/usuarios.routes.js';
import comentarioRouter from './routes/comentario.routes.js';
import reciboRouter from './routes/recibo.routes.js';
import entradasRouter from './routes/entradas.routes.js';
import statusRouter from './routes/status.routes.js';
import marcaRouter from './routes/marca.routes.js';
import modeloRouter from './routes/modelo.routes.js';
import autoparteRouter from './routes/autopartes.routes.js';
import proveedorRouter from './routes/proveedor.routes.js';
import ventaRouter from './routes/venta.routes.js';
import envioRouter from './routes/envio.routes.js';
import detalleVentaRouter from './routes/detalleVenta.routes.js';
import { yearsRouter } from './routes/year.routes.js';
import { Automovil } from './models/automovil.js';
import automovilRouter from './routes/automovil.routes.js';
import path from 'path';

dotevn.config({ path: './.env' });

// console.log(path.join(import.meta.url, '../uploads').split('file:\\').pop());

const app = express();
app.use('/imagenes', express.static(path.join(import.meta.url, '../uploads').split('file:\\').pop()));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use('/usuario', usuarioRouter);
app.use('/comentarios', comentarioRouter);
app.use('/recibos', reciboRouter);
app.use('/entradas', entradasRouter);
app.use('/status', statusRouter);
app.use('/marca', marcaRouter);
app.use('/modelo', modeloRouter);
app.use('/autopartes', autoparteRouter);
app.use('/proveedores', proveedorRouter);
app.use('/ventas', ventaRouter);
app.use('/envios', envioRouter);
app.use('/detalleVenta', detalleVentaRouter);
app.use('/year', yearsRouter);
app.use('/automovil', automovilRouter);
export default app; 