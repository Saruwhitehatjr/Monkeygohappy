var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0,survivaltime=0,  ground
var bananaGroup
var PLAY = 1;
  var END = 0;
var gameState = PLAY;
        
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_stop = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  ground = createSprite(300, 370, 1200, 50);
  ground.velocityX = -4;

  monkey = createSprite(70, 350, 30, 30);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.1

  obstacleGroup = new Group();
  bananaGroup = new Group();

}


function draw() {
  background("lightblue");
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }

  if (gameState === PLAY) {

    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    createBananas();
    createObstacles();
    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
     
    }
    if(monkey.isTouching(bananaGroup))
      {
        score=score+1;
      }
     

  } 
  else if (gameState === END) {

    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("stop", monkey_stop);


  }

  monkey.collide(ground)


  drawSprites();
  text("Score:" + score, 300, 20);
  survivaltime=Math.ceil(frameCount/frameRate()  )
  text("Survival Time:" + survivaltime, 500, 20);
}

function createBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)), 20, 20);
    banana.velocityX = -4;

    banana.addImage(bananaImage);
    banana.scale = 0.1;
    monkey.depth = banana.depth + 1;
    banana.lifetime = 200;
    

    bananaGroup.add(banana);

  }

}

function createObstacles() {

  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 328, 20, 20);
    obstacle.velocityX = -4;

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle)
  }


}