const express = require('express')

const app = express()

app.use('views','./views')
app.use('views engine','pug')


const server = app.listen('8080', ()=>{
    console.log('Server escuchando en puerto 8080')
})

server.on("error",()=>{'Error en el servidor'})