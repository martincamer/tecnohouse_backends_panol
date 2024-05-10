import Categoria from "../models/categorias.model.js";

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find({ user: req.user.id });
    res.json(categorias);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCategoria = async (req, res) => {
  try {
    // Convierte el campo 'detalle' a mayúsculas
    const { detalle } = req.body;
    const detalleEnMayusculas = detalle ? detalle.toUpperCase() : "";

    // Crea la nueva categoría con el detalle en mayúsculas
    const newCategoria = new Categoria({
      detalle: detalleEnMayusculas,
      user: req.user.id,
    });

    // Guarda la categoría en la base de datos
    await newCategoria.save();

    // Devuelve la categoría recién creada como respuesta
    res.json(newCategoria);
  } catch (error) {
    // En caso de error, devuelve un estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const deletedCategoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!deletedCategoria)
      return res.status(404).json({ message: "Categoría not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    // Convierte el campo 'detalle' a mayúsculas antes de actualizar
    const { detalle } = req.body;
    const detalleEnMayusculas = detalle ? detalle.toUpperCase() : "";

    const categoriaUpdated = await Categoria.findOneAndUpdate(
      { _id: req.params.id },
      { detalle: detalleEnMayusculas },
      { new: true }
    );

    // Devuelve la categoría actualizada
    return res.json(categoriaUpdated);
  } catch (error) {
    // En caso de error, devuelve un estado 500 y el mensaje de error
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria)
      return res.status(404).json({ message: "Categoría not found" });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
