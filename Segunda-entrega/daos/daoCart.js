const db = require("../db/config");
const carritos = require("../db/models/carrito");
const Contenedor = require("../contenedores/contenedorMongoDB");
class CartDao extends Contenedor {
  constructor() {
    super(db, carritos);
  }

  async addCarrito(req, res) {
    const carrito = {
      fecha: new Date(),
      productos: [{ ...req.body }],
    };
    this.db.then((_) => this.model({ ...carrito }).save());
  }
}
