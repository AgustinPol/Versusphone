//DECLARO ARRAY PRODUCTOS//
let arrayProductos=[];

//CONSTRUCTOR DE PRODUCTOS//
class Producto{
    constructor(id,title,description,picture_url,category_id,quantity,currency_id,unit_price){
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture_url = picture_url;
        this.category_id = category_id;
        this.quantity = quantity;
        this.currency_id = currency_id;
        this.unit_price = unit_price;
    }
  }
  
  
  //PUSHEO LA INFO DE CADA CARD/PRODUCTO//
  const producto1 = new Producto("1", "Smartwatch", "Xiaomi","images/xiaomi-smartwatch.webp","smartwatch", 1, "ARS", 6999);
  arrayProductos.push(producto1);
  const producto2 = new Producto("2", "Airpods Basic", "Apple" , "images/airpodscomun.webp","airpods",1, "ARS", 18999);
  arrayProductos.push(producto2);
  const producto3 = new Producto("3", "Airpods Pro","Apple", "images/Airpod-Pro.webp", "airpods", 1, "ARS", 32999);
  arrayProductos.push(producto3);
  const producto4 = new Producto("4", "Smartwatch series 3", "Apple", "images/Smartwatch-apple.webp", "smartwatch", 1, "ARS",32999);
  arrayProductos.push(producto4);
  const producto5 = new Producto("5", "Smartwatch Sense", "Fitbit", "images/smartwatch-fitbit.webp", "smartwatch",1, "ARS", 46999);
  arrayProductos.push(producto5);
  const producto6 = new Producto("6", "Airpods Max","Apple", "images/airpods-max.webp", "airpods", 1, "ARS", 129999);
  arrayProductos.push(producto6);
  const producto7 = new Producto("7", "Watch Series 6(GPS)", "Apple", "images/watch-series-6-azul.webp", "smartwatch", 1, "ARS", 57999);
  arrayProductos.push(producto7);
  const producto8 = new Producto("8", "Smartwatch", "Tedge", "images/smartwatch-tedge.webp", "smartwatch", 1, "ARS", 5499);
  arrayProductos.push(producto8);
  const producto9 = new Producto("9", "Airpods Max", "Apple", "images/airpods-max-rosa.webp", "airpods", 1, "ARS", 109999);
  arrayProductos.push(producto9);
  const producto10 = new Producto("10", "Airpods Max", "Apple", "images/airpods-max-azul.webp", "airpods", 1, "ARS", 89999);
  arrayProductos.push(producto10);

  const baseDeDatos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10];
