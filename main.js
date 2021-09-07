//CREO ARRAY CARRITO//
let carrito = [];

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
const producto1 = new Producto("Smartwatch series 3", "Apple", 32999, "images/Smartwatch-apple.webp");
productos.push(producto1);
const producto2 = new Producto("Airpods Pro","Apple", 32999, "images/Airpod-Pro.webp");
productos.push(producto2);
const producto3 = new Producto("Airpods Básicos", "Apple" , 18999, "images/airpodscomun.webp");
productos.push(producto3);
const producto4 = new Producto("Smartwatch", "Xiaomi", 6999, "images/xiaomi-smartwatch.webp");
productos.push(producto4);
const producto5 = new Producto("Airpods Max","Apple", 129999, "images/airpods-max.webp");
productos.push(producto5);
const producto6 = new Producto("Smartwatch Sense", "Fitbit", 46999, "images/smartwatch-fitbit.webp");
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
 
//GENERAMOS LAS CARDS DEL HTML, CON JAVASCRIPT//
baseDeDatos.forEach((productos) => {
  mostrar+=`<div id="agusCard" class="card" style="width: 18rem;">
  <img src="${productos.productImg}" class="card-img-top" alt="imagen-producto">
  <div class="card-body">
    <h5 class="card-title">${productos.productName}</h5>
    <p class="card-text">${productos.productBrand}</p>
    <p class="card-text">$${productos.productPrice}</p>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#" 
        onclick="agregarAlCarrito('${productos.productName}')">Agregar al carrito</a>
        </div>
    </div>
    </div>
</div>`
})

//LLAMAMOS POR ID A LAS CARD Y LAS INYECTAMOS EN EL HTML//
document.getElementById("agusCard").innerHTML=mostrar;

//--------------------------------------------------------//
//Función AGREGAR AL CARRITO//
function agregarAlCarrito(productName){
  const productoAgregado = baseDeDatos.find(productos => productos.productName === productName);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
  }else{
      alert("algo falló");
  }
  // CALCULAR TOTAL DEL CARRITO//
  document.getElementById("contador-carrito").innerHTML = carrito.length;
  console.log(carrito);
}

//-------------------------------------------------------------------//
//ESTA ES LA SECCIÓN DE LAS CUOTAS
const cuotasId = document.getElementById('selectCuotas');
//CREO ARRAY
const cuotas = ['1 cuota', '3 cuotas', '6 cuotas'];
//CREO ELEMENTO SELECT
const select = document.createElement('select');
//INGRESO ATRIBUTOS AL SELECT
select.setAttribute('class', 'btn btn-outline-dark');
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

select.addEventListener('change',
  function(){
    let selectedOption = this.options[select.selectedIndex];
    const p = document.createElement('p');    
    p.textContent = `abonarías ${selectedOption.text} de ...`;
    cuotasId.appendChild(p);
});
//----------------------------------------------------------//

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
  
    clientes.push(new Cliente(nombre, apellido, edad, direccion, email, telefono));

    console.log(JSON.stringify(datosCliente));
  } else {
    console.log("Disculpe, o su teléfono no es válido, o no está en su mayoría de edad para continuar.");
  }
}
