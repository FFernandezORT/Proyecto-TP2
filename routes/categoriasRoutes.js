import { Router } from "express";
import categoriaController from '../container/categoriaContainer.js';

const categoriaRoutes = Router();

categoriaRoutes.get('/', categoriaController.getAllCategorias);
categoriaRoutes.get('/:id', categoriaController.getCategoriaById);
categoriaRoutes.post('/', categoriaController.createCategoria);
categoriaRoutes.put('/:id', categoriaController.updateCategoria);
categoriaRoutes.delete('/:id', categoriaController.deleteCategoria);

export default categoriaRoutes;
