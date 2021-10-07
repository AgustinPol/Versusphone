
//DECLARO ARRAY PRODUCTOS//
const baseDeDatos = [
  {
      id:1,
      title:"Smartwatch",
      description:"Xiaomi",
      picture_url:"images/xiaomi-smartwatch.webp",
      category_id:"smartwatch",
      quantity:1,
      unit_price: 6999
  },
  {
      id:2,
      title:"Airpods Basic",
      description:"Apple",
      picture_url:"images/airpodscomun.webp",
      category_id:"airpods",
      quantity:1,
      unit_price: 18999
  },
  {
      id:3,
      title:"Airpods Pro",
      description:"Apple",
      picture_url:"images/Airpod-Pro.webp",
      category_id:"airpods",
      quantity:1,
      unit_price: 32999
  },
  {
      id:4,
      title:"Smartwatch series 3",
      description:"Apple",
      picture_url:"images/Smartwatch-apple.webp",
      category_id:"smartwatch",
      quantity:1,
      unit_price: 32999
  },
  {
      id:5,
      title:"Smartwatch Sense",
      description:"Fitbit",
      picture_url:"images/smartwatch-fitbit.webp",
      category_id:"smartwatch",
      quantity:1,
      unit_price: 46999
  },
  {
      id:6,
      title:"Airpods Max",
      description:"Apple",
      picture_url:"images/airpods-max.webp",
      category_id:"airpods",
      quantity:1,
      unit_price: 129999
  },
  {
      id:7,
      title:"Watch Series 6(GPS)",
      description:"Apple",
      picture_url:"images/watch-series-6-azul.webp",
      category_id:"smartwatch",
      quantity:1,
      unit_price: 57999
  },
  {
      id:8,
      title:"Smartwatch",
      description:"Tedge",
      picture_url:"images/smartwatch-tedge.webp",
      category_id:"smartwatch",
      quantity:1,
      unit_price: 5499
  },
  {
      id:9,
      title:"Airpods Max",
      description:"Apple",
      picture_url:"images/airpods-max-rosa.webp",
      category_id:"airpods",
      quantity:1,
      unit_price: 109999
  },
  {
      id:10,
      title:"Airpods Max",
      description:"Apple",
      picture_url:"images/airpods-max-azul.webp",
      category_id:"airpods",
      quantity:1,
      unit_price: 89999
  }
];

animaciones();

let carrito = [];
let total = 0; 
let subtotal = 0;


const DOMCards = document.getElementById("mainCard");
const DOMcarrito = document.getElementById("listaCarrito");
const DOMtotal = document.getElementById("total");
const eventComprar = $("#btn-comprar").on("click", btnComprar);
const eventVaciar = $("#boton-vaciar").on("click", vaciarCarrito);
const miToast = $(".toast");
const eventModal = $("#carritoModalBoton").on("click", modalCarrito);
const eventForm = $("#boton-comprar").on("click", mostrarForm);


renderizarProductos();

  if (localStorage.getItem("miCarrito")) {
    carrito = JSON.parse(localStorage.getItem("miCarrito"));
    mostrarContenidoCarrito();
    document.getElementById("contador-carrito").innerHTML = carrito.length;
  }

  //filtramos los productos por categoría
 function renderizarProductos(filtro = "default") {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(product => product.category_id == filtro) :
  baseDeDatos;
  DOMCards.textContent = "";
  // CREO MIS CARDS CON JS //
  nuevosProductos.forEach((product) => {
 const nodoPadre = document.createElement("div");
 nodoPadre.classList.add("card", "col-lg-3", "agusCard");
 const nodoCardBody = document.createElement("div");
 nodoCardBody.classList.add("card-body");
 const nodoTitle = document.createElement("h5");
 nodoTitle.classList.add("card-title");
 nodoTitle.textContent =  `${product.title} - ${product.description}`;
 const nodoImagen = document.createElement("img");
 nodoImagen.classList.add("img-fluid");
 nodoImagen.setAttribute("src", product.picture_url);
 const nodoPrecio = document.createElement("p");
 nodoPrecio.classList.add("card-text");
 nodoPrecio.textContent = "$" + product.unit_price;
 const botonAdd = document.createElement("button");
 botonAdd.classList.add("btn", "btn-outline-dark", "mt-auto");
 botonAdd.textContent = "Agregar al Carrito";
 botonAdd.setAttribute("idCard", product.id);
 botonAdd.addEventListener("click", agregarAlCarrito);
 nodoCardBody.appendChild(nodoImagen);
 nodoCardBody.appendChild(nodoTitle);
 nodoCardBody.appendChild(nodoPrecio);
 nodoCardBody.appendChild(botonAdd);
 nodoPadre.appendChild(nodoCardBody);
 DOMCards.appendChild(nodoPadre);
 animaciones();
  });

}

