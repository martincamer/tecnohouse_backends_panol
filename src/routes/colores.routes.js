import { Router } from "express";
import {
  createColor, // Controlador para crear colores
  deleteColor, // Controlador para eliminar colores
  getColor, // Controlador para obtener un color específico
  getColors, // Controlador para obtener todos los colores de un usuario
  updateColor, // Controlador para actualizar colores
} from "../controllers/colores.controllers.js"; // Importar controladores de colores
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación
import { validateSchema } from "../middlewares/validator.middleware.js"; // Middleware para validación
import { createColorSchema } from "../schemas/color.schema.js"; // Esquema para validar datos al crear colores

const router = Router();

// Obtener todos los colores para el usuario autenticado
router.get("/colors", auth, getColors);

// Crear un nuevo color (valida usando el esquema para color)
router.post(
  "/colors",
  auth,
  validateSchema(createColorSchema), // Validar con el esquema correcto
  createColor
);

// Obtener un color específico por ID
router.get("/colors/:id", auth, getColor);

// Actualizar un color por ID
router.put("/colors/:id", auth, updateColor);

// Eliminar un color por ID
router.delete("/colors/:id", auth, deleteColor);

export default router;
