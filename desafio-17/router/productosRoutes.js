const { Router } = require("express");
const { productos } = require("../daos/index");
const {getProdController,addProdController,updateProdController,delProdController} = require("../controllers/productosController")

const productosRouter = Router();

productosRouter.get("/:id?", (req, res) => {
  return getProdController(req,res)
  // return productos.getProducto(req, res);
});

productosRouter.post("/", (req, res) => {
  return addProdController(req,res)
  // return productos.addProducto(req, res);
});

productosRouter.put("/:id", (req, res) => {
  return updateProdController(req,res)
  // return productos.updateProducto(req, res);
});

productosRouter.delete("/:id", (req, res) => {
  return delProdController(req,res)
  // return productos.delProduct(req, res);
});

module.exports = productosRouter;
