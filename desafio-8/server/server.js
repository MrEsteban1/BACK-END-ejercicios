const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Chats = require("./apiChats");
const Productos = require("./apiProducts");


const app = express();
const PORT = 8080;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const mensajesAPI = new Chats()
const productosAPI = new Productos()

// const chatsContenedor = new Contenedor(sqlite,"mensajes")
// const productoContenedor = new Contenedor(mariaDB, "productos")

app.use(express.static("../client/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("../client/public/index.html", { root: __dirname });
});

app.post("/productos", async (req, res) => {
 await productosAPI.agregarProducto(req,res)
 const productos = await productosAPI.conseguirProductos()
  // productos = [...productos, { id: productos.length, ...req.body }];
  console.log("Datos de productos: ", req.body);
  io.emit("productos", productos);
});

app.post("/mensaje", async (req, res) => {
  await mensajesAPI.agregarMensaje(req,res)
  io.emit("nuevo mensaje", req.body);
});

httpServer.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});

io.on("connection", (socket) => {
  console.log("Usuario conectado " + socket.id);
  socket.on("nueva conexion", async () => {
    console.log("pasa por nueva conexion");
    let mensajes = [];
    let productos
    try {
      productos = await productosAPI.conseguirProductos()
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
