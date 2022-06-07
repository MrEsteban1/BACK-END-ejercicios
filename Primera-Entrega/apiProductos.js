class Productos {
  constructor(productos = []) {
    this.productos = productos;
  }

  setProduct(data) {
    this.productos = [...data];
  }

  async getProducts(req, res) {
    console.log(Date.now());
    if (!!req.params.id) {
      res.json([
        await this.productos.find((dato) => dato.id === req.params.id),
      ]);
    }
    res.json(this.productos);
    return this.productos;
  }

  addProduct(req, res) {
    if (!!!req.body.title) {
      res.json({ estado: "No se envio informacion correcta " });
      return;
    }
    if (req.body.data.title) {
      this.productos.push({ id: Date.now(), ...req.body.data });
      res.json(JSON.stringify(this.productos));
    } else {
      res.json("No se envio informacion correcta");
    }
  }

  updateProduct(req, res) {
    if (!!!req.body.administrador) {
      res.json({ estado: "No se permite la accion" });
      return;
    }
    if (!!!req.body.data.title) {
      res.json({ estado: "No se envio informacion correcta " });
      return;
    }
    const index = this.productos.findIndex(
      (e) => e.id === parseInt(req.params.id)
    );
    console.log(index, req.params.id, this.productos[0]);
    if (index !== -1) {
      this.productos[index] = {
        id: index,
        ...this.productos[index],
        ...req.body.data,
      };
      console.log(this.productos[index]);
      res.send("Se pudo acttualizar el dato.");
      return;
    }
    res.send("No se dio el caso");
    return;
  }

  deleteProduct(req, res) {
    if (!!!req.body.administrador) {
      res.json({ estado: "No se permite la accion" });
      return;
    }

    const index = this.productos.findIndex(
      (e) => e.id === parseInt(req.params.id)
    );

    this.productos.splice(index, 1);

    res.send("Se borro el dato");
    return;
  }
}

module.exports = new Productos();
