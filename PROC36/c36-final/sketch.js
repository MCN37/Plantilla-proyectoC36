var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;


// precargar las imagenes 
function preload(){
sadDog=loadImage("");
happyDog=loadImage("");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  

  //crear el Sprite para el perro y asignar la imagen
 



  //crea el botón para alimentar el perro
  
  feed=createButton("Alimenta al perro");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  
  //crea el botón para AGREGAR ALIMENTO
 

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Última hora en que se alimentó : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Última hora en que se alimentó : 12 AM",350,30);
   }else{
     text("Última hora en que se alimentó : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//función para leer la Existencia de alimento



//función para actualizar la existencia de alimento, y la última hora en la que se alimentó
function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//función para agregar el alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
