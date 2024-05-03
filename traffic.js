// traffic.js
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

    // Red car
    fill(255, 0, 0); // Change color to red
    noStroke();
    rect(0, 0, this.size, this.size * 1.6, 10); // Adjust size based on carSize
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
    this.y += traficspeed; // Assuming traficspeed is the speed at which traffic cars fall
    if (this.y > height) {
      this.y = random(-500, 0); // Reset the car's position if it goes off the screen
    }
  }
}
