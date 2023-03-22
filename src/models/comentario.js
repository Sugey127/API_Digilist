import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./usuario.js";
import { Autopartes } from "./autopartes.js";

export const Comentario = sequelize.define('Comentario', {
    idComentario: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull:false
    },
    comentario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    code_comentario: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    fechaComentario:{
        type:DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }

},{
    timestamps: false
});


Comentario.belongsTo(Usuario,{
    foreignKey: {
        allowNull: false
    }
});
Usuario.hasMany(Comentario, {
    foreignKey: {
        allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Comentario.belongsTo(Autopartes,{
    foreignKey: {
        allowNull: false
    }
});
Autopartes.hasMany(Comentario, {
    foreignKey: {
        allowNull: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



