import { Categoria, Eventos } from '../models/index.js';

const categoriaController = {

  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.findAll({
        include: {
          model: Eventos,
          as: 'eventos',
          attributes: ['id', 'titulo', 'descripcion', 'fecha', 'ubicacion']
        }
      });
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al obtener las categorías.', 
        error: error.message 
      });
    }
  },

  getCategoriaById: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id, {
        include: {
          model: Eventos,
          as: 'eventos',
          attributes: ['id', 'titulo', 'descripcion', 'fecha', 'ubicacion']
        }
      });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }

      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al obtener la categoría.', 
        error: error.message 
      });
    }
  },

  createCategoria: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;

      const newCategoria = await Categoria.create({
        nombre,
        descripcion
      });

      return res.status(201).json({
        message: 'Categoría creada con éxito.',
        data: newCategoria
      });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message);
        return res.status(400).json({ message: 'Error de validación', errors: messages });
      }
      return res.status(500).json({ 
        message: 'Error al crear la categoría.', 
        error: error.message 
      });
    }
  },

  updateCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada para actualizar.' });
      }

      await categoria.update({
        nombre: nombre || categoria.nombre,
        descripcion: descripcion || categoria.descripcion
      });

      return res.status(200).json({
        message: 'Categoría actualizada con éxito.',
        data: categoria
      });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(err => err.message);
        return res.status(400).json({ message: 'Error de validación', errors: messages });
      }
      return res.status(500).json({ 
        message: 'Error al actualizar la categoría.', 
        error: error.message 
      });
    }
  },

  deleteCategoria: async (req, res) => {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada para eliminar.' });
      }

      const countEventos = await Eventos.count({ where: { categoriaId: id } });
      if (countEventos > 0) {
        return res.status(400).json({ 
          message: 'No se puede eliminar la categoría porque tiene eventos asociados a ella.' 
        });
      }

      await categoria.destroy();
      return res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al eliminar la categoría.', 
        error: error.message 
      });
    }
  }
};

export default categoriaController;