
export class Line {
  constructor(startY) {
    this.x = width / 2; // Center horizontally
    this.y = startY;    // Initial y position
    this.length = 100;
    this.speed = 10;    // Increased speed for faster falling
  }

  update() {
    this.y += this.speed;
    // If the line moves out of the canvas, reset its position to maintain spacing
    if (this.y - this.length > height) {
      this.y = this.y - (height + 40 * numLines);
    }
  }

  display() {
    stroke(255);
    strokeWeight(7); // Increased thickness
    line(this.x, this.y, this.x, this.y + this.length);
  }
}
    // constructor() {
    //   this.x = width / 2 - 5;
    //   this.y = -(random(10, 20) * 20);
    //   this.speed = random(1, 5);
    // }
  
    // update() {
    //   this.y += this.speed;
    //   if (this.y > height) {
    //     this.y = -(random(10, 20) * 20);
    //   }
    // }
  
    // display() {
    //   fill(255);
    //   rect(this.x, this.y, 10, 80);
    // }
  