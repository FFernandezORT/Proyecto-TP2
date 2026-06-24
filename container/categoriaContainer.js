import { Categoria, Eventos } from "../Models/index.js";
import CategoriaController from "../controllers/CategoriaController.js";
import CategoriaServices from "../services/CategoriaServices.js";

const categoriaService = new CategoriaServices(Categoria, Eventos);
const categoriaController = new CategoriaController(categoriaService);

export default categoriaController;