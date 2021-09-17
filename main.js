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
function agregarAlCarrito(productName){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.productName === productName);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      localStorage.setItem("miCarrito", JSON.stringify(carrito));
       $("#listaCarrito");
       $("#listaCarrito").append(`<li class="itemList list-group-item">${JSON.stringify(productoAgregado.productName)} - Precio: $${JSON.stringify(productoAgregado.productPrice)} <button type="button" class="btn-close boton-eliminar" aria-label="Close"></button></li>`);
       calcularTotal();
       $(".agregoProd").click(() => { 
        $(".itemList").fadeIn(500);
        });
  } else{
      console.log("algo falló");
  }
}
console.log(carrito);

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
    console.log(total);
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
  let parcial = (valor.productPrice);   
  total += parcial;
  DOMtotal.textContent = total.toFixed(2);
  console.log(total);
});
}

//hacemos animación con Jquery
function animaciones() {
  $("#divMiLogo").show(500);
  $("#divMiLogo").animate({left:"+=100px"});
  $(".agusCard").fadeIn(500);
  
}


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
  mostrar+=`<div class="card mb-3 agusCard" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${arrayProductos.productImg}" class="img-fluid rounded-start" alt="imagen-producto">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${arrayProductos.productName}</h5>
        <p class="card-text">${arrayProductos.productBrand}</p>
        <p class="card-text">$${arrayProductos.productPrice}</small></p>
        <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                 <div class="text-center"><a class="btn btn-outline-dark mt-auto agregoProd" 
                 onclick="agregarAlCarrito('${arrayProductos.productName}')">Agregar al carrito</a>
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

// OBJETO CONSTRUCTOR PARA CLIENTES//
class Cliente{
  constructor(nombre, apellido, edad, dni, direccion, email, telefono){
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.direccion = direccion;
      this.email = email;
      this.telefono = telefono;
  }
}

//DECLARACIÓN DEL ARRAY//
const arrayClientes = [];

//FUNCIÓN PARA RECOLECTAR LOS DATOS DEL CLIENTE//
const infoCliente = () => {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let dni = document.getElementById("dni").value;
  let direccion = document.getElementById("direccion").value;
  let email = document.getElementById("email").value;
  let telefono = document.getElementById("telefono").value;
  
  if (edad >= 18 && telefono.length == 8) {
    let datosCliente = {nombre: nombre,
                 apellido: apellido,
                 edad: edad,
                 dni: dni,
                 direccion: direccion,
                 email: email,
                 telefono: telefono}
  
    arrayClientes.push(new Cliente(nombre, apellido, edad, dni, direccion, email, telefono));
    localStorage.setItem("clientes", JSON.stringify(arrayClientes));
    console.log(localStorage.getItem("clientes", arrayClientes));
    console.log(JSON.stringify(`${datosCliente.nombre} ya tenemos tus datos, gracias por tu compra!`));
  } else {
    console.log("Disculpe, o su teléfono no es válido, o no está en su mayoría de edad para continuar.");
  }
}

