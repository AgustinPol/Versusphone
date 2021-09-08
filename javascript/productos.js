//Objeto Clase DOM PARA GENERAR LOS PRODUCTOS//
class Producto{
    constructor(productName,productBrand,productPrice,productImg,category){
        this.productName = productName;
        this.productBrand = productBrand;
        this.productPrice = productPrice;
        this.productImg = productImg;
        this.category = category;
    }
  
  }
  
  //DECLARO ARRAY PRODUCTOS//
  let arrayProductos=[];
  
  //ORDENAMIENTO DE ARRAY "PRODUCTOS", SE ORDENARON POR PRECIO, DE MENOR A MAYOR.//
arrayProductos.sort((o1, o2) => {
  if (o1.productPrice < o2.productPrice) {
    return -1;
  } else if (o1.productPrice > o2.productPrice) {
      return 1 ; 
    } else {
      return 0;
    }
  
  })
  //PUSHEO LA INFO DE CADA CARD/PRODUCTO//
  const producto1 = new Producto("Smartwatch series 3", "Apple", 32999, "images/Smartwatch-apple.webp", "smartwatch");
  arrayProductos.push(producto1);
  const producto2 = new Producto("Airpods Pro","Apple", 32999, "images/Airpod-Pro.webp", "airpods");
  arrayProductos.push(producto2);
  const producto3 = new Producto("Airpods Básicos", "Apple" , 18999, "images/airpodscomun.webp", "airpods");
  arrayProductos.push(producto3);
  const producto4 = new Producto("Smartwatch", "Xiaomi", 6999, "images/xiaomi-smartwatch.webp", "smartwatch");
  arrayProductos.push(producto4);
  const producto5 = new Producto("Airpods Max","Apple", 129999, "images/airpods-max.webp", "airpods");
  arrayProductos.push(producto5);
  const producto6 = new Producto("Smartwatch Sense", "Fitbit", 46999, "images/smartwatch-fitbit.webp", "smartwatch");
  arrayProductos.push(producto6);
  
  //CREO CONSTANTE BASE DE DATOS PARA PODER UTILIZAR EL CARRITO//
  const baseDeDatos = [producto1, producto2, producto3, producto4, producto5, producto6];

  