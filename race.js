import { RedCar } from "traffic.js";

class PlayerCar {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  displayCar() {
    push();
    translate(this.x, this.y);

    // Player ones car
    fill(this.color);
    noStroke();
    rect(0, 0, 70, 115, 10);
    ellipse(35, 10, 75, 65);

    // Car windows
    fill(0);
    quad(10, 80, 60, 80, 57, 100, 13, 100);
    ellipse(35, 100, 43, 10);
    quad(5, 25, 65, 25, 60, 55, 10, 55);
    ellipse(35, 25, 60, 15);
    triangle(3, 40, 10, 75, 3, 75);
    triangle(68, 40, 68, 75, 60, 75);
    pop();
  }
}

let singlePlayer = new PlayerCar(innerWidth / 2, 550, [255, 194, 1]);
let player1 = new PlayerCar(100, 550, [255, 194, 1]);
let player2 = new PlayerCar(300, 550, [205, 52, 52]);

//trafic cars
let cars = [];
let carsright = [];
let carSize = (40, 70);
let numcars = 2;
let traficspeed = 6;
let traficspeedright = 3;
let spacing = 550; // Adjust this value to increase or decrease space between cars

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  //trafic cars left being positioned

  for (let i = 0; i < numcars; i++) {
    let x = random(130, 300);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    cars.push(new RedCar(x, y, carSize));
  }
  //trafic cars right being positioned
  for (let i = 0; i < numcars; i++) {
    let x = random(300, 532);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    carsright.push(new RedCar(x, y, carSize));
  }
  innerWidth = width / 2;
  innerHeight = height / 2;
}

let imgCar;

//Player1 car coordinates
let playerCarX1 = 200;
let playerCarX2 = 400;
let playerCarY = 450;

// function onePlayerCar(x1, y1) {
//   push();
//   translate(x1, y1);

//   // Player ones car
//   fill(255, 194, 1);
//   noStroke();
//   rect(playerCarX1, playerCarY, 70, 115, 10);
//   ellipse(playerCarX1 + 35, playerCarY + 10, 75, 65);

//   // Car windows
//   fill(0);
//   quad(
//     playerCarX1 + 10,
//     playerCarY + 80,
//     playerCarX1 + 60,
//     playerCarY + 80,
//     playerCarX1 + 57,
//     playerCarY + 100,
//     playerCarX1 + 13,
//     playerCarY + 100
//   );
//   ellipse(playerCarX1 + 35, playerCarY + 100, 43, 10);
//   quad(
//     playerCarX1 + 5,
//     playerCarY + 25,
//     playerCarX1 + 65,
//     playerCarY + 25,
//     playerCarX1 + 60,
//     playerCarY + 55,
//     playerCarX1 + 10,
//     playerCarY + 55
//   );
//   ellipse(playerCarX1 + 35, playerCarY + 25, 60, 15);
//   triangle(
//     playerCarX1 + 3,
//     playerCarY + 40,
//     playerCarX1 + 10,
//     playerCarY + 75,
//     playerCarX1 + 3,
//     playerCarY + 75
//   );
//   triangle(
//     playerCarX1 + 68,
//     playerCarY + 40,
//     playerCarX1 + 68,
//     playerCarY + 75,
//     playerCarX1 + 60,
//     playerCarY + 75
//   );
//   pop();
// }

// function twoPlayerCar(x2, y2) {
//   push();
//   translate(x2, y2);

//   // Player ones car
//   fill(205, 52, 52);
//   noStroke();
//   rect(playerCarX2, playerCarY, 70, 115, 10);
//   ellipse(playerCarX2 + 35, playerCarY + 10, 75, 65);

//   // Car windows
//   fill(0);
//   quad(
//     playerCarX2 + 10,
//     playerCarY + 80,
//     playerCarX2 + 60,
//     playerCarY + 80,
//     playerCarX2 + 57,
//     playerCarY + 100,
//     playerCarX2 + 13,
//     playerCarY + 100
//   );
//   ellipse(playerCarX2 + 35, playerCarY + 100, 43, 10);
//   quad(
//     playerCarX2 + 5,
//     playerCarY + 25,
//     playerCarX2 + 65,
//     playerCarY + 25,
//     playerCarX2 + 60,
//     playerCarY + 55,
//     playerCarX2 + 10,
//     playerCarY + 55
//   );
//   ellipse(playerCarX2 + 35, playerCarY + 25, 60, 15);
//   triangle(
//     playerCarX2 + 3,
//     playerCarY + 40,
//     playerCarX2 + 10,
//     playerCarY + 75,
//     playerCarX2 + 3,
//     playerCarY + 75
//   );
//   triangle(
//     playerCarX2 + 68,
//     playerCarY + 40,
//     playerCarX2 + 68,
//     playerCarY + 75,
//     playerCarX2 + 60,
//     playerCarY + 75
//   );
//   pop();
// }

function preload() {
  imgCar = loadImage("img/RaceCar.png");
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
  text("Fantastic", innerWidth - 100, 290);
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

//One player mode
function onePlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth - 150, 0, 300, height);
  rect(innerWidth - 200, 0, 400, height);
  fill(0);
  textSize(15);
  text("Speed", innerWidth - 270, 50);

  // Variable to store the score
  let score = 0;

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

  singlePlayer.displayCar();

  // Traffic loop, more code exsists
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall();
    cars[i].display();

    carsright[i].fall();
    carsright[i].display();

    // Check collision
    if (
      collision(
        singlePlayer.x,
        singlePlayer.y,
        70,
        115,
        cars[i].x,
        cars[i].y,
        carSize,
        carSize
      ) ||
      collision(
        singlePlayer.x,
        playerCarY,
        70,
        115,
        carsright[i].x,
        carsright[i].y,
        carSize,
        carSize
      )
    ) {
      state = "resultOne";
    } else {
      // Check if a red car falls past the player car
      if (cars[i].y > 200 && !cars[i].scored) {
        score++; // Increment the score
        cars[i].scored = true; // Mark the car as scored
      }
    }
  }

  // Display score
  text("Score: " + score, innerWidth - 270, 90);

  pop();
}
function twoPlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth / 2 - 150, 0, 300, height);
  rect(innerWidth * 1.5 - 150, 0, 300, height);
  player1.displayCar();
  player2.displayCar();

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

// Function to check collision between two rectangles
//<-- The following 2 lines were inspierd from the p5.js site 14-04-2024, https://editor.p5js.org/dfeusse/sketches/H1vD7NQjb -->
function collision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

let state = "start";
let onePlayerIsRunning = true;
let twoPlayerIsRunning = true;

/*<-- The following 20 lines were inspierd from the lunar lander game -->*/
function draw() {
  if (state === "start") {
    menuPage();
  } else if (state === "onePlayer") {
    onePlayerScreen();
    //Move car
    if (keyIsDown(RIGHT_ARROW)) {
      singlePlayer.x += 8;
    }
    if (keyIsDown(LEFT_ARROW)) {
      singlePlayer.x -= 8;
    }
  } else if (state === "twoPlayer") {
    twoPlayerScreen();
    if (keyIsDown(UP_ARROW)) {
      player1.x -= 8;
    } else if (keyIsDown(DOWN_ARROW)) {
      player1.x += 8;
    }
    if (keyIsDown(LEFT_ARROW)) {
      player2.x -= 8;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player2.x += 8;
    }
  } else if (state === "resultOne") {
    resultOneScreen();
  } else if (state === "resultTwo") {
    resultTwoScreen();
  }
}
