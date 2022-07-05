const mongoose = require("mongoose");
const productos = require("./db/models/productos");

const CRUD = async () => {
  try {
    const URL = "mongodb://localhost:27017/ibizadeco";
    await mongoose
      .connect(URL, {
        useNewUrlParser: true,
      })
      .then((_) =>
        productos.insertMany({
          fecha: new Date(),
          nombre: "Lampara Mesa",
          precio: 400,
          imagen:
            "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
          stock: 6,
          descripcion: "Lampara para iluminar habitaciones",
        })
      )
      .then((e) => console.log(e));
    // .then(
    //   console.log(await mensajes.save({}))
    // );
    console.log("Base de datos conectada!");
  } catch (error) {
    console.log("--------ERROR------------");
    console.log(error);
  }
};

CRUD();
