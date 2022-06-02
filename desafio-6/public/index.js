const socket = io();
const button = document.querySelector("#form-subir");

const input = document.querySelector("#input-mensaje");
const button_send = document.querySelector("#mensaje-section");

button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Se toco boton producto.");
  const datosForm = document.querySelectorAll("form input");

  const producto = {
    title: datosForm[0].value,
    price: datosForm[1].value,
    thumbnail: datosForm[2].value,
  };

  console.log("productos", producto);

  fetch("http://localhost:8080/productos", {
    method: "POST", // or 'PUT'
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(producto), // data can be `string` or {object}!
  });
});

button_send.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Mensaje:" + input.value);
});

window.onload = () => {
  console.log("hola");
  socket.emit("nueva conexion", "Se conecto otra persona");
};

socket.on("productos", async (data) => {
  console.log("pasa productos", data);
  let html = "";
  if (data.length > 0) {
    await data.forEach((dato) => {
      html += `<tr>
            <th>${dato.id}</th>
            <th>${dato.title}</th>
            <th>${dato.price}</th>
            <th><img src="${dato.thumbnail}" width="100"/></th>
        </tr>`;
    });
  }

  document.querySelector("#products-table").innerHTML = html;
});
