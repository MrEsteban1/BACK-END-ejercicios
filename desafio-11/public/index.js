const input = document.getElementById('user-input')
const loginButton = document.getElementById('button-login')

loginButton.addEventListener("click", (e)=>{
    e.preventDefault()
    const usuario = input.value

    fetch("http://localhost:8080/login",{
        method: "POST", // or 'PUT'
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({user: usuario})
    })
})

console.log("hola")