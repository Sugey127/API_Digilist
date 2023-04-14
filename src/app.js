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
import path from 'path';
import { webRouter } from '../web/routes.js';
import cookieParser from 'cookie-parser';
import paymentRouter from './routes/payment.routes.js';
import carritoRouter from './routes/carrito.routes.js';
import session from "express-session";
dotevn.config({ path: './.env' });

const app = express();

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
  }));

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use('/imagenes', express.static(path.join(import.meta.url, '../uploads').split('file:\\').pop()));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/', express.static('./public'));
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
app.use('/pagos', paymentRouter);
app.use('/detalleVenta', detalleVentaRouter);
app.use('/year', yearsRouter);
app.use('/digilist', webRouter);
app.use('/carrito', carritoRouter);

app.use((req, res, next) => res.status(404).render('404'));
//app.use(express.static(dirección de la carpeta publica'));
export default app;

// // "aloh".split('').reverse().forEach(x => console.log(x));
// ["a", "l", "o", "h"].reverse().forEach(x => console.log(x));

// const b ="b" + "a" +  + "a" + "a";
// console.log(b.toLowerCase());
// const b ="b" + "a" +  + "a" + "a";
// console.log(b.toLowerCase());