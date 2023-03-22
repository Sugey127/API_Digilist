import { DataTypes } from "sequelize";
import { sequelize } from "../config/DB.js";
import { Usuario } from "./usuario.js";
import { Recibo } from "./recibo.js";

export const Envio = sequelize.define('Envio', {
    idEnvio: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    codEnvio:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaEntrega: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    EstadoPaquete:{
        type:DataTypes.ENUM('Preparacion','Pendiente','Entregado', 'Cancelado'),
        allowNull:false
    },
    fechaRegistroEnvio:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps: false
});

Envio.belongsTo(Usuario, {
    foreignKey:{
        allowNull:false
    }
});

Usuario.hasMany(Envio, {
    foreignKey: {
        allowNull:false
    }
})

Envio.belongsTo(Recibo, {
    foreignKey:{
        allowNull:false
    }
});

Recibo.hasMany(Envio, {
    foreignKey: {
        allowNull:false
    }
})

