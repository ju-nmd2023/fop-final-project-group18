export class FallingLine {
    constructor() {
      this.x = width / 2 - 5;
      this.y = -(random(10, 20) * 20);
      this.speed = random(1, 5);
    }
  
    update() {
      this.y += this.speed;
      if (this.y > height) {
        this.y = -(random(10, 20) * 20);
      }
    }
  
    display() {
      fill(255);
      rect(this.x, this.y, 10, 80);
    }
  }