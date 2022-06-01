const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer} = require('http')

const app = express()

const PORT = 8080

let productos = [
    {
        title: "Fender Stratocaster",
        price: 150000,
        thumbnail: "https://findicons.com/files/icons/876/stratocaster_guitars/128/stratocaster_guitar_love.png",
        id: 1,
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
    productos = [...productos,req.body]
    console.log("Datos de productos: ", productos)
    io.emit("productos", productos)
})

httpServer.listen(PORT,()=> {
    console.log('Servidor funcionando en puerto ' + PORT)
})

io.on('connection', async (socket) => {
    io.emit("productos", productos)
    console.log('Usuario conectado ' + socket.id)
    // io.emit('mensaje bienvenida', 'Bienvenido al chat')
    // io.emit("mensajes", mensajes)
    io.on("agregar producto", data => {
        io.emit("nuevo producto", data)
    })
})


