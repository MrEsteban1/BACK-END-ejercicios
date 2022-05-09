class Usuario {
    constructor (nombre, apellido, libros, mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas; 
   }

   getFullName (){
       return `${this.nombre} ${this.apellido}`
   }

   addMascota(nombre, edad){
        this.mascotas = [...this.mascotas, {nombre: nombre, edad: edad}]
   }

   countMascotas(){
       return this.mascotas.length
   }

   addBook(nombre, autor){
        return  this.libros = [...this.libros,{nombre:nombre,autor:autor}]
   }

   getBookNames (){
       return this.libros.map(libro => libro.nombre)
   }

}

const Usuario1 = new Usuario("Micaela","Sanchez",[{nombre:"Puerco Potter", autor:"Laura Rawk"}]) 
// llamando getFullName
console.log("Nombre: ", Usuario1.getFullName())
// llamando addMascota
Usuario1.addMascota("pepino", 12)
// llamando countMascotas
console.log("Cantidad de mascotas: ",Usuario1.countMascotas())
// llamando addBook
Usuario1.addBook("Percy y la fabrica de chocolate", "Pedro Chavez")
 // llamando getBookNames
 console.log("Nombres de libros: ", Usuario1.getBookNames())
 