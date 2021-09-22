//To Do: -función eliminar del carrito
//To Do: -función para guardar en localStorage
//To Do: -traer del localStorage
//To Do: -Hacer funcionar la api
//To Do: -Hacer una animación con Jquery

//renderizo productos con jquery//
$(document).ready(renderizarProductos());
animaciones();
//CREO ARRAY CARRITO//
let carrito = [];

//total del carrito//
let total = 0;

//imprimimos el total del carrito//
const DOMtotal = document.getElementById("total");

//Función agregarAlCarrito// 
function agregarAlCarrito(title){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.title === title);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
       $("#listaCarrito");
       $("#listaCarrito").append(`<li class="itemList list-group-item">${JSON.stringify(productoAgregado.title)} - Precio: $${JSON.stringify(productoAgregado.unit_price)} <button type="button" class="btn-close boton-eliminar" aria-label="Close"></li>`);
       $(".boton-eliminar").on("click", eliminarDelCarrito);
       animacionItem();
       calcularTotal();
  } else{
      console.log("algo falló");
  }
}
console.log(carrito);

// Función ELIMINAR DEL CARRITO//
function eliminarDelCarrito(event) {
  const botonEliminar = event.target;
  carrito.splice(event.target);
  botonEliminar.closest(".itemList").remove();
  calcularTotal();
};

//Función btnComprar()
$("#btn-comprar").on("click", btnComprar)

function btnComprar() {
  if (carrito.length === 0) {
    console.log("el carrito esta vacío")
  } else {
    linkDePago();
  }
}
//Función VACIAR CARRITO//
$("#boton-vaciar").on("click", vaciarCarrito);

function vaciarCarrito() {

  if (carrito != undefined) {
    //vacío el carrito
    carrito.splice(0, carrito.length);
    //llamo by id a la lista
    $("#listaCarrito");
    //saco elementos del dom
    $("#listaCarrito").html("");
    //saco elementos del dom x 2
    $("#total").html("");
    //calculo total//
    total = 0;
    // console.log(total);
    vaciarLocalStorage();
    calcularTotal();
    } else {
    console.log("algo falló");
  }
}

// Función storage
function vaciarLocalStorage(){
  localStorage.clear();
}

//Función para Calcular el total//
function calcularTotal() {
  
  total = 0;
  carrito.forEach(function (valor) {
  let parcial = (valor.unit_price);   
  total += parcial;
  DOMtotal.textContent = total.toFixed(2);
  // console.log(total);
});
}
//function// 
function updateShoppingCartTotal() {
  let total = 0;
  const carritoTotal = $('#listaCarrito');

  const carritoItems = $('.itemList');

  carritoItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('€', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

//Hacemos animación con Jquery//
function animaciones() {
  $("#divMiLogo").show(500);
  $("#divMiLogo").animate({left:"+=100px"});
  $(".agusCard").fadeIn(500); }

//Animación items//
function  animacionItem() {
    $(".itemList").fadeIn(300)
                  .css("background-color","rgb(233, 211, 14)")
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
        <p class="card-text">$${arrayProductos.unit_price}</small></p>
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
  //utilizo sintaxis de Jquery.//
  $("#agusCard").html(mostrar);
  //llamo la función de animaciones para que tambien se ejecuten en los filtros 
  animaciones();
}

//URLBASE: "https://api.mercadopago.com"
//ENDPOINT: /checkout/preferences

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

