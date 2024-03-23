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
  text("Double Player", innerWidth, 590);
  stroke(237, 195, 40);
  strokeWeight(2);
  line(width / 2 - 50, 540, width / 2 + 50, 540);
  line(width / 2 - 50, 600, width / 2 + 50, 600);
}

function onePlayer() {
  background(38, 139, 7);
  fill(102, 102, 95);
  noStroke();
  rect(innerWidth - 150, 0, 300, height);
}
function twoPlayer() {}
function resultOne() {}

function draw() {
  // menuPage();
  onePlayer();
}
