let ufoY = 100;
let ufoX = 200;
let velocity = 0.04;
const acceleration = 0.04;
let angle = 0;
let sideway = 5;
let gameIsRunning = true;

function setup() {
  createCanvas(590, 500);
  textSize(22); // Set text size 
 
}
//Rocket
function ufo(x, y) {
  push();
  translate(x, y);
  rotate(angle); // Rotate the UFO based on angle
  drawSmoke(0, smokeY);
  fill(255, 0, 0);
  rect(0 - 18, 0, 36, 70);
  pop();
}



// Fire/Smoke
let smokeY = 90;
function drawSmoke(x, y) {
  fill(230, 167, 20);
  ellipse(x, y, 30, 50);
}
//start
function startScreen() {
  background(12, 12, 255);
  fill(0, 0, 0);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(30);
  textFont("Courier New");
  text("Lunar Lander", width / 2, 180);
}

//game
function gameScreen() {
  background(30, 11, 150);
  noStroke(); 
  fill(120, 120, 120);
  ellipse(400, 210, 60);
  //ground
  fill(255, 255, 102);
  rect(0, 420, 600, 200);
  
  push();
  translate(ufoX, ufoY);
  rotate(angle);
  ufo(0, 0);
  pop();

  if (gameIsRunning === true) {
    ufoY = ufoY + velocity;
    velocity = velocity + acceleration;
   
   
    //Up
    
   

    
    if (ufoY > 360 || ufoY < -190) {
      gameIsRunning = false;
      console.log("Game over");
      fill(255);
    }
  }
}
function overScreen() {
  background(20, 21, 200);

 
  fill(255);
  textSize(32); 
  textAlign(CENTER, CENTER);
  text("Result", width / 2, 170);
  if (velocity > 3) {
    text("Crash", width / 2, height / 2);
  } else {
    text("You landed safe and sound", width / 2, height / 2);
  }
}

let state = "start"; 

function checkGameOver() {
    if (!gameIsRunning) {
      state = "result";
    }
  }

function draw() {
  if (state === "start") {
    startScreen();
  } else if (gameIsRunning === true) {
    gameScreen();
    checkGameOver();
  } else if (state === "result") {
    overScreen();
  }
}
function mouseClicked() {
  if (state === "start") {
    state = "game";
  } else if (state === "game") {
    state = "result";
  } else if (state === "result") {
    state = "game";
    // Reset game variables if needed
    gameIsRunning = true;
    ufoY = 100;
    angle = 0;
    velocity = 1;
  }
}