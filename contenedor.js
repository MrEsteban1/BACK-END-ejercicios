const fs = require('fs')

class Contenedor {
    
    constructor() {
        this.archivo=""
    }

    setArchivo(archivo){
        this.archivo = archivo
    }

    async save(object) {
        try {
            let contenido = await fs.promises.readFile(`${this.archivo}`,'utf-8')
            let clientes = JSON.parse(contenido)
            await fs.promises.writeFile(this.archivo,JSON.stringify([...clientes,{...object,id:clientes.length}]))
        } catch (error) {
            try {
                console.log(error)
                console.log("pasa aca")
                await fs.promises.writeFile(this.archivo,JSON.stringify([{...object,id:0}]))
                return object.id;
            } catch (error) {
                console.log(error)
            }
        }
    }

    async readById(id){
        try {
            let contenido =  await fs.promises.readFile(this.archivo,'utf-8')
            let clientes = JSON.parse(contenido)
            console.log("Resultado de ID: ",clientes[id-1] || null)
            return clientes[id] || null
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        let clientes;
        try {
            let contenido = await fs.promises.readFile(this.archivo,'utf-8')
            clientes = JSON.parse(contenido)
            console.log("Todos los datos: ", clientes)       
        } catch (error) {
            console.log("No se leyo los datos por: ", error)
        }

        return clientes
    }

    async getRandomProduct(){
        let producto;
        try {
            let contenido = await fs.promises.readFile(this.archivo,'utf-8')
            let productos = JSON.parse(contenido);
            let id = Math.floor(Math.random() * ((productos.length-1) - 0) + 0);
            console.log('NUMERO ID: ', id)
            producto = productos[id]
        } catch (error) {
            console.log(error)
        }

        return producto
    }

    async deleteByID(id){
        try {
            let contenido =  await fs.promises.readFile(this.archivo,'utf-8')
            let clientes =  JSON.parse(contenido)
            clientes =  clientes.filter(dato => dato.id !== id)
            await fs.promises.writeFile(this.archivo,JSON.stringify(clientes))
        } catch (error) {
            console.log(error)
        }
        
    }

    async eliminateAll(){
        try {
            fs.promises.unlink(this.archivo)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Contenedor();