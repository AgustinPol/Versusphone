
//FUNCIONES  
const agregarAlCarrito = (id) => {
  let productoRepetido = carrito.find(produR => produR.id == id);
  if (productoRepetido) {
    productoRepetido.quantity = productoRepetido.quantity + 1;
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
  } else {
    let productoAgregado = baseDeDatos.find(produA => produA.id == id);
    carrito.push(productoAgregado);
    productoAgregado.quantity = 1;
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
  }
  document.getElementById("contador-carrito").innerHTML = carrito.reduce((acc, el)=> acc + el.quantity,0);

}

const mostrarContenidoCarrito = () => {
  DOMcarrito.textContent = "";
  carrito.forEach(product => {
    const nuevoItem = document.createElement("li");
    const botonEliminar = document.createElement("button");
    nuevoItem.classList.add("itemCarrito", "list-group-item");
    nuevoItem.textContent = `${product.title} ${product.description} [Precio(u)= $${product.unit_price}] [${product.quantity} Unidades] Subtotal = $${product.unit_price*product.quantity}`;
    botonEliminar.classList.add("btn", "btn-secundary", "boton-eliminar", "btn-outline-dark");
    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = ("x");
    botonEliminar.setAttribute("productoId", product.id);
    nuevoItem.appendChild(botonEliminar);
    DOMcarrito.appendChild(nuevoItem);
    botonEliminar.addEventListener("click", eliminarDelCarrito);
    animacionItem(); 
    calcularTotal();
  });
  }

const eliminarDelCarrito = () => {
    let productoQueElimino = this.getAttribute('productoId')
    carrito = carrito.filter(e => e.id != productoQueElimino)
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
    reiniciarForm();
    $(".divForm").fadeOut(1000);
    $(".datosCorrectos").fadeOut(1000);
    calcularTotal();
    document.getElementById("contador-carrito").innerHTML = carrito.reduce((acc, el)=> acc + el.quantity,0);
};

//GENERA EL LINK DE MP
const btnComprar = () => {
  if (carrito.length === 0) {
    $("#modalCarritoVacio").modal("show");
  } else {
    linkDePago();
  }
}

const modalCarrito = (e) => {
  e.preventDefault();
if (carrito.length == 0) {
  $("#modalCarritoVacio").modal("show");
} else if (carrito.length > 0) {
  $("#idModalCarrito").modal("show");
}
}

const mostrarForm = () => {
  if (carrito.length != 0){
    $(".divForm").fadeIn(1000);
  } else {
    $("#modalCarritoVacio").modal("show");
  }
} 

const reiniciarForm = () => {
  document.getElementById("formulario").reset();
  }

const vaciarCarrito = () => {
  if (carrito.length > 0) {
    carrito.splice(0, carrito.length);
    $("#listaCarrito");
    $("#listaCarrito").html("");
    $("#total").html("");
    $(".datosCorrectos").fadeOut(1000);
    $(".divForm").fadeOut(1000);
    total = 0;
    vaciarLocalStorage();
    reiniciarForm();
    calcularTotal();
    } 
    document.getElementById("contador-carrito").innerHTML = carrito.reduce((acc, el)=> acc + el.quantity,0);

}

const vaciarLocalStorage = () => {
  localStorage.clear();
}

const calcularTotal = () => {
  JSON.parse(localStorage.getItem("miCarrito"));
  if (carrito.length == 0) {
    DOMtotal.textContent = "0";
  } else  {
    total = 0;
    carrito.forEach( (productItem) => {
    let subtotal = Number(productItem.unit_price * productItem.quantity);
    total = total + subtotal;
    DOMtotal.textContent = total.toFixed(2);
  });
  }
}

//Hacemos animación con Jquery//
const animaciones = () => {
  $("#divMiLogo").show(500);
  $("#divMiLogo").animate({left:"+=50px"});
  $(".agusCard").fadeIn(500); 
}

//Animación items//
const animacionItem = () => {
    $(".itemCarrito").fadeIn(300)
                  .css("color", "white")
                  .css("border", "solid black 2px")
                  .css("margin", "0.2rem")
                  ;}

//filtramos los productos por categoría
 const renderizarProductos = (filtro = "default") => {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(product => product.category_id == filtro) :
  baseDeDatos;
  // CREO MIS CARDS CON JS //
  let mostrar=``;
  nuevosProductos.forEach((product) => {
  mostrar+=
  `<div class="card col-lg-3 agusCard">
      <div class="card-body">
      <img src="${product.picture_url}" class="img-fluid" alt="imagen-producto">
        <h6 class="card-title">${product.title}</h6>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.unit_price}</small></p>
        <!-- Product actions-->
        <div class="btn-add">
        <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito('${product.id}')">Agregar al carrito</button>
        </div>
               
      </div>
</div>`
  });
  $("#mainCard").html(mostrar);
  animaciones();
}
//Función Del Fetch de la Api de Mercado Pago
const linkDePago = () => {

  
const elementosMpParcial = carrito.map(producto =>{
  return {
    "title" : producto.title,
    "description": producto.description,
    "picture_url" : producto.picture_url,
    "category_id" : producto.category_id,
    "quantity" : producto.quantity,
    "currency_id" : "ARS",
    "unit_price" : producto.unit_price
  }
})  
const elementosMpFinal = {"items": elementosMpParcial}

const APIURL = "https://api.mercadopago.com/checkout/preferences";
fetch(APIURL,{
  method: "POST",
  headers:{
    "Authorization": "Bearer TEST-1636818352685457-092017-ffeb98783f1bf6b11fa32dbc941c69d3-593315394",
   "Content-Type": "application/json"
  },
  body: JSON.stringify(elementosMpFinal)
}).then(response => {return response.json()})
.then(data => {window.open(data.init_point, "_blank");
})
}

