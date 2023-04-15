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
import { webAuth } from "./auth.js";
import sharp from "sharp";

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
        //console.log(email, password);
        const usuarioValido = await Usuario.findOne({ where: { [Op.and]: [{ password }, { email }] } });
        //console.log(usuarioValido);
        if (!usuarioValido) {
            console.log('no valido');
            throw new Error('Esta cuenta no existe');
        } else {
            const data = await fetch('http://localhost:4000/usuario/login', {
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

webRouter.get('/dashboard', webAuth, async (req, res) => {
    try {
        // const token = req.cookies.token;
        // //!! Este no imprime
        // console.log('ay Jesuuuuuuuuussss', token);
        // if (!token) {
        //     return res.redirect('/login')
        // } else {
        //     res.render('dashboard/main');
        // }
        res.status(200).render('dashboard/main');
    } catch (err) {
        // res.render('404');
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
//         res.redirect('http://localhost:4000/digilist/automovil')
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

//         res.redirect('http://localhost:4000/digilist/automovil');

//     } catch (err) {
//         // res.render('404');
//         res.status(403).json(err);
//     }
// });

webRouter.get('/productos', webAuth, async (req, res) => {
    try {
        const autopartes = await Autopartes.findAll({ where: { StatusId: 1 } });
        const codeEn = await Modelo.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/productos', { autopartes, codeEn });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-productos', webAuth, async (req, res) => {
    
    try {
        console.log(req.files)
        req.query.StatusId = 1;
        const autoparte = await Autopartes.create(req.query);
        req.files.forEach(async img => {
            console.log(img.buffer)
            const buffer = await sharp(img.buffer).resize(250, 250).png({ quality: 100 }).toBuffer();
            cloudinary.uploader.upload_stream({ folder: 'autopartes' }, async (err, result) => {
                if (err) res.status(400).json('no se pudo subir la imagen')
                else {
                    console.log(result)
                    await ImagenesAutopartes.create({
                        url: result.url,
                        publicId: result.public_id,
                        AutoparteCodeAutoparte: autoparte.code_autoparte
                    })
                }
            }).end(buffer)
        })

        res.status(303).redirect('http://localhost:4000/digilist/productos')

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    
    // try {

    //     console.log(req.query);
    //     req.query.StatusId = 1;
    //     await Autopartes.create(req.query);
    //     res.redirect('http://localhost:4000/digilist/productos')
    // } catch (err) {
    //     // res.render('404');
    //     res.status(403).json(err);
    // }
});

//consumo put
webRouter.get('/web-eliminar-productos', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const autopartes = await Autopartes.update({ StatusId: 2 }, { where: { code_autoparte: req.query.code_autoparte } });
        res.redirect('http://localhost:4000/digilist/productos');
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
        res.redirect('http://localhost:4000/digilist/recibos')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});
webRouter.get('/proveedor', webAuth, async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/proveedor', { proveedores });
    } catch (err) {
        res.render('404');
    }
});

//consumo post

webRouter.get('/web-registro-proveedor', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Proveedor.create(req.query);
        res.redirect('http://localhost:4000/digilist/proveedor')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-proveedor', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const preoveedor = await Proveedor.update({ StatusId: 2 }, { where: { RfcProveedor: req.query.RfcProveedor } });

        res.redirect('http://localhost:4000/digilist/proveedor');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/usuarios', webAuth, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { [Op.and]: [{ role: "administrador" }, { StatusId: 1 }] } });
        res.render('dashboard/usuarios', { usuarios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-usuarios', webAuth, async (req, res) => {
    try {
        req.query.StatusId = 1;
        req.query.role = 'administrador'
        console.log(JSON.stringify(req.query));
        const respuesta = await fetch('http://localhost:4000/usuario/pre-registroAdmin', {
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
            res.redirect('http://localhost:4000/digilist/usuarios')
        } else {
            res.status(500).render('500');
        }

    } catch (err) {
        console.log(err);
        res.status(500).render('500')
    }
});

webRouter.get('/web-VerificarCode-usuario', webAuth, async (req, res) => {
    try {
        const { code } = req.query;
        console.log(req.query);
        const response = await fetch(`http://localhost:4000/usuario/registro/${code}`, {
            method: 'post'
        });
        console.log(response)
        if (response.ok) {
            res.redirect('http://localhost:4000/digilist/usuarios');
        } else {
            res.status(500).render('500');
        }
    } catch (err) {
        res.status(500).render('500');
    }
});

webRouter.get('/web-eliminar-usuarios', webAuth, async (req, res) => {
    try {
        const usuario = await Usuario.update({ StatusId: 2 }, { where: { email: req.query.email } });
        res.redirect('http://localhost:4000/digilist/usuarios');
    } catch (err) {
        //res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/entradas', webAuth, async (req, res) => {
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

webRouter.get('/web-registro-entradas', webAuth, async (req, res) => {
    try {
        console.log('hello query', req.query);
        // req.query.StatusId = 1;
        // console.log('query actualizada', req.query)
        const { nombreAutoparte, stock, ModeloCodeAuto, ProveedorRfcProveedor, AutoparteCodeAutoparte, precio } = req.query;
        const response = await fetch('http://localhost:4000/entradas/registro', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ nombreAutoparte, stock, ModeloCodeAuto, ProveedorRfcProveedor, AutoparteCodeAutoparte, precio })
        });

        console.log('viendo que tiene el objeto response', await response.json());
        if (response.ok) {
            res.redirect('http://localhost:4000/digilist/entradas');
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
webRouter.get('/web-eliminar-entradas', webAuth, async (req, res) => {
    try {
        const entrada = await Envio.update({ StatusId: 2 }, { where: { idEntradas: req.query.idEntradas } });
        res.redirect('htt://localhost:4000/digilist/entradas');
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/envios', webAuth, async (req, res) => {
    try {
        const envios = await Envio.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/envios', { envios });
    } catch (err) {
        res.render('404');
    }
});

webRouter.get('/web-registro-envios', webAuth, async (req, res) => {
    console.log('eyyyyyyyyeeeeeeeeeeeyyyy', req.query);
    try {

        req.query.StatusId = 1;
        await Envio.create(req.query);
        res.redirect('http://localhost:4000/digilist/envios')
    } catch (err) {
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-envios', webAuth, async (req, res) => {
    try {

        const envio = await Envio.update({ StatusId: 2 }, { where: { codEnvio: req.query.codEnvio } });

        res.redirect('http://localhost:4000/digilist/envios');

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
        res.redirect('http://localhost:4000/digilist/detalleventa')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/modelo', webAuth, async (req, res) => {
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
webRouter.get('/web-registro-modelo', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Modelo.create(req.query);
        res.redirect('http://localhost:4000/digilist/modelo')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-modelo', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const modelod = await Modelo.update({ StatusId: 2 }, { where: { modelo: req.query.modelo } });

        res.redirect('htt://localhost:4000/digilist/modelo');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/anio', webAuth, async (req, res) => {
    try {
        const anios = await Years.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/anio', { anios });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-anio', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Years.create(req.query);
        res.redirect('http://localhost:4000/digilist/anio')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-anio', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const anio = await Years.update({ StatusId: 2 }, { where: { year: req.query.year } });

        res.redirect('http://localhost:4000/digilist/anio');

    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/marca', webAuth, async (req, res) => {
    try {
        const marcas = await Marca.findAll({ where: { StatusId: 1 } });
        res.render('dashboard/marca', { marcas });
    } catch (err) {
        res.render('404');
    }
});

//consumo post
webRouter.get('/web-registro-marca', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        req.query.StatusId = 1;
        await Marca.create(req.query);
        res.redirect('http://localhost:4000/digilist/marca')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

//consumo put
webRouter.get('/web-eliminar-marca', webAuth, async (req, res) => {
    try {
        console.log(req.query);
        console.log('HOLA COMO ESTA', req.query.RfcProveedor);
        const marca = await Marca.update({ StatusId: 2 }, { where: { marca: req.query.marca } });

        res.redirect('htt://localhost:4000/digilist/marca');

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
        res.redirect('http://localhost:4000/digilist/venta')
    } catch (err) {
        // res.render('404');
        res.status(403).json(err);
    }
});

webRouter.get('/dashboard-productos', webAuth, async (req, res) => {
    try {
        const token = req.cookies.token;
        const productos = fetch('http://localhost:4000/autopartes/buscarTodos', {
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