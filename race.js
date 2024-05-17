import { RedCar } from "./traffic.js";
import { PowerUp } from "./powerup.js";
import { PlayerCar } from "./playercar.js";
import { FallingLine } from "./lines.js";

let middleWidth = innerWidth / 2;
let middleHeight = innerHeight / 2;
let imgCar;

let grass = [];
class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    push();
    translate(this.x, this.y);
    stroke("Green");
    strokeWeight(5);
    line(this.x, this.y, this.x, this.y + 20);
    line(this.x, this.y, this.x + 10, this.y + 20);
    line(this.x + 10, this.y + 20, this.x + 25, this.y - 10);
    line(this.x + 25, this.y - 10, this.x + 35, this.y + 20);
    line(this.x + 35, this.y + 20, this.x + 45, this.y);
    line(this.x + 45, this.y + 20, this.x + 45, this.y);
    pop();
  }

  update() {
    this.y += 5;
  }
}

// This class with lines of code was adapted form https://pixelkind.github.io/foundationsofprogramming/oop/01-02-example. Accessed: 11/5-2024
class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  draw() {
    push();
    translate(this.x, this.y);
    stroke(255, 194, 1);
    fill(37, 60, 129);
    rect(0, 0, this.width, this.height);

    //text
    fill(255, 194, 1);
    noStroke();
    textFont("Verdana");
    textSize(20);
    textAlign(CENTER);
    textStyle(BOLD);
    text(this.text, 0, this.height / 4, this.width);
    pop();
  }
  hitTest(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}

let singlePlayerButton;
let doublePlayerButton;
let restartButton;
let menuButton;

//Different players
let singlePlayer = new PlayerCar(innerWidth / 2, 550, [255, 194, 1]);
let player1 = new PlayerCar(middleWidth / 2, 550, [255, 194, 1]);
let player2 = new PlayerCar(middleWidth * 1.5, 550, [205, 52, 52]);

//trafic cars
let cars = [];
let carsright = [];
let carSize = (40, 70);
let numcars = 2;
let traficspeed = 8;
let traficspeedright = 3;
let spacing = 550;

//powerup
let powerup = [];
let powerupsize = (20, 20);
let numpowerup = 1;
let powerupspeed = 8;
let score = 0;
let powerupActive = false; // Variable to track powerup effect
let powerupActivatedTime; // Timestamp when powerup was activated
let powerupTime = 0;

let playerCarY = 450;

let state = "start";
let onePlayerIsRunning = true;
let twoPlayerIsRunning = true;

// ====== SETUP ====== //
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);

  singlePlayerButton = new Button(
    middleWidth - 95,
    height - 190,
    190,
    50,
    "Single Player"
  );
  doublePlayerButton = new Button(
    middleWidth - 95,
    height - 130,
    190,
    50,
    "Double Player"
  );
  restartButton = new Button(
    middleWidth - 195,
    height - 250,
    190,
    50,
    "RESTART"
  );

  menuButton = new Button(middleWidth + 5, height - 250, 190, 50, "MENU");

  //trafic cars left being positioned
  for (let i = 0; i < numcars; i++) {
    let x = random(middleWidth - 180, middleWidth);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    cars.push(new RedCar(x, y, carSize));
    cars[i].scored = false; // Initialize scored fla
  }
  //trafic cars right being positioned
  for (let i = 0; i < numcars; i++) {
    let x = random(middleWidth, middleWidth + 180);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    carsright.push(new RedCar(x, y, carSize));
  }
  //powerup
  for (let i = 0; i < numpowerup; i++) {
    let x = random(middleWidth - 200, middleWidth + 200);
    let y = random(-500, 0);
    powerup.push(new PowerUp(x, y, powerupsize));
  }

  // Falling Grass
  for (let i = 0; i < 50; i++) {
    grass.push(new Grass(random(width), random(-400, -50)));
  }
}
window.setup = setup;

// ====== IMG PRELOAD ====== //
function preload() {
  imgCar = loadImage("img/RaceCar.png");
}
window.preload = preload;

// ====== RESET GAME ====== //
function resetGame() {
  // Reset player car position
  singlePlayer.x = innerWidth / 2;
  singlePlayer.y = 550;

  // Reset traffic cars on the left side
  for (let i = 0; i < numcars; i++) {
    let x = random(130, 300);
    let y = random(-500, 0) - i * spacing;
    cars[i].x = x;
    cars[i].y = y;
    cars[i].scored = false; // Reset scored flag
  }

  // Reset traffic cars on the right side
  for (let i = 0; i < numcars; i++) {
    let x = random(300, 532);
    let y = random(-500, 0) - i * spacing;
    carsright[i].x = x;
    carsright[i].y = y;
    carsright[i].scored = false; // Reset scored flag
  }

  // Reset powerups
  for (let i = 0; i < numpowerup; i++) {
    let x = random(130, 532);
    let y = random(-500, 0);
    powerup[i].x = x;
    powerup[i].y = y;
  }

  // Reset score and powerup state
  score = 0;
  powerupActive = false;
  powerupTime = 0;
}
window.resetGame = resetGame;

// ====== MENU ====== //
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

  singlePlayerButton.draw();
  doublePlayerButton.draw();

  // These 8 lines of code was adapted from https://pixelkind.github.io/foundationsofprogramming/oop/01-02-example. Accessed: 11/5-2024
  if (mouseIsPressed) {
    if (singlePlayerButton.hitTest(mouseX, mouseY)) {
      state = "onePlayer";
    }
    if (doublePlayerButton.hitTest(mouseX, mouseY)) {
      state = "twoPlayer";
    }
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
}
window.menuPage = menuPage;

