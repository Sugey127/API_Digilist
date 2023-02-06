//aqui va la configuracion de la aplicacion
import express from 'express';
import { Sequelize } from "sequelize";
import dotevn from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/usuarios.routes.js';
import comentarioRouter from './routes/comentario.routes.js';
import reciboRouter from './routes/recibo.routes.js';
import entradasRouter from './routes/entradas.routes.js';
import automovilRouter from './routes/automovil.routes.js';
import autoparteRouter from './routes/autopartes.routes.js';
import proveedorRouter from './routes/proveedor.routes.js';
import ventaRouter from './routes/venta.routes.js';
import { authentification } from './middlewares/auth.js';
import envioRouter from './routes/envio.routes.js';
import detalleVenta from './routes/detalleVenta.routes.js';

dotevn.config({path: './.env'});

const app = express();

app.use(cors())
app.use(express.json());
app.use('/usuario', usuarioRouter); 
app.use('/comentarios', comentarioRouter);
app.use('/recibos', reciboRouter);
app.use('/entradas', entradasRouter);
app.use('/automoviles', automovilRouter);
app.use('/autopartes', autoparteRouter);
app.use('/proveedores', proveedorRouter); 
app.use('/ventas', ventaRouter);
app.use('/envios',envioRouter);
app.use('/detalleVenta', detalleVenta);

export default app;