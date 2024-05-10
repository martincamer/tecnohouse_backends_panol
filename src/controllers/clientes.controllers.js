import mongoose from "mongoose"; // Importar mongoose para ObjectId y acceso a la base de datos
import Cliente from "../models/clientes.model.js"; // Importar modelo Cliente
import dayjs from "dayjs"; // Importar dayjs para manipulación de fechas
import isBetween from "dayjs/plugin/isBetween.js"; // Asegúrate de usar la extensión correcta

dayjs.extend(isBetween);

// Obtener todos los clientes asociados al usuario
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({ user: req.user.id }).populate("user");
    res.json(clientes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, fabrica, zona } = req.body;

    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      fabrica,
      zona,
      user: req.user.id,
    });

    await nuevoCliente.save();
    res.json(nuevoCliente);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addComprobante = async (req, res) => {
  try {
    const { id } = req.params; // ID del cliente
    const nuevoComprobante = req.body; // Datos del nuevo comprobante

    // Verifica si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Encuentra al cliente por ID
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Agrega el nuevo comprobante a la lista de comprobantes del cliente
    cliente.comprobantes.push(nuevoComprobante);

    // Actualiza el total del cliente sumando el total del nuevo comprobante
    cliente.total = (cliente.total || 0) - Number(nuevoComprobante.total);

    // Guarda el cliente actualizado
    await cliente.save();

    // Devuelve el cliente actualizado
    res.json(cliente);
  } catch (error) {
    console.error("Error al agregar comprobante:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getComprobantesDelMes = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const cliente = await Cliente.findById(id); // Buscar al cliente por ID

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" }); // Error si el cliente no existe
    }

    const inicioMes = dayjs().startOf("month"); // Inicio del mes actual
    const finMes = dayjs().endOf("month"); // Fin del mes actual

    // Filtrar comprobantes del mes actual
    const comprobantesDelMes = cliente.comprobantes.filter(
      (comprobante) => dayjs(comprobante.date).isBetween(inicioMes, finMes) // Usar isBetween para filtrar por mes
    );

    res.json(comprobantesDelMes); // Devolver los comprobantes del mes actual
  } catch (error) {
    console.error("Error obteniendo comprobantes del mes:", error); // Manejo de errores
    res.status(500).json({ message: error.message }); // Responder con error 500 en caso de problemas
  }
};

// Eliminar un cliente por su ID
export const deleteCliente = async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado)
      return res.status(404).json({ message: "Empleado no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un cliente por su ID
export const updateCliente = async (req, res) => {
  try {
    const { nombre, apellido, fabrica, zona } = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        fabrica,
        zona,
      },
      { new: true }
    );

    if (!clienteActualizado)
      return res.status(404).json({ message: "Cliente no encontrado" });

    return res.json(clienteActualizado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por su ID
export const getCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComprobantesDelMensuales = async (req, res) => {
  try {
    // Verificar que req.user.id esté definido
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const inicioMes = dayjs().startOf("month").toDate(); // Inicio del mes actual
    const finMes = dayjs().endOf("month").toDate(); // Fin del mes actual

    // Buscar todos los clientes para el usuario autenticado
    const clientes = await Cliente.find({ user: userId });

    // Obtener todos los comprobantes del mes actual de esos clientes
    const comprobantesDelMes = clientes.flatMap((cliente) =>
      cliente.comprobantes.filter(
        (comprobante) =>
          dayjs(comprobante.date).isBetween(inicioMes, finMes, null, "[]") // Filtrar por fechas del mes actual
      )
    );

    res.json(comprobantesDelMes); // Devolver los comprobantes del mes actual para el usuario autenticado
  } catch (error) {
    console.error("Error obteniendo comprobantes del mes:", error); // Manejo de errores
    res.status(500).json({ message: "Error del servidor" }); // Responder con error 500 en caso de problemas
  }
};
