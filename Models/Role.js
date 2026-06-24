import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequielize.js";

class Role extends Model {}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, 
{
  sequelize,
  modelName: "Role"
});

export default Role;