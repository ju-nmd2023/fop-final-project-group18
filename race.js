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

function onePlayer() {
  background(0, 255, 0);
}
function twoPlayer() {
  background(0, 255, 255);
}
function resultOne() {
  background(255, 0, 0);
}
function resultTwo() {
  background(255, 0, 0);
}

let state = menuPage;
let onePlayerIsRunning = true;

function draw() {
  if (state === menuPage) {
    menuPage();
  } else if (onePlayerIsRunning === true) {
    onePlayer();
    checkOneOver();
  } else if (state === "oneResult") {
    oneTesult();
  }
}
function checkOneOver() {
  if (!onePlayerIsRunning) {
    state = "resultOne";
  }
}
