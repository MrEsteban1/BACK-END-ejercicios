const db = require("../db/config");
const Contenedor = require("./contenedor");
const mensajes = require("../db/models/mensajes");
const { normalize, schema, denormalize } = require("normalizr");

module.exports = class Chats {
  constructor() {
    this.Contenedor = new Contenedor(db, mensajes);
  }

  async agregarMensaje(req, res) {
    let resultado;
    try {
      await this.Contenedor.addRegister(req.body);
      resultado = true;
    } catch (error) {
      console.log(error);
      resultado = false;
    }
    !resultado
      ? res.json({
          estado: "error",
          descripcion: "No se pudo agregar el mensaje.",
        })
      : res.json({ estado: "OK", descripcion: "Se registro el mensaje" });
  }

  async conseguirMensajes() {
    let resultado;
    try {
      let data = await this.Contenedor.getRegister();
      const schemaAutor = new schema.Entity("author");
      const mySchema = new schema.Array({
        author: schemaAutor,
      });
      const normalizedChat = normalize(aux[0].arrayChat, mySchema);
      console.log(JSON.stringify(normalizedChat));
      resultado = normalizedChat;
    } catch (error) {
      console.log(error);
      resultado = false;
    }
    return resultado;
  }
};
