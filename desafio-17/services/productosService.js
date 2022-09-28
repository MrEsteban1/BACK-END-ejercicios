// const {productos} = require("../daos/index")
const { loggerConsola } = require("../logs4js")
const Productos = require("../repositories/ProductRepository")
const productos = Productos.getInstance()

const getProdService = async (id) =>{
    loggerConsola.info("ID PROD: "+ id)
    return await productos.getRegister(id)
}

const addProdService = async (data) => {
    loggerConsola.warn("DATA - SERVICE",data)
    return await productos.addRegister(data)
}

const updateProdService = async (id,data)=>{
    return await productos.updateRegister(id,data)
}

const delProdService = async (id) => {
    return await productos.delRegister(id)
}

module.exports = {getProdService,addProdService,updateProdService,delProdService}