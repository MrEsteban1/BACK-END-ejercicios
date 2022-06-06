const fs = require("fs");

class Chats {
  constructor(archivo = "") {
    this.archivo = archivo;
  }

  setArchivo(archivo) {
    this.archivo = archivo;
  }

  async addRegister(data) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);

      let datosNuevos = [...datos, { ...data }];

      console.log(datosNuevos);

      await fs.promises.writeFile(this.archivo, JSON.stringify(datosNuevos));

      console.log("datos", datosNuevos);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAll() {
    let datos;
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      datos = JSON.parse(contenido);
      console.log("Todos los datos: ", datos);
    } catch (error) {
      console.log("No se leyo los datos por: ", error);
    }

    return datos;
  }
}

module.exports = new Chats();
