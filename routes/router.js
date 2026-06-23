import { Router } from "express";
import eventosRoutes from './eventosRoutes.js';
import categoriaRoutes from './categoriasRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();
router.use('/eventos', eventosRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/users', userRoutes);

export default router;