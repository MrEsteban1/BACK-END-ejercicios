const axios = require("axios");

const HOST = 'http://localhost:8080/';
const API = 'api/productos'

const producto1 = {
    nombre: "Florero Ceramica",
    precio: 1000,
    stock: 5,
    imagen: "https://misterkook.com/1827-home_default/florero-ceramica-jiwei-cf35az.jpg",
    descripcion: "producto de prueba"
}

const productUpdates = {
    precio:2000,
    stock: 100
}

const ID = "6330d4311201968a14f104b4"



//PRUEBA PARA OBTENER TODOS LOS PRODUCTOS
const getProducts = async () => {
    return await axios.get(`${HOST+API}/`)
    .then(response => {
        console.log('=============',"Prueba de GET PRODUCTOS","=============")
        console.log(response.data);
        console.log(`Status de la respuesta: ${response.status}`)
    })
    .catch(err => {
        console.log(err)
    })
}

//PRUEBA PARA AÑADIR UN PRODUCTO
const addProduct = async() => {
    return await axios.post(`${HOST+API}/`, {data:producto1})
    .then(response => {
        console.log('=============',"Prueba de ADD PRODUCTOS","=============")
        console.log(response.data);
        console.log(`La respuesta tiene el status: ${response.status}`)
    })
    .catch(err => {
        console.log('****PRODUCTO AÑADIDO****')
        console.log(err)
    })
}

//PRUEBA PARA OBTENER UN PRODUCTO POR ID
const getProduct = async () => {
        axios.get(`${HOST+API}/${ID}`)
        .then(response => {
            console.log('=============\n',"Prueba de GET 1 PRODUCTO","=============")
            console.log(response.data);
            console.log(`Status de la respuesta: ${response.status}`)
        })
        .catch(err => {
            console.log('=============',"Prueba de GET 1 PRODUCTO","=============")
            console.log(err);
        })
    
}

//PRUEBA PARA MODIFICAR PRODUCTO POR ID
const updatedProduct = async () => {
        axios.put(`${HOST+API}/${ID}`, {data: productUpdates})
        .then(response => {
            console.log('=============',"Prueba de GET 1 PRODUCTO","=============")
            console.log(response.data);
            console.log(`Status de la respuesta: ${response.status}`)
        })
        .catch(err => {
            console.log(err);
        })
}

//PRUEBA PARA ELIMINAR PRODUCTO POR ID
const deleteProduct = async () => {
    
        axios.delete(`${HOST+API}/${ID}`)
        .then(response => {
            console.log('=============',"Prueba de DELETE 1 PRODUCTO","=============")
            console.log(response.data);
            console.log(`Status de la respuesta: ${response.status}`)
        })
        .catch(err => {
            console.log('=============',"Prueba de DELETE 1 PRODUCTO","=============")
            console.log(err);
        })
    
}


getProducts();
addProduct();
getProduct();
updatedProduct();
deleteProduct();

