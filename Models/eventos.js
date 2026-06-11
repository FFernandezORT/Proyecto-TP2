import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequielize.js";

class Eventos extends Model {}

Eventos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Eventos;