const fs = require('fs');

class Producto {
    
    constructor(title, price, thumbnail){
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }

    getData(){
        return ({
            title: this.title,
            price:this.price,
            thumbnail: this.thumbnail

        })
    }
}

class  Contenedor {

    constructor(archivo) {this.archivo = archivo}

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

const producto1 = new Producto("pañal", 131, "http://static1.abc.es/Media/201405/19/panal--644x362.jpg")
const producto2 = new Producto("botella", 43, "https://918230.smushcdn.com/2283449/wp-content/uploads/2009/09/caja-agua-ciel-de-600-ml.jpg?lossy=1&strip=1&webp=1")
const producto3 = new Producto("chupete", 170, "https://www.tienda.philips.com.ar/3826-home_default/chupete-ultra-air-liso-0-6-nena-x1.jpg")


const contenedor = new Contenedor("./clientes.txt")

//contenedor.save(producto3.getData())
// contenedor.readById(1)
// contenedor.getAll()
//contenedor.deleteByID(3)
//contenedor.eliminateAll()
const main = async () => {
    
    try {
        await contenedor.save(producto1.getData())
        await contenedor.save(producto2.getData())
        await contenedor.save(producto3.getData())

        // await contenedor.readById(1)
        // await contenedor.getAll()
        // await contenedor.deleteByID(3)
        // await contenedor.eliminateAll()
        
    } catch (error) {
        
    }
}

main()

