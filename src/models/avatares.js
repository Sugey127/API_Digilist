import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";

//todo: cambiar nombre de imagenes a avatar para no confindirse
export const Imagenes = sequelize.define('Imagen', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

Usuario.belongsTo(Imagenes);
Imagenes.hasMany(Usuario); 