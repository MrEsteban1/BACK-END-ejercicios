class Producto {
    constructor(productos = []){
        this.productos = productos
    }

    setProduct(data){
        this.productos = [...data]
    }

    getProducts(req,res){
        if(!!req.param.id){
            res.send("Producto: " + this.productos[req.param.id].title)
            return [this.productos[req.param.id]]
        }

        console.log(this.productos)
        return this.productos
    }

    setU

}