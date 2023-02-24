import { sequelize } from "../config/DB.js";
import { DataTypes } from "sequelize";
import { Autopartes } from "./autopartes.js";
import { Usuario } from "./usuario.js";
import { Marca } from "./marca.js";
import { Venta } from "./venta.js";
import { Proveedor } from "./proveedor.js";
import { Modelo } from "./modelo.js";
import { Envio } from "./envio.js";
import { Entradas } from "./entradas.js";
import { DetalleVenta } from "./detalleVenta.js";
import { Comentario } from "./comentario.js";
import { Years } from "./years.js";
import { Automovil } from "./automovil.js";

export const Status = sequelize.define('Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        unique: true
    }
}, { timestamps: false });


Autopartes.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Autopartes, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


Marca.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Marca, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Venta.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Venta, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


Proveedor.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Proveedor, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


Modelo.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Modelo, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Envio.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Envio, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Entradas.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Entradas, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Usuario.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Usuario, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

DetalleVenta.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(DetalleVenta, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Comentario.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});

Status.hasMany(Comentario, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Status.hasMany(Years, {
    foreignKey:{
        allowNull:false
    }
})

Years.belongsTo(Status, {
    foreignKey:{
        allowNull:false
    }
});

Status.hasMany(Automovil, {
    foreignKey:{
        allowNull:false
    }
})

Automovil.belongsTo(Status, {
    foreignKey:{
        allowNull:false
    }
});