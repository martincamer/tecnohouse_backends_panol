import mongoose from "mongoose";

const entradaSchema = new mongoose.Schema(
  {
    proveedor_factura: {
      type: String,
      required: true,
    },
    numero_factura: {
      type: String,
      required: true,
    },
    productos: {
      type: Array,
      default: [],
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

export default mongoose.model("Entrada", entradaSchema);
