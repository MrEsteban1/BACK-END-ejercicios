const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { usuarios } = require("./daos/index");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

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
      ttl: 60,
    }),
    secret: "qwerty",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// PASSPORT

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      usuarios.getUser(username).then((user) => {
        if (user) {
          console.log("usuario existe");
          return done(null, false);
        } else {
          const hash = bcrypt.hashSync(password, 10);
        }
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log("holas desde locasl " + JSON.stringify(username));
      usuarios
        .getUser(username)
        .then((user) => {
          if (!user) {
            return done(null, false);
          } else {
            if (bcrypt.compareSync(password, user.password)) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        })
        .catch((e) => console.log(e));
    }
  )
);

app.get("/login", (req, res) => {
  res.sendFile("./public/login.html", { root: __dirname });
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/loginFalse.html",
    failureRedirect: "/loginFalse.html",
  })
);

const server = app.listen(PORT, () =>
  console.log(`Escuchando en el puerto ${PORT} y ${process.env.MONGO_URL}`)
);

server.on("error", (e) => console.log(e));