// ====== ONE PLAYER MODE ====== //
function onePlayerScreen(x, y) {
  push();
  background(38, 139, 7);
  translate(x, y);
  for (let i = 0; i < grass.length; i++) {
    grass[i].draw();
    grass[i].update();
    if (grass[i].y > height) {
      grass[i].y = random(-400, -50);
    }
  }
  fill(102, 102, 95);
  noStroke();
  rect(middleWidth - 150, 0, 300, height);
  rect(middleWidth - 200, 0, 400, height);
  fill(0);
  textSize(15);
  text("Speed" + " " + traficspeed, middleWidth - 270, 50);

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
      !powerupActive &&
      (collision(
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
        ))
    ) {
      state = "resultOne";
    } else {
      // Check if a red car falls past the player car
      if (!powerupActive && cars[i].y > 400 && !cars[i].scored) {
        score += 2; // Increment the score
        cars[i].scored = true; // Mark the car as scored to prevent double counting
      }
    }
  }

  //powerup
  for (let i = 0; i < powerup.length; i++) {
    powerup[i].fall();
    powerup[i].display();

    if (powerup[i].checkCollision(singlePlayer.x, singlePlayer.y, 70, 115)) {
      // Collision detected, activate powerup effect
      powerupActive = true;
      powerupActivatedTime = millis(); // Record activation time
      // Perform other actions if needed
      score += 1; // Example action: Increase score by 1
    }
  }
  // Display score
  text("Score: " + score, middleWidth - 270, 90);
  // Display poweruptime
  text("Power: " + powerupTime, middleWidth - 270, 120);

  pop();
}
window.onePlayerScreen = onePlayerScreen;

function resultOneScreen() {
  push();
  background(37, 60, 129);
  noStroke();
  fill(255, 194, 1);
  textStyle(BOLDITALIC);
  textAlign(CENTER);
  textFont("Verdana");
  textSize(60);
  text("Result", middleWidth, 150);
  textAlign(RIGHT);
  textStyle(ITALIC);
  textSize(20);
  //text("Time:", middleWidth - 85, 250);
  text("Score:" + "  " + score, middleWidth - 85, 350);
  image(imgCar, middleWidth / 8, height - 200, 400, 170);
  restartButton.draw();
  menuButton.draw();
  pop();

  // Reset red cars
  for (let i = 0; i < numcars; i++) {
    let x = random(130, 300);
    let y = random(-500, 0) - i * spacing; // Add spacing between cars
    cars[i].x = x;
    cars[i].y = y;
    cars[i].scored = false; // Reset scored flag
  }

  // These 8 lines of code was adapted from https://pixelkind.github.io/foundationsofprogramming/oop/01-02-example. Accessed: 11/5-2024
  if (mouseIsPressed) {
    if (restartButton.hitTest(mouseX, mouseY)) {
      console.log("reset button was clicked");
      resetGame();
      state = "onePlayer";
    }
    if (menuButton.hitTest(mouseX, mouseY)) {
      console.log("menu button was clicked");
      resetGame();
      state = "start";
    }
  }
}
window.resultOneScreen = resultOneScreen;

// ====== TWO PLAYER MODE ====== //
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
  let lineX = middleWidth - 150;
  let lineX2 = middleWidth + 150;
  let startY = (frameCount % 20) * 20;

  for (let i = 0; i < 10; i++) {
    let lineY = startY - i * lineSpacing;
    if (lineY < height) {
      rect(lineX, lineY, 10, 80);
    }
  }
  for (let i = 0; i < 10; i++) {
    let lineY = startY - i * lineSpacing;
    if (lineY < height) {
      rect(lineX2, lineY, 10, 80);
    }
  }

  // Traffic loop, more code exsists
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall();
    cars[i].display();

    carsright[i].fall();
    carsright[i].display();
  }

  // Check collision for player1 with traffic cars
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall();
    cars[i].display();
    if (
      collision(
        player1.x,
        player1.y,
        70,
        115,
        cars[i].x,
        cars[i].y,
        carSize,
        carSize
      )
    ) {
      state = "resultTwo"; // Player 1 collision with traffic car
    }
  }

  // Check collision for player2 with traffic cars
  for (let i = 0; i < carsright.length; i++) {
    carsright[i].fall();
    carsright[i].display();
    if (
      collision(
        player2.x,
        player2.y,
        70,
        115,
        carsright[i].x,
        carsright[i].y,
        carSize,
        carSize
      )
    ) {
      state = "resultTwo"; // Player 2 collision with traffic car
    }
  }

  pop();
}
window.twoPlayerScreen = twoPlayerScreen;

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
  restartButton.draw();
  menuButton.draw();
  pop();

  // These 8 lines of code was adapted from https://pixelkind.github.io/foundationsofprogramming/oop/01-02-example. Accessed: 11/5-2024
  if (mouseIsPressed) {
    if (restartButton.hitTest(mouseX, mouseY)) {
      resetGame();
      state = "twoPlayer";
    }
    if (menuButton.hitTest(mouseX, mouseY)) {
      state = "start";
    }
  }
}
window.resultTwoScreen = resultTwoScreen;

// ====== COLLISION ====== //
// Function to check collision between two rectangles
//<-- The following 2 lines were inspierd from the p5.js site 14-04-2024, https://editor.p5js.org/dfeusse/sketches/H1vD7NQjb -->
function collision(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
window.collision = collision;

// ====== DRAW FUNCTION ====== //
function draw() {
  // Update powerup effect timer
  if (powerupActive) {
    powerupTime = 2 - Math.floor((millis() - powerupActivatedTime) / 1000);
    if (powerupTime <= 0) {
      powerupActive = false;
      powerupTime = 0;
    }
  } else {
    powerupTime = 0;
  }

  /*<-- The following 20 lines were inspierd from the lunar lander game -->*/
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
