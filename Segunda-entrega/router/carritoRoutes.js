const { Router } = require("express");

const routerCarrito = Router();

routerCarrito.post("/:id/producto", async (req, res) => {
  return await Carritos.addProduct(req, res);
});

routerCarrito.post("/", async (req, res) => {
  return await Carritos.addCarrito(req, res);
});

routerCarrito.get("/:id", async (req, res) => {
  console.log("hola");
  return await Carritos.getCarrito(req, res);
});

routerCarrito.delete("/:id", async (req, res) => {
  return await Carritos.deleteCarrito(req, res);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  return await Carritos.deleteProduct(req, res);
});

module.exports = routerCarrito;
