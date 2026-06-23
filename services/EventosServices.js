class EventosServices {
  constructor(eventos, categoria) {
    this.eventos = eventos;
    this.categoria = categoria;
  }

  getEventoById = async (id) => {
    const evento = await this.eventos.findByPk(id, {
      include: {
        model: this.categoria,
        attributes: ["id", "nombre"],
      },
    });
    if (!evento) throw new Error("Evento no encontrado.");
    return evento;
  };

  createEvento = async ({ titulo, descripcion, fecha, ubicacion, categoriaId }) => {
    if (categoriaId) {
      const categoriaExists = await this.categoria.findByPk(categoriaId);
      if (!categoriaExists) throw new Error("La categoría especificada no existe.");
    }
    return await this.eventos.create({ titulo, descripcion, fecha, ubicacion, categoriaId });
  };

  updateEvento = async (id, { titulo, descripcion, fecha, ubicacion, categoriaId }) => {
    const evento = await this.eventos.findByPk(id);
    if (!evento) throw new Error("Evento no encontrado para actualizar.");

    if (categoriaId) {
      const categoriaExists = await this.categoria.findByPk(categoriaId);
      if (!categoriaExists) throw new Error("La nueva categoría especificada no existe.");
    }

    await evento.update({
      titulo: titulo || evento.titulo,
      descripcion: descripcion || evento.descripcion,
      fecha: fecha || evento.fecha,
      ubicacion: ubicacion || evento.ubicacion,
      categoriaId: categoriaId || evento.categoriaId,
    });
    return evento;
  };

  deleteEvento = async (id) => {
    const evento = await this.eventos.findByPk(id);
    if (!evento) throw new Error("Evento no encontrado para eliminar.");
    await evento.destroy();
    return { message: "Evento eliminado correctamente." };
  };
}

export default EventosServices;