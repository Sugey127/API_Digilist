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
        res.render('dashboard/proveedor');
    } catch (err) {
        res.render('404');
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
        res.render('dashboard/modelo');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/anio', async (req, res) => {
    try {
        res.render('dashboard/año');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/marca', async (req, res) => {
    try {
        res.render('dashboard/marca');
    } catch (err) {
        res.render('404');
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