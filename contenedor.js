const fs = require("fs");

class Contenedor {
  constructor() {
    this.archivo = "";
  }

  setArchivo(archivo) {
    this.archivo = archivo;
  }

  // async save(object) {
  //   try {
  //     let contenido = await fs.promises.readFile(`${this.archivo}`, "utf-8");
  //     let datos = JSON.parse(contenido);
  //     await fs.promises.writeFile(
  //       this.archivo,
  //       JSON.stringify([...datos, { ...object, id: datos.length }])
  //     );
  //   } catch (error) {
  //     try {
  //       console.log(error);
  //       console.log("pasa aca");
  //       await fs.promises.writeFile(
  //         this.archivo,
  //         JSON.stringify([{ ...object, id: 0 }])
  //       );
  //       return object.id;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  async addRegister(data) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      let datosNuevos = [
        ...datos,
        { ...data, id: datos[datos.length - 1].id + 1 },
      ];
      await fs.promises.writeFile(this.archivo, JSON.stringify(datosNuevos));
      console.log("datos", datosNuevos);
    } catch (error) {
      return error;
    }
  }

  async updateById(id, data) {
    console.log('pasa por aqui', id)
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      let index = await datos.findIndex((item) => item.id == id);
      datos[index] = { ...datos[index], ...data };
      console.log(index)
      console.log(datos, );
     await fs.promises.writeFile(this.archivo, JSON.stringify(datos));
    } catch (error) {
      console.log(error);
    }
  }

  async readById(id) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      console.log("Resultado de ID: ", datos[id - 1] || null);
      return datos[id] || null;
    } catch (error) {
      console.log(error);
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

  async getRandomProduct() {
    let producto;
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let productos = JSON.parse(contenido);
      let id = Math.floor(Math.random() * (productos.length - 1 - 0) + 0);
      console.log("NUMERO ID: ", id);
      producto = productos[id];
    } catch (error) {
      console.log(error);
    }

    return producto;
  }

  async deleteByID(id) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      const existeDato = datos.findIndex((dato) => dato.id === Number(id));

      if (existeDato < 0) return "No existe producto";
      datos = await datos.filter((dato) => dato.id != id);
      await fs.promises.writeFile(this.archivo, JSON.stringify(datos));
      return "Se elimino el dato por el id.";
    } catch (error) {
      console.log(error);
    }
  }

  async eliminateAll() {
    try {
      fs.promises.unlink(this.archivo);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Contenedor();
