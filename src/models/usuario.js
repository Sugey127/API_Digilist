import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";

export const Usuario = sequelize.define('Usuarios', { 
    idUsuario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userNombre:{
        type: DataTypes.STRING(30),
        allowNull:false
    },
    usuarioApellido:{
        type: DataTypes.STRING(40),
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(250),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
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

