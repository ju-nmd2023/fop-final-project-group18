export function resetGame() {
  // Reset player car position
  singlePlayer.x = innerWidth / 2;
  singlePlayer.y = 550;

  // Reset traffic cars on the left side
  for (let i = 0; i < numcars; i++) {
    let x = random(130, 300);
    let y = random(-500, 0) - i * spacing;
    cars[i].x = x;
    cars[i].y = y;
    cars[i].scored = false; // Reset scored flag
  }

  // Reset traffic cars on the right side
  for (let i = 0; i < numcars; i++) {
    let x = random(300, 532);
    let y = random(-500, 0) - i * spacing;
    carsright[i].x = x;
    carsright[i].y = y;
    carsright[i].scored = false; // Reset scored flag
  }

  // Reset powerups
  for (let i = 0; i < numpowerup; i++) {
    let x = random(130, 532);
    let y = random(-500, 0);
    powerup[i].x = x;
    powerup[i].y = y;
  }

  // Reset score and powerup state
  score = 0;
  powerupActive = false;
  powerupTime = 0;
}
window.resetGame = resetGame;
