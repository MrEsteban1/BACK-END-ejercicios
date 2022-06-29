const mensajes = 
[
    {
        fecha: 20/10/2022,
        email: 'esteban@gmail.com',
        mensaje: 'Hola buenos dias!'
    },
    {
        fecha: 20/10/2022,
        email: 'sergio@gmail.com',
        mensaje: 'Hola, buenos dias! Que tal?'
    },
    {
        fecha: 20/10/2022,
        email: 'mariano@gmail.com',
        mensaje: 'Soy Mariano, buenos dias!'
    },
    {
        fecha: 20/10/2022,
        email: 'brian@gmail.com',
        mensaje: 'Buenas tardes a todos!'
    },
    {
        fecha: 21/10/2022,
        email: 'esteban@gmail.com',
        mensaje: 'Que cuentan?!'
    },
    {
        fecha: 23/10/2022,
        email: 'gonzalo@gmail.com',
        mensaje: 'Gonzalo me llamo!'
    },
    {        
        fecha: 20/11/2022,
        email: 'sergio@gmail.com',
        mensaje: 'Estamos gucci'
    },
    {        
        fecha: 22/11/2022,
        email: 'esteban@gmail.com',
        mensaje: 'Buenisimo!'
    },
    {   
        fecha: 20/10/2022,
        email: 'esteban@gmail.com',
        mensaje: 'Hay que hacer algo'
    },
    {
        fecha: 20/10/2022,
        email: 'sergio@gmail.com',
        mensaje: 'Dale!'
    }
]

const productos =
[
    {
        timestamp: 1655009971,
        nombre: "Lampara Mesa",
        precio: 400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 6,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Mesa Azul",
        precio: 3400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Mesa Grande",
        precio: 4400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Lampara grande",
        precio: 2400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Lampara Mesa",
        precio: 400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Lampara Multicolor",
        precio: 1900,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009971,
        nombre: "Cuadro Grande",
        precio: 700,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 9,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009922,
        nombre: "Cuadro Chico",
        precio: 1400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 19,
        descripcion: "Lampara para iluminar habitaciones"
    },
    {
        timestamp: 1655009961,
        nombre: "Cuadro Grande Madera",
        precio: 400,
        imagen: "https://www.elmueble.com/medio/2021/12/19/lampara_268fa582_600x600.png",
        stock: 29,
        descripcion: "Lampara para iluminar habitaciones"
    },
]

db.mensajes.insertMany(mensajes)
db.productos.insertMany(productos)

db.mensajes.find()

db.productos.count()
db.mensajes.count()


db.productos.insertOne(
    {
        timestamp
    }
)

db.productos.find({precio:{$lt: 1000}})
db.productos.find({$and: [{$lt:1500},{$gt:3000}]})
db.productos.find({$lt: 3000})
db.productos.find({})
/** show dbs
 * db
 * use ibizadeco
 * db.createCollection("mensaje")
 * db.createCollection("productos")
*/

/**
 * 
 */