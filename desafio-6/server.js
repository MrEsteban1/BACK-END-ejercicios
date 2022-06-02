const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer} = require('http')

const app = express()

const PORT = 8080

let productos = [
    {
        title: "Pañal",
        price: 150,
        thumbnail: "http://static1.abc.es/Media/201405/19/panal--644x362.jpg",
        id: 0,
    }, 
]

let mensajes = [
    {
        usuario: "cabildo@gmail.com",
        mensaje: "Buenas tardes, que tal?"
    }
]

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile('public/index.html',{root:__dirname})
})

app.post("/productos", (req, res)=>{
    req.body
    productos = [...productos,{id:productos.length,...req.body}]
    console.log("Datos de productos: ", productos)
    io.emit("productos", productos)
})

app.post("/mensaje",(req,res)=>{
    
})

httpServer.listen(PORT,()=> {
    console.log('Servidor funcionando en puerto ' + PORT)
})

io.on('connection', async (socket) => {
    socket.emit("productos", productos)
    console.log('Usuario conectado ' + socket.id)
    // io.emit('mensaje bienvenida', 'Bienvenido al chat')
    // io.emit("mensajes", mensajes)
    // io.on("agregar producto", data => {
    //     io.emit("nuevo producto", data)
    // })
    socket.on("nueva conexion", () =>{
        console.log('pasa por nueva conexion')
        io.emit("productos", productos)
    })
})


