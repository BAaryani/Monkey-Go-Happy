var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround;
var survivalTime = 0; 
var score = 0;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {

createCanvas(400, 400);  
  
  monkey = createSprite(50,160,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(600,350,1000,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  
}


function draw() {
 background("skyblue");
  

     
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  spwanObstacles();
  spwanBanana();

  
  if(keyDown("space")){
     monkey.velocityY = -10;
   }
  
 if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8 ;
  
  
  monkey.collide(ground); 
  
 drawSprites();
  
survivalTime = 0;
  
fill("black");
 textSize(20);
  
survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,150,50);
}

function spwanObstacles(){
 if(frameCount%90 === 0 ){
   var obstacle = createSprite(600,310,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   
   var rand = Math.round(random(1));
    switch(rand){
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;         
    } 
   obstacle.scale = 0.20;
   obstacle.lifetime = 500;
   
 obstacleGroup.add(obstacle);  
  }
}

function spwanBanana(){
  if(frameCount%95 === 0){
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(50,100));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}