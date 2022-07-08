module.exports = class Contenedor {
  constructor(db, model) {
    this.db = db;
    this.model = model;
  }

  async getRegister(id) {
    let resultado = {};
    try {
      if (!!id) resultado = await this._getRegisterById(id);
      else
        await this.db
          .then((_) => this.model.find({}))
          .then(async (res) => {
            resultado = await res.map((res) => {
              return { ...res._doc, id: res._doc._id.toString() };
            });
          });
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
        .deleteOne({ _id: id.toString() })
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
      .then((res) => {
        resultado = res._id.toString();
      })
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
    await this.db
      .then((_) => this.model.find({ _id: id }))
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
      .then((_) => this.model.find({ _id: id.toString() }))
      .then((res) => (resultado = { ...res[0]._doc, id: res[0]._doc._id }))
      .catch((e) => {
        resultado = [];
      });

    return resultado;
  }
};
