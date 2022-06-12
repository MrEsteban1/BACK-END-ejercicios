const button = document.querySelector("#boton-enviar");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const datosForm = document.querySelectorAll("input");
  const producto = {
    administrador: true,
    data: {
      timestamp: Date.now(),
      nombre: datosForm[0].value,
      precio: datosForm[1].value,
      stock: datosForm[2].value,
      descripcion: datosForm[3].value,
      imagen: datosForm[4].value,
    },
  };

  fetch("http://localhost:8080/api/productos/", {
    method: "POST", // or 'PUT'
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(producto),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.estado === "error")
        document.querySelector("#error-form").innerHTML = "Error en la carga";
    })
    .catch(
      () =>
        (document.querySelector("#error-form").innerHTML = "Error en la carga")
    );

  console.log(producto);
});
