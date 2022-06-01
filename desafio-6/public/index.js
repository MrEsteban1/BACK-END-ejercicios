const socket = io()

setTimeout(()=>{
    // const input = document.getElementById('chat-message')
    // const button = document.getElementById('chat-send')
     console.log('cargado...')


// button.addEventListener('click', ()=>{
//     console.log('sale aca')
//     document.querySelector(".chat-texts").innerHTML = "Hello World";  
// })
io.emit('nueva conexion', 'Se conecto otra persona')
socket.on('mensaje bienvenida', (data) => {
    console.log(data)
    
    socket.emit('notificacion', 'Mensaje recibido correctamente')
})

socket.on('nuevo usuario', (data) => {
    alert(data)
})

socket.on("productos", data => {
    console.log("pasa productos", data)
    let html =''
    if(data.length > 0){
        data.forEach( dato => {
            html += `<tr>
            <th>${dato.id}</th>
            <th>${dato.title}</th>
            <th>${dato.price}</th>
            <th><img src="${data.thumbnail}"/> </th>
        </tr>`
        });
    } 
    document.querySelector("#products-table").innerHTML += html
})

},2000)
