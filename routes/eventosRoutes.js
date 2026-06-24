import { Router } from "express";
import eventosController from "../container/eventosContainer.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";

const eventosRoutes = Router();

eventosRoutes.get('/:id', eventosController.getEventoById);
eventosRoutes.post("/", authenticate, isAdmin, eventosController.createEvento);
eventosRoutes.put("/:id", authenticate, isAdmin, eventosController.updateEvento);
eventosRoutes.delete("/:id", authenticate, isAdmin, eventosController.deleteEvento);

export default eventosRoutes;
