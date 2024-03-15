// Define constants
const TRACK_WIDTH = 800; 
const TRACK_HEIGHT = 600;
const NUM_CHECKPOINTS = 14;
const LAP_TIME_LIMIT = 120000; // 2 minutes in milliseconds
const BOOST_DURATION = 2000; // Duration of boost in milliseconds
const BOOST_SPEED = 5; // Speed increase during boost

// Define variables
let gameState = "start";
let player1;
let player2;
let track;
let lapStartTime;
let lapEndTime;
let player1BoostAvailable = true;
let player2BoostAvailable = true;
let player1BoostEndTime = 0;
let player2BoostEndTime = 0;

// Sound effects
let engineSound;
let boostSound;
let collisionSound;



function setup() {
  createCanvas(TRACK_WIDTH, TRACK_HEIGHT);
  initializeGame();
 
}
  
function draw() {
  background(20, 200, 20);
   
  if (gameState === "start") {
    displayStartScreen();
  } else if (gameState === "singlePlayer") {
    singlePlayerMode();
  } else if (gameState === "twoPlayer") {
    twoPlayerMode();
  }
}

function initializeGame() {
  player1 = new Car(color(0, 0, 255), width / 4, height / 2, "arrowKeys");
  player2 = new Car(color(255, 255, 0), 3 * width / 4, height / 2, "ADKeys");
  track = new Track();
}

function displayStartScreen() {
  // Display start screen UI
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text("Racing Game", width / 2, height / 2 - 50);
  textSize(24);
  text("Press 1 for Single Player, 2 for Two Players", width / 2, height / 2 + 50);
}  

function singlePlayerMode() {
  // Implement single-player gameplay
  track.display();
  player1.display();
  player1.update();
  displayHUD(player1, "Player 1");
  displayLapTime();
  checkCollisions(player1);
  checkLapCompletion(player1);
  handleBoost(player1);
}  

function twoPlayerMode() {
  // Implement two-player gameplay
  track.display();
  player1.display();
  player2.display();
  player1.update();
  player2.update();
  displayHUD(player1, "Player 1");
  displayHUD(player2, "Player 2");
  displayLapTime();
  checkCollisions(player1);
  checkCollisions(player2);
  checkLapCompletion(player1);
  checkLapCompletion(player2);
  handleBoost(player1);
  handleBoost(player2);
}

function keyPressed() {
  if (gameState === "start") {
    if (key === "1") {
      gameState = "singlePlayer";
    } else if (key === "2") {
      gameState = "twoPlayer";
    }
  } else {
    // Boost activation
    if (key === " ") {
      if (gameState === "singlePlayer" && player1BoostAvailable) {
        player1BoostAvailable = false;
        player1BoostEndTime = millis() + BOOST_DURATION;
        boostSound.play();
      } else if (gameState === "twoPlayer" && player2BoostAvailable) {
        player2BoostAvailable = false;
        player2BoostEndTime = millis() + BOOST_DURATION;
        boostSound.play();
      }
    }
  }
}

function displayHUD(car, playerName) {
  textSize(16);
  textAlign(LEFT);
  fill(255);
  text(`${playerName}: Lap ${car.checkpointIndex}/${NUM_CHECKPOINTS}`, 20, 30);
  text(`Speed: ${nf(car.speed, 2, 2)}`, 20, 50);
}

function handleBoost(car) {
  if (millis() < player1BoostEndTime || millis() < player2BoostEndTime) {
    car.speed = BOOST_SPEED;
  } else {
    if (car === player1) {
      player1BoostAvailable = true;
    } else if (car === player2) {
      player2BoostAvailable = true;
    }
  }
}

function displayLapTime() {
  if (lapStartTime) {
    let timeElapsed = millis() - lapStartTime;
    let formattedTime = formatTime(timeElapsed);
    textSize(20);
    textAlign(RIGHT);
    fill(255);
    text("Lap Time: " + formattedTime, width - 20, 30);
  }
}

function checkCollisions(car) {
  // Check collisions with track boundaries
  if (track.checkCollision(car)) {
    car.speed *= 0.5; // Reduce speed upon collision
    collisionSound.play();
  }
}

function checkLapCompletion(car) {
  if (car.checkpointIndex === NUM_CHECKPOINTS) {
    lapEndTime = millis();
    let lapTime = lapEndTime - lapStartTime;
    // Check if lap time is within limit
    if (lapTime <= LAP_TIME_LIMIT) {
      // Award score based on lap time
      let score = map(lapTime, 0, LAP_TIME_LIMIT, 100, 0);
      console.log("Score: " + score);
    } else {
      console.log("Lap Time Exceeded Limit");
    }
    // Reset lap start time and checkpoint index
    lapStartTime = millis();
    car.checkpointIndex = 0;
  }
}

function formatTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;
  return nf(minutes, 2) + ":" + nf(seconds, 2) + "." + nf(milliseconds, 3);
}

class Car {
  constructor(color, x, y, controlType) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.angle = 0;
    this.controlType = controlType;
    this.checkpointIndex = 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, 20, 40);
    pop();
  }

  update() {
    // Update car position based on speed and angle
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    // Boundaries check
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    // Keyboard input
    if (this.controlType === "arrowKeys") {
      if (keyIsDown(UP_ARROW)) {
        this.speed += 0.1;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.speed -= 0.1;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.angle -= 0.05;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.angle += 0.05;
      }
    } else if (this.controlType === "ADKeys") {
      if (keyIsDown(65)) { // A key
        this.angle -= 0.05;
      }
      if (keyIsDown(68)) { // D key
        this.angle += 0.05;
      }
    }
  }
}

class Track {
  constructor() {
    // Define track boundaries
    this.boundaries = [];
    // Outer boundaries
    this.boundaries.push({ x: 100, y: 100 });
    this.boundaries.push({ x: 700, y: 100 });
    this.boundaries.push({ x: 700, y: 500 });
    this.boundaries.push({ x: 100, y: 500 });
    this.boundaries.push({ x: 100, y: 100 });
    // Inner track boundaries
    this.boundaries.push({ x: 200, y: 200 });
    this.boundaries.push({ x: 600, y: 200 });
    this.boundaries.push({ x: 600, y: 400 });
    this.boundaries.push({ x: 200, y: 400 });
    this.boundaries.push({ x: 200, y: 200 });
  }

  display() {
    // Display track layout
    strokeWeight(4);
    stroke(0);
    noFill();
    beginShape();
    for (let boundary of this.boundaries) {
      vertex(boundary.x, boundary.y);
    }
    endShape(CLOSE);
  }

  checkCollision(car) {
    // Check collisions with track boundaries
    let carPos = createVector(car.x, car.y);
    for (let i = 0; i < this.boundaries.length - 1; i++) {
      let boundary1 = createVector(this.boundaries[i].x, this.boundaries[i].y);
      let boundary2 = createVector(this.boundaries[i + 1].x, this.boundaries[i + 1].y);
      let distance = distToSegment(carPos, boundary1, boundary2);
      if (distance < 20) {
        return true;
      }
    }
    return false;
  }
}

// Function to calculate distance between a point and a line segment
function distToSegment(p, v, w) {
  let l2 = sq(v.x - w.x) + sq(v.y - w.y);
  if (l2 === 0) return dist(p.x, p.y, v.x, v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = constrain(t, 0, 1);
  let projection = createVector(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y));
  return dist(p.x, p.y, projection.x, projection.y);
}

