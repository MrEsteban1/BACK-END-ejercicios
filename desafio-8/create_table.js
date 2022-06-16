const {options} = require("./options/mariaDB")
const knex = require('knex')(options)

knex.schema.createTable('cars', table => {
    table.increments('id')
    table.string('name')
    table.integer('edad')
}).then((e)=> console.log('tabla creada',e))
.catch(e => console.log(e))
.finally(()=> {knex.destroy(); console.log('destruido')})

