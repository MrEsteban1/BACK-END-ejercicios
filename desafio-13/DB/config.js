const { connect } = require("mongoose");
require("dotenv").config();

//Conexion a la base de datos en Mongo.
const db = connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}).then((_) => console.log("DB conectada!"));

module.exports = db;
