module.exports = class Contenedor {
  constructor(db, model) {
    this.db = db;
    this.model = model;
  }

  async getRegister(id) {
    let resultado = {};
    try {
      if (!!req.params.id) resultado = await _getRegisterById(req.params.id);
      else
        await this.db
          .then((_) => this.model.find({}))
          .then((res) => (resultado = res));
    } catch (error) {
      console.log(error);
      resultado = [];
    }

    return  resultado
  }

  async delRegister(req, res) {
    this.db.then((_) =>
      this.model
        .deleteOne({ _id: ObjectId(req.params.id.toString()) })
        .then((_) => res.send("Elemento borrado"))
    );
  }

  async addRegister(req, res) {
    this.db
      .then((_) => this.model({ ...req.body.data }).save())
      .then((_) => res.json({ estado: "OK" }))
      .catch((error) => {
        console.log(error);
        res.json({ estado: "error", descripcion: "Error al cargar el producto" });
      });
  }

  async updateRegister(id,data) {
    const update = { ...data };
    delete update.id;
    console.log(update, id.toString());
    this.db
      .then((_) => this.model.find({ _id: id }))
      .then((res) => console.log(res))
      .then((_) => this.model.findOneAndUpdate({ _id: id }, update))
      .then((resolve) => {
        if (!!resolve) {
          return true
        } else
          return false
      })
      .catch((_) =>
        { return false}
      );
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
