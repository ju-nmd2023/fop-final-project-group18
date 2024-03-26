let cars = []; // Array för att lagra kvadraterna
let carszise = 50; // Storleken på kvadraterna
let numcars = 3; // Antal kvadrater
let traficspeed = 6; // Fallhastighet för kvadraterna

function setup() {
  createCanvas(500, 500); // Skapa en canvas
  for (let i = 0; i < numcars; i++) {
    let x = random(100, 400); // Slumpmässig x-koordinat mellan 100 och 400
    let y = random(-500, 0); // Slumpmässig y-koordinat ovanför canvasen
    cars.push(new Square(x, y, carszise)); // Skapa en kvadrat och lägg till den i arrayen
  }
}

function draw() {
  background(220); // Rensa canvas
  for (let i = 0; i < cars.length; i++) {
    cars[i].fall(); // Uppdatera positionen och rita varje kvadrat
    cars[i].display();
  }
}

// Objekt för kvadrat
class Square {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  // Metod för att uppdatera positionen av kvadraten
  fall() {
    this.y += traficspeed; // Öka y-koordinaten för att få kvadraten att falla nedåt
    if (this.y > height) {
      this.y = random(-500, 0); // Återställ y-koordinaten om kvadraten går utanför canvasen
    }
  }

  // Metod för att rita kvadraten
  display() {
    rectMode(CENTER);
    fill(255, 0, 0); // Röd färg för kvadraten
    rect(this.x, this.y, this.side, this.side);
  }
}

                      