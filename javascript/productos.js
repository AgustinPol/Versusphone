class Producto{
    constructor(title,description,picture_url,category_id,quantity,currency_id,unit_price){
        this.title = title;
        this.description = description;
        this.picture_url = picture_url;
        this.category_id = category_id;
        this.quantity = quantity;
        this.currency_id = currency_id;
        this.unit_price = unit_price;
    }
  
  }
  
  //DECLARO ARRAY PRODUCTOS//
  let arrayProductos=[];
  
  //PUSHEO LA INFO DE CADA CARD/PRODUCTO//
  const producto1 = new Producto("Smartwatch", "Xiaomi","images/xiaomi-smartwatch.webp","smartwatch", 1, "ARS", 6999);
  arrayProductos.push(producto1);
  const producto2 = new Producto("Airpods Básicos", "Apple" , "images/airpodscomun.webp","airpods",1, "ARS", 18999);
  arrayProductos.push(producto2);
  const producto3 = new Producto("Airpods Pro","Apple", "images/Airpod-Pro.webp", "airpods", 1, "ARS", 32999);
  arrayProductos.push(producto3);
  const producto4 = new Producto("Smartwatch series 3", "Apple", "images/Smartwatch-apple.webp", "smartwatch", 1, "ARS",32999);
  arrayProductos.push(producto4);
  const producto5 = new Producto("Smartwatch Sense", "Fitbit", "images/smartwatch-fitbit.webp", "smartwatch",1, "ARS", 46999);
  arrayProductos.push(producto5);
  const producto6 = new Producto("Airpods Max","Apple", "images/airpods-max.webp", "airpods", 1, "ARS", 129999);
  arrayProductos.push(producto6);
  
  //CREO CONSTANTE BASE DE DATOS PARA PODER UTILIZAR EL CARRITO//
  const baseDeDatos = [producto1, producto2, producto3, producto4, producto5, producto6];

  