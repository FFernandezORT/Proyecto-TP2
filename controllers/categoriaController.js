import CategoriaService from "../services/CategoriaServices.js";



class CategoriaController {
  constructor(categoriaService) {
    this.categoriaService = categoriaService;
  }

  getCategoriaById = async (req, res) => {  
  try {
    const { id } = req.params;
    const categoria = await this.categoriaService.getCategoriaById(id);
    res.status(200).send({ success: true, message: categoria });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  } };

  createCategoria = async (req, res) => {
    try {
      const categoriaData = req.body;
      const newCategoria = await this.categoriaService.createCategoria(categoriaData);
      res.status(201).send({ success: true, message: newCategoria });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateCategoria = async (req, res) => {
    try {     const { id } = req.params;
      const categoriaData = req.body;
      const updatedCategoria = await this.categoriaService.updateCategoria( id, categoriaData );
      res.status(200).send({ success: true, message: updatedCategoria });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    } 
  };

  deleteCategoria = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCategoria = await this.categoriaService.deleteCategoria(id);
      res.status(200).send({ success: true, message: deletedCategoria });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }   
  };
}

export default CategoriaController;
