const carrito = document.querySelector("#carrito");
const productos_list = document.querySelector("#productos-list");
let button_send;

carrito.innerHTML = 1;

const getProductos = (id = "") => {
  fetch("http://localhost:8080/api/productos/")
    .then((res) => res.json())
    .then((data) => renderProductos(data))
    .catch((e) => console.log(e));
};

const renderProductos = (productos) => {
  let html = "";
  console.log(productos);
  if (productos.lenght <= 0) {
    productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No hay productos para mostrar...</span>`;
  } else if (productos.length > 0) {
    console.log(productos);
    productos.forEach((producto) => {
      html += cardProducto(producto);
    });
    productos_list.innerHTML = html;
    button_send = document.querySelector(".boton-agregarCarrito");
    button_send.addEventListener("click", async () => {
      button_send.innerHTML += `<div class="spinner-grow mx-2" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
      await fetch("");
    });
  } else {
    productos_list.innerHTML = `<span class="placeholder col-12 bg-danger">No se pudo mostrar el catalogo...</span>`;
  }
};

const cardProducto = (producto) =>
  `<div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Price: ${producto.precio}</p>
          <button href="#" value=${producto.id} class="btn btn-primary boton-agregarCarrito">Agregar al carrito</button>
        </div>
</div>`;

getProductos();
