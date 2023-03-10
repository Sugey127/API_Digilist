import { Router } from "express";
import { Marca } from "../src/models/marca.js";
import { Modelo } from "../src/models/modelo.js";
import { Proveedor } from "../src/models/proveedor.js";
import { Years } from "../src/models/years.js";

export const webRouter = Router();

webRouter.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/home', async (req, res) => {

    try {
        res.render('home');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard/main');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/automovil', async (req, res) => {
    try {
        res.render('dashboard/automovil');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/productos', async (req, res) => {
    try {
        res.render('dashboard/productos');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/recibos', async (req, res) => {
    try {
        res.render('dashboard/recibos');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/proveedor', async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();
        res.render('dashboard/proveedor', { proveedores });
    } catch (err) {
        res.render('404');
    }
});

//consumo post

webRouter.get('/web-registro-proveedor', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId=1;
        await Proveedor.create(req.query);
        res.redirect('http://apidigilist-production.up.railway.app/digilist/proveedor')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});



webRouter.get('/usuarios', async (req, res) => {
    try {
        res.render('dashboard/usuarios');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/entradas', async (req, res) => {
    try {
        res.render('dashboard/entradas');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/envios', async (req, res) => {
    try {
        res.render('dashboard/envios');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/detalleventa', async (req, res) => {
    try {
        res.render('dashboard/detalleventa');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/modelo', async (req, res) => {
    try {
        const modelos = await Modelo.findAll() ;
        const anios = await Years.findAll() ;
        const marcas = await Marca.findAll();
        res.render('dashboard/modelo', {modelos, anios, marcas});
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-modelo', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId=1;
        await Modelo.create(req.query);
        res.redirect('http://localhost:4000/digilist/modelo')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/anio', async (req, res) => {
    try {
        const anios = await Years.findAll();
        res.render('dashboard/anio', {anios});
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-anio', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId=1;
        await Years.create(req.query);
        res.redirect('http://apidigilist-production.up.railway.app/digilist/anio')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/marca', async (req, res) => {
    try {
        const marcas = await Marca.findAll();
        res.render('dashboard/marca', { marcas });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-marca', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId=1;
        await Marca.create(req.query);
        res.redirect('http://apidigilist-production.up.railway.app/digilist/marca')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/venta', async (req, res) => {
    try {
        res.render('dashboard/venta');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-productos', async (req, res) => {
    try {
        const token = req.cookies.token;
        const productos = fetch('https://apidigilist-production.up.railway.app/autopartes/buscarTodos', {
            method: 'get',
            headers: {
                Authorization: token
            }
        }).then(res => res.json()).then(data => data);
        console.log(productos);
        res.render('dashboard/productos', { productos });
    } catch (err) {
        res.render('404');
    }
});

//cruds usuarios 

webRouter.get('/dashboard-put-usuarios', async (req, res) => {
    try {
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-delete-usuarios', async (req, res) => {
    try {

    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-post-usuarios', async (req, res) => {
    try {

    } catch (err) {
        res.render('404');
    }
});

//cruds usuarios 

webRouter.get('/dashboard-update-utopartes', async (req, res) => {
    try {

    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-delete-autopartes', async (req, res) => {
    try {

    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-post-autopartes', async (req, res) => {
    try {

    } catch (err) {
        res.render('404');
    }
}); 