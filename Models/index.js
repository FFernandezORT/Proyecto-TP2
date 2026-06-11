import Categoria from "./Categoria";
import Eventos from "./Eventos";

Categoria.hasMany(Eventos, { foreignKey: "categoriaId" });

Eventos.belongsTo(Categoria, { foreignKey: "categoriaId" });

export { Categoria, Eventos };