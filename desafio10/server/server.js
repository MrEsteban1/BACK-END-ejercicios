const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Chats = require("./apiChats");
const Productos = require("./apiProducts");
const faker = require("faker");

const app = express();
const PORT = 8080;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const mensajesAPI = new Chats();
const productosAPI = new Productos();

app.use(express.static("../client/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("../client/public/index.html", { root: __dirname });
});

app.post("/productos", async (req, res) => {
  await productosAPI.agregarProducto(req, res);
  const productos = await productosAPI.conseguirProductos();
  // productos = [...productos, { id: productos.length, ...req.body }];
  console.log("Datos de productos: ", req.body);
  io.emit("productos", productos);
});

io.on("connection", async (socket) => {
  console.log("Usuario conectado " + socket.id);
  socket.on("nueva conexion", async () => {
    console.log("pasa por nueva conexion");
    let mensajes = [];
    let productos;
    try {
      productos = await productosAPI.productosAzar(5);
      socket.emit("productos", productos);
      mensajes = await mensajesAPI.conseguirMensajes();
      socket.emit("mensajes", mensajes);
      console.log(mensajes);
    } catch (error) {
      console.log(error);
      socket.emit("mensajes", mensajes);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});
