const { Router } = require("express");
const Contenedor = require("../contenedores/contenedorMongoDB");
const db = require("../db/config");
const productos = require("../db/models/productos");

const contenedor = new Contenedor(db, productos);
const productosRouter = Router();

productosRouter.get("/:id?", (req, res) => {
  return contenedor.getRegister(req, res);
});

productosRouter.post("/", (req, res) => {
  return contenedor.addRegister(req, res);
});

productosRouter.put("/:id", (req, res) => {
  return contenedor.updateRegister(req, res);
});

productosRouter.delete("/:id", (req, res) => {
  return Productos.deleteProduct(req, res);
});

module.exports = productosRouter;
