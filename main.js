
$(document).ready(renderizarProductos());

animaciones();

let carrito = [];

let total = 0; 

let subtotal = 0;

const DOMcarrito = document.getElementById("listaCarrito")
const DOMtotal = document.getElementById("total");
const eventComprar = $("#btn-comprar").on("click", btnComprar);
const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);
const cantidadProd = document.getElementsByClassName("cantidad");

if (localStorage.getItem("miCarrito")) {
  carrito = JSON.parse(localStorage.getItem("miCarrito"));
  mostrarContenidoCarrito();
}

function agregarAlCarrito(title){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.title === title);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
      mostrarContenidoCarrito();
      calcularTotal();
  } else{
      console.log("algo falló");
  }
}

function mostrarContenidoCarrito() {
  DOMcarrito.textContent = "";

  const carritoSinDuplicados = [...new Set(carrito)];

  carritoSinDuplicados.forEach(product => {
    arrayProductos.filter((itemProduct) => {
      return itemProduct.id === parseInt(product);
  });
  const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === product ? total += 1 : total;
  }, 0);
    const nuevoItem = document.createElement("li");
    const botonEliminar = document.createElement("button");
    const botonSumar = document.createElement("button");
    botonSumar.classList.add("btn","btn-secundary", "btn-suma", "btn-outline-dark");
    botonSumar.textContent  = ("+");
    botonSumar.setAttribute("itemId", product.id);
    nuevoItem.classList.add("itemList", "list-group-item");
    nuevoItem.textContent = `${numeroUnidadesItem} - ${JSON.stringify(product.title)} - ${JSON.stringify(product.description)}- $${JSON.stringify(product.unit_price*numeroUnidadesItem)}`
    botonEliminar.classList.add("btn", "btn-secundary", "boton-eliminar", "btn-outline-dark");
    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = ("x");
    botonEliminar.setAttribute("productoId", product.id);
    nuevoItem.appendChild(botonSumar);
    nuevoItem.appendChild(botonEliminar);
    DOMcarrito.appendChild(nuevoItem);
    $(".boton-eliminar").on("click", eliminarDelCarrito);
    botonSumar.addEventListener("click", agregarAlCarrito);
    animacionItem(); 
    calcularTotal();
  });
  }
  

// Función ELIMINAR DEL CARRITO//
function eliminarDelCarrito() {
    let productoQueElimino = this.getAttribute('productoId')
    carrito = carrito.filter(e => e.id != productoQueElimino)
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
    calcularTotal();

};

//Función btnComprar()
function btnComprar() {
  if (carrito.length === 0) {
    console.log("el carrito esta vacío")
  } else {
    linkDePago();
  }
}

//Función VACIAR CARRITO//
function vaciarCarrito() {
  if (carrito.length > 0) {
    carrito.splice(0, carrito.length);
    $("#listaCarrito");
    $("#listaCarrito").html("");
    $("#total").html("");
    total = 0;
    vaciarLocalStorage();
    calcularTotal();
    } else {
    console.log("El carrito ya está vacío");
  }
}

// Función storage
function vaciarLocalStorage(){
  localStorage.clear();
}

//Función para Calcular el total//
function calcularTotal() {
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
function animaciones() {
  $("#divMiLogo").show(500);
  $("#divMiLogo").animate({left:"+=100px"});
  $(".agusCard").fadeIn(500); }

//Animación items//
function  animacionItem() {
    $(".itemList").fadeIn(300)
                  .css("background-color","rgb(64, 107, 248)")
                  .css("color", "white")
                  ;}


/**
 * @param {*} filtro
 * Filtro los productos
 */
 function renderizarProductos(filtro = 'default') {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(arrayProductos => arrayProductos.category_id == filtro) :
  baseDeDatos;
  // CREO MIS CARDS CON JS //
  let mostrar=``;
  nuevosProductos.forEach((arrayProductos) => {
  mostrar+=`<div class="card mb-3 agusCard" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${arrayProductos.picture_url}" class="img-fluid rounded-start" alt="imagen-producto">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${arrayProductos.title}</h5>
        <p class="card-text">${arrayProductos.description}</p>
        <p class="card-text cardPrice">$${arrayProductos.unit_price}</small></p>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                 <div class="text-center"><a class="btn btn-outline-dark mt-auto agregoProd" 
                 onclick="agregarAlCarrito('${arrayProductos.title}')">Agregar al carrito</a>
                 </div>
            </div>
      </div>
    </div>
  </div>
</div>`
  });
  $("#agusCard").html(mostrar);
  animaciones();
}



function linkDePago() {

  //DATOS A ENVIAR
const elementosMpParcial = carrito.map(producto =>{
  return {
    "title" : producto.title,
    "description": producto.description,
    "picture_url" : producto.picture_url,
    "category_id" : producto.category_id,
    "quantity" : 1,
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

console.log(carrito);
