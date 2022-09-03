const productos = require("../../db/models/productos");
const Contenedor = require("../../contenedores/contenedorMongoDB");
const db = require("../../db/config");

module.exports = class ProductoDao extends Contenedor {
  constructor() {
    super(db, productos);
  }

  async getProducto(req, res) {
    let resultado = await this.getRegister(req.params.id);
    resultado
      ? res.json({
          estado: "OK",
          data: resultado,
        })
      : res.json({
          estado: "error",
          descripcion: "No se elimino el producto",
        });
  }

  async addProducto(req, res) {
    let resultado = await this.addRegister(req.body.data);
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el producto",
        });
  }

  async updateProducto(req, res) {
    const id = req.params.id;
    let resultado = await this.updateRegister(id, req.body.data);
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el producto",
        });
  }

  async delProduct(req, res) {
    let resultado = await this.delRegister(req.params.id);
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se elimino el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se elimino el producto",
        });
  }
};
