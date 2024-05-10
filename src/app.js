import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import coloresRoutes from "./routes/colores.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import ventasRoutes from "./routes/venta.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";
import { FRONTEND_URL } from "./config.js";

const app = express();
const port = process.env.PORT || 3000; // Define el puerto del servidor

// Middlewares
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => res.json({ message: "Welcome to my API" }));

// Conectar a la base de datos y luego iniciar el servidor
// connectDB()
//   .then((db) => {
//     app.get("/api/ping", async (req, res) => {
//       return res.json({ message: "Pong" });
//     });

// Middleware de error para la conexión de base de datos
// app.use((req, res, next) => {
//   req.db = db; // Adjunta la conexión de base de datos al objeto de solicitud
//   next();
// });

app.use("/api/auth", authRoutes);
app.use("/api", productosRoutes);
app.use("/api", categoriasRoutes);
app.use("/api", coloresRoutes);
app.use("/api", clientesRoutes);
app.use("/api", ventasRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html"));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

// Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });
// })
// .catch((error) => {
//   console.error("Error al conectar a la base de datos", error);
//   process.exit(1); // Finalizar la aplicación con un código de error
// });

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

// Cerrar la conexión a la base de datos cuando el servidor se cierra
app.on("close", () => {
  console.log("Cerrando conexión a la base de datos");
  connectDB.close(); // Cierra la conexión a la base de datos
});

export default app;
