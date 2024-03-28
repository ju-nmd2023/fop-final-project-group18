let numcars = 3;
let cars = [];
let carszise = (70, 80);

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //trafic cars being positiond
  for (let i = 0; i < numcars; i++) {
    let x = random(130, 530);
    let y = random(-500, 0);
    cars.push(new redcar(x, y, carszise));
  }
}

let innerWidth = width / 2;
let innerHeight = height / 2;
let imgCar;

//Players car
let playerCarX = 200;
let playerCarY = 350;

function playercar1(x, y) {
  push();
  fill(255, 194, 1);
  noStroke();
  rect(playerCarX, playerCarY, 70, 115, 10);
  ellipse(playerCarX + 35, playerCarY + 10, 75, 65);

  image(imgOne, playerCarX, playerCarY, 150, 80);
  fill(0);
  quad(210, 430, 260, 430, 257, 450, 213, 450);
  ellipse(235, 450, 43, 10);
  quad(205, 375, 265, 375, 260, 405, 210, 405);
  ellipse(235, 375, 60, 15);
  pop();
}

//trafic cars

let cars = [];
let carszise = (70, 80);
let numcars = 3;
let traficspeed = 6;

function preload() {
  imgCar = loadImage("img/RaceCar.png");
  imgOne = loadImage("img/yellowCar.png");
  imgtwo = loadImage("img/redCar.png");
}

function menuPage() {
  background(37, 60, 129);
  noStroke();
  fill(255, 194, 1);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Fast", innerWidth - 250, 150);
  text("And", innerWidth - 220, 220);
  text("Fantastic", innerWidth - 190, 290);
  image(imgCar, innerWidth - 80, 80, 400, 170);

  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
  const singlePlayerButton = text("Single Player", innerWidth, 530);
  const doublePlayerButton = text("Double Player", innerWidth, 590);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(innerWidth - 50, 540, innerWidth + 50, 540);
  line(innerWidth - 50, 600, innerWidth + 50, 600);
  //Game mode
  if (
    mouseX > innerWidth - 100 &&
    mouseX < innerWidth + 100 &&
    mouseY > 515 &&
    mouseY < 545 &&
    mouseIsPressed
  ) {
    state = "onePlayer";
  }
  if (
    mouseX > innerWidth - 100 &&
    mouseX < innerWidth + 100 &&
    mouseY > 570 &&
    mouseY < 610 &&
    mouseIsPressed
  ) {
    state = "twoPlayer";
  }
}

function onePlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth - 150, 0, 300, height);
  rect(innerWidth - 200, 0, 400, height);

  //lines
  fill(255);
  let lineSpacing = 400;
  let lineX = innerWidth - 5;
  let startY = (frameCount % 20) * 20;

  for (let i = 0; i < 10; i++) {
    let lineY = startY - i * lineSpacing;
    if (lineY < height) {
      rect(lineX, lineY, 10, 80);
    }
  }

  playercar1();
  //trafic loop
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall();
    cars[i].display();
  }
  pop();
}

function twoPlayerScreen() {
  background(38, 139, 7);
  push();
  onePlayerScreen(0, 0);
  pop();
}
function resultOneScreen() {
  push();
  background(37, 60, 129);
  noStroke();
  fill(255, 194, 1);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Result", innerWidth - 100, 150);
  textStyle(ITALIC);
  textSize(20);
  text("Time:", innerWidth - 100, 250);
  text("Score:", innerWidth - 100, 350);
  image(imgCar, 20, 600, 400, 170);
  pop();
}
function resultTwoScreen() {
  push();
  background(37, 60, 129);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Result", innerWidth - 100, 150);
  textStyle(ITALIC);
  textSize(20);
  text("Player 1", innerWidth - 150, 250);
  text("Player 2", innerWidth + 100, 250);
  image(imgCar, 20, 400, 320, 140);
  pop();
}

//Trafic cars being made and moving
class redcar {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  // Method to change positon
  fall() {
    this.y += traficspeed;
    if (this.y > height) {
      this.y = random(-500, 0);
    }
  }

  // Method to draw the cars
  display() {
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, this.side, this.side);
  }
}

let state = "start";
let onePlayerIsRunning = true;
let twoPlayerIsRunning = true;

// function keyPressed() {
//   if (state === "start") {
//     if (keyCode === 49) {
//       // '1' key
//       state = "onePlayer";
//       onePlayerIsRunning = true;
//     } else if (keyCode === 50) {
//       // '2' key
//       state = "twoPlayer";
//       onePlayerIsRunning = false;
//       twoPlayerIsRunning = true;
//     }

// } else if (state === "onePlayer" && onePlayerIsRunning) {
//   // Press any key to show resultOneScreen after onePlayerScreen
//   state = "resultOne";
//   onePlayerIsRunning = false;
// } else if (state === "twoPlayer" && twoPlayerIsRunning) {
//   // Press any key to show resultTwoScreen after twoPlayerScreen
//   state = "resultTwo";
//   twoPlayerIsRunning = false;
// }
//}
//}
/*<-- The following 20 lines were inspierd from lunar lander -->*/
function draw() {
  if (state === "start") {
    menuPage();
  } else if (state === "onePlayer") {
    onePlayerScreen();
    //Move car
    if (keyIsDown(RIGHT_ARROW)) {
      playerCarX += 8;
    }
    if (keyIsDown(LEFT_ARROW)) {
      playerCarX -= 8;
    }
  } else if (state === "twoPlayer") {
    twoPlayerScreen();
  } else if (state === "resultOne") {
    resultOneScreen();
  } else if (state === "resultTwo") {
    resultTwoScreen();
  }
  // playercar1(100, 100);
}
