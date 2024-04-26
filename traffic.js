class RedCar {
    constructor(x, y, side) {
      this.x = x;
      this.y = y;
      this.side = side;
    }
  
    fall() {
      this.y += traficspeed;
      if (this.y > height) {
        this.y = random(-500, 0);
      }
    }
  
    display() {
      rectMode(CENTER);
      fill(255, 0, 0);
      rect(this.x, this.y, this.side, this.side);
    }
  }
  
  export { RedCar };
  