function setup() {
  createCanvas(width, height);
}

let innerWidth = width / 2;
let innerHeight = height / 2;
//one player car mede
function onePlayerCar (x,y){
  push();
  translate(x, y);
  noStroke();
  fill(0, 0, 200);
  rect(200, 200, 20, 20);
  pop(); 
}

function menuPage() {
  background(23, 59, 109);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Verdana");
  textSize(60);
  text("Fast", 100, 150);
  text("And", 120, 220);
  text("Fantastic", 150, 290);
  fill(0);
  textStyle(BOLD);
  textSize(20);
  fill(237, 195, 40);
  text("Single Player", innerWidth, 530);
  text("Double Player", width / 2, 600);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(width / 2 - 50, 540, width / 2 + 50, 540);
  line(width / 2 - 50, 600, width / 2 + 50, 600);
}

function onePlayerScreen() {
  background(0, 255, 0);
 onePlayerCar(0,0);
}
function twoPlayerScreen() {
  background(255, 255, 255);
} 
function resultOneScreen() {
  background(255, 0, 0);
}
function resultTwoScreen() {
  background(255, 0, 0);
}

let state = "start";
let onePlayerIsRunning = true;
let twoPlayerIsRunning = true;

function checkOneOver() {
  if (!onePlayerIsRunning) {
    state = "oneResult";
  }
}
function checkTwoOver() {
  if (!twoPlayerIsRunning) {
    state = "twoResult";
  }
}

function draw() {
  if (state === "start") {
    menuPage();
  } else if (onePlayerIsRunning === true) {
    onePlayerScreen();
    checkOneOver();
  } else if (twoPlayerIsRunning === true) {
    twoPlayerScreen();
    checkTwoOver();
  } else if (state === "oneResult") {
    oneResultScreen();
  }
} 

function keyPressed() {
  if (state === "start") {
    if (keyCode === 49) {
      // '1' key
      state = "onePlayer";
      onePlayerIsRunning = true;
    } else if (keyCode === 50) {
      // '2' key
      state = "twoPlayer";
      twoPlayerIsRunning = true; 
    } 
  }
}
