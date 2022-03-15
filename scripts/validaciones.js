

  //RENDERIZO MIS CARDS
  $(document).ready(renderizarProductos());

  animaciones();
  
  let carrito = [];
  let total = 0; 
  let subtotal = 0;
  
  //DECLARO EVENTOS Y CONTENEDORES DOM
  const DOMcarrito = document.getElementById("listaCarrito")
  const DOMtotal = document.getElementById("total");
  const eventComprar = $("#btn-comprar").on("click", btnComprar);
  const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);
  const eventModal = $("#carritoModalBoton").on("click", modalCarrito);
  const eventForm = $("#boton-comprar").on("click", mostrarForm);
  
  
  //VALIDACIÓN LOCALSTORAGE
    if (localStorage.getItem("miCarrito") != null) {
      carrito = JSON.parse(localStorage.getItem("miCarrito"));
      mostrarContenidoCarrito();
      document.getElementById("contador-carrito").innerHTML = carrito.reduce((acc, el)=> acc + el.quantity,0);
    }
  