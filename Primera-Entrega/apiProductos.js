const Contenedor = require("./server/contenedor");

class Productos {
  constructor() {
    Contenedor.setArchivo("./server/productos.json");
  }

  async getProducts(req, res) {
    const id = req.params.id;
    try {
      if (!!id) {
        let resultado = await Contenedor.readById(id);
        console.log(resultado);
        res.json(resultado);
        return;
      }
      let resultado = await Contenedor.getAll();
      res.json(resultado);
      return;
    } catch (error) {
      console.log(error);
      res.status("400").send("No se pudo cargar");
    }

    return;
  }

  async addProduct(req, res) {
    console.log(req.body.administrador, !!!req.body.administrador);
    if (!!!req.body.administrador) {
      res.json({
        estado: "error",
        descripcion: "No es administrador",
      });
      return;
    }
    if (!!req.body.data.nombre !== "")
      return res.json({
        estado: "error",
        descripcion: "No se envio informacion correcta",
      });
    try {
      let resultado = await Contenedor.addRegister({
        id: Date.now(),
        ...req.body.data,
      });
      return res.json({ estado: "OK" });
    } catch (error) {
      return res.json({
        estado: "error",
        descripcion: "Error en la carga de producto",
      });
    }
  }

  updateProduct(req, res) {
    if (!!!req.body.administrador) {
      res.json({ estado: "No se permite la accion" });
      return;
    }
    if (!!!req.body.data.title) {
      res.json({ estado: "No se envio informacion correcta " });
      return;
    }
    const index = this.productos.findIndex(
      (e) => e.id === parseInt(req.params.id)
    );
    console.log(index, req.params.id, this.productos[0]);
    if (index !== -1) {
      this.productos[index] = {
        id: index,
        ...this.productos[index],
        ...req.body.data,
      };
      console.log(this.productos[index]);
      res.send("Se pudo acttualizar el dato.");
      return;
    }
    res.send("No se dio el caso");
    return;
  }

  deleteProduct(req, res) {
    if (!!!req.body.administrador) {
      res.json({ estado: "No se permite la accion" });
      return;
    }

    const index = this.productos.findIndex(
      (e) => e.id === parseInt(req.params.id)
    );

    this.productos.splice(index, 1);

    res.send("Se borro el dato");
    return;
  }
}

module.exports = new Productos();
