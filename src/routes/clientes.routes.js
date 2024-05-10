import { Router } from "express";
import {
  addComprobante,
  createCliente,
  deleteCliente,
  getCliente,
  getClientes,
  getComprobantesDelMensuales,
  getComprobantesDelMes,
  updateCliente,
} from "../controllers/clientes.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createClienteSchema } from "../schemas/clientes.schema.js";

const router = Router();

// Obtener todos los clientes asociados a un usuario autenticado
router.get("/clientes", auth, getClientes);

router.patch("/clientes/:id/comprobantes", addComprobante); // Usa 'patch' para agregar objetos

router.get("/clientes/:id/comprobantes-mes", getComprobantesDelMes);

router.get(
  "/clientes/comprobantes-mensuales",
  auth,
  getComprobantesDelMensuales
);

// Crear un nuevo cliente con validación de esquema
router.post(
  "/clientes",
  auth,
  validateSchema(createClienteSchema), // Asegúrate de tener el esquema de validación para clientes
  createCliente
);

// Obtener un cliente por su ID
router.get("/clientes/:id", auth, getCliente);

// Actualizar un cliente por su ID
router.put("/clientes/:id", auth, updateCliente);

// Eliminar un cliente por su ID
router.delete("/clientes/:id", auth, deleteCliente);

export default router;
