const {sqlite} = require("../options/options")
const Contenedor = require("./contenedor")

module.exports =  class Chats{
    constructor(){
        this.Contenedor = new Contenedor(sqlite,"mensajes")
    }

    async agregarMensaje(req,res){
        let resultado
        try {
             await this.Contenedor.addRegister(req.body)
             resultado = true
        } catch (error) {
            console.log(error)
            resultado = false
        }
        !resultado ? res.json({estado: "error", descripcion: "No se pudo agregar el mensaje."}): res.json({estado: "OK", descripcion: "Se registro el mensaje"})
    }

    async conseguirMensajes(){
        let resultado
        try{
            let data = await this.Contenedor.getAllRegisters()
            resultado = data
        }catch(error){
            console.log(error)
            resultado = false
        }
        return resultado
        
    }


}