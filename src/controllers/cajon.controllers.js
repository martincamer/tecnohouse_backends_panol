import Cajon from "../models/cajon.model.js";

export const getCajones = async (req, res) => {
  try {
    const cajones = await Cajon.find({ user: req.user.id }).populate("user");
    res.json(cajones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCajon = async (req, res) => {
  try {
    const { numero_cajon, herramientas } = req.body;

    const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el middleware de autenticación

    const newCajon = new Cajon({
      numero_cajon,
      herramientas,
      user: req.user.id,
    });
    await newCajon.save();

    // Recupera todos los productos del usuario después de actualizar
    const allCajones = await Cajon.find({ user: userId }).populate("user");

    return res.json(allCajones);
    // res.json(newCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCajon = async (req, res) => {
  try {
    const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el middleware de autenticación

    const deletedCajon = await Cajon.findByIdAndDelete(req.params.id);
    if (!deletedCajon)
      return res.status(404).json({ message: "Cajon not found" });

    // return res.sendStatus(204);
    const allCajones = await Cajon.find({ user: userId }).populate("user");

    return res.json(allCajones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCajon = async (req, res) => {
  try {
    const { numero_cajon, herramientas } = req.body;
    const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el middleware de autenticación

    const cajonUpdated = await Cajon.findOneAndUpdate(
      { _id: req.params.id },
      {
        numero_cajon,
        herramientas,
      },
      { new: true }
    );
    // return res.json(cajonUpdated);
    const allCajones = await Cajon.find({ user: userId }).populate("user");

    return res.json(allCajones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCajon = async (req, res) => {
  try {
    const cajon = await Cajon.findById(req.params.id);
    if (!cajon) return res.status(404).json({ message: "Cajon not found" });
    return res.json(cajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
