import Categoria from "./categoria.js";
import Eventos from "./eventos.js";
import User from "./User.js";
import Role from "./Role.js";

Categoria.hasMany(Eventos, { foreignKey: "categoriaId" });

Eventos.belongsTo(Categoria, { foreignKey: "categoriaId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export { Categoria, Eventos, User, Role };