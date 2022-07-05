const mongoose = require("mongoose");

const productosCollection = "carritos";

const ProductosSchema = new mongoose.Schema({});

const carritos = mongoose.model(productosCollection, ProductosSchema);

module.exports = carritos;
