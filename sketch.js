var tower,towerImage
var gameState,PLAY,END
var ghost,ghostImage
var door,doorImage,climberImage
var doorGroup,climberGroup,railingGroup
function preload(){
  towerImage=loadImage("tower.png")
  ghostImage=loadAnimation("ghost-standing.png","ghost-jumping.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
}


function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=3
  PLAY=1
  END=0
  gameState=PLAY
  ghost=createSprite(300,300)
  ghost.addAnimation("gostWalking",ghostImage)
  ghost.scale=0.4
  
  doorGroup=new Group()
  climberGroup=new Group()
  railingGroup=new Group()
  
  
  
  
}


function draw(){
  background("black")
  if (gameState===PLAY){
   if (tower.y>600){
     tower.y=tower.height/4
   }
    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-4
    }else if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+4
    }else if (keyDown("space")){
      ghost.velocityY=-12
    }
    ghost.velocityY=ghost.velocityY+0.6
    if (frameCount%100===0){
      createDoors()    }
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(railingGroup.isTouching(ghost)||ghost.y>600){
      gameState=END
    }
      
    
  drawSprites() 
    
  }else if(gameState===END){
  tower.velocityY=0
    ghost.destroy()
    fill("red")
    textSize(50)
    textFont("Courier New")
    text("GAME OVER",150,200)

  }
  
  
}

function createDoors(){
  door=createSprite(random(100,500),-50)
  door.addImage(doorImage)
  door.velocityY=3
  door.lifetime=200
  ghost.depth=door.depth
  ghost.depth=ghost.depth+1
  climber=createSprite(door.x,10)
  climber.addImage(climberImage)
  climber.velocityY=door.velocityY
  climber.lifeTime=200
  railing=createSprite(climber.x,18,climber.width,5)
  railing.velocityY=climber.velocityY
  railing.lifetime=200
  railing.visible=false
  
  doorGroup.add(door)
  climberGroup.add(climber)
  railingGroup.add(railing)
}