import Color from "../models/color.model.js";

// Obtener todos los colores del usuario
export const getColors = async (req, res) => {
  try {
    const colors = await Color.find({ user: req.user.id });
    res.json(colors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo color
export const createColor = async (req, res) => {
  try {
    const { name } = req.body;
    const nameInUpperCase = name ? name.toUpperCase() : "";

    const newColor = new Color({
      name: nameInUpperCase,
      user: req.user.id,
    });

    await newColor.save();
    res.json(newColor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un color
export const deleteColor = async (req, res) => {
  try {
    const deletedColor = await Color.findByIdAndDelete(req.params.id);
    if (!deletedColor)
      return res.status(404).json({ message: "Color not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un color
export const updateColor = async (req, res) => {
  try {
    const { name, code } = req.body;
    const nameInUpperCase = name ? name.toUpperCase() : "";

    const colorUpdated = await Color.findOneAndUpdate(
      { _id: req.params.id },
      { name: nameInUpperCase, code },
      { new: true }
    );

    return res.json(colorUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un color por ID
export const getColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) return res.status(404).json({ message: "Color not found" });
    return res.json(color);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
