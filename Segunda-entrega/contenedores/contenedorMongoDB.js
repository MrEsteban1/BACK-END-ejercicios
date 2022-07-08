module.exports = class Contenedor {
  constructor(db, model) {
    this.db = db;
    this.model = model;
  }

  async getRegister(id) {
    let resultado = {};
    try {
      if (!!id) resultado = await _getRegisterById(id);
      else
        await this.db
          .then((_) => this.model.find({}))
          .then((res) => (resultado = res));
    } catch (error) {
      console.log(error);
      resultado = [];
    }

    return resultado;
  }

  async delRegister(id) {
    let resultado;
    await this.db.then((_) =>
      this.model
        .deleteOne({ _id: ObjectId(id.toString()) })
        .then((_) => (resultado = true))
        .catch((e) => {
          console.log(e);
          resultado = false;
        })
    );

    return resultado;
  }

  async addRegister(data) {
    let resultado = {};
    await this.db
      .then((_) => this.model({ ...data }).save())
      .then((_) => (resultado = true))
      .catch((error) => {
        console.log(error);
        resultado = false;
      });

    return resultado;
  }

  async updateRegister(id, data) {
    const update = { ...data };
    delete update.id;
    let resultado;
    console.log(update, id.toString());
    await this.db
      .then((_) => this.model.find({ _id: id }))
      .then((res) => console.log(res))
      .then((_) => this.model.findOneAndUpdate({ _id: id }, update))
      .then((resolve) => {
        if (!!resolve) {
          resultado = true;
        } else resultado = false;
      })
      .catch((_) => {
        resultado = false;
      });

    return resultado;
  }

  async _getRegisterById(id) {
    let resultado = {};
    await this.db
      .then((_) => this.model.find({ _id: ObjectId(id.toString()) }))
      .then((res) => (resultado = res))
      .catch((e) => {
        console.log(e);
        resultado = [];
      });

    return resultado;
  }
};
