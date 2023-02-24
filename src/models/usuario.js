import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define('Usuarios', { 
    idUsuario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    userNombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    usuarioApellido:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    role:{ 
        type: DataTypes.ENUM('cliente', 'administrador'), 
        allowNull:false
    },
    fechaRegistroUsuario:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false
});