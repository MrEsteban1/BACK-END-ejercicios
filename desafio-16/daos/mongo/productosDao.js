const productos = require("../../db/models/productos");
const Contenedor = require("../../contenedores/contenedorMongoDB");
const db = require("../../db/config");

module.exports = class ProductoDao extends Contenedor {
  constructor() {
    super(db, productos);
  }

  async getProducto(id) {
    let resultado = await this.getRegister(id);
    (resultado)
      ? resultado
      : false
  }

  async addProducto(req, res) {
    let resultado = await this.addRegister(req.body.data);
    return resultado
  }

  async updateProducto(id,data) {
    let resultado = await this.updateRegister(id, data);
    return resultado
  }

  async delProduct(id) {
    let resultado = await this.delRegister(id);
    return resultado
  }
};
