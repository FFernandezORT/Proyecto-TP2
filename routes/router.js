import { Router } from "express";
import eventosRoutes from './eventosRoutes.js';
import categoriaRoutes from './categoriasRoutes.js';

const router = Router();
router.use('/eventos', eventosRoutes);
router.use('/categorias', categoriaRoutes);

export default router;