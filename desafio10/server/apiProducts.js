const Contenedor = require("./contenedor");
const db = require("../db/config");
const productos = require("../db/models/productos");
const faker = require("faker");

module.exports = class Productos {
  constructor() {
    this.Contenedor = new Contenedor(db, productos);
  }

  async agregarProducto(req, res) {
    let resultado;
    try {
      resultado = await this.Contenedor.addRegister(req.body);
    } catch (error) {
      console.log(error);
      resultado = false;
    }

    // resultado ? res.json({estado:"OK",  }) : res.json({esatado: "error", descripcion: "No se cargaron los datos"})
  }

  async conseguirProductos() {
    let resultado;
    try {
      resultado = await this.Contenedor.getRegister();
    } catch (error) {
      console.log(error);
      resultado = false;
    }
    return resultado;
  }

  async productosAzar(cantidad) {
    let productos = [];
    for (let i = 0; i < cantidad; i++) {
      productos.push({
        id: 1,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
      });
    }

    return productos;
  }
};
