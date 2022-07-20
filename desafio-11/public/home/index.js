const e = require("express")

const boton = document.getElementById('return-button')
boton.addEventListener('click', (e)=>{
    e.preventDefault()
    
    fetch('http://localhost:8080/logout',{
        method: GET,
        headers: { "Content-type": "application/json" },
    }).then(_ =>window.location.href = 'http://localhost:8080/login' )

    
})

console.log('hola')