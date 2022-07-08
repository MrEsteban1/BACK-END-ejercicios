const express = require("express");
const cors = require("cors");

const routerProductos = require("./router/productosRoutes");
const routerCarrito = require("./router/carritoRoutes")

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
