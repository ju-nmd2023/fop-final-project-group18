var car1;
var car2;

var carImage2;
var carImage1;
var mapImage;
 
function preload() {
  carImage1 = loadImage("https://i.imgur.com/9ddMwjp.png");
   carImage2 = loadImage("https://i.imgur.com/EVXDWBZ.png");

  mapImage = loadImage("track.png2.png");

}
  
function setup() {
  createCanvas(600, 600);
  car1 = new Car(1); 
  car2 = new Car(2);
}

function draw() {
  background(220);
  image(mapImage, 0, 0, width, 600);
  car1.draw(1);
  car1.controls(1);
  car1.collision(1);
  car1.update();

  car2.draw(2);
  car2.controls(2);
  car2.collision(2);
  car2.update();
}

class Car {
  constructor(playerNum) {
    if (playerNum == 1) {
      this.position = createVector(100, 35);
    } else {
      this.position = createVector(100, 35);
    }
    this.speed = 1;
    this.dir = createVector(1, 0);
  }

  draw(playerNum) {
    push();
    imageMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(PI / 2 + this.dir.heading());
    if(playerNum == 1){
      image(carImage1, 0, 0, 20, 20);
    } else{
    image(carImage2, 0, 0, 20, 20);
    }
    pop();
  }

  collision(playerNum) {
    var currentPos = this.position.copy();
    var frontBumper = currentPos.add(this.dir.copy().mult(10.5));
    var nextColor = get(frontBumper.x, frontBumper.y);

    if (nextColor[0] == 0 && nextColor[1] == 255 && nextColor[2] == 0) {
      this.speed = 0;
    }
    
  if(playerNum == 1){  if (nextColor[0] == 255 && nextColor[1] == 255 && nextColor[2] == 255) {
      noLoop();
    textSize(45);
      text("PLAYER 2 WINS!", 20, 200);
    }
  } else{
    if (nextColor[0] == 255 && nextColor[1] == 255 && nextColor[2] == 255) {
      noLoop();
      textSize(45);
      text("PLAYER 1 WINS!", 20, 200);
  }
  }
    if(playerNum == 1){  if (nextColor[0] == 255 && nextColor[1] == 255 && nextColor[2] == 255) {
      noLoop();
    textSize(45);
      text("PLAYER 2 WINS!", 20, 200);
    }
  } else{
    if (nextColor[0] == 255 && nextColor[1] == 255 && nextColor[2] == 255) {
      noLoop();
      textSize(45);
      text("PLAYER 1 WINS!", 20, 200);
  }
  }
  }

  controls(playerNum) {
    if (playerNum == 1) {
      if (keyIsDown(UP_ARROW)) {
        this.speed = 5;
      } else {
        this.speed = 0;
      }
       if(keyIsDown(191)){
      this.speed = 5;
    }
      if (keyIsDown(LEFT_ARROW)) {
        this.dir.rotate(0.05);
      }

      if (keyIsDown(RIGHT_ARROW)) {
        this.dir.rotate(-0.05);
      }
    } else{
        if(keyIsDown(87)){
      this.speed = 1;
    } else{
      this.speed = 0;
    }
    
    if(keyIsDown(65)){
  this.dir.rotate(0.05);
    }
    
    if(keyIsDown(68)){
  this.dir.rotate(-0.05);
    }
        if(keyIsDown(70)){
      this.speed = 5;
    }
    
    }
  }

  update() {
    var directionAndSpeed = this.dir.copy().mult(this.speed);
    this.position.add(directionAndSpeed);
  }

}