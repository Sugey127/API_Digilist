//todo los elementos principales de la applicacion squi se ejecutan
import app from "./app.js";
import { sequelize } from "./config/DB.js";
import { Entradas } from "./models/entradas.js";
import { Venta } from "./models/venta.js";
import { Usuario } from "./models/usuario.js";
import { Recibo } from "./models/recibo.js";
import { Proveedor } from "./models/proveedor.js";
import { Envio } from "./models/envio.js";
import { DetalleVenta } from "./models/detalleVenta.js";
import { Comentario } from "./models/comentario.js";
import { Autopartes } from "./models/autopartes.js";
import { Marca } from "./models/marca.js";
import { Modelo } from "./models/modelo.js";
import { Status } from "./models/status.js";
import { Years } from "./models/years.js";
import { Imagenes } from "./models/imagenes.js";
import { PORT } from "./utils/env.js";

async function proyect() {
    try {
        // await sequelize.sync({ force: true });    
        app.listen(PORT, () => {
            console.log(`server listen on: ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

console.log("hello");

proyect();

