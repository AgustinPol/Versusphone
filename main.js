//CREO ARRAY CARRITO//
let carrito = [];
if(localStorage.carrito != null) {
  carrito = JSON.parse(localStorage.carrito);
  document.getElementById("contador-carrito").innerHTML = carrito.length;
}

//DECLARO ESTAS VARIABLES FUERA DE LAS FUNCIONES//
let totalCompra;
let unidades;
let producto;

//Objeto Clase DOM PARA GENERAR LOS PRODUCTOS//
class Producto{
  constructor(productName,productBrand,productPrice,productImg){
      this.productName = productName;
      this.productBrand = productBrand;
      this.productPrice = productPrice;
      this.productImg = productImg;
  }

}
//DECLARO ARRAY PRODUCTOS//
let productos=[];

//PUSHEO LA INFO DE CADA CARD/PRODUCTO//
const producto1 = new Producto("Smartwatch series 3", "Apple", 32999, "../images/Smartwatch-apple.webp");
productos.push(producto1);
const producto2 = new Producto("Airpods Pro","Apple", 32999, "../images/Airpod-Pro.webp");
productos.push(producto2);
const producto3 = new Producto("Airpods Básicos", "Apple" , 18999, "../images/airpodscomun.webp");
productos.push(producto3);
const producto4 = new Producto("Smartwatch", "Xiaomi", 6999, "../images/xiaomi-smartwatch.webp");
productos.push(producto4);
const producto5 = new Producto("Airpods Max","Apple", 129999, "../images/airpods-max.webp");
productos.push(producto5);
const producto6 = new Producto("Smartwatch Sense", "Fitbit", 46999, "../images/smartwatch-fitbit.webp");
productos.push(producto6);

//CREO CONSTANTE BASE DE DATOS PARA PODER UTILIZAR EL CARRITO//
const baseDeDatos = [producto1, producto2, producto3, producto4, producto5, producto6];


//ORDENAMIENTO DE ARRAY "PRODUCTOS", SE ORDENARON POR PRECIO, DE MENOR A MAYOR.//
productos.sort((o1, o2) => {
if (o1.productPrice < o2.productPrice) {
  return -1;
} else if (o1.productPrice > o2.productPrice) {
    return 1 ; 
  } else {
    return 0;
  }

})

//DECLARO VARIABLE MOSTRAR(RELACIONADA CON LAS CARDS)//
let mostrar="";

//Evento  //
// let botonCarrito = document.getElementById("btn-carrito");
// botonCarrito.addEventListener("submit", verCarrito);

// function verCarrito(e) {
//   e.preventDefault();
//   console.log("Formulario Enviado");
// }
 
//GENERAMOS LAS CARDS DEL HTML, CON JAVASCRIPT//
for(let i=0;i<productos.length;i++){
  mostrar+=`<div id="agusCard" class="card" style="width: 18rem;">
  <img src="${productos[i].productImg}" class="card-img-top" alt="imagen-producto">
  <div class="card-body">
    <h5 class="card-title">${productos[i].productName}</h5>
    <p class="card-text">${productos[i].productBrand}</p>
    <p class="card-text">$${productos[i].productPrice}</p>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" 
        onclick="agregarAlCarrito('${productos[i].productName}')">Agregar al carrito</a>
        </div>
    </div>
    </div>
</div>`
}
//DECLARO LET CONTADOR//
let contador=0;

//LLAMAMOS POR ID A LAS CARD Y LAS INYECTAMOS EN EL HTML//
document.getElementById("agusCard").innerHTML=mostrar;

  let clases = document.getElementsByClassName("productos");

  for(let i=0; i<clases.length;i++){
      console.log(clases[2]);
  }

//Función0 AGREGAR AL CARRITO//

function agregarAlCarrito(productName){
  const productoEncontrado = baseDeDatos.find(productos => productos.productName === productName);
  if(productoEncontrado != undefined){
      carrito.push(productoEncontrado);
  }else{
      alert("algo falló");
  }

  // CALCULAR TOTAL DEL CARRITO//
  document.getElementById("contador-carrito").innerHTML = carrito.length;
  console.log(carrito);

}


//LOCALSTORAGE
localStorage.carrito = JSON.stringify(carrito);
document.getElementById("contador-carrito").innerHTML = carrito.length;
//----------------------------------------------------------------------//

//LLAMANDO A ID SELECT CUOTAS
const cuotasId = document.getElementById('selectCuotas');

//CREO ARRAY
const cuotas = ['1 cuota', '3 cuotas', '6 cuotas'];

//CREO ELEMENTO SELECT
const select = document.createElement('select');

//INGRESO ATRIBUTOS AL SELECT
select.setAttribute('class', 'btn btn-secondary');

//METO SELECT EN cuotasId
cuotasId.appendChild(select);

//RECORREMOS ARRAY CON forEach
cuotas.forEach((cuota, index) => {
    const option = document.createElement('option');
    option.setAttribute('value', index);
    option.textContent = cuota;

    select.appendChild(option);
})

function imprimirSeleccion(e){
    //DISPARA EL EVENTO
    console.log(e.target)
}


// Función 1//
// function inicioCompra() {
 
