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
  const producto6 = new Producto("6", "Airpods Max","Apple", "images/airpods-max.webp", "airpods", 1, "ARS", 129999);
  baseDeDatos.push(producto6);
  const producto7 = new Producto("7", "Watch Series 6(GPS)", "Apple", "images/watch-series-6-azul.webp", "smartwatch", 1, "ARS", 57999);
  baseDeDatos.push(producto7);
  const producto8 = new Producto("8", "Smartwatch", "Tedge", "images/smartwatch-tedge.webp", "smartwatch", 1, "ARS", 5499);
  baseDeDatos.push(producto8);
  const producto9 = new Producto("9", "Airpods Max", "Apple", "images/airpods-max-rosa.webp", "airpods", 1, "ARS", 109999);
  baseDeDatos.push(producto9);
  const producto10 = new Producto("10", "Airpods Max", "Apple", "images/airpods-max-azul.webp", "airpods", 1, "ARS", 89999);
  baseDeDatos.push(producto10);

$(document).ready(renderizarProductos());

animaciones();

let carrito = [];
let total = 0; 
let subtotal = 0;

const DOMcarrito = document.getElementById("listaCarrito")
const DOMtotal = document.getElementById("total");
const eventComprar = $("#btn-comprar").on("click", btnComprar);
const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);
const eventModal = $("#carritoModalBoton").on("click", modalCarrito);
const eventForm = $("#boton-comprar").on("click", mostrarForm);



  if (localStorage.getItem("miCarrito")) {
    carrito = JSON.parse(localStorage.getItem("miCarrito"));
    mostrarContenidoCarrito();
    document.getElementById("contador-carrito").innerHTML = carrito.length;
  }

function agregarAlCarrito(id){
  let productoAgregado = baseDeDatos.find(product => product.id === id);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
      mostrarContenidoCarrito();
      calcularTotal();
  } else{
      console.log("algo falló");
  }
  document.getElementById("contador-carrito").innerHTML = carrito.length;
}

function mostrarContenidoCarrito() {
  DOMcarrito.textContent = "";
  const quitamosDuplicados = [...new Set(carrito)];
  quitamosDuplicados.forEach(product => {
  baseDeDatos.filter((itemProduct) => {
      return itemProduct.id === parseInt(product);
    });
  const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === product ? total += 1 : total;
  }, 0);
    const nuevoItem = document.createElement("li");
    const botonEliminar = document.createElement("button");
    nuevoItem.classList.add("itemCarrito", "list-group-item");
    nuevoItem.textContent = `Producto: ${product.title} ${product.description} Precio x ${numeroUnidadesItem} UNIDADES = $${product.unit_price*numeroUnidadesItem}`;
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

// Función ELIMINAR DEL CARRITO//
function eliminarDelCarrito() {
    let productoQueElimino = this.getAttribute('productoId')
    carrito = carrito.filter(e => e.id != productoQueElimino)
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
    calcularTotal();
    document.getElementById("contador-carrito").innerHTML = carrito.length;

};

//Función del boton generar link de Mp
function btnComprar() {
  if (carrito.length === 0) {
    $("#modalCarritoVacio").modal("show");
  } else {
    linkDePago();
  }
}

//function para mostrar modal
function modalCarrito(e) {
  e.preventDefault();
if (carrito.length == 0) {
  $("#modalCarritoVacio").modal("show");
} else if (carrito.length > 0) {
  $("#idModalCarrito").modal("show");
}
}

function mostrarForm() {
  $(".divForm").fadeIn(1000);
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
    } 
  document.getElementById("contador-carrito").innerHTML = carrito.length;

}

// Función VaciarLocalStorage
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
    $(".itemCarrito").fadeIn(300)
                  .css("background-color","rgba(95, 95, 134, 0.808)")
                  .css("color", "white")
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
  `<div class="card mb-3 agusCard" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.picture_url}" class="cardImg img-fluid rounded-start" alt="imagen-producto">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title cardTitle">${product.title}</h6>
        <p class="card-text cardDescription">${product.description}</p>
        <p class="card-text cardPrice">$${product.unit_price}</small></p>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                 <div class="text-center"><button class="btn btn-outline-dark mt-auto agregoProd" 
                 onclick="agregarAlCarrito('${product.id}')">Agregar al carrito</button>
                 </div>
            </div>
      </div>
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
