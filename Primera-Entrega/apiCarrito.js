const Contenedor = require("./server/contenedor");

class Carrito {
  constructor() {
    Contenedor.setArchivo("./server/carrito.json");
  }

  async addCarrito(req, res) {
    try {
      let resultado = await Contenedor.addRegister(req.body);
      console.log(resultado);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "No pudo crear el carrito" });
    }
  }

  async addProduct(req, res) {
    try {
      let resultado = await Contenedor.addProductCarrito(req.body);
      if (resultado) res.status(400).send({ error: "No se encontro el dato" });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "No pudo cargarse los productos" });
    }

    this.productos.push({
      id: parseInt(Date.now()) + 1,
      timestamp: Date.now(),
      ...req.body.data,
    });
    res.send("cargado");
    return;
  }

  async getProducts(req, res) {
    const id = req.params.id;
    if (!!id) {
      res.json(this.productos.filter((dato) => dato.id === id));
      return;
    } else return res.json(this.productos);
  }

  deleteProduct() {
    const index = this.productos.findIndex(
      (e) => e.id === parseInt(req.params.id)
    );

    this.productos.splice(index, 1);

    res.send("Se borro el dato");
    return;
  }
}

module.exports = new Carrito();
