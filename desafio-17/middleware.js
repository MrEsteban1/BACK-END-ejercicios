const verificarInput = (req, res, next) => {
  if (
    !(
      (req.body.user === "" || !!req.body.user) &&
      (req.body.password === "" || !!req.body.password)
    )
  ) {
    res.send("No se ingreo la info requerida");
  } else {
    next();
  }
};

const verificarUsuario = () => {};

module.exports = {
  verificarInput: verificarInput,
};
