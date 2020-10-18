var monkey, monkeyAni, monkeyAni2;
var bg, bgImg;
var invisiground;
var obstaclesGroup;
var bananaGroup;
var bananaImg;
var bananaImg2;
var banana;
var bananaCount = 0;
var survivalTime = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameover;
var gameoverImg
var ob1;
var toucan;
var ob3;
var bird;
var macaw;
var bird3;
var parrot;
var birdsGroup;

function preload(){
  monkeyAni =loadAnimation("monkey!!!.png","monkey!!!2.png");
  monkeyAni2 = loadAnimation("monkey!!!fall.png");
  bgImg = loadImage("tropics2.png");
  ob1 = loadImage("rock.png");
  ob3 = loadImage("banana peel.png");
  toucan = loadImage("toucan.png");
  macaw = loadImage("macaw.png");
  bananaImg = loadAnimation("banana.png");
  bananaImg2 = loadImage("banana.png");
  bird3 = loadImage("tropical bird.png");
  parrot = loadImage("parrot (1).png");
  gameoverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(200,200, 400, 400);
  bg.addImage(bgImg);
  bg.scale = 1;
  bg.x = bg.width/5;
  
  
  monkey = createSprite(320, 350, 10, 10);
  monkey.addAnimation("monkeyImg", monkeyAni);
  monkey.addAnimation("monkeyfallImg", monkeyAni2);
  monkey.scale = 0.2;
  monkey.debug = true;
  monkey.setCollider("rectangle", 0, -50, 300,200);
  
  invisiground = createSprite(200, 365, 400, 10);
  invisiground.visible = false;
 obstaclesGroup = new Group();
  bananaGroup = new Group();
  birdsGroup = new Group();
  gameover = createSprite(200, 200, 10, 10);  gameover.addImage(gameoverImg);
  gameover.visible = false;
}






function draw() {
  background("white");
  if(gameState == PLAY){
    
   bg.velocityX = 5;
   if (bg.x > 300){
    bg.x = bg.width/7;
   }
    
   //jump when the space key is pressed
   if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -15;
   }
    
   //add gravity
   monkey.velocityY = monkey.velocityY + 2
  
   if(monkey.isTouching(obstaclesGroup)){
    monkey.changeAnimation("monkeyfallImg", monkeyAni2)
    obstaclesGroup.destroyEach();
    gameState = END;
   }
  
   if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    bananaCount = bananaCount+1;
   }
   
    spawnOb();
   spawnBananas();
   spawnBirds();
    
   survivalTime = Math.ceil(frameCount/frameRate())
  }
  if(gameState == END){
    monkey.visible = false;
    bg.velocityX = 0;
    birdsGroup.setVelocityXEach = 0;
    obstaclesGroup.setVelocityXEach = 0;
    bananaGroup.setVelocityXEach = 0;
    birdsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    bg.visible = false;
    background("yellow");
    gameover.visible = true;
    var banana1 = createSprite(100, 100, 10, 10);
    banana1.addImage(bananaImg2);
    banana1.scale = 0.1;
    var banana2 = createSprite(100, 300, 10, 10);
    banana2.addImage(bananaImg2);
    banana2.scale = 0.1;
    var banana3 = createSprite(300, 100, 10, 10);
    banana3.addImage(bananaImg2);
    banana3.scale = 0.1;
    var banana4 = createSprite(300, 300, 10, 10);
    banana4.addImage(bananaImg2);
    banana4.scale = 0.1;
  }
  
 monkey.collide(invisiground);
  
 
  
  
  
  textSize(20);
  text("Banana Count: " + bananaCount, 200, 35);
  
  
  text("Survival Time: "+survivalTime, 25, 35);
  
  drawSprites();
}

function spawnOb(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(10,350,10,40);
    obstacle.debug = true;
   obstacle.velocityX = 6
   
    //generate random obstacles
    rand = Math.round(random(1,2));
    if(rand == 1){
      obstacle.addImage(ob1);
    }else if(rand == 2){
      
      obstacle.addImage(ob3);
    }
    
    
   
   console.log(rand);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
}}

function spawnBananas(){
  if (frameCount % 30 === 0){
   banana = createSprite(10,280,10,40);
    banana.debug = true;
   banana.velocityX = 6
   banana.y = Math.round(random(200, 300))
    banana.addAnimation("banana", bananaImg);
    
    banana.scale = 0.1;
    banana.lifetime = 300;
    banana.setCollider("rectangle", -100, 0, 100, 100)
    
    bananaGroup.add(banana);
  }
      
}

function spawnBirds(){
  if(frameCount % 40 === 0){
    bird = createSprite(10, 100, 10, 40)
    bird.velocityX = Math.round(random(6, 20));
    bird.y = Math.round(random(50, 150));
    bird.lifeTime = 280;
    
    bird.scale = 0.1;
    
    var r  = Math.round(random(1,4));
    if(r == 1){
      bird.addImage(toucan);
    }else if(r == 2){
      bird.addImage(macaw);
    }else if(r == 3){
      bird.addImage(bird3);
    }else {
      bird.addImage(parrot);
      
      birdsGroup.add(bird);
    }
  }
}