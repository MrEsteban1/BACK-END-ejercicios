const {mariaDB} = require("../options/options")
const Contenedor = require("../server/contenedor")

module.exports =
class  Productos {
    constructor(){
        this.Contenedor = new Contenedor(mariaDB,"productos")
    }

    async agregarProducto(req,res){
        let resultado
        try {
            resultado = await this.Contenedor.addRegister(req.body) 
        } catch (error) {
            console.log(error)
            resultado = false
        }

        // resultado ? res.json({estado:"OK",  }) : res.json({esatado: "error", descripcion: "No se cargaron los datos"})
    }

    async conseguirProductos(){
        let resultado
        try {
            resultado = await this.Contenedor.getAllRegisters()
        } catch (error) {
            console.log(error)
            resultado = false
        }
        return resultado
    }
}