import SalidaCajon from "../models/salidaCajon.models.js";

export const getSalidasCajon = async (req, res) => {
  try {
    const salidasCajon = await SalidaCajon.find({ user: req.user.id }).populate(
      "user"
    );
    res.json(salidasCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSalidaCajon = async (req, res) => {
  try {
    const { nombre_apellido, zona_localidad, cajon_seleccionado } = req.body;

    const userId = req.user.id;

    const newSalidaCajon = new SalidaCajon({
      nombre_apellido,
      zona_localidad,
      cajon_seleccionado,
      user: userId,
    });
    await newSalidaCajon.save();

    const allSalidasCajon = await SalidaCajon.find({ user: userId }).populate(
      "user"
    );

    return res.json(allSalidasCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSalidaCajon = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedSalidaCajon = await SalidaCajon.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSalidaCajon)
      return res.status(404).json({ message: "SalidaCajon not found" });

    const allSalidasCajon = await SalidaCajon.find({ user: userId }).populate(
      "user"
    );

    return res.json(allSalidasCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSalidaCajon = async (req, res) => {
  try {
    const { nombre_apellido, zona_localidad, cajon_seleccionado } = req.body;
    const userId = req.user.id;

    const salidaCajonUpdated = await SalidaCajon.findOneAndUpdate(
      { _id: req.params.id },
      {
        nombre_apellido,
        zona_localidad,
        cajon_seleccionado,
      },
      { new: true }
    );

    const allSalidasCajon = await SalidaCajon.find({ user: userId }).populate(
      "user"
    );

    return res.json(allSalidasCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateSalidaEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const userId = req.user.id;

    const salidaCajonUpdated = await SalidaCajon.findOneAndUpdate(
      { _id: req.params.id },
      {
        estado,
      },
      { new: true }
    );

    const allSalidasCajon = await SalidaCajon.find({ user: userId }).populate(
      "user"
    );

    return res.json(allSalidasCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSalidaCajon = async (req, res) => {
  try {
    const salidaCajon = await SalidaCajon.findById(req.params.id);
    if (!salidaCajon)
      return res.status(404).json({ message: "SalidaCajon not found" });
    return res.json(salidaCajon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
