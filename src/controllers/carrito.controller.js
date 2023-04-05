import { Autopartes } from "../models/autopartes.js";
import session from "express-session";
import { CarritoCompra } from "../models/carritoCompras.js";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../utils/env.js";

class carritoController {
    mostrarCarro(req, res) {
        try {
            const carrito = req.session.carrito;
            if (!carrito || carrito.length === 0) {
                res.status(404).json({ message: "El carrito está vacío" });
            } else {
                res.status(200).json(carrito);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    agregarProductos(req, res) {
        try {

            const user = jwt.verify(req.headers.authorization || req.cookies.token, JWT_KEY);
            const carrito = req.session.carrito || [];
            const { code_autoparte } = req.params;

            Autopartes.findOne({ where: { code_autoparte } })
                .then((autoparte) => {
                    if (autoparte) {
                        const pos = carritoController.verificar(carrito, code_autoparte);
                        if (pos === -1) {
                            const datos = {
                                code_autoparte,
                                nombre: autoparte.nombreAutoparte,
                                cantidad: 1,
                                precio: autoparte.precio,
                                precio_total: autoparte.precio,
                            };
                            carrito.push(datos);
                        } else {
                            const data = carrito[pos];
                            data.cantidad += 1;
                            data.precio_total = data.precio * data.cantidad;
                            carrito[pos] = data;
                        }

                        req.session.carrito = carrito;

                        // guarando en bd

                        // CarritoCompra.create({
                        //     productos: JSON.stringify(carrito),
                        //     UsuarioEmail: user.email
                        // }).then(data => console.log(data));
                        CarritoCompra.update(JSON.stringify(carrito), { where: { UsuarioEmail: user.email } }).then(data => data);
                        res.status(200).json(req.session.carrito);
                    } else {
                        res.status(404).json('No se ha encontrado la autoparte');
                    }
                })
                .catch((err) => {
                    res.status(500).json({ error: err.message });
                });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    quitarItem(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.code_autoparte;
        var pos = carritoController.verificar(carrito, external);
        var data = carrito[pos];
        if (data.cantidad > 1) {
            data.cantidad = data.cantidad - 1;
            data.precio_total = data.cantidad * data.precio;
            carrito[pos] = data;
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        } else {
            var aux = [];
            for (var i = 0; i < carrito.length; i++) {
                var items = carrito[i];
                if (items.code_autoparte != external) {
                    aux.push(items);
                }
            }
            req.session.carrito = aux;
            res.status(200).json(req.session.carrito);
        }
    }

    static verificar(lista, external) {
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].code_autoparte == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }
}
export default carritoController;