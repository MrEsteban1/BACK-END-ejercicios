const db = require("../../db/config");
const User = require("../../db/models/user");
const Contenedor = require("../../contenedores/contenedorMongoDB");

module.exports = class UserDao extends Contenedor {
  constructor() {
    super(db, User);
  }

  async getUser(user) {
    console.log(user);
    await this.db
      .then((_) => this.model.findOne({ user: user }))
      .then((e) => console.log(e));
    return this.db.then((_) => this.model.findOne({ user: user }));
  }
};