//     for (let i = 0; i < 1; i++) {
//     alert("Bienvenido a Versusphone-X! Gracias por interesarse en nuestros productos!");
//     let confirmarCompra = confirm("¿Te interesa comprar algun producto?");
//     if (confirmarCompra) {
//     alert("¡Perfecto, sigamos!");
//     i++;
//   } else {
//     alert("¡Será en otra oportunidad, gracias por visitarnos!");
//     i--;
//   }
//  }
// }

//Función 2//

// function elijoProducto() 
// {
//     for (let i = 0; i <= 1; i++)
//    {
//     elegir = parseInt(prompt("Elija su producto: Smartwatch Apple(1)/Airpods Pro(2)/Airpods Básicos(3)/Smartwatch Xiaomi(4)/Airpods Max Apple(5)/Smartwatch Fitbit Sense(6)"));
    
//     if (elegir === 1) {
//       alert("Elegiste el Smartwatch Apple, tiene un valor de $32999 por unidad.");
//       producto = producto1.productPrice;
//       i++;
//     } else if (elegir === 2) {
//       alert("Elegiste los Airpods Pro, tiene una valor de $32999 por unidad");
//       producto = producto2.productPrice;
//       i++;
//     } else if (elegir === 3) {
//       alert("Elegiste los Airpods Básicos, tiene un valor de $18999 por unidad");
//       producto = producto3.productPrice;
//       i++;
//     } else if (elegir === 4) {
//       alert("Elegiste el Smartwatch de Xiaomi. ¡está en oferta! Tiene un valor de $6999 por unidad");
//       producto = producto4.productPrice;
//       i++;
//     } else if (elegir === 5) {
//       alert("Elegiste los Apple Airpods Max, tiene un valor de $129999 por unidad")
//       producto = producto4.productPrice;
//       i++;
//     } else if (elegir = 6) {
//       alert("Elegiste el Smartwatch Fitbit Sense, tiene un valor de $46999 por unidad")
//       producto = producto6.productPrice;
//       i++;
//     } else {
//       alert("Datos ingresados son incorrectos");
//       i--;
//     }
//    }
// }

// Función 3//
// function cuantasUnidades() {
  
//   do {
//   unidades = parseInt(prompt("Ingrese la cantidad de unidades que desea"));
//   totalCompra = unidades*producto;
// } while (isNaN(unidades)); 
//   alert(`El valor de su compra es ${totalCompra}`);
//   return(totalCompra)
// }
//Función 4//
// function calculoCuotas() {

//   for (let i = 0; i <= 1; i++) {
//   let producto = totalCompra;
//   let cuantasCuotas = parseInt(prompt("¿En cuantas cuotas desea abonar? (1,3,6)"));
//     if (cuantasCuotas == 1 && typeof(producto) != "string") {
//       alert(`deberás abonar ${cuantasCuotas} cuotas de $ ${producto / 1}`);
//       i++;
//   } else if (cuantasCuotas == 3 && typeof(producto) != "string") {
//       alert(`deberás abonar ${cuantasCuotas} cuotas de $ ${producto / 3}`);
//       i++;
//   } else if (cuantasCuotas == 6 && typeof(producto) != "string") {
//       alert(`deberás abonar ${cuantasCuotas} cuotas de $ ${producto / 6}`);
//       i++;
//   } else {
//       alert("Disculpe, datos erroneos")
//       i--;
//   }
// }
// }

//FUNCION 5//
// function datosEnvioCliente() {
// let confirmacion = confirm("por favor, ingrese nombre, apellido, dirección, celular y horario en el que desea recibir su compra.");
// console.log(confirmacion);
// if (confirmacion) {
//   for (let i = 0; i <= 1; i++) {
//   let nombre = prompt("Ingrese su nombre");
//   let apellido = prompt("Ingrese su apellido");
//   let direccion = prompt("Ingrese la dirección donde enviaremos su compra");
//   let celular = prompt("Ingrese un celular para contactarnos");
//   let horarioEntrega = prompt("Ingrese en que horario desea recibir su producto (MAÑANA/TARDE)");
  
//   //PUSHEO LOS NUEVOS CLIENTES//
//   clientes.push(new Cliente(nombre, apellido, direccion, celular, horarioEntrega, unidades));
//   alert(`Muchas gracias por su compra ${nombre}, ya guardamos su información para realizar la entrega!`);
//   i++;
//   }

// }
// else {
//   alert("Para finalizar la compra necesitamos sus datos!");  
//   i--;
// }
// return(clientes)

// }

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
const clientes = [];

//ORDENO CLIENTES//
clientes.sort();

const capturar = () => {
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
  
    clientes.push(new Cliente(nombre, apellido, edad, direccion, email, telefono));

    console.log(JSON.stringify(datosCliente));
  } else {
    console.log("Disculpe, o su teléfono no es válido, o no está en su mayoría de edad para continuar.");
  }
}

//MUESTRO LOS CLIENTES CREADOS//
console.log(clientes);

//FUNCION FINALIZAR COMPRA/MODAL
// function finalizarCompra() {
//   if (onclick.finalizarCompra()) {
//     getElementById("myModal")
//   }
// }


// LLAMADO DE FUNCIONES//
for (let i = 0; i < 1; i++) {
// inicioCompra();
// elijoProducto();
// cuantasUnidades();
// calculoCuotas();
// datosEnvioCliente();
}

