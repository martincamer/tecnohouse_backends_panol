import mongoose from "mongoose";

const salidaCajonSchema = new mongoose.Schema(
  {
    nombre_apellido: {
      type: String,
      required: true,
    },
    zona_localidad: {
      type: String,
      required: true,
    },
    cajon_seleccionado: {
      type: Array,
      default: [],
    },
    estado: {
      type: String,
      enum: ["en viaje", "en fabrica", "perdido"],
      default: "en viaje",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SalidaCajon", salidaCajonSchema);
