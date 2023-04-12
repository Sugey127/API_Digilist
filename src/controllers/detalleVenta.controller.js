import { Op, where } from "sequelize";
import { DetalleVenta } from "../models/detalleVenta.js";



export const verificar = async (lista, external) => {
    var pos = -1;
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].AutoparteCodeAutoparte == external) {
            pos = i;
            break;
        }
    }
    return pos;
}

//POST
export const post = async (req, res) => {
    // const result = await getOne(req, res);
    // const lista = result.dataValues;
    req.body.StatusId = 1;
    const { cantidadVenta, precioVenta, VentumIdVenta, AutoparteCodeAutoparte, StatusId } = req.body;
    try {

        const carrito = await DetalleVenta.findOne({ where: { AutoparteCodeAutoparte } })
            .then((autoparte) => {
                if (autoparte) {

                    const pos = verificar(lista, AutoparteCodeAutoparte);

                    if (pos === -1) {
                        const datos = {
                            AutoparteCodeAutoparte,
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
                }
            })

        const nuevoDetalleVenta = await DetalleVenta.create({
            cantidadVenta, precioVenta, VentumIdVenta, AutoparteCodeAutoparte, StatusId
        });
        res.status(201).json(nuevoDetalleVenta);

    } catch (err) {
        res.status(500).json(err);
    }
}

//PUT

export const put = async (req, res) => {
    const { cantidadVenta, precioVenta, AutoparteCodeAutoparte, VentumIdVenta, StatusId } = req.body;
    try {
        const actualizarDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{ AutoparteCodeAutoparte }, { VentumIdVenta }] } });
        actualizarDetalleVenta.cantidadVenta = cantidadVenta;
        actualizarDetalleVenta.precioVenta = precioVenta;
        actualizarDetalleVenta.StatusId = StatusId;
        await actualizarDetalleVenta.save();
        res.status(201).json(actualizarDetalleVenta);
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE

// export const drop = async (req, res) => {
//     const { AutoparteCodeAutoparte,VentumIdVenta } = req.body;
//     try {
//         const eliminarDetalleVenta = DetalleVenta.destroy({ where: { [Op.and]: [{AutoparteCodeAutoparte}, {VentumIdVenta}] } });
//         res.status(201).json('SE ELIMINO CON EXITO');

//     } catch (err) { 
//         res.status(500).json(err);
//     }
// }
//Agregar al carrito

export const AgregarCarrito = async (req, res) => {
    req.query.StatusId = 1;
    const { VentumIdVenta, AutoparteCodeAutoparte, cantidadVenta, precioVenta, precioTotal, StatusId } = req.query;
    try {
        //verificar si ya existe el producto
        const verifico = await DetalleVenta.findOne({ where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } })
        if (verifico?.VentumIdVenta && verifico?.AutoparteCodeAutoparte) {
            //si existe, actulizar 

            const carritoActualizado = await DetalleVenta.update({
                cantidadVenta: cantidadVenta,
                precioTotal: verifico.precioVenta * cantidadVenta
            },
                { where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } });
            res.status(200).json(carritoActualizado);
        } else {
            req.query.StatusId = 1;
            //si el producto no existe, agregar al carrito
            const nuevoDetalleVenta = await DetalleVenta.create({
                cantidadVenta, precioVenta, VentumIdVenta, AutoparteCodeAutoparte,
                precioTotal: precioVenta * cantidadVenta,
                StatusId
            });
            //enviar la respuesta (res.send)
            res.status(201).json(nuevoDetalleVenta);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.msg);
    }
}

//eliminar producto del carrito uno por uno (que seria actualizacion)
export const eliminarProductoCarritoUno = async (req, res) => {
    const { VentumIdVenta, AutoparteCodeAutoparte } = req.query;
    try {
        //verificar si ya existe el producto
        const verifico = await DetalleVenta.findOne({ where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } })
        if (verifico?.VentumIdVenta && verifico?.AutoparteCodeAutoparte) {
            //si existe, elimina el producto uno por uno
            const nuevaCantidadVenta = parseInt(verifico.cantidadVenta) - 1;
            const nuevoPrecioTotal = parseFloat(verifico.precioVenta) * nuevaCantidadVenta;
            const carritoEliminarUno = await DetalleVenta.update({
                cantidadVenta: nuevaCantidadVenta,
                precioTotal: nuevoPrecioTotal
            },
            { where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } });
            // manda el estatus
            res.status(200).json(carritoEliminarUno);
            if (nuevaCantidadVenta <= 0) {
                const verifico = await DetalleVenta.destroy({ where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } });
                // manda el estatus
                res.status(201).json('SE ELIMINO CON EXITO');
            }
        }else {
            res.status(404).json('El producto no existe en el carrito.');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.msg);
    }
}



//Se eliminar el producto, para que ya no se vea en el carrito
export const eliminarProductoCarritoTodo = async (req, res) => {
    const { VentumIdVenta, AutoparteCodeAutoparte } = req.query;
    try {
        //elimina el producto de un solo jalon
        const verifico = await DetalleVenta.destroy({ where: { [Op.and]: [{ VentumIdVenta }, { AutoparteCodeAutoparte }] } })
        // manda  el estatus
        res.status(201).json('SE ELIMINO CON EXITO');
    } catch (err) {
        console.log(err);
        res.status(500).json(err.msg);
    }
}

//GET

export const getOne = async (req, res) => {
    req.query.StatusId = 1;
    const { VentumIdVenta, StatusId } = req.query;
    try {

        const nuevoDetalleVenta = await DetalleVenta.findOne({ where: { [Op.and]: [{ StatusId }, { VentumIdVenta }] } });

        console.log(nuevoDetalleVenta);

        if (!nuevoDetalleVenta?.VentumIdVenta) {
            return res.status(404).json({ message: 'Está vacio el carrito' });
        }

        res.status(201).json(nuevoDetalleVenta);

    } catch (err) {
        console.log(err)
        res.status(500).json(err.msg);
    }
}

//GETS Status Activo

export const getAllActivo = async (req, res) => {
    try {
        req.body.StatusId = 1;
        const detallVenta = await DetalleVenta.findAll({ where: { StatusId: 1 } });
        res.status(201).json(detallVenta);

    } catch (err) {
        res.status(500).json(err.message);
    }
}

//GETS Status Inactivo

export const getAllInactivo = async (req, res) => {
    try {
        req.body.StatusId = 2;
        const detallVenta = await DetalleVenta.findAll({ where: { StatusId: 2 } });
        res.status(201).json(detallVenta);

    } catch (err) {
        res.status(500).json(err.message);
    }
}


//GETS

export const getAll = async (req, res) => {
    try {
        const detalleVenta = await DetalleVenta.findAll();
        res.status(201).json(detalleVenta);

    } catch (err) {
        res.status(500).json(err);
    }
}


