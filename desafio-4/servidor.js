const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const Contenedor = require("../contenedor");
const { Router } = express;

const app = express();
const PORT = 8080;
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname));

router.get("/", async (req, res) => {
  try {
    let contenido = await Contenedor.getAll();
    res.json(contenido);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  let id = req.params.id || -1;
  try {
    let contenido = await Contenedor.readById(id);
    res.json(
      contenido !== null ? contenido : { error: "producto no encontrado" }
    );
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    await Contenedor.addRegister(req.body);
    res.send("Se subio el producto");
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    Contenedor.updateById(req.params.id, req.body);
    res.send("El producto se actualizo");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let resultado = await Contenedor.deleteByID(req.params.id);
    res.send(resultado);
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/productos", router);

app.get("/", () => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(PORT, () => {
  Contenedor.setArchivo("./productos.txt");
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
