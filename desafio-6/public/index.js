const socket = io();
const button = document.querySelector("#form-subir");

const input = document.querySelector("#input-mensaje");
const input_mail = document.querySelector("#input-email");
const button_send = document.querySelector("#mensaje-section");

//Enviar producto al servidor
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
    body: JSON.stringify(producto),
  });
});

//Enviar mensaje al servidor
button_send.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "" && input_mail.value !== "") {
    const fecha = new Date();
    const mensajeData = {
      mensaje: input.value,
      fecha: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} ${
        fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
      }`,
      email: input_mail.value,
    };

    console.log(mensajeData);
    fetch("http://localhost:8080/mensaje", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(mensajeData),
    }).catch((e) => {
      console.log(e);
    });

    input.value = "";
  }
});

window.onload = () => {
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

socket.on("nuevo mensaje", async (data) => {
  console.log("mensaje de nuevo" + data.email);
  if (data.email !== undefined) {
    let html = `<li>
    <span class="mensaje-email">${data.email}</span>
    [<span class="mensaje-fecha">${data.fecha}</span>]
    <span class="mensaje-texto"><i>${data.mensaje}</i></span>
</li>`;

    document.querySelector("#mensaje-list").innerHTML += html;
  }
});

socket.on("mensajes", async (data) => {
  console.log("mensaje de nuevo" + data);
  let html = "";
  if (data.length > 0) {
    await data.forEach((dato) => {
      html += `<li>
      <span class="mensaje-email">${dato.email}</span>[
      <span class="mensaje-fecha">${dato.fecha}</span>]
      <span class="mensaje-texto"><i>${dato.mensaje}</i></span>
  </li>`;
    });

    document.querySelector("#mensaje-list").innerHTML += html;
  }
});
