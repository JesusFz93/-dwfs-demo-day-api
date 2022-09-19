const Product = require("../models/product");

const obtenerProductos = async (req, res) => {
  const productos = await Product.find();

  return res.json({
    msg: "Lista de productos obtenida",
    data: productos,
  });
};

const obtenerProducto = async (req, res) => {
  const { idProducto } = req.params;
  const producto = await Product.findById(idProducto);

  return res.json({
    msg: "Producto obtenido",
    data: producto,
  });
};

const crearProducto = async (req, res) => {
  const { name, description, price } = req.body;

  const producto = {
    name,
    description,
    price,
  };

  const nuevoProducto = await Product.create(producto);

  return res.json({
    msg: "Producto creado",
    data: nuevoProducto,
  });
};

const actualizarProducto = async (req, res) => {
  const { idProducto } = req.params;
  const { name, description, price } = req.body;

  const producto = {
    name,
    description,
    price,
  };

  const productoActualizado = await Product.findByIdAndUpdate(
    idProducto,
    producto,
    { new: true }
  );

  return res.json({
    msg: "Producto actualizado",
    data: productoActualizado,
  });
};

const eliminarProducto = async (req, res) => {
  const { idProducto } = req.params;

  const productoEliminado = await Product.findByIdAndRemove(idProducto);

  return res.json({
    msg: "Producto eliminado",
    data: productoEliminado,
  });
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
};
