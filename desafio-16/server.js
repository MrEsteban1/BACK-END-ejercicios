const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const parseArgs = require("minimist");
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const cors = require("cors");
const { fork } = require("child_process");
require("dotenv").config();

//loggers
const {loggerConsola,loggerError,loggerWarn} = require("./logs4js")
//passport
const passport = require("./passport/passport");

const randomNumbers = require("./calculo");

//Routes API
const routerProductos = require("./router/productosRoutes");
const routerCarrito = require("./router/carritoRoutes");
const sessionRouter  = require("./router/sessionRoutes");
const systemRouter = require("./router/systemRoutes");

const args = parseArgs(process.argv.slice(2));
const PORT = args._[0] || 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use(cookieParser());

const options = { useNewUrlParser: true, useUnifiedTopology: true };

//Store
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      options: options,
      ttl: 60 * 10,
    }),
    cookie: { maxAge: 600000 },
    secret: process.env.SESSION_SECRET || "qwerty",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use("/session",sessionRouter)  
app.use("/system",systemRouter)

app.use((req, res, next) => {
  res.status(404);
  loggerWarn.warn(`RUTA: ${req.originalUrl} - METODO: ${req.method} - RESULTADO: No implementado`)
  res.redirect('/session/login');
  next();
});

const server = app.listen(PORT, () =>{
  loggerConsola.info(`Escuchando en el puerto ${PORT}`)
});

server.on("error", (e) => loggerError.error(e));
