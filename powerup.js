export class PowerUp {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
    }
  
    display() {
      push();
      translate(this.x, this.y);
  
     
      fill(255, 255, 0); // Change color to red
      noStroke();
      rect(0, 0, this.size, this.size * 1.2, 18); // Adjust size based on carSize
      ellipse(this.size / 2, 10, this.size * 1.07, this.size * 0.92); // Adjust position and size of ellipse
  
     
      fill(0);
      quad(
        this.size * 0.14,
      );
      ellipse(
        this.size / 2,
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