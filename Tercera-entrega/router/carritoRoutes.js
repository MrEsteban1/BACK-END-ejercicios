const { Router } = require("express");
const { carrito } = require("../daos/index");
const sendEmail = require("../service/nodemailer");
const sendWpp = require("../service/twilio");

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

routerCarrito.post("/pedido", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const texto = `
    Hola ${data.nombre}!
    Tu pedido es el siguiente:
    ${data.productos
      .map((producto) => `${producto.nombre} a $ ${producto.precio} \n`)
      .join("")}
  `;
  try {
    let resultadoMail = await sendEmail(
      "estebangonz98@gmail.com",
      texto,
      "Nuevo pedido de " + data.nombre
    );
    let resultadoWpp = await sendWpp(texto)
      .then((response) => response)
      .catch((_) => false);
    console.log("responseee", resultadoWpp);
    resultadoWpp && resultadoMail
      ? res.json({ estado: true })
      : res.json({ estado: false });
  } catch (error) {
    console.log(error);
    res.json({ estado: false });
  }
  console.log(texto);
  // res.json({ estado: true });
});

module.exports = routerCarrito;
