const { Eventos, Categoria } = require("../models");

const eventosController = {
  getAllEventos: async (req, res) => {
    try {
      const eventos = await Eventos.findAll({
        include: {
          model: Categoria,
          as: "categorias",
          attributes: ["id", "nombre"],
        },
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los eventos.",
        error: error.message,
      });
    }
  },

  getEventoById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Eventos.findByPk(id, {
        include: {
          model: Categoria,
          as: "categorias",
          attributes: ["id", "nombre"],
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

  createEvento: async (req, res) => {
    try {
      const { titulo, descripcion, fecha, ubicacion, categoriaId } = req.body;

      if (categoriaId) {
        const categoriaExists = await Categoria.findByPk(categoriaId);
        if (!categoriaExists) {
          return res
            .status(400)
            .json({ message: "La categoría especificada no existe." });
        }
      }

      const newEvento = await Eventos.create({
        titulo,
        descripcion,
        fecha,
        ubicacion,
        categoriaId,
      });

      return res.status(201).json({
        message: "Evento creado con éxito.",
        data: newEvento,
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

  updateEvento: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion, fecha, ubicacion, categoriaId } = req.body;

      const evento = await Eventos.findByPk(id);
      if (!evento) {
        return res
          .status(404)
          .json({ message: "Evento no encontrado para actualizar." });
      }

      if (categoriaId) {
        const categoriaExists = await Categoria.findByPk(categoriaId);
        if (!categoriaExists) {
          return res
            .status(400)
            .json({ message: "La nueva categoría especificada no existe." });
        }
      }

      await evento.update({
        titulo: titulo || evento.titulo,
        descripcion: descripcion || evento.descripcion,
        fecha: fecha || evento.fecha,
        ubicacion: ubicacion || evento.ubicacion,
        categoriaId: categoriaId || evento.categoriaId,
      });

      return res.status(200).json({
        message: "Evento actualizado con éxito.",
        data: evento,
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

  deleteEvento: async (req, res) => {
    try {
      const { id } = req.params;
      const evento = await Eventos.findByPk(id);

      if (!evento) {
        return res
          .status(404)
          .json({ message: "Evento no encontrado para eliminar." });
      }

      await evento.destroy();
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

module.exports = eventosController;
