import { Router } from "express";
import { Marca } from "../src/models/marca.js";
import { Modelo } from "../src/models/modelo.js";
import { Proveedor } from "../src/models/proveedor.js";
import { Years } from "../src/models/years.js";
import { Autopartes } from "../src/models/autopartes.js";
import { Usuario } from "../src/models/usuario.js";
import { DetalleVenta } from "../src/models/detalleVenta.js";
import { Entradas } from "../src/models/entradas.js";
import { Envio } from "../src/models/envio.js";
import { Recibo } from "../src/models/recibo.js";
import { Venta } from "../src/models/venta.js";
import { Op } from "sequelize";
import fetch from 'node-fetch'


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

webRouter.get('/login-verificar', async (req, res) => {
    try {
        const { email, password } = req.query;
        console.log(email, password);
        const usuarioValido = await Usuario.findOne({ where: { [Op.and]: [{ password }, { email }] } });
        console.log(usuarioValido);
        if (!usuarioValido) {
            console.log('no valido');
            throw new Error('Esta cuenta no existe');
        } else {
            const data = await fetch('https://digilist.fly.dev/usuario/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    email, password
                })
            }).then(res => res.json());
            const token = data[0];
            res.cookie('token', token, {
                maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true
            });

            res.redirect('https://digilist.fly.dev/digilist/dashboard');
        }
    } catch (err) {
        res.render('401');
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

// webRouter.get('/automovil', async (req, res) => {
//     try {
//         const automoviles = await Automovil.findAll({ where: { StatusId: 1 } });
//         const anios = await Years.findAll({ where: { StatusId: 1 } });
//         const marcas = await Marca.findAll({ where: { StatusId: 1 } });
//         const modelos = await Modelo.findAll({ where: { StatusId: 1 } });
//         res.render('dashboard/automovil', { automoviles, anios, marcas, modelos });
//     } catch (err) {
//         res.render('404');
//     }
// });

// webRouter.get('/web-registro-automovil', async (req, res) => {
//     try {
//         console.log(req.query);
//         req.query.StatusId = 1;
//         await Automovil.create(req.query);
//         res.redirect('https://digilist.fly.dev/digilist/automovil')
//     } catch (err) {
//         // res.render('404');
//         res.status(403).json(err);
//     }
// });

//consumo put

// webRouter.get('/web-eliminar-automovil', async (req, res) => {
//     try {
//         console.log(req.query);
//         console.log('HOLA COMO ESTA', req.query.codeAuto);
//         const automovill = await Automovil.update({ StatusId: 2 }, { where: { codeAuto: req.query.codeAuto } });

//         res.redirect('https://digilist.fly.dev/digilist/automovil');

//     } catch (err) {
//         // res.render('404');
//         res.status(403).json(err);
//     }
// });

webRouter.get('/productos', async (req, res) => {
    try {
        const autopartes = await Autopartes.findAll({ where: { StatusId: 1 } });
        const codeEn = await Entradas.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/productos', { autopartes, codeEn });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-productos', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Autopartes.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/productos')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-productos', async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const autopartes = await Autopartes.update({ StatusId: 2 }, { where: { code_autoparte: req.query.code_autoparte } });

        res.redirect('https://digilist.fly.dev/digilist/productos');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/recibos', async (req, res) => {
    try {
        res.render('dashboard/recibos');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-recibos', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Recibo.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/recibos')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});
webRouter.get('/proveedor', async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/proveedor', { proveedores });
    } catch (err) {
        res.render('404');
    }
});

//consumo post

