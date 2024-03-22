function setup() {
  createCanvas(width, height);
}

let innerWidth = width / 2;
let innerHeight = height / 2;

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
}
function twoPlayerScreen() {
  background(0, 255, 255);
}
function resultOneScreen() {
  background(255, 0, 0);
}
function resultTwoScreen() {
  background(255, 0, 0);
}

let state = "start";
let onePlayerIsRunning = true;

function draw() {
  if (state === "start") {
    menuPage();
  } else if (onePlayerIsRunning === true) {
    onePlayerScreen();
    checkOneOver();
  } else if (state === "oneResult") {
    oneResultScreen();
  }
}

function gameMode (){
if (state === "start" && keyIsPressed && keyCode === DOWN_ARROW){
  onePlayerIsRunning === true
  state === "onePlayer"
}
}
