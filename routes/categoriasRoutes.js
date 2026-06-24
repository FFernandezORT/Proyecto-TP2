import { Router } from "express";
import categoriaController from '../container/categoriaContainer.js';
import { authenticate, isAdmin } from "../middlewares/auth.js";

const categoriaRoutes = Router();

categoriaRoutes.get('/:id', categoriaController.getCategoriaById);
categoriaRoutes.post("/", authenticate, isAdmin, categoriaController.createCategoria);
categoriaRoutes.put("/:id", authenticate, isAdmin, categoriaController.updateCategoria);
categoriaRoutes.delete("/:id", authenticate, isAdmin, categoriaController.deleteCategoria);

export default categoriaRoutes;
