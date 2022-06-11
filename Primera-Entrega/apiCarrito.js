const Contenedor = require("./server/contenedor");

class Carrito {
  constructor() {
    Contenedor.setArchivo("./server/carrito.json");
  }

  async addCarrito(req, res) {
    try {
      let resultado = await Contenedor.addRegister(req.body);
      console.log(resultado);
      res.send("Cargado exitosamente")
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "No pudo crear el carrito" });
    }
  }

  async addProduct(req, res) {
    try {
      let resultado = await Contenedor.addProductCarrito(req.params.id, req.body);
      !resultado ? res.status(400).send({ error: "No se encontro el dato" }) : res.send("cargado");
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: "No pudo cargarse los productos" });
    }
    return;
  }

  async getCarrito(req, res) {
    try {
      const id = req.params.id;
      if (!!id) {
        const datos = await Contenedor.readById(id)
        res.json(datos)
        console.log(datos)
        return;
      }
    }
     catch(error) {
      console.log(error)
      res.status(400).send("No se pudo conseguir los productos")
    }
  }

  async deleteCarrito(req,res){
      try {
        const id = req.params.id
        await Contenedor.deleteByID(id)
        res.send("Borrado exitosamente")
      } catch (error) {
        console.log(error)
        res.status(400).send("No se pudo borrar el carrito")
      }
  } 

  async deleteProduct(req,res) {
    let resultado
    try {
      resultado = await Contenedor.eliminateProductoCarrito(req.params.id,req.params.id_prod);
      (resultado) ? res.send("Se pudo eliminar") : res.status(400).send("No se encontró producto para eliminar")
    } catch (error) {
      res.status(400).send("Error al intentar elminar")
      console.log(error)
      return
    }
  }
}

module.exports = new Carrito();
