const knex =  require('knex')

module.exports = 
class Contenedor{
    constructor(options,tabla){
        this.knex = knex(options)
        this.tabla = tabla
    }

    // async createTable(){
    //     this.knex.schema.createTable(this.tabla, tabla => {
    //         tabla.increments('id'),
    //         tabla.timestamp('creado').defaultTo(knex.fn.now()),
    //         tabla.string('email'),
    //         tabla.string('mensaje')
    //     }).then(() => {
    //         console.log("Se creo la tabla de "+ this.tabla.toString())
    //     })
    //     .catch(res => console.log(res))
    // .finally(()=>{
    //     knex.destroy()
    //     console.log("Conexión destruida.")
    // })
    // }

    async addRegister(data){
        let resultado =
        await this.knex(this.tabla).insert({
            ...data
        })
        .then(()=> {return true})
        .catch(e=>{
            console.log(e)
            return false
        })
        console.log('Rsultado: ' + resultado)
        return resultado;
    }

    async getAllRegisters(){
        let resultado
        await this.knex(this.tabla).select('*')
        .then(res => {resultado = res; console.log(res)})
        .catch(error => {
            console.log(error)
            resultado = false;
        })
    // .finally(()=> knex.destroy())
     
        return resultado     
    }
}