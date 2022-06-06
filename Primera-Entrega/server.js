const express = require("express");
const {Router} = express

const app = express()
PORT = 8080; 

const router_productos = Router()

router_productos.get('/:id?', (req,res)=>{
    console.log("Req: " + !!req.params.id )
    
})

app.use("/api/productos", router_productos)

const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor: ${error}`))