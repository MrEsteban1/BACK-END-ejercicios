const {sqlite} = require("../options/options")
const knex = require("knex")(sqlite)

// knex.schema.createTable('user', (table) => {
//     table.increments('id')
//     table.string('name')
//     table.integer('age')
//   })
//   .then(() => {})

    knex.schema.createTable("mensajes", tabla => {
            tabla.increments('id'),
            tabla.timestamp('fecha').defaultTo(knex.fn.now()),
            tabla.string('email'),
            tabla.string('mensaje')
    }).then(() => {
            console.log("Se creo la tabla")
        })
        .catch(e => console.log(e))    


