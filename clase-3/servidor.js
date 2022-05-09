const http = require('http');
const express = require('express');
const Contenedor = require('../contenedor')

const app = express();
const PORT = 8080

const server = app.listen(PORT, ()=>{
    Contenedor.setArchivo('./productos.txt')
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

app.get('/productos',async (req,res)=>{
    let productos;
    try {
        productos = await Contenedor.getAll()
        res.send({productos:productos.productos})
    } catch (error) {
        console.log(error)
    }
})

app.get('/productos/random',async (req,res)=>{
    let producto;
    try {
        producto = await Contenedor.getRandomProduct()
        res.send({producto_random:producto})
    } catch (error) {
        console.log(error)
    }
})



server.on("error", error => console.log(`Error en servidor ${error}`))