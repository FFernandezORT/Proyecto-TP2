class CategoriaServices {
  constructor(categoria, eventos) {
    this.categoria = categoria;
    this.eventos = eventos;
  }

  getAllCategorias = async () => {
    return await this.categoria.findAll({
      include: {
        model: this.eventos,
        attributes: ['id', 'titulo', 'descripcion', 'fecha', 'ubicacion'],
      },
    });
  };

  getCategoriaById = async (id) => {
    const categoria = await this.categoria.findOne({
      where: { id },
      include: {
        model: this.eventos,
        attributes: ['id', 'titulo', 'descripcion', 'fecha', 'ubicacion'],
      },
    });
    if (!categoria) throw new Error('Categoría no encontrada.');
    return categoria;
  };

  createCategoria = async (categoriaData) => {
    return await this.categoria.create(categoriaData);
  };

  updateCategoria = async (id, categoriaData) => {
    const categoria = await this.categoria.update(categoriaData, {
      where: { id },
    });
    return categoria;
  };

  deleteCategoria = async (id) => {
    return await this.categoria.destroy({ where: { id } });
  };
}

export default CategoriaServices;