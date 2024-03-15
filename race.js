function setup() {
  createCanvas(1000, 800);
}

function startPage() {
  background(23, 59, 109);
  noStroke();
  fill(237, 195, 40);
  textStyle(BOLDITALIC);
  textFont("Trebuchet MS");
  textSize(60);
  text("FAST", 400, 150);
  text("AND", 400, 200);
  text("FANTASTIC", 400, 250);

  fill(255);
  rect(width / 2, 500, 150, 50);
  rect(width / 2 + 250, 500, 150, 50);

  fill(0);
  textStyle(NORMAL);
  textSize(20);
  text("ONE PLAYER", 370, 535);
  text("TWO PLAYER", 615, 535);
}

function onePlayer() {}
function twoPlayer() {}
function resultOne() {}

function draw() {
  startPage();
}
