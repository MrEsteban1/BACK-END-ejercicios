const express = require("express");
const Carritos = require("./apiCarrito");
const Productos = require("./apiProductos");

const { Router } = express;

const app = express();
PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router_productos = Router();
const router_carrito = Router();

router_productos.get("/:id?", (req, res) => {
  return Productos.getProducts(req, res);
});

router_productos.post("/", (req, res) => {
  return Productos.addProduct(req, res);
});

router_productos.put("/:id", (req, res) => {
  return Productos.updateProduct(req, res);
});

router_productos.delete("/:id", (req, res) => {
  return Productos.deleteProduct(req, res);
});

router_carrito.post("/:id/producto", async (req,res)=>{
  return await Carritos.addProduct(req,res)
})

router_carrito.post("/", async (req, res) => {
  console.log(req.body);
  return await Carritos.addCarrito(req, res);
});

router_carrito.get("/:id", async (req, res) => {
  console.log("hola");
  return await Carritos.getCarrito(req,res);
});

router_carrito.delete("/:id",async (req,res)=>{
  return await Carritos.deleteCarrito(req,res)
})

router_carrito.delete("/:id/productos/:id_prod", async(req,res)=>{
  return await Carritos.deleteProduct(req,res)
})

app.use("/api/productos", router_productos);
app.use("/api/carrito", router_carrito);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
