const {mariaDB} = require("../options/options")
const knex = require("knex")(mariaDB)

// knex.schema.createTable('user', (table) => {
//     table.increments('id')
//     table.string('name')
//     table.integer('age')
//   })
//   .then(() => {})

    knex.schema.createTable("productos", tabla => {
            tabla.increments('id'),
            tabla.timestamp('creado').defaultTo(knex.fn.now()),
            tabla.string('email'),
            tabla.string('mensaje')
    }).then(() => {
            console.log("Se creo la tabla")
        })
        .catch(e => console.log(e))    


