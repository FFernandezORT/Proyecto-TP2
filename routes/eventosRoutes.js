import { Router } from "express";
import eventosController from "../container/eventosContainer.js";

const eventosRoutes = Router();

eventosRoutes.get('/:id', eventosController.getEventoById);
eventosRoutes.post('/', eventosController.createEvento);
eventosRoutes.put('/:id', eventosController.updateEvento);
eventosRoutes.delete('/:id', eventosController.deleteEvento);

export default eventosRoutes;
