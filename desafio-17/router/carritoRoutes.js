const { Router } = require("express");
const carritoController = require("../controllers/carritoController");
const { carrito } = require("../daos/index");
const sendEmail = require("../service/nodemailer");
const sendWpp = require("../service/twilio");

const routerCarrito = Router();

routerCarrito.post("/:id/producto", async (req, res) => {
  return await carritoController.addProducto(req,res)
  // return await carrito.addProducto(req, res);
});

routerCarrito.post("/", async (req, res) => {
  return await carritoController.addCarrito(req,res)
  // return await carrito.addCarrito(req, res);
});

routerCarrito.get("/:id", async (req, res) => {
  return await carritoController.getCarritoByID(req,res)
  // return await carrito.getCarritoByID(req, res);
});

routerCarrito.delete("/:id", async (req, res) => {
  return await carritoController.delCarritoByID(req,res)
  // return await carrito.deleteCarrito(req, res);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  return await carritoController.delProducto(req,res)
  // return await carrito.deleteProducto(req, res);
});

routerCarrito.post("/pedido", async (req, res) => {
  return await carritoController.recibirPediodo(req,res)
});

module.exports = routerCarrito;
