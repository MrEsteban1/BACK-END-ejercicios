const express = require("express");

// const Contenedor = require("./contenedores/contenedorMongoDB");
// const productos = require("./db/models/productos");
// const db = require("./db/config");
const routerProductos = require("./router/productosRoutes");

const cors = require("cors");

const { Router } = express;

const app = express();
PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const router_carrito = Router();

router_carrito.post("/:id/producto", async (req, res) => {
  return await Carritos.addProduct(req, res);
});

router_carrito.post("/", async (req, res) => {
  return await Carritos.addCarrito(req, res);
});

router_carrito.get("/:id", async (req, res) => {
  console.log("hola");
  return await Carritos.getCarrito(req, res);
});

router_carrito.delete("/:id", async (req, res) => {
  return await Carritos.deleteCarrito(req, res);
});

router_carrito.delete("/:id/productos/:id_prod", async (req, res) => {
  return await Carritos.deleteProduct(req, res);
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", router_carrito);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
