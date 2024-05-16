let traficspeed = 8;
let spacing = 550;
let cars = [];
let carsright = [];
let carSize = (40, 70);
let numcars = 2;
let middleWidth = innerWidth / 2;
export class RedCar {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  display() {
    push();
    translate(this.x, this.y);
    //https://chat.openai.com/share/3f7a06dc-9c3a-4822-bb75-869fe8f0619e
    // Red car
    fill(255, 0, 0); // Change color to red
    noStroke();
    rect(0, 0, this.size, this.size * 1.2, 18); // Adjust size based on carSize
    ellipse(this.size / 2, 10, this.size * 1.07, this.size * 0.92); // Adjust position and size of ellipse

    // Car windows
    fill(0);
    quad(
      this.size * 0.14,
      this.size * 0.7,
      this.size * 0.86,
      this.size * 0.7,
      this.size * 0.82,
      this.size * 0.92,
      this.size * 0.18,
      this.size * 0.92
    );
    ellipse(
      this.size / 2,
      this.size * 0.92,
      this.size * 0.61,
      this.size * 0.15
    );
    quad(
      this.size * 0.1,
      this.size * 0.35,
      this.size * 0.9,
      this.size * 0.35,
      this.size * 0.86,
      this.size * 0.61,
      this.size * 0.14,
      this.size * 0.61
    );
    ellipse(
      this.size / 2,
      this.size * 0.35,
      this.size * 0.75,
      this.size * 0.19
    );
    triangle(
      this.size * 0.07,
      this.size * 0.5,
      this.size * 0.14,
      this.size * 0.87,
      this.size * 0.07,
      this.size * 0.87
    );
    triangle(
      this.size * 0.93,
      this.size * 0.5,
      this.size * 0.93,
      this.size * 0.87,
      this.size * 0.86,
      this.size * 0.87
    );
    pop();
  }

  fall() {
    // Move the car down
    this.y += traficspeed;

    // Check if the car reaches the bottom of the canvas
    if (this.y > height) {
      // Set a new random position for the car, ensuring it doesn't overlap with existing cars
      let overlapping = true;
      while (overlapping) {
        // Generate new position
        let newX = random(middleWidth - 200, middleWidth + 200); // Update the range as needed
        let newY = random(-500, 0) - spacing; // Add spacing between cars

        //<== These 18 lines of code was made with help of chatgpt https://chat.openai.com/share/bf3dcc8b-6732-448b-a59c-be2d667625ef ==>
        // Check if the new position overlaps with any existing car position
        overlapping = false;
        for (let i = 0; i < cars.length; i++) {
          if (dist(newX, newY, cars[i].x, cars[i].y) < carSize * 2) {
            overlapping = true;
            break;
          }
        }
        for (let i = 0; i < carsright.length; i++) {
          if (dist(newX, newY, carsright[i].x, carsright[i].y) < carSize * 2) {
            overlapping = true;
            break;
          }
        }

        // If the new position doesn't overlap, set it as the car's position
        if (!overlapping) {
          this.x = newX;
          this.y = newY;
        }
      }
    }
  }
}
