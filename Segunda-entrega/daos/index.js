let daoCarritoMongo = require("./carritoDao");
let daoProductoMongo = require("./productosDao");

let contenedor = "mongodb";
let Daos = {};

switch (contenedor) {
  case "mongodb":
    Daos.carrito = new daoCarritoMongo();
    Daos.productos = new daoProductoMongo();
    break;
  default:
    Daos.carrito = new daoCarritoMongo();
    Daos.productos = new daoProductoMongo();
    break;
}

module.exports = Daos;
