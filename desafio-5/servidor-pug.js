const express = require("express");
const Contenedor = require("../contenedor");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/productos", async (re1, res) => {
  res.render("index");
});

app.get("/", async (req, res) => {
  try {
    let contenido = await Contenedor.getAll();
    res.render("productos", { productos: contenido });
  } catch (error) {
    console.log(error);
  }
});

app.post("/producto", async (req, res) => {
  try {
    await Contenedor.addRegister(req.body);
  } catch (error) {
    console.log(error);
  }
});

const server = app.listen(PORT, () => {
  Contenedor.setArchivo("./productos.txt");
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
