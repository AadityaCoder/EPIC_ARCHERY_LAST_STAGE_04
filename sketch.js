const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase;
var computer, computerBase;

//Declare an array for arrows playerArrows = [ ]
var playerArrows = [];
var computerArrows = []
var arrow;

function preload(){
  backgroundImg = loadImage("assets/background.gif")
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );
  computerArcher = new ComputerArcher(
    width - 340,
    computerBase.body.position.y - 180,
    120,
    120
  );
  //Function to manage computer Arrows
  handleComputerArcher(); 


}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

 
  playerBase.display();
  player.display();
  

  computerBase.display();
  computer.display();
  
  playerArcher.display();
  computerArcher.display()

 // Use for loop to display arrow using showArrow() function
 for (var i = 0; i < playerArrows.length; i++) {
  showArrows(i, playerArrows);
}

for (var i = 0; i < computerArrows.length; i++) {
  showArrows(i, computerArrows);

  for(var j = 0; j<computerArcher.length; j++ ){
    if(playerArrows[i]!== undefined && Computer[j] !== undefined ) {
    var c = Matter.SAT.collides(playerArrows[i].body,Computer[j].body);
    if(c.collided)  {

      Computer[j].remove(j);

      Matter.World.remove(world,playerArrows[i].body);
      playerArrows.splice(i,1);
      i--;
    }
    }

    }
}


//Call functions to detect collision for player and computer
handleComputerArrowCollision();
handlePlayerArrowCollision()
}

function keyPressed() {

  if(keyCode === 32){
    // create an arrow object and add into an array ; set its angle same as angle of playerArcher
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle+PI/2;

    var arrow = new PlayerArrow(posX, posY, 100, 10);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);

  }
}

function keyReleased () {

  if(keyCode === 32){
    //call shoot() function for each arrow in an array playerArrows
    if (playerArrows.length) {
      var angle = playerArcher.body.angle+PI/2;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }

}
//Display arrow and Tranjectory
function showArrows(index, arrows) {
  arrows[index].display();
  
    
  
 

}

function handleComputerArcher() {
  if (!computerArcher.collapse && !playerArcher.collapse) {
    setTimeout(() => {
      var pos = computerArcher.body.position;
      var angle = computerArcher.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.1;
      } else {
        angleValue = -0.1;
      }
      angle += angleValue;

      var arrow = new ComputerArrow(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerArcher.body, angle);
      Matter.Body.setAngle(computerArcher.body, angle);

      computerArrows.push(arrow);
      setTimeout(() => {
        computerArrows[computerArrows.length - 1].shoot(angle);
      }, 100);

      handleComputerArcher();
    }, 2000);
  }
}

function handlePlayerArrowCollision() {
// Write code to detect collision between player arrow and opponent
for(var i=0;i<playerArrows.length; i++){
    var playerBaseCollision = Matter.SAT.collides(
  playerArrows[i].body,playerBase.body);

    var playerArcherCollision = Matter.SAT.collides(
  playerArrows[i].body,playerArcher.body);  

    var playerCollision = Matter.SAT.collides(
  playerArrows[i].body,player.body);

if(playerBaseCollision.collided || playerArcherCollision.collided ||playerCollision.collided){

  console.log("Player arrow Collided");
 }


}
}

function handleComputerArrowCollision() {
  //Write code to detect collision between computer arrow and opponent
for(var i=0; i< playerArrows.length; i++ ){
  var baseCollision = Matter.SAT.collides(
    playerArrows[i].body,computerBase.body) ;

  var archerCollision = Matter.SAT.collides(
    playerArrows[i].body,computerArcher.body) ;

  var computerCollision = Matter.SAT.collides(
    playerArrows[i].body,computer.body) ;

if(baseCollision.collided || archerCollision.collided || computerCollision.collided ){
    console.log("Player arrow Collided")

}
}
}

