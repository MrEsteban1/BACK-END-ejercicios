const {mariaDB} = require("../options/options")
const knex = require("knex")(mariaDB)

// Utilizar el comando: CREATE DATABASE ibizadeco

knex.schema.createTable("productos", tabla => {
        tabla.increments('id'),
        //tabla.timestamp('').defaultTo(knex.fn.now()),
        tabla.string('title')
        tabla.float('price'),
        tabla.string('thumbnail')
})
.then(() => {
        console.log("Se creo la tabla")
})
.catch(e => console.log(e))    


