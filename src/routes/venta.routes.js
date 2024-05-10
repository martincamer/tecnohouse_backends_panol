import { Router } from "express";
import {
  getVentas,
  createVenta,
  deleteVenta,
  getVenta,
  // updateVenta,
  // updateVentaEstado,
  createEntrada,
  getEntradas,
  getEntrada,
} from "../controllers/venta.controllers.js"; // Importar las funciones del controlador
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación
// import { validateSchema } from "../middlewares/validator.middleware.js"; // Middleware de validación (si es necesario)
// import { createVentaSchema } from "../schemas/venta.schema.js"; // Esquema para validar (opcional)

const router = Router();

// Obtener todas las ventas del usuario actual
router.get("/ventas", auth, getVentas); // Aplica autenticación antes de obtener las ventas

router.get("/entradas", auth, getEntradas); // Aplica autenticación antes de obtener las ventas

// Crear una nueva venta con validación de esquema
router.post(
  "/ventas",
  auth, // Autenticación
  createVenta // Controlador para crear una venta
);

// Obtener una venta por ID
router.get("/ventas/:id", auth, getVenta); // Autenticación y obtener venta por ID

// router.put("/ventas-estado/:id", auth, updateVentaEstado); // Autenticación y obtener venta por ID

// // Actualizar una venta por ID
// router.put("/ventas/:id", auth, updateVenta); // Autenticación y actualización por ID

// Eliminar una venta por ID
router.delete("/ventas/:id", auth, deleteVenta); // Autenticación y eliminación por ID

router.post(
  "/entrada",
  auth, // Autenticación
  createEntrada // Controlador para crear una venta
);
router.get("/entrada/:id", auth, getEntrada); // Autenticación y obtener venta por ID

export default router;
