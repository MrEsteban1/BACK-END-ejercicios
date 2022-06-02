const socket = io()
    // const input = document.getElementById('chat-message')
const button = document.querySelector('#form-subir')
     console.log('cargado...')

 window.onload = ()=>{
     console.log('hola')
    socket.emit('nueva conexion', 'Se conecto otra persona')
 }

socket.on("productos", async data => {
    console.log("pasa productos", data)
    let html =''
    if(data.length > 0){
        await data.forEach( dato => {
            html += `<tr>
            <th>${dato.id}</th>
            <th>${dato.title}</th>
            <th>${dato.price}</th>
            <th><img src="${dato.thumbnail}" width="100"/></th>
        </tr>`
        });
    } 

    document.querySelector("#products-table").innerHTML = html
})

