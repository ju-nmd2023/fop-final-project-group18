export class PlayerCar {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  displayCar() {
    push();
    translate(this.x, this.y);

    // Player ones car
    fill(this.color);
    noStroke();
    rect(0, 0, 70, 115, 10);
    ellipse(35, 10, 75, 65);

    // Car windows
    fill(0);
    quad(10, 80, 60, 80, 57, 100, 13, 100);
    ellipse(35, 100, 43, 10);
    quad(5, 25, 65, 25, 60, 55, 10, 55);
    ellipse(35, 25, 60, 15);
    triangle(3, 40, 10, 75, 3, 75);
    triangle(68, 40, 68, 75, 60, 75);
    pop();
  }
}
