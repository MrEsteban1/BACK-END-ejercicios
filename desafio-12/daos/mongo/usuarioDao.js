const db = require("../../db/config");
const User = require("../../db/models/user");
const Contenedor = require("../../contenedores/contenedorMongoDB");

module.exports = class CartDao extends Contenedor {
  constructor() {
    super(db, User);
  }

  getUser(user) {
    return this.db.then((_) => this.model.findOne({ username: user }));
  }
};