function agregarAlCarrito(e){
  carrito.push(e.target.getAttribute("idCard"));
  localStorage.setItem("miCarrito", JSON.stringify(carrito));
  $(".toast").toast("show");
  calcularTotal();
  mostrarContenidoCarrito();
  document.getElementById("contador-carrito").innerHTML = carrito.length;
}

function mostrarContenidoCarrito() {
  DOMcarrito.textContent = "";
  const quitamosDuplicados = [...new Set(carrito)];

  quitamosDuplicados.forEach((productCarro) => {

  const miProducto = baseDeDatos.filter((productBaseDeDatos) => {

      return productBaseDeDatos.id === parseInt(productCarro);
  });
  const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === productCarro ? total += 1 : total;
  }, 0);
    const nuevoItem = document.createElement("li");
    const botonEliminar = document.createElement("button");
    nuevoItem.classList.add("itemCarrito", "list-group-item");
    nuevoItem.textContent = `Producto: ${(miProducto[0].title)} ${(miProducto[0].description)} x ${numeroUnidadesItem} UNIDADES = $${(miProducto[0].unit_price*numeroUnidadesItem)}`;
    botonEliminar.classList.add("btn", "btn-secundary", "boton-eliminar", "btn-outline-dark");
    botonEliminar.setAttribute("type", "button");
    botonEliminar.textContent = ("x"); 
    botonEliminar.dataset.productCarro = productCarro;
    botonEliminar.setAttribute("productoId", productCarro.id);
    botonEliminar.addEventListener("click", eliminarDelCarrito);
    nuevoItem.appendChild(botonEliminar);
    DOMcarrito.appendChild(nuevoItem);
    animacionItem(); 
    calcularTotal();
  });
  }

// Función ELIMINAR DEL CARRITO//
function eliminarDelCarrito(e) {
    const idEliminado = e.target.dataset.productCarro;
    carrito = carrito.filter((carritoId) => {
      return carritoId !== idEliminado;
      });
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarContenidoCarrito();
    calcularTotal();
    document.getElementById("contador-carrito").innerHTML = carrito.length;

};

//function para mostrar modal
function modalCarrito(e) {
  e.preventDefault();
if (carrito.length == 0) {
  $("#modalCarritoVacio").modal("show");
} else if (carrito.length > 0) {
  $("#modalCarritoShow").modal("show");
}
}



function mostrarForm() {
  $(".divForm").fadeIn(1000);
} 

// Función del boton generar link de Mp
function btnComprar() {
  if (carrito.length === 0) {
  $("#modalCarritoVacio").modal("show");
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
    mostrarContenidoCarrito();
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
    const subtotal = baseDeDatos.filter((itemsCards) => {
      return itemsCards.id === parseInt(productItem);
    })
    total = total + subtotal[0].unit_price;
    DOMtotal.textContent = total.toFixed(2);
  });
  }
}

DOMtotal.textContent = total.toFixed(2);
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
   "Content-Type": "application/json",   
  },
  body: JSON.stringify(elementosMpFinal)
}).then(response => {return response.json()})
.then(data => {window.open(data.init_point, "_blank");
});
}

console.log(carrito);

