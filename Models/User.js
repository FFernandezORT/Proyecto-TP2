import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequielize.js";
import bcrypt from "bcrypt";

class User extends Model {
  validatePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
  };
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
        len: [3, 100],
        is: /^[a-z]+$/i,
      },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  }
}, {
  sequelize,
  modelName: "User"
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;