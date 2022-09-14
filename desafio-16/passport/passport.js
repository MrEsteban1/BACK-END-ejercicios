const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {loggerError,loggerConsola,loggerWarn} = require("../logs4js")
const bcrypt = require("bcrypt");
const fs = require("fs");

const { usuarios } = require("../daos/index");

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      loggerConsola.info(req.body)
      const {nombre,edad,direccion,telefono} = req.body
      console.log(username);
      usuarios.getUser(username).then(async (user) => {
        loggerConsola.info("Info usuario: ",user,req.file)
        let avatar = "no"
        if (user) {
          loggerWarn.warn("El usuario ya fue registrado.")
          return done(null, false);
        } else {
          const hash = bcrypt.hashSync(password, 10);
          try {
            if (req.file){
              fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
              avatar = req.file.filename + '.' + req.file.mimetype.split('/')[1];
            }
            let data = {
              username: username,
              password: hash,
              nombre,
              edad,direccion,telefono,avatar
            };
            let resultado = await usuarios.addRegister(data);
            resultado
              ? ((data.id = resultado), done(null, data))
              : done(null, false);
          } catch (error) {
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
