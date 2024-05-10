import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGO_URL) {
    throw new Error("Please add the MONGO_URL environment variable");
  }

  // if (!"mongodb://127.0.0.1:27017/tecnohouse_pañol") {
  //   throw new Error("Please add the MONGO_URL environment variable");
  // }

  // if (
  //   !"mongodb://mongo:ewvsSdQRijYrJpFkYnCIbviEobUslioo@monorail.proxy.rlwy.net:59925"
  // ) {
  //   throw new Error("Please add the MONGO_URL environment variable");
  // }

  mongoose.connect(process.env.MONGO_URL);
  // mongoose.connect(
  //   "mongodb://mongo:ewvsSdQRijYrJpFkYnCIbviEobUslioo@monorail.proxy.rlwy.net:59925"
  // );

  // mongoose.connect("mongodb://127.0.0.1:27017/tecnohouse_pañol");

  const database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "❌ mongodb connection error")
  );

  database.once("open", () => console.log("✅ mongodb connected successfully"));
}
