import { Eventos, Categoria } from "../Models/index.js";
import EventosController from "../controllers/EventosController.js";
import EventosServices from "../services/EventosServices.js";

const eventosService = new EventosServices(Eventos, Categoria);
const eventosController = new EventosController(eventosService);

export default eventosController;