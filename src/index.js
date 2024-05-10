// import app from "./app.js";
// import { FRONTEND_URL, PORT } from "./config.js";

// import { createServer } from "http";
// import { Server } from "socket.io";

// // Crea el servidor HTTP utilizando Express
// const httpServer = createServer(app);

// // app.use(express.static(resolve("frontend/dist")));

// // Crea el servidor de Socket.io y adjúntalo al servidor HTTP
// const io = new Server(httpServer, {
//   cors: {
//     origin: FRONTEND_URL,
//     credentials: true,
//   },
// });

// // Maneja eventos de Socket.io
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Maneja el evento "nueva-salida"
//   socket.on("crear-producto", (datosSalida) => {
//     console.log("Nuevo producto:", datosSalida);
//     io.emit("crear-producto", datosSalida); // Esto emitirá el evento "nueva-salida" a todos los clientes conectados
//   });
// });

// httpServer.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });

import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error(error);
  }
}

main();
