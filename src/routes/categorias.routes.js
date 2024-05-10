import { Router } from "express";
import {
  createCategoria,
  deleteCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
} from "../controllers/categorias.controllers.js"; // Importar controladores de categorías en lugar de productos
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCategoriaSchema } from "../schemas/categoria.schema.js"; // Importar esquema de categoría en lugar de producto

const router = Router();

router.get("/categorias", auth, getCategorias); // Cambiar las rutas de productos a categorías

router.post(
  "/categorias",
  auth,
  validateSchema(createCategoriaSchema), // Cambiar al esquema de categoría
  createCategoria // Cambiar al controlador de categoría
);

router.get("/categorias/:id", auth, getCategoria); // Cambiar las rutas de productos a categorías

router.put("/categorias/:id", auth, updateCategoria); // Cambiar las rutas de productos a categorías

router.delete("/categorias/:id", auth, deleteCategoria); // Cambiar las rutas de productos a categorías

export default router;
