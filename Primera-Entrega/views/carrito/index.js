const productos_list = document.querySelector("#carrito-list");
let botones;

const validarID = (id) => {
  console.log(id);
  if (!!id) {
    productos_list.innerHTML = "Cargando Carrito..";
    infoCarrito(id);
  } else {
    productos_list.innerHTML =
      "No se encuentra el carrito, vuelva al catalogo.";
  }
};

const infoCarrito = (id) => {
  fetch(`http://localhost:8080/api/carrito/${id}`)
    .then((response) => response.json())
    .then((data) => renderProductos(data.productos, id));
  //.catch((e) => console.log(e));
};

validarID(sessionStorage.getItem("id_carrito"));

const renderProductos = async (productos, id) => {
  console.log(productos);
  const listProducts = await productos.map(
    (producto, i) =>
      `<tr>
        <th scope="row">${i}</th>
        <td>${producto.nombre}</td>
        <td>$ ${producto.precio}</td>
        <td><img src="${producto.imagen}" alt="${producto.descripcion}" width="40" height="40"></td>
        <td><button value=${producto.id} class="btn btn-danger">Eliminar</button></td>
    </tr>`
  );

  const htmlTable = `<table class="table table-warning p-2">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Imagen</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
        ${listProducts.join("")}
        <tbody>
    </table>
    <td><button value=${id} id="eliminar-carrito" class="btn btn-danger">Eliminar carrito</button></td>`;
  productos_list.innerHTML = htmlTable;
  botones = document.querySelectorAll("td .btn");
  let boton_eliminarCarrito = document.querySelector("#eliminar-carrito");

  boton_eliminarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    borrarCarrito(id);
  });

  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(boton.value);
      borraProducto(boton.value);
    });
  });
};

const borraProducto = (id) => {
  fetch(
    `http://localhost:8080/api/carrito/${sessionStorage.getItem(
      "id_carrito"
    )}/productos/${id}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.estado === "OK"
        ? validarID(sessionStorage.getItem("id_carrito"))
        : alert("No se pudo eliminar el dato");
    })
    .catch((e) => console.log(e));
};

const borrarCarrito = (id) => {
  fetch(
    `http://localhost:8080/api/carrito/${sessionStorage.getItem("id_carrito")}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.estado === "OK"
        ? (sessionStorage.removeItem("id_carrito"),
          validarID(sessionStorage.getItem("id_carrito")))
        : alert("No se pudo borrar el carrito");
    });
  //.catch((e) => console.log(e));
};
