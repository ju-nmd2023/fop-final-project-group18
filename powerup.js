export class PowerUp {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 194, 1);
    rect(this.x, this.y, this.PowerUpWidth, this.PowerUpHeight);
    triangle(
      this.x,
      this.y + 30,
      this.x + 50,
      this.y + 30,
      this.x + 25,
      this.y + 53
    );
    triangle(this.x, this.y, this.x + 50, this.y, this.x + 25, this.y - 10);
    fill(215, 144, 1);
    rect(
      this.x + 5,
      this.y + 5,
      this.PowerUpWidth - 10,
      this.PowerUpHeight - 10
    );
    triangle(
      this.x + 5,
      this.y + 25,
      this.x + 45,
      this.y + 25,
      this.x + 25,
      this.y + 43
    );
    triangle(
      this.x + 5,
      this.y + 5,
      this.x + 45,
      this.y + 5,
      this.x + 25,
      this.y - 3
    );
    pop();
  }

  fall() {
    this.y += 8; // Assuming powerupspeed is the speed at which power-ups fall
    if (this.y > height) {
      this.y = random(-500, 0); // Reset the power-up's position if it goes off the screen
    }
  }

  // Method to check collision with player car
  checkCollision(playerCarX, playerCarY, playerCarWidth, playerCarHeight) {
    // Check if the power-up's position overlaps with the player car's position
    if (
      this.x + this.size > playerCarX &&
      this.x < playerCarX + playerCarWidth &&
      this.y + this.size * 1.2 > playerCarY &&
      this.y < playerCarY + playerCarHeight
    ) {
      return true; // Collision detected
    }
    return false; // No collision
  }
}
