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



        res.render('dashboard/main');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/dashboard-productos', async (req, res) => {
    try {

        const token = req.cookies.token;

        const productos = fetch('http://localhost:4000/autopartes/buscarTodos', {
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