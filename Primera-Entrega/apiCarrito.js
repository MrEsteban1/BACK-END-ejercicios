const Contenedor = require("./server/contenedor");

class Carrito {
  constructor() {
    this.contenedor = new Contenedor("./server/carrito.json");
    this.contenedor.setArchivo("./server/carrito.json");
  }

  async addCarrito(req, res) {
    const carrito = {
      id: Date.now + 1,
      timestamp: Date.now,
      productos: [{ ...req.body }],
    };
    try {
      let resultado = await this.contenedor.addCarrito(carrito);
      console.log(resultado);
      resultado
        ? res.json({
            error: "OK",
            descripcion: "Carrito creado",
            id: resultado,
          })
        : res.json({ error: "error", descripcion: "Cargado exitosamente" });
    } catch (error) {
      console.log(error);
      res.json({
        estado: " error",
        descripcion: "Error al cargar el producto",
      });
    }
  }

  async addProduct(req, res) {
    try {
      let resultado = await this.contenedor.addProductCarrito(
        req.params.id,
        req.body
      );
      !resultado
        ? res.json({
            estado: "error",
            descripcion: "No se pudo cargar el producto en el carrito",
          })
        : res.json({ estado: "OK", descripcion: "Se agrego al carrito!" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "No pudo cargarse los productos" });
    }
    return;
  }

  async getCarrito(req, res) {
    try {
      this.contenedor.setArchivo("./server/carrito.json");
      const id = req.params.id;
      if (!!id) {
        const datos = await this.contenedor.readById(id);
        res.json(datos);
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("No se pudo conseguir los productos");
    }
  }

  async deleteCarrito(req, res) {
    try {
      const id = req.params.id;
      let resultado = await this.contenedor.deleteByID(id);
      resultado
        ? res.json({ estado: "OK", descripcion: "Se pudo eliminar" })
        : res.json({
            estado: "error",
            descripcion: "No se encontró carrito para eliminar",
          });
    } catch (error) {
      console.log(error);
      res.json({
        estado: "error",
        descripcion: "No se encontró carrito para eliminar",
      });
    }
  }

  async deleteProduct(req, res) {
    let resultado;
    try {
      resultado = await this.contenedor.eliminateProductoCarrito(
        req.params.id,
        req.params.id_prod
      );
      resultado
        ? res.json({ estado: "OK", descripcion: "Se pudo eliminar" })
        : res.json({
            estado: "error",
            descripcion: "No se encontró producto para eliminar",
          });
    } catch (error) {
      res.json({
        estado: "error",
        descripcion: "No se encontró producto para eliminar",
      });
      console.log(error);
      return;
    }
  }
}

module.exports = new Carrito();
