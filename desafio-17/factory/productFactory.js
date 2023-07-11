const ProductDAOMongo = require("../daos/mongo/productosDao")
const ProductDAOFirebase = require("../daos/firebase/productosDao")

const getProductDAO = (storage="mongo") => {
    let dao = {}
    switch(storage){
        case 'mongo':
            dao = new ProductDAOMongo()
            break
        case 'firebase':
            dao = new ProductDAOFirebase()
            break
        default:
            dao = new ProductDAOMongo()
            breaks
    }

    return new ProductDAOMongo()
}

module.exports = getProductDAO 