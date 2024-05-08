import { RedCar } from "./traffic.js";
import { PowerUp } from "./powerup.js";

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

class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  displayGrass() {
    push();
    translate(this.x, this.y);
    stroke("Green");
    strokeWeight(5);
    line(100, 100, 100, 120);
    line(100, 100, 110, 120);
    line(110, 120, 125, 90);
    line(125, 90, 135, 120);
    line(135, 120, 145, 100);
    line(145, 120, 145, 100);
    pop();
  }

  movingGrass() {
    this.y = traficspeed;
    if (this.y > height) {
      this.y = random(-500, 0);
    }
  }
}

let middleWidth = innerWidth / 2;
let middleHeight = innerHeight / 2;
//Different players
let singlePlayer = new PlayerCar(innerWidth / 2, 550, [255, 194, 1]);
let player1 = new PlayerCar(middleWidth / 2, 550, [255, 194, 1]);
let player2 = new PlayerCar(middleWidth * 1.5, 550, [205, 52, 52]);

//trafic cars
let cars = [];
let carsright = [];
let carSize = (40, 70);
let numcars = 2;
let traficspeed = 6;
let traficspeedright = 3;
let spacing = 550; // Adjust this value to increase or decrease space between cars

// Grass
let grass = [];

//powerup
let powerup = [];
let powerupsize = (20, 20);
let numpowerup = 1;
let powerupspeed = 8;

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
  //powerup
  for (let i = 0; i < numpowerup; i++) {
    let x = random(130, 532);
    let y = random(-500, 0);
    powerup.push(new PowerUp(x, y, powerupsize));
  }
}
window.setup = setup;

//Player1 car coordinates
let playerCarX1 = 200;
let playerCarX2 = 400;
let playerCarY = 450;

function preload() {
  imgCar = loadImage("img/RaceCar.png");
}
window.preload = preload;
function menuPage() {
  background(37, 60, 129);
  noStroke();
  fill(255, 194, 1);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Fast", middleWidth - 250, 150);
  text("And", middleWidth - 220, 220);
  text("Fantastic", middleWidth - 100, 290);
  image(imgCar, middleWidth - 80, 80, 400, 170);

  textStyle(BOLD);
  textSize(20);
  textAlign(CENTER);
  text("Single Player", middleWidth, height - 155);
  text("Double Player", middleWidth, height - 105);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(middleWidth - 50, height - 148, middleWidth + 50, height - 148);
  line(middleWidth - 50, height - 98, middleWidth + 50, height - 98);
  //Game mode
  if (
    mouseX > middleWidth - 100 &&
    mouseX < middleWidth + 100 &&
    mouseY > height - 165 &&
    mouseY < height - 146 &&
    mouseIsPressed
  ) {
    state = "onePlayer";
    onePlayerScreen();
  }
  if (
    mouseX > middleWidth - 100 &&
    mouseX < middleWidth + 100 &&
    mouseY > height - 115 &&
    mouseY < height - 96 &&
    mouseIsPressed
  ) {
    state = "twoPlayer";
  }
}
window.menuPage = menuPage;
//One player mode
function onePlayerScreen(x, y) {
  background(38, 139, 7);

  for (let i = 0; i < grass.length; i++) {
    grass[i].movingGrass();
    grass[i].displayGrass();
  }
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(middleWidth - 150, 0, 300, height);
  rect(middleWidth - 200, 0, 400, height);
  fill(0);
  textSize(15);
  text("Speed", middleWidth - 270, 50);

  // Variable to store the score
  let score = 0;

  //lines
  fill(255);
  let lineSpacing = 400;
  let lineX = middleWidth - 5;
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
    //<-- The following 20 lines were inspierd from the p5.js site 14-04-2024, https://editor.p5js.org/dfeusse/sketches/H1vD7NQjb -->
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

  //powerup
  for (let i = 0; i < powerup.length; i++) {
    powerup[i].fall();
    powerup[i].display();
  }
  // Display score
  text("Score: " + score, middleWidth - 270, 90);

  pop();
}
window.onePlayerScreen = onePlayerScreen;

function twoPlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(middleWidth / 2 - 150, 0, 300, height);
  rect(middleWidth * 1.5 - 150, 0, 300, height);
  player1.displayCar();
  player2.displayCar();

  fill(255);
  let lineSpacing = 400;
  let lineX = middleWidth - 5;
  let startY = (frameCount % 20) * 20;

  for (let i = 0; i < 10; i++) {
    let lineY = startY - i * lineSpacing;
    if (lineY < height) {
      rect(lineX, lineY, 10, 80);
    }
  }

  // Traffic loop, more code exsists
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall();
    cars[i].display();

    carsright[i].fall();
    carsright[i].display();
  }

  pop();
}
window.twoPlayerScreen = twoPlayerScreen;
function resultOneScreen() {
  onePlayerIsRunning = false;
  push();
  background(37, 60, 129);
  noStroke();
  fill(255, 194, 1);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Result", middleWidth, 150);
  textStyle(ITALIC);
  textSize(20);
  text("Time:", middleWidth - 85, 250);
  text("Score:", middleWidth - 85, 350);
  image(imgCar, middleWidth / 8, height - 200, 400, 170);
  textStyle(BOLD);
  text("RESTART", middleWidth, height - 250);
  text("MENU", middleWidth, height - 200);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(middleWidth - 50, height - 248, middleWidth + 50, height - 248);
  line(middleWidth - 50, height - 198, middleWidth + 50, height - 198);
  pop();

  // Reset red cars
  for (let i = 0; i < numcars; i++) {
    let x = random(130, 300);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    cars[i].x = x;
    cars[i].y = y;
    cars[i].scored = false; // Reset scored flag
  }

  if (
    mouseX > middleWidth - 100 &&
    mouseX < middleWidth + 100 &&
    mouseY > height - 260 &&
    mouseY < height - 246 &&
    mouseIsPressed
  ) {
    onePlayerScreen();
    state = "onePlayer";
  } else if (
    mouseX > middleWidth - 100 &&
    mouseX < middleWidth + 100 &&
    mouseY > height - 210 &&
    mouseY < height - 196 &&
    mouseIsPressed
  ) {
    state = "start";
  }
}
window.resultOneScreen = resultOneScreen;
function resultTwoScreen() {
  twoPlayerIsRunning = false;
  push();
  background(37, 60, 129);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Result", middleWidth - 100, 150);
  textStyle(ITALIC);
  textSize(20);
  text("Player 1", middleWidth - 150, 250);
  text("Player 2", middleWidth + 100, 250);
  image(imgCar, 20, 400, 320, 140);
  pop();
}
window.resultTwoScreen = resultTwoScreen;

// Function to check collision between two rectangles
//<-- The following 2 lines were inspierd from the p5.js site 14-04-2024, https://editor.p5js.org/dfeusse/sketches/H1vD7NQjb -->
function collision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
window.collision = collision;

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
    if (keyIsDown(65)) {
      player1.x -= 8;
    } else if (keyIsDown(68)) {
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
window.draw = draw;
