//CREO ARRAY CARRITO//
let arrayCarrito = [];

//RENDERIZO PRODUCTOS//
filtrarProductos();

//--------------------------------------------------------//
//Función AGREGAR AL CARRITO//
function agregarAlCarrito(productName){
  const productoAgregado = baseDeDatos.find(arrayProductos => arrayProductos.productName === productName);
  if(productoAgregado != undefined){
      arrayCarrito.push(productoAgregado);
      const miLista = document.getElementById('listaCarrito');
      const newLi = document.createElement('li');
      const buttonClose = document.createElement("button")
      newLi.setAttribute("class", "list-group-item");
      buttonClose.setAttribute("type", "button");
      buttonClose.setAttribute("class", "btn-close");
      buttonClose.setAttribute("aria-label", "Close")
      newLi.textContent = ` ${JSON.stringify(productoAgregado.productName)} - Precio: $${JSON.stringify(productoAgregado.productPrice)}`;
      miLista.appendChild(newLi);
      newLi.appendChild(buttonClose);
  }else{
      alert("algo falló");
  }
  // CALCULAR TOTAL DEL CARRITO//
  document.getElementById("contador-carrito").innerHTML = arrayCarrito.length;
  console.log(arrayCarrito);
}
//-------------------------------------------------------------------//

//ESTA ES LA SECCIÓN DE LAS CUOTAS
const cuotasId = document.getElementById('formaDePago');
//CREO ARRAY
const formasDePago = ['Tarjeta de Crédito', 'Tarjeta de débito', 'Transferencia Bancaria'];
//CREO ELEMENTO SELECT
const select = document.createElement('select');
//INGRESO ATRIBUTOS AL SELECT
select.setAttribute('class', 'btn btn-outline-dark');
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
    p.textContent = `Elegiste abonar con ${selectedOption.text}`;
    cuotasId.appendChild(p);
});
//----------------------------------------------------------//

/**
 * @param {*} filtro
 * Filtro los productos
 */
 function filtrarProductos(filtro = 'default') {
  let nuevosProductos = (filtro !== "default") ? 
  baseDeDatos.filter(arrayProductos => arrayProductos.category == filtro) :
  baseDeDatos;

  /*** CREO MIS CARDS CON JS */
  let mostrar=``;
  nuevosProductos.forEach((arrayProductos) => {
    mostrar+=`<div id="agusCard" class="card" style="width: 18rem;">
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