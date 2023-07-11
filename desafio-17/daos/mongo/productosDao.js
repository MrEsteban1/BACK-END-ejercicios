const productos = require("../../db/models/productos");
const Contenedor = require("../../contenedores/contenedorMongoDB");
const db = require("../../db/config");
const { loggerConsola } = require("../../logs4js");

module.exports = class ProductoDao extends Contenedor {
  constructor() {
    super(db, productos);
  }

  async getProducto(id) {
    return await this.getRegister(id);
  }

  async addProducto(data) {
    return await this.addRegister(data);
  }

  async updateProducto(id,data) {
    return await this.updateRegister(id, data);
  }

  async delProduct(id) {
    return await this.delRegister(id);
  }
};
