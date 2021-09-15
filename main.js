//renderizo productos con jquery//
$(document).ready(renderizarProductos());

//CREO ARRAY CARRITO//
let carrito = [];

//total del carrito//
let total = 0;

//imprimimos el total del carrito//
const DOMtotal = document.getElementById('total');

//Función agregarAlCarrito// 
//utilizo selectores de Jquery y método append. (ahorro muchas lineas).//
function agregarAlCarrito(productName){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.productName === productName);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
       $("#listaCarrito");
       $("#listaCarrito").append(`<li class="itemList list-group-item">${JSON.stringify(productoAgregado.productName)} - Precio: $${JSON.stringify(productoAgregado.productPrice)} <button type="button" class="btn-close boton-eliminar" aria-label="Close"></button></li>`);
       calcularTotal();
  } else{
      console.log("algo falló");
  }
}
console.log(carrito);

//Función VACIAR CARRITO//
//utilizo selectores de Jquery y el método .on//
$("#boton-vaciar").on("click", vaciarCarrito);

function vaciarCarrito() {

  if (carrito != undefined) {
    //vacío el carrito
    carrito.splice(0, carrito.length);
    // llamo by id a la lista
    $("#listaCarrito");
    //saco elementos del dom
    $("#listaCarrito").html("");
    //saco elementos del dom x 2
    $("#total").html("");
    calcularTotal();
    } else {
    console.log("algo falló");
  }
}


function calcularTotal() {
  
  total = 0;
  carrito.forEach(function (valor) {
  let parcial = (valor.productPrice);   
  total += parcial;
  DOMtotal.textContent = total.toFixed(2);
});
}
// function calcularTotal() {
  // Limpiamos precio anterior
  // total = 0;
  // Recorremos el array del carrito
  // carrito.forEach((item) => {
      // De cada elemento obtenemos su precio
  //     const miItem = baseDeDatos.filter((itemBaseDatos) => {
  //         return itemBaseDatos.id === parseInt(item);
  //     });
  //     total = total + miItem[0].precio;
  // });
  // Renderizamos el precio en el HTML
  
// }

// Función ELIMINAR DEL CARRITO//
// const botonEliminar = document.getElementsByClassName("boton-eliminar");
// botonEliminar.addEventListener("click", eliminarDelCarrito);

// function eliminarDelCarrito() {
  
//   if (carrito != undefined) {
//     //metodo para borrar un elemento del array//
//      carrito.shift();
//      let miLista = document.getElementById("listaCarrito");
//      //metodo para remover del dom//
//      miLista.removeChild(miLista.childNodes[0]);
//     } else {
//     alert("algo falló");
//   }
// } 

/**
 * @param {*} filtro
 * Filtro los productos
 */
 function renderizarProductos(filtro = 'default') {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(arrayProductos => arrayProductos.category == filtro) :
  baseDeDatos;

  // CREO MIS CARDS CON JS //
  let mostrar=``;
  nuevosProductos.forEach((arrayProductos) => {
    mostrar+=`<div id="agusCard" class="card" style="width: 16rem;">
    <img src="${arrayProductos.productImg}" class="card-img-top img-fluid" alt="imagen-producto">
    <div class="card-body">
      <h5 class="card-title">${arrayProductos.productName}</h5>
      <p class="card-text">${arrayProductos.productBrand}</p>
      <p class="card-text">$${arrayProductos.productPrice}</p>
      <!-- Product actions-->
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center"><a class="btn btn-outline-dark mt-auto" 
          onclick="agregarAlCarrito('${arrayProductos.productName}')">Agregar al carrito</a>
          </div>
      </div>
      </div>
  </div>`
  });
  //utilizo sintaxis de Jquery.//
  $("#agusCard").html(mostrar);
}

// OBJETO CONSTRUCTOR PARA CLIENTES//
class Cliente{
  constructor(nombre, apellido, edad, direccion, email, telefono){
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.direccion = direccion;
      this.email = email;
      this.telefono = telefono;
  }
}

//DECLARACIÓN DEL ARRAY//
const arrayClientes = [];

//ORDENO CLIENTES//
arrayClientes.sort();

//FUNCIÓN PARA RECOLECTAR LOS DATOS DEL CLIENTE//
const infoCliente = () => {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let direccion = document.getElementById("direccion").value;
  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;
  
  if (edad >= 18 && telefono.length == 8) {
    let datosCliente = {nombre: nombre,
                 apellido: apellido,
                 edad: edad,
                 direccion: direccion,
                 email: email,
                 telefono: telefono}
  
    arrayClientes.push(new Cliente(nombre, apellido, edad, direccion, email, telefono));
    localStorage.setItem("clientes", JSON.stringify(arrayClientes));
    console.log(localStorage.getItem("clientes", arrayClientes));
    console.log(JSON.stringify(`${datosCliente.nombre} ya tenemos tus datos, gracias por tu compra!`));
  } else {
    console.log("Disculpe, o su teléfono no es válido, o no está en su mayoría de edad para continuar.");
  }
}

