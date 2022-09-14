const {productos} = require("../daos/index")

const getProdService = async (id) =>{
    return await productos.getProducto(id)
}

const addProdService = async (data) => {
    return await productos.addProducto(data)
}

const updateProdService = async (id,data)=>{
    return await productos.updateProducto(id,data)
}

const delProdService = async (id) => {
    return await productos.delRegister()
}

module.exports = {getProdService,addProdService,updateProdService,delProdService}