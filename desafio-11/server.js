const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()

const PORT = 8080

const options = {useNewUrlParser: true, useUnifiedTopology: true}

app.use(cookieParser())
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(
    {
        store: MongoStore.create({mongoUrl:'mongodb+srv://MrEsteban:Coderhouse2022@firstproyect.put2a.mongodb.net/ibizadeco?retryWrites=true&w=majority',options: options,ttl:60}),
        secret:'qwerty',
        resave: false,
        saveUninitialized:true 
    }
))

const auth = (req,res,next)=> {
    if(!req.session.user){
        res.sendFile("./public/login.html", { root: __dirname });
    }

    next()

}

app.get('/login',(req,res)=>{
    res.sendFile("./public/login.html", { root: __dirname });
    }
)

app.post('/login',(req,res)=>{
    console.log(req.body.user)
    req.session.user = req.body.user
    res.render("./public/home/index.html");
})

app.get('/home',auth,(req,res)=>{
    res.sendFile("./public/home/index.html", { root: __dirname });
})

app.get('/get', (req,res)=>{
    res.send(req.cookies.server)
})

app.delete('/delete',(req,res)=>{
    res.clearCookie('server').send('clered Cookie')
})

const server = app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})

server.on('error', (e)=>console.log(e))