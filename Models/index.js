import Categoria from "./categoria.js";
import Eventos from "./eventos.js";

Categoria.hasMany(Eventos, { foreignKey: "categoriaId" });

Eventos.belongsTo(Categoria, { foreignKey: "categoriaId" });

export { Categoria, Eventos };