webRouter.get('/web-registro-proveedor', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Proveedor.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/proveedor')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-proveedor', async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const preoveedor = await Proveedor.update({ StatusId: 2 }, { where: { RfcProveedor: req.query.RfcProveedor } });

        res.redirect('https://digilist.fly.dev/digilist/proveedor');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { [Op.and]: [{ role: "administrador" }, { StatusId: 1 }] } });
        res.render('dashboard/usuarios', { usuarios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-usuarios', async (req, res) => {
    try {
        req.query.StatusId = 1;
        req.query.role = 'administrador'
        console.log(JSON.stringify(req.query));
        const respuesta = await fetch('https://digilist.fly.dev/usuario/pre-registroAdmin', {
            method: 'post',
            headers: {
                Authorization: req.cookies.token,
                'Content-Type': 'application/json'
            }, body: JSON.stringify(req.query)
        });
        console.log(respuesta.ok)
        // console.log(data)
        // const token = data[0];
        
        // res.cookie('token', token, {
        //     maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true
        // });

        if(respuesta.ok) {
            res.redirect('https://digilist.fly.dev/digilist/usuarios')    
        } else {
            res.status(500).render('500');
        }
    
    } catch (err) {
        console.log(err);
        res.status(500).render('500')
    }
});

webRouter.get('/web-VerificarCode-usuario', async (req, res) => {
    try {
        const { code } = req.query;
        console.log(req.query);
        const response = await fetch(`https://digilist.fly.dev/usuario/registro/${code}`, {
            method: 'post'
        });
        console.log(response)
        if(response.ok) {
            res.redirect('https://digilist.fly.dev/digilist/usuarios');
        } else {
            res.status(500).render('500');
        }
    } catch (err) {
        res.status(500).render('500');
    }
});

webRouter.get('/web-eliminar-usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.update({ StatusId: 2 }, { where: { email: req.query.email } });
        res.redirect('https://digilist.fly.dev/digilist/usuarios');
    } catch (err) {
        //res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/entradas', async (req, res) => {
    try {
        const entradas = await Entradas.findAll({ where: { StatusId: 1 } });
        const codesA = await Automovil.findAll({ where: { StatusId: 1 } });
        const rfc = await Proveedor.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/entradas', { entradas, codesA, rfc });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-entradas', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Entradas.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/entradas')
    } catch (err) {
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-entradas', async (req, res) => {
    try {

        const entrada = await Envio.update({ StatusId: 2 }, { where: { code_entrada: req.query.code_entrada } });

        res.redirect('http://apidigilist-production.up.railway.app/digilist/entradas');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/envios', async (req, res) => {
    try {
        const envios = await Envio.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/envios', { envios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-envios', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Envio.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/envios')
    } catch (err) {
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-envios', async (req, res) => {
    try {

        const envio = await Envio.update({ StatusId: 2 }, { where: { codEnvio: req.query.codEnvio } });

        res.redirect('http://apidigilist-production.up.railway.app/digilist/envios');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/detalleventa', async (req, res) => {
    try {
        res.render('dashboard/detalleventa');
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-detalleventa', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await DetalleVenta.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/detalleventa')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/modelo', async (req, res) => {
    try {
        const modelos = await Modelo.findAll({ where: { StatusId: 1 } });
        const anios = await Years.findAll({ where: { StatusId: 1 } });
        const marcas = await Marca.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/modelo', { modelos, anios, marcas });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-modelo', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Modelo.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/modelo')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-modelo', async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const modelod = await Modelo.update({ StatusId: 2 }, { where: { modelo: req.query.modelo } });

        res.redirect('http://apidigilist-production.up.railway.app/digilist/modelo');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/anio', async (req, res) => {
    try {
        const anios = await Years.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/anio', { anios });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-anio', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Years.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/anio')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-anio', async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const anio = await Years.update({ StatusId: 2 }, { where: { year: req.query.year } });

        res.redirect('https://digilist.fly.dev/digilist/anio');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/marca', async (req, res) => {
    try {
        const marcas = await Marca.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/marca', { marcas });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-marca', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Marca.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/marca')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-marca', async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const marca = await Marca.update({ StatusId: 2 }, { where: { marca: req.query.marca } });

        res.redirect('http://apidigilist-production.up.railway.app/digilist/marca');

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

webRouter.get('/web-registro-venta', async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Venta.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/venta')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/dashboard-productos', async (req, res) => {
    try {
        const token = req.cookies.token;
        const productos = fetch('https://digilist.fly.dev/autopartes/buscarTodos', {
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