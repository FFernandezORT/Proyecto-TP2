import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequielize.js";

class Categoria extends Model {
}

Categoria.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },  
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize
});

export default Categoria;