const mongoose = require("mongoose");
//productos nombre de coleccion
const productosCollection = "productos";
//producto cracion del modelo
const ProductosSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  nombre: { type: String, require: true, max: 80 },
  precio: { type: Number, require: true },
  imagen: { type: String, require: true },
  stock: { type: Number, require: true },
  descripcion: { type: String, require: true, max: 280 },
});
//creacion del modelo de productos
const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos;
