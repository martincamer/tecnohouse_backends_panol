import mongoose from "mongoose";

const productosSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    detalle: {
      type: String,
      required: true,
    },
    imagen: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    stock_minimo: {
      type: Number,
      default: 0,
    },
    stock_maximo: {
      type: Number,
      default: 0,
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

// Middleware para convertir los valores en mayúsculas antes de guardar
productosSchema.pre("save", function (next) {
  this.codigo = this.codigo.toUpperCase();
  this.detalle = this.detalle.toUpperCase();
  this.color = this.color.toUpperCase();
  this.categoria = this.categoria.toUpperCase();
  this.tipo = this.tipo.toUpperCase();

  next();
});

export default mongoose.model("Producto", productosSchema);
