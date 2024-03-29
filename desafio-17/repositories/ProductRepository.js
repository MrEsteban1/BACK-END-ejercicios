const productFactory = require("../factory/productFactory")
const { loggerConsola } = require("../logs4js")
let instance = null

class ProductRepository {
    constructor(){
        this.dao = productFactory(process.env.STORAGE)
    }

    async getRegister(id){
        console.log("Pasa por el repository")
        let resultado =  await this.dao.getProducto(id)
        console.log("resultado Repos: ", resultado)
        return resultado
    }

    async addRegister(data){
        return await this.dao.addProducto(data)
    }

    async updateRegister(id,data){
        return await this.dao.updateProducto(id,data)
    }

    async delRegister(id){
        return await this.dao.delProduct(id)
    }

    static getInstance() {
        if (instance) {
            loggerConsola.info('instancia de repositorio reutilizada')
          return instance
        }
    
        loggerConsola.info('nueva instancia de repositorio')
        instance = new ProductRepository()
    
        return instance
      }
}

module.exports = ProductRepository