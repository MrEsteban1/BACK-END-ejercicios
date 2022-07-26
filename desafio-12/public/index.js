const input = document.getElementById("user-input");
const loginButton = document.getElementById("button-login");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const usuario = input.value;

  fetch("http://localhost:8080/login", {
    method: "POST", // or 'PUT'
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username: usuario, password: "rexsas" }),
  });

  console.log("hola");
  //window.location.href = 'http://localhost:8080/homes'
});

console.log("hola estamos aca");
