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
import { authorization } from "../src/middlewares/auth.js";


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

            res.redirect('http://localhost:4000/digilist/dashboard');
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

webRouter.get('/dashboard',authorization, async (req, res) => {
    try {
        const token=req.cookies.get('token');
        console.log('ay Jesuuuuuuuuussss',token);
        // if (token===null) {
        //     return res.redirect('http://localhost:4000/digilist/login');
        // }else{
            res.render('dashboard/main');
        //}
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

webRouter.get('/productos',authorization, async (req, res) => {
    try {
        const autopartes = await Autopartes.findAll({ where: { StatusId: 1 } });
        const codeEn = await Modelo.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/productos', { autopartes, codeEn });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-productos',authorization, async (req, res) => {
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
webRouter.get('/web-eliminar-productos',authorization, async (req, res) => {
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
webRouter.get('/proveedor',authorization, async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/proveedor', { proveedores });
    } catch (err) {
        res.render('404');
    }
});

//consumo post

webRouter.get('/web-registro-proveedor',authorization, async (req, res) => {
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
webRouter.get('/web-eliminar-proveedor',authorization, async (req, res) => {
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

webRouter.get('/usuarios',authorization, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { [Op.and]: [{ role: "administrador" }, { StatusId: 1 }] } });
        res.render('dashboard/usuarios', { usuarios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-usuarios',authorization, async (req, res) => {
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

        if (respuesta.ok) {
            res.redirect('https://digilist.fly.dev/digilist/usuarios')
        } else {
            res.status(500).render('500');
        }

    } catch (err) {
        console.log(err);
        res.status(500).render('500')
    }
});

webRouter.get('/web-VerificarCode-usuario',authorization, async (req, res) => {
    try {
        const { code } = req.query;
        console.log(req.query);
        const response = await fetch(`https://digilist.fly.dev/usuario/registro/${code}`, {
            method: 'post'
        });
        console.log(response)
        if (response.ok) {
            res.redirect('https://digilist.fly.dev/digilist/usuarios');
        } else {
            res.status(500).render('500');
        }
    } catch (err) {
        res.status(500).render('500');
    }
});

webRouter.get('/web-eliminar-usuarios',authorization, async (req, res) => {
    try {
        const usuario = await Usuario.update({ StatusId: 2 }, { where: { email: req.query.email } });
        res.redirect('https://digilist.fly.dev/digilist/usuarios');
    } catch (err) {
        //res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/entradas',authorization, async (req, res) => {
    try {
        const entradas = await Entradas.findAll({ where: { StatusId: 1 } });
        const codesA = await Modelo.findAll({ where: { StatusId: 1 } });
        const rfc = await Proveedor.findAll({ where: { StatusId: 1 } });
        const autoparte = await Autopartes.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/entradas', { entradas, codesA, rfc, autoparte });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-entradas',authorization, async (req, res) => {
    try {
        console.log('hello query', req.query);
        // req.query.StatusId = 1;
        // console.log('query actualizada', req.query)
        const { nombreAutoparte, stock, ModeloCodeAuto, ProveedorRfcProveedor, AutoparteCodeAutoparte, precio } = req.query;
        const response = await fetch('https://digilist.fly.dev/entradas/registro', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ nombreAutoparte, stock, ModeloCodeAuto, ProveedorRfcProveedor, AutoparteCodeAutoparte, precio })
        });

        console.log('viendo que tiene el objeto response', await response.json());
        if (response.ok) {
            res.redirect('https://digilist.fly.dev/digilist/entradas');
        }
        else {
            res.status(500).render('500');
        }
        //await Entradas.create(req.query);
    } catch (err) {
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-entradas',authorization, async (req, res) => {
    try {
        const entrada = await Envio.update({ StatusId: 2 }, { where: { idEntradas: req.query.idEntradas } });
        res.redirect('http://digilist.fly.dev/digilist/entradas');
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/envios',authorization, async (req, res) => {
    try {
        const envios = await Envio.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/envios', { envios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-envios',authorization, async (req, res) => {
    console.log('eyyyyyyyyeeeeeeeeeeeyyyy',req.query);
    try {
        
        req.query.StatusId = 1;
        await Envio.create(req.query);
        res.redirect('https://digilist.fly.dev/digilist/envios')
    } catch (err) {
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-envios',authorization, async (req, res) => {
    try {

        const envio = await Envio.update({ StatusId: 2 }, { where: { codEnvio: req.query.codEnvio } });

        res.redirect('https://digilist.fly.dev/digilist/envios');

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

webRouter.get('/modelo',authorization, async (req, res) => {
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
webRouter.get('/web-registro-modelo',authorization, async (req, res) => {
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
webRouter.get('/web-eliminar-modelo',authorization, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const modelod = await Modelo.update({ StatusId: 2 }, { where: { modelo: req.query.modelo } });

        res.redirect('http://digilist.fly.dev/digilist/modelo');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/anio',authorization, async (req, res) => {
    try {
        const anios = await Years.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/anio', { anios });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-anio',authorization, async (req, res) => {
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
webRouter.get('/web-eliminar-anio',authorization, async (req, res) => {
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

webRouter.get('/marca',authorization, async (req, res) => {
    try {
        const marcas = await Marca.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/marca', { marcas });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-marca',authorization, async (req, res) => {
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
webRouter.get('/web-eliminar-marca',authorization, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const marca = await Marca.update({ StatusId: 2 }, { where: { marca: req.query.marca } });

        res.redirect('http://digilist.fly.dev/digilist/marca');

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

webRouter.get('/dashboard-productos',authorization, async (req, res) => {
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