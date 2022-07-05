module.exports = class Contenedor {
  constructor(db, model) {
    this.db = db;
    this.model = model;
  }

  async getRegister(req, res) {
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

    return res.json({ estado: "OK", data: resultado });
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
        res.json({ estado: "error", descripcion: error });
      });
  }

  async updateRegister(req, res) {
    const update = { ...req.body.data };
    delete update.id;
    console.log(update, req.params.id.toString());
    this.db
      .then((_) => this.model.find({ _id: req.params.id }))
      .then((res) => console.log(res))
      .then((_) => this.model.findOneAndUpdate({ _id: req.params.id }, update))
      .then((resolve) => {
        if (!!resolve) {
          res.json({ estado: "OK" });
        } else
          res.json({ estado: "error", descripcion: "No se encontro el ID" });
        console.log(resolve);
      })
      .catch((_) =>
        res.json({ estado: "error", descripcion: "No se pudo actualizar" })
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
