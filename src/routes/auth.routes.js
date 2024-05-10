import { Router } from "express";
import {
  editImagenUser,
  editUser,
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.patch("/user/:id", auth, editUser);
router.patch("/user-img/:id", auth, editImagenUser);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;
