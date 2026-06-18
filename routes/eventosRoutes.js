import { Router } from "express";
import eventosController from "../controllers/eventosController.js";   

const router = Router();

router.get('/', eventosController.getAllEventos);
router.get('/:id', eventosController.getEventoById);
router.post('/', eventosController.createEvento);
router.put('/:id', eventosController.updateEvento);
router.delete('/:id', eventosController.deleteEvento);

export default router;