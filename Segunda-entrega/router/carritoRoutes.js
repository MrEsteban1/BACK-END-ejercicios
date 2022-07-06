const { Router } = require("express");
const { carrito } = require("../daos/index");

const routerCarrito = Router();

routerCarrito.post("/:id/producto", async (req, res) => {
  return await carrito.addProducto(req, res);
});

routerCarrito.post("/", async (req, res) => {
  return await carrito.addCarrito(req, res);
});

routerCarrito.get("/:id", async (req, res) => {
  return await carrito.getCarritoByID(req, res);
});

routerCarrito.delete("/:id", async (req, res) => {
  return await carrito.deleteCarrito(req, res);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  return await carrito.deleteProducto(req, res);
});

module.exports = routerCarrito;
