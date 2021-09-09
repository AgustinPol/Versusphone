//CREO ARRAY CARRITO//
let carrito = [];

let total = 0;

//RENDERIZO PRODUCTOS//
renderizarProductos();

//Función AGREGAR AL productoAgregado//
function agregarAlCarrito(productName){
  let productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.productName === productName);
  if(productoAgregado != undefined){
      carrito.push(productoAgregado);
      const miLista = document.getElementById('listaCarrito');
      const itemLista = document.createElement('li');
      const buttonClose = document.createElement("button");
      itemLista.setAttribute("class", "list-group-item");
      buttonClose.setAttribute("type", "button");
      buttonClose.setAttribute("class", "btn-close");
      buttonClose.setAttribute("aria-label", "Close");
      itemLista.textContent = ` ${JSON.stringify(productoAgregado.productName)} - Precio: $${JSON.stringify(productoAgregado.productPrice)}`;
      miLista.appendChild(itemLista);
      itemLista.appendChild(buttonClose);
  }else{
      alert("algo falló");
  }

}

  //ESTA ES LA SECCIÓN DE LAS CUOTAS
  const cuotasId = document.getElementById('formaDePago');
  //CREO ARRAY
  const formasDePago = ['Tarjeta de Crédito', 'Tarjeta de débito', 'Transferencia Bancaria'];
  //CREO ELEMENTO SELECT
  const select = document.createElement('select');
  //INGRESO ATRIBUTOS AL SELECT
  select.setAttribute('class', 'btn btn-secondary');
  //METO SELECT EN cuotasId
  cuotasId.appendChild(select);
  //RECORREMOS ARRAY CON forEach
  formasDePago.forEach((forma, index) => {
      const option = document.createElement('option');
      option.setAttribute('value', index);
      option.textContent = forma;
  
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
      p.setAttribute("class", "parrafoCuotas"); 
      p.textContent = `Elegiste abonar con ${selectedOption.text}`;
      cuotasId.appendChild(p);
  });  

//-------------------------------------------------------------------//

/**
 * @param {*} filtro
 * Filtro los productos
 */
 function renderizarProductos(filtro = 'default') {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(arrayProductos => arrayProductos.category == filtro) :
  baseDeDatos;

  /*** CREO MIS CARDS CON JS */
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
  $("#agusCard").html(mostrar)
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

