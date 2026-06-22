class EventosController {
  constructor(eventosService) {
    this.eventosService = eventosService;
  }

  getAllEventos = async (req, res) => {
    try {
      const eventos = await this.eventosService.getAllEventos();
      res.status(200).send({ success: true, message: eventos });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getEventoById = async (req, res) => {
    try {
      const { id } = req.params;
      const evento = await this.eventosService.getEventoById(id);
      res.status(200).send({ success: true, message: evento });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  createEvento = async (req, res) => {
    try {
      const eventoData = req.body;
      const newEvento = await this.eventosService.createEvento(eventoData);
      res.status(201).send({ success: true, message: newEvento });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateEvento = async (req, res) => {
    try {
      const { id } = req.params;
      const eventoData = req.body;
      const updatedEvento = await this.eventosService.updateEvento(id, eventoData);
      res.status(200).send({ success: true, message: updatedEvento });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteEvento = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEvento = await this.eventosService.deleteEvento(id);
      res.status(200).send({ success: true, message: deletedEvento });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}

export default EventosController;
