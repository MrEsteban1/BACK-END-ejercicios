const { loggerError, loggerConsola, loggerWarn } = require("../logs4js")
const {getProdService,addProdService,updateProdService,delProdService} = require("../services/productosService")

const getProdController = async(req,res)=>{
    const id = req.params.id
    let resultado = false
    try {
        resultado = await getProdService(id)
    } catch (error) {
        loggerConsola.warn(error)
        resultado = false
        //res.json({estado:"error",descripcion:"No se elimino el producto"})
    }
    loggerConsola.info("Resultado: ",resultado)
    resultado 
        ? res.json({estado:"OK",data:resultado})
        : res.json({estado:"error",descripcion:"No se elimino el producto"})
}

const addProdController = async (req,res)=>{
    const data = req.body.data
    let resultado = false
    try {
        resultado = await addProdService(data)
    } catch (error) {
        loggerConsola.error(error)
        resultado = false
    }

    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se agrego el producto",
        });
}

const updateProdController = async (req,res)=>{
    const id = req.params.id;
    const data = req.body.data
    let resultado = false
    try {
        resultado = await updateProdService(id,data)
    } catch (error) {
        loggerError.info(error)
        resultado = false
    }
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se agrego el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se actualizó el producto",
        });
}

const delProdController = async (req,res)=>{
    const id = req.params.id;
    let resultado = false
    try {
        resultado = await delProdService(id)
    } catch (error) {
        loggerConsola.error(error)
        resultado = false
    }
    resultado
      ? res.json({
          estado: "OK",
          descripcion: "Se elimino el producto",
        })
      : res.json({
          estado: "error",
          descripcion: "No se elimino el producto",
        });

}

module.exports = {getProdController,addProdController,updateProdController,delProdController}