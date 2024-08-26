import Producto from "../models/productos.model.js";

export const getProductos = async (req, res) => {
  try {
    const tasks = await Producto.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProductos = async (req, res) => {
  try {
    const {
      codigo,
      detalle,
      imagen,
      color,
      categoria,
      tipo,
      stock,
      stock_minimo,
      stock_maximo,
      date,
    } = req.body;
    const newProducto = new Producto({
      codigo,
      detalle,
      imagen,
      color,
      categoria,
      tipo,
      stock,
      stock_minimo,
      stock_maximo,
      date,
      user: req.user.id,
    });
    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductos = async (req, res) => {
  try {
    const deletedTask = await Producto.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Producto not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// export const updateProductos = async (req, res) => {
//   try {
//     const {
//       codigo,
//       detalle,
//       imagen,
//       color,
//       categoria,
//       tipo,
//       stock,
//       stock_minimo,
//       stock_maximo,
//       date,
//     } = req.body;

//     const productoUpdated = await Producto.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         codigo,
//         detalle,
//         imagen,
//         color,
//         categoria,
//         tipo,
//         stock,
//         stock_minimo,
//         stock_maximo,
//         date,
//       },
//       { new: true }
//     );
//     return res.json(productoUpdated);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
export const updateProductos = async (req, res) => {
  try {
    let {
      codigo,
      detalle,
      imagen,
      color,
      categoria,
      tipo,
      stock,
      stock_minimo,
      stock_maximo,
      date,
    } = req.body;

    // Convertir los valores de los campos String a mayúsculas
    codigo = codigo?.toUpperCase();
    detalle = detalle?.toUpperCase();
    imagen = imagen?.toUpperCase();
    color = color?.toUpperCase();
    categoria = categoria?.toUpperCase();
    tipo = tipo?.toUpperCase();

    const productoUpdated = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      {
        codigo,
        detalle,
        imagen,
        color,
        categoria,
        tipo,
        stock,
        stock_minimo,
        stock_maximo,
        date,
      },
      { new: true }
    );

    return res.json(productoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductoStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const productId = req.params.id;
    const userId = req.user.id; // Obtiene el ID del usuario autenticado desde el middleware de autenticación

    // Verifica si el producto pertenece al usuario autenticado
    const producto = await Producto.findOne({ _id: productId, user: userId });

    if (!producto) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado o no autorizado" });
    }

    // Actualiza el stock del producto
    producto.stock = stock;
    await producto.save();

    // Recupera todos los productos del usuario después de actualizar
    const allProducts = await Producto.find({ user: userId }).populate("user");

    return res.json(allProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProducto = async (req, res) => {
  try {
    const task = await Producto.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Producto not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
