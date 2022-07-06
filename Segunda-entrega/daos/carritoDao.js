const db = require("../db/config");
const carritos = require("../db/models/carrito");
const Contenedor = require("../contenedores/contenedorMongoDB");

module.exports = class CartDao extends Contenedor {
  constructor() {
    super(db, carritos);
  }

  async addCarrito(req, res) {
    const carrito = {
      fecha: new Date(),
      productos: [{ ...req.body }],
    };
    req.body.data = carrito;

    let resultado = await this.addRegister(req, res);
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el carrito",
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el carrito",
        });
  }

  async getCarritoByID(req, res) {
    let resultado = {};

    try {
      resultado = await this.getRegister(req.params.id);
      if (resultado.length > 0) res.json(datos);
      return;
    } catch (error) {
      console.log(error);
      res.status(400).send("No se pudo conseguir los productos");
    }
  }

  async deleteCarrito(req, res) {
    try {
      const id = req.params.id;
      let resultado = await this.delRegister(id);
      resultado
        ? res.json({
            estado: "OK",
            descripcion: "Se elimino el carrito",
          })
        : res.json({
            estado: "error",
            descripcion: "No se elimino el carrito",
          });
    } catch (error) {
      res.json({
        estado: "error",
        descripcion: "No se elimino el carrito",
      });
    }
  }

  async addProducto(req, res) {
    try {
      let carrito = await this.getRegister(req.params.id);
      console.log(carrito);
      if (carrito.length == 1) {
        carrito[0].productos = [...carrito[0].productos, req.body];
      }
      let respuesta = await this.updateRegister(carrito);
      respuesta
        ? res.json({ estado: "OK", data: "Se agrego el producto" })
        : res.json({ estado: "error", descripcion: "No se pudo actualizar" });
    } catch (error) {
      console.log(error);
      res.json({ estado: "error", descripcion: "No se pudo actualizar" });
    }
  }

  async deleteProducto(req, res) {
    const id_carrito = req.params.id;
    const id_producto = req.params.id_prod;
    try {
      let carrito = await this.getRegister(id_carrito);
      console.log(carrito);
      if (carrito.length == 1) {
        const index = carrito[0].productos.findIndex((dato) => {
          return dato.id == id_producto;
        });
        carrito[0].productos.splice(index, 1);
      }
      let respuesta = await this.updateRegister(carrito);
      respuesta
        ? res.json({ estado: "OK", data: "Se elimino el producto" })
        : res.json({ estado: "error", descripcion: "No se elimino" });
    } catch (error) {
      console.log(error);
      res.json({ estado: "error", descripcion: "No se elimino" });
    }
  }
};
