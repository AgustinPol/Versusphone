//ARRAY BASE DE DATOS DE PRODUCTOS
const baseDeDatos = [];

//CONSTRUCTOR DE PRODUCTOS//
class Producto{
    constructor(id,title,description,picture_url,category_id,quantity,currency_id,unit_price){
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture_url = picture_url;
        this.category_id = category_id;
        this.quantity = quantity;
        this.currency_id = currency_id;
        this.unit_price = unit_price;
    }
  }
  
  //PUSHEO LA INFO DE CADA CARD/PRODUCTO//
  const producto1 = new Producto("1", "Smartwatch", "Xiaomi","images/xiaomi-smartwatch.webp","smartwatch", 1, "ARS", 6999);
  baseDeDatos.push(producto1);
  const producto2 = new Producto("2", "Airpods Basic", "Apple" , "images/airpodscomun.webp","airpods",1, "ARS", 18999);
  baseDeDatos.push(producto2);
  const producto3 = new Producto("3", "Airpods Pro","Apple", "images/Airpod-Pro.webp", "airpods", 1, "ARS", 32999);
  baseDeDatos.push(producto3);
  const producto4 = new Producto("4", "Smartwatch series 3", "Apple", "images/Smartwatch-apple.webp", "smartwatch", 1, "ARS",32999);
  baseDeDatos.push(producto4);
  const producto5 = new Producto("5", "Smartwatch Sense", "Fitbit", "images/smartwatch-fitbit.webp", "smartwatch",1, "ARS", 46999);
  baseDeDatos.push(producto5);
  const producto6 = new Producto("6", "Airpods Max","Apple", "images/airpods-max.webp", "airpods", 1, "ARS", 114999);
  baseDeDatos.push(producto6);
  const producto7 = new Producto("7", "Watch Series 6(GPS)", "Apple", "images/watch-series-6-azul.webp", "smartwatch", 1, "ARS", 57999);
  baseDeDatos.push(producto7);
  const producto8 = new Producto("8", "Smartwatch", "Tedge", "images/smartwatch-tedge.webp", "smartwatch", 1, "ARS", 5499);
  baseDeDatos.push(producto8);
  const producto9 = new Producto("9", "Airpods Max", "Apple", "images/airpods-max-rosa.webp", "airpods", 1, "ARS", 94999);
  baseDeDatos.push(producto9);
  const producto10 = new Producto("10", "Airpods Max", "Apple", "images/airpods-max-azul.webp", "airpods", 1, "ARS", 114999);
  baseDeDatos.push(producto10);

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

//FUNCIONES  
function agregarAlCarrito(id) {
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

function mostrarContenidoCarrito() {
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

function eliminarDelCarrito() {
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
function btnComprar() {
  if (carrito.length === 0) {
    $("#modalCarritoVacio").modal("show");
  } else {
    linkDePago();
  }
}

function modalCarrito(e) {
  e.preventDefault();
if (carrito.length == 0) {
  $("#modalCarritoVacio").modal("show");
} else if (carrito.length > 0) {
  $("#idModalCarrito").modal("show");
}
}

function mostrarForm() {
  if (carrito.length != 0){
    $(".divForm").fadeIn(1000);
  } else {
    $("#modalCarritoVacio").modal("show");
  }
} 

function reiniciarForm(){
  document.getElementById("formulario").reset();
  }

function vaciarCarrito() {
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

function vaciarLocalStorage(){
  localStorage.clear();
}

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
  $("#divMiLogo").animate({left:"+=50px"});
  $(".agusCard").fadeIn(500); 
}

//Animación items//
function  animacionItem() {
    $(".itemCarrito").fadeIn(300)
                  .css("color", "white")
                  .css("border", "solid black 2px")
                  .css("margin", "0.2rem")
                  ;}

//filtramos los productos por categoría
 function renderizarProductos(filtro = 'default') {
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
function linkDePago() {

  
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

