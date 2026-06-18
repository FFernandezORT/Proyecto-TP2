const { Event, Category } = require("../models");

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll({
        include: {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      });
      return res.status(200).json(events);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los eventos.",
        error: error.message,
      });
    }
  },

  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id, {
        include: {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      });

      if (!event) {
        return res.status(404).json({ message: "Evento no encontrado." });
      }

      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el evento.",
        error: error.message,
      });
    }
  },

  createEvent: async (req, res) => {
    try {
      const { title, description, date, location, categoryId } = req.body;

      if (categoryId) {
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
          return res
            .status(400)
            .json({ message: "La categoría especificada no existe." });
        }
      }

      const newEvent = await Event.create({
        title,
        description,
        date,
        location,
        categoryId,
      });

      return res.status(201).json({
        message: "Evento creado con éxito.",
        data: newEvent,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Error de validación", errors: messages });
      }
      return res.status(500).json({
        message: "Error al crear el evento.",
        error: error.message,
      });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, date, location, categoryId } = req.body;

      const event = await Event.findByPk(id);
      if (!event) {
        return res
          .status(404)
          .json({ message: "Evento no encontrado para actualizar." });
      }

      if (categoryId) {
        const categoryExists = await Category.findByPk(categoryId);
        if (!categoryExists) {
          return res
            .status(400)
            .json({ message: "La nueva categoría especificada no existe." });
        }
      }

      await event.update({
        title: title || event.title,
        description: description || event.description,
        date: date || event.date,
        location: location || event.location,
        categoryId: categoryId || event.categoryId,
      });

      return res.status(200).json({
        message: "Evento actualizado con éxito.",
        data: event,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map((err) => err.message);
        return res
          .status(400)
          .json({ message: "Error de validación", errors: messages });
      }
      return res.status(500).json({
        message: "Error al actualizar el evento.",
        error: error.message,
      });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findByPk(id);

      if (!event) {
        return res
          .status(404)
          .json({ message: "Evento no encontrado para eliminar." });
      }

      await event.destroy();
      return res
        .status(200)
        .json({ message: "Evento eliminado correctamente." });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el evento.",
        error: error.message,
      });
    }
  },
};

module.exports = eventController;
