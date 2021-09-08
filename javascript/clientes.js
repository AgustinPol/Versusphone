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
  
      console.log(JSON.stringify(datosCliente));
    } else {
      console.log("Disculpe, o su teléfono no es válido, o no está en su mayoría de edad para continuar.");
    }
  }