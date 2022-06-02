const express = require("express");
const Contenedor = require("../contenedor");
const { Router } = express;
const { engine } = require("express-handlebars");

const app = express();
const PORT = 8080;
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname));

const engienFn = engine({
  extname: ".hbs",
  defaultLayout: `${__dirname}/views/index.hbs`,
  layoutsDir: `${__dirname}/views/layouts`,
});

app.engine("hbs", engienFn);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/productos", (req, res) => {
  res.render("form");
});

router.get("/", async (req, res) => {
  try {
    let contenido = await Contenedor.getAll();
    res.render("layouts/productos", { productos: contenido });
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/productos", router);

const server = app.listen(PORT, () => {
  Contenedor.setArchivo("./productos.txt");
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
