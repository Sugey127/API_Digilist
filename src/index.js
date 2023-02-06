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
import { Automovil } from "./models/automovil.js";
import { Imagenes } from "./models/imagenes.js"; 
import { ImagenUsuario } from "./models/imagenUsuario.js";

 


const port = process.env.PORT || 4001;
 
async function proyect() {
    try {
        //await Usuario.sync({ alter: true });    
        app.listen(port, () => {
            console.log("hello server");
        });
    } catch (err) {
        console.log(err); 
    }
} 

proyect();
 
