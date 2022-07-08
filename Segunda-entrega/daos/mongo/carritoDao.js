const db = require("../../db/config");
const carritos = require("../../db/models/carrito");
const Contenedor = require("../../contenedores/contenedorMongoDB");

module.exports = class CartDao extends Contenedor {
  constructor() {
    super(db, carritos);
  }

  async addCarrito(req, res) {
    const carrito = {
      fecha: new Date(),
      productos: [{ ...req.body.data }],
    };
    console.log("holaas ", carrito.productos);
    let resultado = await this.addRegister(carrito);
    resultado
      ? res.json({
          estado: "OK",
          data: { id: resultado },
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
      console.log(resultado);
      if (resultado) res.json(resultado);
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
      // console.log("carrito actual: ", ...carrito.productos);
      if (carrito) {
        carrito.productos = [...carrito.productos, req.body.data];
      }
      let respuesta = await this.updateRegister(req.params.id, carrito);
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
      if (carrito) {
        const index = carrito.productos.findIndex((dato) => {
          return dato.id == id_producto;
        });
        carrito.productos = carrito.productos.splice(index, 1);
      }
      console.log("SALIDA: ", carrito.productos);
      console.log("---------------------------------");
      let respuesta = await this.updateRegister(id_carrito, carrito);
      respuesta
        ? res.json({ estado: "OK", data: "Se elimino el producto" })
        : res.json({ estado: "error", descripcion: "No se elimino" });
    } catch (error) {
      console.log(error);
      res.json({ estado: "error", descripcion: "No se elimino" });
    }
  }
};
