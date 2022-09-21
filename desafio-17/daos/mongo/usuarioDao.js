const Contenedor = require("../../contenedores/contenedorMongoDB");
const User = require("../../DB/models/user");
const db = require("../../DB/config.js");

module.exports = class UserDao extends Contenedor {
  constructor() {
    super(db, User);
  }

  async getUser(user) {
    await this.db
      .then((_) => this.model.findOne({ username: user }))
      .then((e) => console.log(e));
    return this.db.then((_) => this.model.findOne({ username: user }));
  }
};
