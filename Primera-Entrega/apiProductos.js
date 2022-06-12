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

  async updateProduct(req, res) {
    const id = req.body.data.id;
    console.log(req.body.data);
    if (!!!req.body.administrador) {
      res.json({ estado: "error", descripcion: "No se permite la accion" });
      return;
    }
    if (!!!id) {
      res.json({
        estado: "error",
        descripcion: "No se envio informacion correcta ",
      });
      return;
    }
    try {
      let resultado = await Contenedor.updateById(id, req.body.data);
      console.log("resultarod " + resultado);
      return resultado
        ? res.json({
            estado: "OK",
            descripcion: "Se pudo acttualizar el dato.",
          })
        : res.json({
            estado: "error",
            descripcion: "No se encontro el producto",
          });
    } catch (error) {
      res.json({
        estado: "error",
        descripcion: "Hubo un error al actualizar el dato",
      });
      return;
    }

    return;
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    if (!!!req.body.administrador) {
      res.json({ estado: "error", descripcion: "No se permite la accion" });
      return;
    }
    if (!!!id) {
      res.json({
        estado: "error",
        descripcion: "No se envio informacion correcta ",
      });
      return;
    }
    try {
      let resultado = await Contenedor.deleteByID(id);
      resultado
        ? res.json({ estado: "OK", descripcion: "Se borro el producto." })
        : res.json({ estado: "error", descripcion: "No se encontro el id" });
    } catch (error) {
      res.json({
        estado: "error",
        descripcion: "No se pudo borrar",
        error: error,
      });
    }
    if (!!!req.body.administrador) {
      res.json({ estado: "No se permite la accion" });
      return;
    }
  }
}

module.exports = new Productos();
