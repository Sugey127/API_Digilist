import { Router } from "express";

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
        res.render('dashboard');
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

webRouter.get('/producto', async (req, res) => {
    try {
        res.render('dashboard/productos');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/proveedor', async (req, res) => {
    try {
        res.render('dashboard/proveedor');
    } catch (err) {
        res.render('404');
    }
});


webRouter.get('/dashboard-productos', async (req, res) => {
    try {

        const token = req.cookies.token;

        const productos = fetch('http://apidigilist-production.up.railway.app/autopartes/buscarTodos', {
            method: 'get',
            headers: {
                Authorization: token
            }
        }).then(res => res.json()).then(data => data);

        console.log(productos);

        res.render('dashboard/productos', {productos});
    } catch (err) {
        res.render('404');
    }
}); 