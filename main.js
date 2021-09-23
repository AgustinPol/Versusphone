//To Do: -función eliminar del carrito
//To Do: -función para guardar en localStorage
//To Do: -traer del localStorage

//renderizo productos con jquery//
$(document).ready(renderizarProductos());


animaciones();

let carrito = [];

let total = 0;
const DOMcarrito = document.getElementById("listaCarrito")
const DOMtotal = document.getElementById("total");
const eventComprar = $("#btn-comprar").on("click", btnComprar);
const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);

//Función agregarAlCarrito// 
function agregarAlCarrito(title){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.title === title);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
       const miLista = document.getElementById("listaCarrito");
       const miItem = `<li class="itemList list-group-item">${JSON.stringify(productoAgregado.title)} - Precio: $${JSON.stringify(productoAgregado.unit_price)} <button type="button" class="btn-close boton-eliminar" aria-label="Close"></li>`;
       $(miLista).append(miItem);
       $(".boton-eliminar").on("click", eliminarDelCarrito);
       animacionItem();
       calcularTotal();
  } else{
      console.log("algo falló");
  }
}
console.log(carrito);

//Function para mostrar carrito siempre (localStorage)
function mostrarCarrito() {
  if (localStorage.getItem("miCarrito") != null) {
    localStorage.getItem("miCarrito");
    carrito.forEach((producto) => {
    const miItem = `<li class="itemList list-group-item">${JSON.stringify(producto.title)} - Precio: $${JSON.stringify(producto.unit_price)} <button type="button" class="btn-close boton-eliminar" aria-label="Close"></li>`
    }); 
  }
}


// Función ELIMINAR DEL CARRITO//
function eliminarDelCarrito(event) {
  const botonEliminar = event.target;
  carrito.splice(event.target);
  botonEliminar.closest(".itemList").remove();
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
  if (carrito != undefined) {
    carrito.splice(0, carrito.length);
    $("#listaCarrito");
    $("#listaCarrito").html("");
    $("#total").html("");
    total = 0;
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
//   total = 0;
// for(let i = 0; i < carrito.length; i++){
//   let element = Number(carrito[i].unit_price * carrito[i].quantity);
//   total = total + element;
//   DOMtotal.textContent = total.toFixed(2);
// }
  total = 0;
  carrito.forEach( (productItem) => {
  let subtotal = Number(productItem.unit_price * productItem.quantity);
  total = total + subtotal;
  DOMtotal.textContent = total.toFixed(2);
});
}
total = 0;
for(let i = 0; i < carrito.length; i++){
  let element = Number(carrito[i].unit_price * carrito[i].quantity);
  total = total + element;
  DOMtotal.textContent = total.toFixed(2);
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
  //utilizo sintaxis de Jquery.//
  $("#agusCard").html(mostrar);
  //llamo la función de animaciones para que tambien se ejecuten en los filtros 
  animaciones();
}



function linkDePago() {
//URLBASE: "https://api.mercadopago.com"
//ENDPOINT: /checkout/preferences

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

