const {sqlite} = require("../options/options")
const knex = require("knex")(sqlite)

    knex.schema.table("mensajes", tabla => {
        tabla.renameColumn('creado', 'fecha')
    }).then(() => {
            console.log("Se creo la tabla")
        })
        .catch(e => console.log(e))    