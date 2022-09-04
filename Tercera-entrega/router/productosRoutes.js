const { Router } = require("express");
const { productos } = require("../daos/index");
// const Contenedor = require("../contenedores/contenedorMongoDB");

const productosRouter = Router();

productosRouter.get("/:id?", (req, res) => {
  return productos.getProducto(req, res);
});

productosRouter.post("/", (req, res) => {
  return productos.addProducto(req, res);
});

productosRouter.put("/:id", (req, res) => {
  return productos.updateProducto(req, res);
});

productosRouter.delete("/:id", (req, res) => {
  return productos.delProduct(req, res);
});

productosRouter.post("/pedido",(req,res)=>{
  console.log(req.body)
  const data = req.body
  const texto = 
  `
    Hola ${data.nombre}!
    Tu pedido es el siguiente:
    ${data.productos.map(producto => `${producto.nombre} a $ ${producto.precio} \n`).join("")}
  `
  console.log(texto)
  res.json({estado:true})
})

module.exports = productosRouter;
