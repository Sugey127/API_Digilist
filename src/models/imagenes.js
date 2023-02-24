import { DataRowMessage } from "pg-protocol/dist/messages.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Autopartes } from "./autopartes.js";
import { Usuario } from "./usuario.js";


export const Imagenes = sequelize.define('Imagen', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, {
    timestamps: false
});

Autopartes.belongsTo(Imagenes);
Imagenes.hasMany(Autopartes);

Usuario.belongsTo(Imagenes);
Imagenes.hasMany(Usuario); 