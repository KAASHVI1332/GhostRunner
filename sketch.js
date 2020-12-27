var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg1,ghostImg2;
var invisibleblock,invisibleblockGroup;
var gameState="play";
var sound;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg1=loadImage("ghost-standing.png");
  ghostImg2=loadImage("ghost-jumping.png");
  sound=loadSound("spooky.wav");
}

function setup(){
 createCanvas(600,600);
  sound.loop();
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleblockGroup=new Group();
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghoststanding",ghostImg1);
  ghost.addImage("ghostjumping",ghostImg2);
  ghost.scale=0.3;
}
function draw(){
  background(0);
  if(gameState==="play"){
 ghost.changeAnimation("ghoststanding",ghostImg1);
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-5;
     }
  
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+5;
     }
  
  if(keyDown('space')){
    ghost.velocityY=-5; 
    ghost.changeAnimation("ghostjumping",ghostImg2);
  }
  ghost.velocityY=ghost.velocityY+0.3;
  
  if(tower.y>600){
    tower.y=tower.width/2;
  }
  spawnDoor();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  drawSprites();
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(35);
    text("GAME OVER",150,200);
    
  }
}

function spawnDoor(){
  if(frameCount%240==0){
    
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    invisibleblock=createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    
    door.addImage("doorImage",doorImg);
   climber.addImage("climber image",climberImg);
    
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleblock.velocityY=1;
    
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleblock.x=door.x;
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleblock.lifetime=800;
    
    invisibleblock.debug=true;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleblockGroup.add(invisibleblock);
    
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}