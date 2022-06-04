const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Chats = require("./chat-procesor");

const app = express();

const PORT = 8080;

let productos = [
  {
    title: "Pañal",
    price: 150,
    thumbnail: "http://static1.abc.es/Media/201405/19/panal--644x362.jpg",
    id: 0,
  },
];

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

app.post("/productos", (req, res) => {
  productos = [...productos, { id: productos.length, ...req.body }];
  console.log("Datos de productos: ", req.body);
  io.emit("productos", productos);
});

app.post("/mensaje", async (req, res) => {
  try {
    await Chats.addRegister(req.body);
  } catch (error) {
    console.log(error);
  }
  io.emit("nuevo mensaje", req.body);
});

httpServer.listen(PORT, () => {
  Chats.setArchivo("./mensajes.txt");
  console.log("Servidor funcionando en puerto " + PORT);
});

io.on("connection", (socket) => {
  console.log("Usuario conectado " + socket.id);
  socket.on("nueva conexion", async () => {
    console.log("pasa por nueva conexion");
    socket.emit("productos", productos);
    let mensajes = [];
    try {
      mensajes = await Chats.getAll();
      socket.emit("mensajes", mensajes);
      console.log(mensajes);
    } catch (error) {
      console.log(error);
      socket.emit("mensajes", mensajes);
    }
  });
});
