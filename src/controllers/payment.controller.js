import axios from 'axios';
import { PAYPLAY_API, PAYPLAY_API_CLIENTE, PAYPLAY_APY_SECRET } from '../config/payment.js';
import { sequelize } from '../config/DB.js';
import { Autopartes } from '../models/autopartes.js';
import { Venta } from '../models/venta.js';
import { Op } from 'sequelize';
import { DetalleVenta } from '../models/detalleVenta.js';

export const createOrden = async (req, res) => {
    try {

        const { idVenta } = req.query;
        let totalCarrito = 0;
        let descriptionCarrito = 'Productos: '

        const carrito = await Venta.findAll({
            where: { [Op.and]: [{ StatusId: 1 }, { idVenta }] },
            include: {
                model: Autopartes
            }
        });

        carrito[0].Autopartes.forEach((producto, index) => {
            totalCarrito += Number(producto.DetalleVenta.precioTotal);
            descriptionCarrito += index === 0 ? `${producto.nombreAutoparte}: x${producto.DetalleVenta.cantidadVenta} precio: ${producto.DetalleVenta.precioTotal}` : `, ${producto.nombreAutoparte}: x${producto.DetalleVenta.cantidadVenta} precio: ${producto.DetalleVenta.precioTotal}`
        });

        console.log('total carrito:' + totalCarrito, 'description: ' + descriptionCarrito)

        const orden = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "MXN",
                        value: totalCarrito
                    },
                    description: descriptionCarrito
                },
            ],
            application_context: {
                brand_name: "Digilist.refaccionaria@gmail.com",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `http://localhost:4000/pagos/capturarOrden?idVenta=${idVenta}&UsuarioEmail=${carrito[0].UsuarioEmail}`,
                cancel_url: `http://localhost:4000/pagos/cancelarOrden`
            }
        };

        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        // Generate an access token
        const {
            data: { access_token },
        } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: PAYPLAY_API_CLIENTE,
                    password: PAYPLAY_APY_SECRET,
                },
            }
        );

        console.log(access_token);

        //    const response= await axios.post(`${PAYPLAY_API}/v2/checkout/orders`, orden,{
        //         auth:{
        //             username: PAYPLAY_API_CLIENTE,
        //             password: PAYPLAY_APY_SECRET
        //         },
        //     });

        const response = await axios.post(`${PAYPLAY_API}/v2/checkout/orders`,
            orden,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        console.log(response.data);

        return res.json(response.data);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const captureOrden = async (req, res) => {
    const { token, idVenta } = req.query;

    try {
        const response = await axios.post(
            `${PAYPLAY_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: PAYPLAY_API_CLIENTE,
                    password: PAYPLAY_APY_SECRET,
                },
            }
        );

        const nuevoDetalleVenta = await Venta.findAll({
            where: { [Op.and]: [{ StatusId: 1 }, { idVenta }] },
            include: {
                model: Autopartes
            }
        });

        console.log('esta muriendo aqui?')

        // //por cada elemento que itere se actulizará el stock de la autoparte
        nuevoDetalleVenta[0].Autopartes.forEach(producto => {
            Autopartes.update({ stockInventario: producto.stockInventario - producto.DetalleVenta.cantidadVenta }, { where: { code_autoparte: producto.code_autoparte } });
        });

        // console.log(response.data)

        console.log('o quizas aqui?')
        sequelize.transaction(async t => {
            await Venta.update({ StatusId: 2 }, { where: { idVenta }, transaction: t });
            await Venta.create({ UsuarioEmail: req.query.UsuarioEmail, StatusId: 1 }, { transaction: t });
        })

        console.log(response);

        const userPaypalAccount = await response.data;

        const user = userPaypalAccount.payment_source.paypal.name;

        res.status(200).render('paypal/pagado', { user });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export const cancelOrden = (req, res) => {
    res.redirect("/");
}