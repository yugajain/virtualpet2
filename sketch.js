var dog, happyDog, database, foodS, foodStock , position;
var backgroundImg, dogImg;
var fedTime,lastFed
var feed,addFood,foodObj

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");  
  
}


function setup(){
    createCanvas(900,500);
    database= firebase.database();
    dog = createSprite(450,300,50,50);
    dog.addImage("dog",dogImg);
    dog.scale=0.5  ;
     foodStock =  database.ref('food');
    foodStock.on("value",readStock)

    foodObj = new Food();
    feed=createButton("feed Dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("add food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)
}

function draw(){
    background("lightblue");


    fedTime=database.ref('feedTime')
    fedTime.on("value",function(data){
        lastFed=data.val();
    })
    
   
    /*if(keyWentDown(UP_ARROW)){
        
       WriteStock(foodS)
       dog.addImage("happyDog",happyDog);   
    }*/
    foodObj.display();
    

   
    
    drawSprites();
    textSize(25);
    fill("black");
    text("food remaining:"+ foodS,170,80);
    text("press up to feed the dog!" ,170 , 120 )
    
}

function WriteStock(petFOOD){
    if(petFOOD<=0){
        petFOOD=0
    }
    else{
        petFOOD=petFOOD-1;
    }
    database.ref('/').update({
        food:petFOOD
    })
}
function readStock(data){
    foodS = data.val();
    
}
function addFoods(){
    foodS++
    database.ref('/').update({
        food:foodS

    })


}
function feedDog(){
    dog.addImage(happyDog);
    var foodLeft = foodObj.getFoodstock()-1
    console.log(foodLeft)
    foodObj.updateFoodStock(foodLeft)

    var currentTime = hour()
    database.ref('/').update({
        feedTime:currentTime,
        food:foodLeft
    })
       }