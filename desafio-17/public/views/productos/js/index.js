const carrito = document.querySelector("#carrito");
const productos_list = document.querySelector("#productos-list");

let button_send;

carrito.innerHTML = 1;

const getProductos = (id = "") => {
  
  fetch("http://localhost:8080/api/productos/" + id)
    .then((res) => res.json())
    .then((data) => renderProductos(data.data))
    .catch((e) => console.log(e));
};

const validateUser = () => {
  const location = window.location.href.split("/")[0]
  console.log(Location)
  // fetch("http://localhost:8080/userLoged")
  //   .then((res) => res === false ? res.json() :  window.location.href = "location/login")
  //   .then((data) =>console.log(data))
  //   .catch((e) => console.log(e));
};

validateUser()

const renderProductos = async (productos) => {
  let html = "";
  console.log(productos);
  if (productos.lenght <= 0) {
    productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No hay productos para mostrar...</span>`;
  } else if (productos.length > 0) {
    console.log(productos);
    await productos.forEach((producto) => {
      html += cardProducto(producto);
    });
    productos_list.innerHTML = html;

    button_send = document.querySelectorAll(".boton-agregarCarrito");

    button_send.forEach((element) => {
      element.addEventListener("click", async (e) => {
        e.preventDefault()
        element.innerHTML = loaderSpinner();
        let id = sessionStorage.getItem("id_carrito");
        if (!!id) {
          console.log("pasa por aca", element.value);
          fetch(`http://localhost:8080/api/productos/${element.value}`)
            .then((response) => response.json())
            .then((data) => agregarProducto(id, data))
            .catch((e) => console.log(e));
          // fetch(`http://localhost:8080/api/carrito/${id}/producto/`)
          //   .then((response) => response.json())
          //   .then((data) => console.log(data))
          //   .catch((e) => console.log(e));
        } else {
          console.log("pasa por aca 2",`http://localhost:8080/api/productos/${element.value}`);
          fetch(`http://localhost:8080/api/productos/${element.value}`)
            .then((response) => response.json())
            .then((data) =>{console.log(data); return crearCarrito(data)})
            .catch((e) => console.log(e));
        }
      });
    });
  } else {
    productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No se pudo mostrar el catalogo...</span>`;
  }
};

const crearCarrito = (productos) => {
  fetch(`http://localhost:8080/api/carrito/`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(productos),
  })
    .then((response) => response.json())
    .then(({data}) => {
      console.log(data)
      sessionStorage.setItem("id_carrito", data.id.toString());
      console.log(data.id.toString());
    })
    .catch((e) => console.log(e));
};

const agregarProducto = (id, producto) => {
  fetch(`http://localhost:8080/api/carrito/${id}/producto`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(producto),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.descripcion);
    })
    .catch((e) => console.log(e));
};

const cardProducto = (producto) =>
  `<div class="card" style="width: 18rem;">
        <p class="form-text">ID: ${producto.id}</p>
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button href="#" value=${producto.id} class="btn btn-primary boton-agregarCarrito">Agregar al carrito</button>
        </div>
</div>`;

const loaderSpinner = () =>
  `<div class="spinner-grow mx-2" role="status">
    <span class="visually-hidden">Loading...</span>
</div>`;

getProductos();
