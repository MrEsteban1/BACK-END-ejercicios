const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {loggerError,loggerConsola,loggerWarn} = require("../logs4js")
const bcrypt = require("bcrypt");

const { usuarios } = require("../daos/index");

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log(username);
      usuarios.getUser(username).then(async (user) => {
        loggerConsola.info(user)
        if (user) {
          loggerWarn.warn("El usuario ya fue registrado.")
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
            loggerError.error(error)
          }
        }
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    ( username, password, done) => {
      usuarios
        .getUser(username)
        .then((user) => {
          if (!user) {
            console.log("holis");
            return done(null, false);
          } else {
            console.log("holis", user);
            if (bcrypt.compareSync(password, user.password)) {
              console.log("correcto")
              return done(null, user);
            } else {
              console.log("incorrecto")
              return done(null, false);
            }
          }
        })
        .catch((e) => {
          console.log(e)
          done(err)
        });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("user no", user)
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  console.log("user", id)
  try {
    let resultado = await usuarios.getRegister(id)
    console.log("resultado", resultado)
    done(null, resultado);
  } catch (error) {
    console.log(error)
  }
  
});

module.exports = passport;
