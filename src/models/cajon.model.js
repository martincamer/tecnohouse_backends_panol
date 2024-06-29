import mongoose from "mongoose";

const cajonSchema = new mongoose.Schema(
  {
    numero_cajon: {
      type: String,
      required: true,
    },
    herramientas: {
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

export default mongoose.model("Cajon", cajonSchema);
