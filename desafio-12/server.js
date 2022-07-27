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
      console.log(username);
      usuarios.getUser(username).then(async (user) => {
        console.log(user);
        if (user) {
          return done(null, false);
        } else {
          const hash = bcrypt.hashSync(password, 10);
          let data = {
            user: username,
            password: hash,
          };
          try {
            let resultado = await usuarios.addRegister(data);
            resultado
              ? ((data.id = resultado), done(null, data))
              : done(null, false);
          } catch (error) {
            console.log(error);
          }
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await usuarios._getRegisterById(id);

  done(null, user);
});

app.get("/login", (req, res) => {
  res.sendFile("./public/login.html", { root: __dirname });
});

app.get("/signup", (req, res) => {
  res.sendFile("./public/signup.html", { root: __dirname });
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/public/index.html",
    failureRedirect: "/loginFalse.html",
  })
);

app.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/public/home.html",
    failureRedirect: "/signupError.html",
  })
);

const server = app.listen(PORT, () =>
  console.log(`Escuchando en el puerto ${PORT} y ${process.env.MONGO_URL}`)
);

server.on("error", (e) => console.log(e));
