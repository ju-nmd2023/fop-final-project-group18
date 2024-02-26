let player1, player2;
let track;
let timeElapsed;
let singlePlayerMode = true;

function setup() {
  createCanvas(800, 600);
  
  // Initialize players
  player1 = new Car(color(0, 0, 255), width/2 - 50, height - 50, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
  player2 = new Car(color(255, 255, 0), width/2 + 50, height - 50, 87, 83, 65, 68); // A, D, W, S
  
  // Initialize track
  track = new Track();
  // Define track outline points
  track.addPoint(100, 100);
  track.addPoint(700, 100);
  track.addPoint(700, 500);
  track.addPoint(100, 500);
  track.addPoint(100, 100); // Close the loop
  
  timeElapsed = 0;
}

function draw() {
  background(200);
  
  // Draw track
  track.display();
  
  // Draw cars
  player1.update();
  player1.display();
  
  player2.update();
  player2.display();
  
  // Display time
  displayTime();
  
  // Display mode text
  fill(0);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(singlePlayerMode ? "Single Player Mode" : "Two Player Mode", width / 2, 20);
}

function displayTime() {
  timeElapsed += deltaTime / 1000; // Convert milliseconds to seconds
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Time: " + nf(timeElapsed, 0, 2), 10, 10);
}

class Car {
  constructor(color, x, y, upKey, downKey, leftKey, rightKey) {
    this.color = color;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.maxSpeed = 5; // Adjust as needed
    this.width = 20;
    this.height = 40;
  }
  
  update() {
    this.checkKeys();
    this.pos.add(this.vel);
    // Apply friction or other forces here
  }
  
  checkKeys() {
    if (keyIsDown(this.upKey)) {
      this.acc.y = -0.1;
    } else if (keyIsDown(this.downKey)) {
      this.acc.y = 0.1;
    } else {
      this.acc.y = 0;
    }
    
    if (keyIsDown(this.leftKey)) {
      this.acc.x = -0.1;
    } else if (keyIsDown(this.rightKey)) {
      this.acc.x = 0.1;
    } else {
      this.acc.x = 0;
    }
    
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
  }
  
  display() {
    fill(this.color);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

class Track {
  constructor() {
    this.points = [];
  }
  
  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }
  
  display() {
    stroke(0);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
  }
} 

 
