var bg, bgImg;
var score=0;
var player, jetImg;
var asteroid, asteroidImg;
var gunShotSound;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullet,bulletImg;

var asteroidsGroup;
var bulletsGroup;
var explosion,explosionImg;

var bullets = 30;
var life = 3;

var gameState= "fight"

function preload(){
bgImg=loadImage("background.jpg");
jetImg=loadImage("fighterPlane.png");
asteroidImg=loadImage("asteroid.png");
bulletImg=loadImage("bullet.png");

heart1Img=loadImage("heart1.png");
heart2Img=loadImage("heart2.png");
heart3Img=loadImage("heart3.png");
gunShotSound=loadSound("gunshot.mp3");

explosionImg=loadImage("blast.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
///  bg = createSprite(displayWidth/2-200,displayHeight/2-100)
  //bg.addImage(bgImg);

  player = createSprite(displayWidth-1100, displayHeight-500, 50, 50);
  player.addImage(jetImg);
  player.scale = 0.3
  player.setCollider("rectangle",0,0,300,300)

  heart1 = createSprite(displayWidth-550,100,20,20)
  heart1.addImage("heart1",heart1Img)
  heart1.visible=false;
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-592,100,20,20)
  heart2.addImage("heart2",heart2Img)
  heart2.visible=false;
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-550,100,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4

  bulletsGroup = new Group()
  asteroidsGroup = new Group()
}

function draw(){
background(bgImg)
  if(gameState === "fight"){

    edges= createEdgeSprites();
    player.collide(edges);

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }

    if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    }

if(keyDown("UP_ARROW")){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")){
 player.y = player.y+30
}

if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1100,player.y-3,20,10)
  bullet.addImage(bulletImg);
  bullet.scale=0.06;
  bullet.velocityX = 20
  bullet.lifetime=300
  
  bulletsGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  bullets = bullets-1

  gunShotSound.play();
}

if(bullets==0){
  gameState = "bullet"
}

if(asteroidsGroup.isTouching(bulletsGroup)){
  for(var i=0;i<asteroidsGroup.length;i++){     
   if(asteroidsGroup[i].isTouching(bulletsGroup)){
        bulletsGroup.destroyEach()
        explosion=createSprite(asteroidsGroup[i].x,asteroidsGroup[i].y,40,40)
        explosion.addImage("blast",explosionImg)
        explosion.scale=0.05
        asteroidsGroup[i].destroy()
        explosion.lifetime=30;
        score=score+10 
        } 
        
  }
  
}

if(asteroidsGroup.isTouching(player)){
  for(var i=0;i<asteroidsGroup.length;i++){     
   if(asteroidsGroup[i].isTouching(player)){
        asteroidsGroup[i].destroy()
        life=life-1
        } 
  }
 }

 if (score==200){
  gameState="won"
 }

 enemy();
  }

  


drawSprites();

textSize(20);
  fill("white")
  text("Score: "+ score, 20,100);

if(gameState == "lost"){
  textSize(100)
  fill("red")
  text("You Lost",300,400)
  asteroidsGroup.destroyEach();
  player.destroy();
}

else if(gameState == "won"){
  textSize(100)
  fill("yellow")
  text("You Won ",300,400)
  asteroidsGroup.destroyEach();
  player.destroy();
}

else if(gameState == "bullet"){
  textSize(50)
  fill("yellow")
  text("Oops you ran out of bullets!!!",200,410)
  asteroidsGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
}

}

function enemy(){
  if(frameCount%40===0){
    asteroid = createSprite(random(500,2000),random(100,600),40,40)

    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.3
    asteroid.velocityX = -3+score/50;
    asteroid.setCollider("rectangle",0,0,400,400)
    asteroid.lifetime = 400
    asteroidsGroup.add(asteroid)
  }
}