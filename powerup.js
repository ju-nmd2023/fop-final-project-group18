export class PowerUp {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(255, 255, 0);
    noStroke();
    rect(0, 0, this.size, this.size * 1.2, 18);
    ellipse(this.size / 2, 10, this.size * 1.07, this.size * 0.92);
    pop();
  }

  fall() {
<<<<<<< Updated upstream
    this.y += 8; // Assuming powerupspeed is the speed at which power-ups fall
=======
    this.y += 8; 
>>>>>>> Stashed changes
    if (this.y > height) {
      this.y = random(-500, 0); 
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

// För att få bort powerupen efter att man tagit den använd
