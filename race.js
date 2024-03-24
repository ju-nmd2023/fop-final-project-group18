function setup() {
  createCanvas(width, height);
}

let innerWidth = width / 2;
let innerHeight = height / 2;
let imgCar = loadImage("img/RaceCar.png");

function menuPage() {
  push();
  background(23, 59, 109);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Fast", 100, 150);
  text("And", 120, 220);
  text("Fantastic", 150, 290);
  image(imgCar, 0, 0);

  fill(0);
  textStyle(BOLD);
  textSize(20);
  fill(237, 195, 40);
  text("Single Player", innerWidth, 530);
  text("Double Player", innerWidth, 590);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(width / 2 - 50, 540, width / 2 + 50, 540);
  line(width / 2 - 50, 600, width / 2 + 50, 600);
  pop();
}

function onePlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y);
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth - 150, 0, 300, height);
  fill(255);
  rect(innerWidth - 5, 0, 10, 30);
  rect(innerWidth - 5, 60, 10, 30);
  rect(innerWidth - 5, 120, 10, 30);
  rect(innerWidth - 5, 180, 10, 30);
  rect(innerWidth - 5, 240, 10, 30);
  rect(innerWidth - 5, 300, 10, 30);
  rect(innerWidth - 5, 360, 10, 30);
  rect(innerWidth - 5, 420, 10, 30);
  rect(innerWidth - 5, 480, 10, 30);
  rect(innerWidth - 5, 540, 10, 30);
  rect(innerWidth - 5, 600, 10, 30);
  rect(innerWidth - 5, 600, 10, 30);
  rect(innerWidth - 5, 660, 10, 30);
  rect(innerWidth - 5, 720, 10, 30);
  rect(innerWidth - 5, 780, 10, 30);
  pop();
}
function twoPlayerScreen() {
  background(0,0,255);
}
function resultOneScreen() {
  push();
  background(23, 59, 109);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Result", innerWidth - 100, 150);
  textStyle(ITALIC);
  textSize(20);
  text("Time:", innerWidth - 100, 250);
  text("Score:", innerWidth - 100, 350);
  pop();
}
function resultTwoScreen() {
  background(23, 59, 109);
}
  
function draw() {
  // menuPage();
  // onePlayer(0, 0);
  resultOne();
}

let state = "start";
let onePlayerIsRunning = true;
let twoPlayerIsRunning = true;

function keyPressed() {
  if (state === "start") {
    if (keyCode === 49) {
      // '1' key
      state = "onePlayer";
      onePlayerIsRunning = true;
    } else if (keyCode === 50) {
      // '2' key
      state = "twoPlayer";
      onePlayerIsRunning = false;
      twoPlayerIsRunning = true;
    }
  } else if (state === "onePlayer" && onePlayerIsRunning) {
    // Press any key to show resultOneScreen after onePlayerScreen
    state = "resultOne";
    onePlayerIsRunning = false;
  } else if (state === "twoPlayer" && twoPlayerIsRunning) {
    // Press any key to show resultTwoScreen after twoPlayerScreen
    state = "resultTwo";
    twoPlayerIsRunning = false;
  }
}

function draw() {
  if (state === "start") {
    menuPage();
  } else if (state === "onePlayer") {
    onePlayerScreen();
    // Add your one player screen logic here
  } else if (state === "twoPlayer") {
    twoPlayerScreen();
    // Add your two player screen logic here
  } else if (state === "resultOne") {
    resultOneScreen();
    // Add logic for resultOneScreen
  } else if (state === "resultTwo") {
    resultTwoScreen();
    // Add logic for resultTwoScreen
  }
}
