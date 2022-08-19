const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const parseArgs = require("minimist");
const { fork } = require("child_process");
require("dotenv").config();

const {loggerConsola,loggerError,loggerWarn} = require("./logs4js")
const passport = require("./passport/passport");
const randomNumbers = require("./calculo");



const app = express();
const args = parseArgs(process.argv.slice(2));
const PORT = args._[0] || 8080;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      options: options,
      ttl: 60 * 10,
    }),
    secret: process.env.SESSION_SECRET || "qwerty",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
  res.sendFile("./public/login.html", { root: __dirname });
});

app.get("/signup", (req, res) => {
  res.sendFile("./public/signup.html", { root: __dirname });
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home/index.html",
    failureRedirect: "/loginFalse.html",
  })
);

app.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/home/index.html",
    failureRedirect: "/signupError.html",
  })
);

// INFO DE SISTEMA - desafio 13

app.get("/info", (req, res) => {
  const data = {
    argumentos: args,
    so: process.platform,
    version_node: process.version,
    memory: process.memoryUsage,
    pathof: process.cwd(),
    id_process: process.pid,
  };

  loggerConsola.info(data)

  res.json(data);
});

app.get("/random", (req, res) => {
  const cantidad = req.query.cant || 100000;
  //let calculo = fork("./calculo.js");
  randomNumbers(cantidad).then(e=> {res.json(e)}).catch(e=>console.log(e))
  //calculo.on("message", (numbers) => res.json(numbers));
});

app.use((req, res, next) => {
  res.status(404);
  loggerWarn.warn(`RUTA: ${req.originalUrl} - METODO: ${req.method} - RESULTADO: No implementado`)
  res.redirect('http://localhost:8080/info');
  next();
});

const server = app.listen(PORT, () =>{
  loggerConsola.info(`Escuchando en el puerto ${PORT}`)
  console.log(`Escuchando en el puerto ${PORT}`)
});

server.on("error", (e) => loggerError.error(e));
