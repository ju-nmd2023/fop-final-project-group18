function setup() {
  createCanvas(windowWidth, windowHeight);
}

let innerWidth = width / 2;
let innerHeight = height / 2;
let imgCar;

//Players car
let playerCarX = 200;
let playerCarY = 350;

function playercar1(x, y) {
  fill(20, 20, 250);
  rect(playerCarX, playerCarY, 80, 90);
}

function preload() {
  imgCar = loadImage("img/RaceCar.png");
}

function menuPage() {
  push();
  background(23, 59, 109);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Fast", innerWidth - 250, 150);
  text("And", innerWidth - 220, 220);
  text("Fantastic", innerWidth - 190, 290);
  image(imgCar, innerWidth - 80, 80, 400, 170);

  fill(0);
  textStyle(BOLD);
  textSize(20);
  fill(237, 195, 40);
  textAlign(CENTER);
  const singlePlayerButton = text("Single Player", innerWidth, 530);
  const doublePlayerButton = text("Double Player", innerWidth, 590);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(innerWidth - 50, 540, innerWidth + 50, 540);
  line(innerWidth - 50, 600, innerWidth + 50, 600);
  pop();
}

function onePlayerScreen(x, y) {
  background(38, 139, 7);
  push();
  translate(x, y); 
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth -200, 0, 400, height);
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
  pop();
}
function twoPlayerScreen() {
  background(0, 0, 255);
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
  image(imgCar, 20, 600, 400, 170);
  pop();
}
function resultTwoScreen() {
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
  text("Player 1", innerWidth - 150, 250);
  text("Player 2", innerWidth + 100, 250);
  image(imgCar, 20, 400, 320, 140);
  pop();
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

    // } else if (state === "onePlayer" && onePlayerIsRunning) {
    //   // Press any key to show resultOneScreen after onePlayerScreen
    //   state = "resultOne";
    //   onePlayerIsRunning = false;
    // } else if (state === "twoPlayer" && twoPlayerIsRunning) {
    //   // Press any key to show resultTwoScreen after twoPlayerScreen
    //   state = "resultTwo";
    //   twoPlayerIsRunning = false;
    // }
  }
}
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
}
