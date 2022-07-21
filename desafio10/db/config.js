const { connect } = require("mongoose");

//Conexion a la base de datos en Mongo.
const db = connect("mongodb://localhost:27017/ibizadeco", {
  useNewUrlParser: true,
}).then((_) => console.log("DB conectada!"));

module.exports = db;
