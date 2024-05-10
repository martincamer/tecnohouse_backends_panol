import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res.status(400).json({
        message: ["The username does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      httpOnly: false,
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
      imagen: userFound.imagen_usuario,
      date: userFound.createdAt,
      cuenta: userFound.cuenta,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      password: userFound.password,
      imagen: userFound.imagen_usuario,
      date: userFound.createdAt,
      cuenta: userFound.cuenta,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const {
      imagen_facturacion,
      dni_facturacion,
      telefono_facturacion,
      email_facturacion,
      localidad_facturacion,
      provincia_facturacion,
    } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (imagen_facturacion) {
      user.imagen_facturacion = imagen_facturacion;
    }

    if (dni_facturacion) {
      user.dni_facturacion = dni_facturacion;
    }

    if (telefono_facturacion) {
      user.telefono_facturacion = telefono_facturacion;
    }

    if (email_facturacion) {
      user.email_facturacion = email_facturacion;
    }

    if (localidad_facturacion) {
      user.localidad_facturacion = localidad_facturacion;
    }

    if (provincia_facturacion) {
      user.provincia_facturacion = provincia_facturacion;
    }

    await user.save();

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      user: {
        id: user._id,
        imagen_facturacion: user.imagen_facturacion,
        dni_facturacion: user.dni_facturacion,
        telefono_facturacion: user.telefono_facturacion,
        email_facturacion: user.email_facturacion,
        localidad_facturacion: user.localidad_facturacion,
        provincia_facturacion: user.provincia_facturacion,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editImagenUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { imagen_usuario } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (imagen_usuario) {
      user.imagen_usuario = imagen_usuario;
    }

    await user.save();

    return res.status(200).json({
      message: "Imagen actualizada exitosamente",
      user: {
        id: user._id,
        imagen_usuario: user.imagen_usuario,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
