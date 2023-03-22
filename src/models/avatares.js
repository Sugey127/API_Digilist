import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";

//todo: cambiar nombre de imagenes a avatar para no confindirse
export const Avatares = sequelize.define('Avatares', {
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

Usuario.belongsTo(Avatares);
Avatares.hasMany(Usuario); 