const mongoose = require("mongoose");

const mensajesCollection = "mensajes";

const MensajesSchema = new mongoose.Schema({
  author: { type: Object, require: true },
  text: { type: String, require: true, max: 200 },
});

const mensajes = mongoose.model(mensajesCollection, MensajesSchema);
module.exports = mensajes;
