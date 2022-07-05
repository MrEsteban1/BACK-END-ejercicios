const express = require("express");

// const Contenedor = require("./contenedores/contenedorMongoDB");
// const productos = require("./db/models/productos");
// const db = require("./db/config");
const routerProductos = require("./router/productosRoutes");
const routerCarrito = require("./router/carritoRoutes")

const cors = require("cors");

const { Router } = express;

const app = express();
PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
