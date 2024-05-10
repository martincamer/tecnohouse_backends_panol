import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imagen_usuario: {
      type: String,
      default: "",
    },
    cuenta: {
      type: String,
      default: "desactivada",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
