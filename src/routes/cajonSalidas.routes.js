import { Router } from "express";
import {
  createSalidaCajon,
  deleteSalidaCajon,
  getSalidaCajon,
  getSalidasCajon,
  updateSalidaCajon,
  updateSalidaEstado,
} from "../controllers/salidaCajon.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/salidas-cajon", auth, getSalidasCajon);

router.post("/salidas-cajon", auth, createSalidaCajon);

router.get("/salidas-cajon/:id", auth, getSalidaCajon);

router.put("/salidas-cajon/:id", auth, updateSalidaCajon);

router.put("/salidas-cajon-estado/:id", auth, updateSalidaEstado);

router.delete("/salidas-cajon/:id", auth, deleteSalidaCajon);

export default router;
