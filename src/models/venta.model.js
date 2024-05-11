import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    productos: {
      type: Array,
      default: [],
    },
    cliente: {
      type: Object,
      default: {},
    },
    nota: {
      type: String,
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

export default mongoose.model("Venta", ventaSchema);
