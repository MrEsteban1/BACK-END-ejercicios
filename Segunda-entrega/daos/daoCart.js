const db = require("../db/config");
const carritos = require("../db/models/carrito");
const Contenedor = require("../contenedores/contenedorMongoDB");
const productos = require("../db/models/productos");
class CartDao extends Contenedor {
  constructor() {
    super(db, carritos);
  }

  async addCarrito(req, res) {
    const carrito = {
      fecha: new Date(),
      productos: [{ ...req.body }],
    };
    req.body.data = carrito

   return await this.addRegister(req,res)
  }

  async addProducto(req,res){
    try {
      let carrito = await this.getRegister(req.params.id)
      console.log(carrito)
      if(carrito.length == 1){
        carrito[0].productos = [...carrito[0].productos,req.body]
      }
      let respuesta = await this.updateRegister(carrito)
      respuesta ? res.json({ estado: "OK", data: "Se agrego el producto" }) : res.json({ estado: "error", descripcion: "No se pudo actualizar" })

    } catch (error) {
      console.log(error)
      res.json({ estado: "error", descripcion: "No se pudo actualizar" })
    }
  }

  async getCarritoByID(req,res){
    let resultado = {}
    
    try {
      resultado = await this.getRegister(req.params.id,) 
      if(resultado.length > 0) res.json(datos)
    } catch (error) {
      
    }
  }


}
