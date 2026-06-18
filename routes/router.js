import { Router } from "express";
import eventosRoutes from "./eventosRoutes.js";
import categoriasRoutes from "./categoriasRoutes.js";

const router = Router();

router.use('/eventos', eventosRoutes);
router.use('/categorias', categoriasRoutes);

export default router;