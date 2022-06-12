const res = require("express/lib/response");
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
      let datosNuevos = [...datos, { ...data, id: Date.now() + 1 }];
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(datosNuevos, 0, 2)
      );
      console.log("datos", datosNuevos);
    } catch (error) {
      return error;
    }
  }

  async updateById(id, data) {
    console.log("pasa por aqui", id);
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);

      let index = await datos.findIndex(
        (item) => parseInt(item.id) === parseInt(id)
      );
      if (index >= 0) {
        datos[index] = { ...datos[index], ...data };
        await fs.promises.writeFile(this.archivo, JSON.stringify(datos, 0, 2));
        return true;
      } else {
        console.log(datos);
        console.log(index);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addProductCarrito(id, producto) {
    console.log("pasa por aqui", id);
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      let index = await datos.findIndex((item) => item.id === parseInt(id));

      if (!(index > -1)) return false;

      datos[index] = {
        ...datos[index],
        productos: [...datos[index].productos, { ...producto }],
      };

      await fs.promises.writeFile(this.archivo, JSON.stringify(datos, 0, 2));
      return true;
    } catch (error) {
      return false;
    }
  }

  async readById(id) {
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      let resultado = datos.filter(
        (dato) => parseInt(dato.id) === parseInt(id)
      );
      console.log("Resultado de ID: ", resultado);
      return resultado;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    let datos;
    try {
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      datos = JSON.parse(contenido);
    } catch (error) {}

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
      const existeDato = datos.findIndex(
        (dato) => parseInt(dato.id) === parseInt(id)
      );

      if (existeDato < 0) return false;
      datos = await datos.filter((dato) => parseInt(dato.id) != parseInt(id));
      await fs.promises.writeFile(this.archivo, JSON.stringify(datos, 0, 2));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async eliminateAll() {
    try {
      fs.promises.unlink(this.archivo);
    } catch (error) {
      console.log(error);
    }
  }

  async eliminateProductoCarrito(idCarrito, idProducto) {
    try {
      console.log(idCarrito);
      let contenido = await fs.promises.readFile(this.archivo, "utf-8");
      let datos = JSON.parse(contenido);
      let index = await datos.findIndex(
        (dato) => dato.id === parseInt(idCarrito)
      );
      console.log(index);
      if (index > -1) {
        datos[index].productos = await datos[index].productos.filter(
          (producto) => producto.id !== parseInt(idProducto)
        );
        console.log(datos[index]);
        await fs.promises.writeFile(this.archivo, JSON.stringify(datos, 0, 2));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = new Contenedor();
