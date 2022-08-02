const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { usuarios } = require("../daos/index");

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
            console.log("holis");
            return done(null, false);
          } else {
            console.log("holis", user);
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

passport.deserializeUser(async (user, done) => {
  console.log("user");
  done(null, user);
});

module.exports = passport;
