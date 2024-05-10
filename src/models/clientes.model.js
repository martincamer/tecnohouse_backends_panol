import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      default: "",
    },
    apellido: {
      type: String,
      required: true,
      default: "",
    },
    fabrica: {
      type: String,
      required: true,
      default: "",
    },
    zona: {
      type: String,
      required: true,
      default: "",
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

export default mongoose.model("Cliente", clientesSchema);
