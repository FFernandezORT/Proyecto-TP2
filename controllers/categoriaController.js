const { Category, Event } = require('../models');

const categoryController = {

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: {
          model: Event,
          as: 'events',
          attributes: ['id', 'title', 'date']
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al obtener las categorías.', 
        error: error.message 
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id, {
        include: {
          model: Event,
          as: 'events',
          attributes: ['id', 'title', 'date', 'location']
        }
      });

      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada.' });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al obtener la categoría.', 
        error: error.message 
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;

      const newCategory = await Category.create({
        name,
        description
      });

      return res.status(201).json({
        message: 'Categoría creada con éxito.',
        data: newCategory
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

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada para actualizar.' });
      }

      await category.update({
        name: name || category.name,
        description: description || category.description
      });

      return res.status(200).json({
        message: 'Categoría actualizada con éxito.',
        data: category
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

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada para eliminar.' });
      }

      const countEvents = await Event.count({ where: { categoryId: id } });
      if (countEvents > 0) {
        return res.status(400).json({ 
          message: 'No se puede eliminar la categoría porque tiene eventos asociados a ella.' 
        });
      }

      await category.destroy();
      return res.status(200).json({ message: 'Categoría eliminada correctamente.' });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error al eliminar la categoría.', 
        error: error.message 
      });
    }
  }
};

module.exports = categoryController;