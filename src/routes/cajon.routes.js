import { Router } from "express";
import {
  createCajon,
  deleteCajon,
  getCajon,
  getCajones,
  updateCajon,
} from "../controllers/cajon.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/cajones", auth, getCajones);

router.post("/cajones", auth, createCajon);

router.get("/cajones/:id", auth, getCajon);

router.put("/cajones/:id", auth, updateCajon);

router.put("/cajones-herramientas/:id", auth, updateCajon);

router.delete("/cajones/:id", auth, deleteCajon);

export default router;
