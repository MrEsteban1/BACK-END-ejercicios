const {Router} = require("express");
const randomNumbers = require("../calculo");

const systemRouter = Router()

systemRouter.get("/info",(req,res)=>{
    const data = {
        argumentos: args,
        so: process.platform,
        version_node: process.version,
        memory: process.memoryUsage,
        pathof: process.cwd(),
        id_process: process.pid,
      };
    
      loggerConsola.info(data)
      res.json(data);
})

systemRouter.get("/random",(req,res)=>{
    const cantidad = req.query.cant || 10000
    //let calculo = fork("./calculo.js");
    randomNumbers(cantidad).then(e=> {res.json(e)}).catch(e=>console.log(e))
    //calculo.on("message", (numbers) => res.json(numbers));
})

module.exports = systemRouter