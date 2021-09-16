class Producto{
    constructor(productId,productName,productBrand,productPrice,productImg,category){
        this.productId = productId;
        this.productName = productName;
        this.productBrand = productBrand;
        this.productPrice = productPrice;
        this.productImg = productImg;
        this.category = category;
    }
  
  }
  
  //DECLARO ARRAY PRODUCTOS//
  let arrayProductos=[];
  
  //PUSHEO LA INFO DE CADA CARD/PRODUCTO//
  const producto1 = new Producto("1","Smartwatch", "Xiaomi", 6999, "images/xiaomi-smartwatch.webp", "smartwatch");
  arrayProductos.push(producto1);
  const producto2 = new Producto("2","Airpods Básicos", "Apple" , 18999, "images/airpodscomun.webp", "airpods");
  arrayProductos.push(producto2);
  const producto3 = new Producto("3","Airpods Pro","Apple", 32999, "images/Airpod-Pro.webp", "airpods");
  arrayProductos.push(producto3);
  const producto4 = new Producto("4","Smartwatch series 3", "Apple", 32999, "images/Smartwatch-apple.webp", "smartwatch");
  arrayProductos.push(producto4);
  const producto5 = new Producto("5","Smartwatch Sense", "Fitbit", 46999, "images/smartwatch-fitbit.webp", "smartwatch");
  arrayProductos.push(producto5);
  const producto6 = new Producto("6","Airpods Max","Apple", 129999, "images/airpods-max.webp", "airpods");
  arrayProductos.push(producto6);
  
  //CREO CONSTANTE BASE DE DATOS PARA PODER UTILIZAR EL CARRITO//
  const baseDeDatos = [producto1, producto2, producto3, producto4, producto5, producto6];

  