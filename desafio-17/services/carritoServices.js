//const { carrito } = require("../daos/index");
const Carrito = require("../repositories/carritoRepository")
const carrito = Carrito.getInstance()

const addCarrito = async (data) => {
    data.fecha = new Date()
    return await carrito.addCarrito(data)
}

const addProducto = async (id,data) => {
    return await carrito.addProducto(id,data)
}

const getCarritoByID = async (id) => {
    return await carrito.getCarritoByID(id)
}

const deleteCarrito = async (id) => {
    return await carrito.deleteCarrito(id)
}

const delProducto = async (id,idProd) => {
    return await carrito.deleteProducto(id,idProd)
}

const carritoServices = {addCarrito,addProducto,getCarritoByID,deleteCarrito,delProducto}

module.exports = carritoServices