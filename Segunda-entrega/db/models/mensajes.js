const mongoose = require("mongoose");

const mensajesCollection = "mensajes";

const MensajesSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 80 },
  mensaje: { type: String, require: true, max: 200 },
  fecha: { type: Date, default: Date.now },
});

const mensajes = mongoose.model(mensajesCollection, MensajesSchema);
module.exports = mensajes;
