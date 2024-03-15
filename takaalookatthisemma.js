//Border class
class Borders{
    //border constructor
    constructor(){
    this.x = 0;
    this.y = 0;
    this.h = 600;
    this.w = 150;
    this.col = "#03fca1";
    }
    //draw function
    draw(){
        stroke(0);
        strokeWeight(3);
        fill(this.col);
        rect(this.x, this.y, this.w, this.h);
    }
  }

  let canv = {
    w: 600,
    h: 600,
    col: "#5c615e"
};

//driving car
let myCar = {
    x: 400,
    sp: 10,
    y: 400,
    w: 40,
    h: 55,
    draw: function () {
      noStroke();
      fill(0, 0, 200);
      rect(this.x, this.y, this.w, this.h);
      stroke("white");
      line(this.x + 10, this.y, this.x + 10, this.y + 55);
      line(this.x + 30, this.y, this.x + 30, this.y + 55);
      fill(0, 0, 255);
      stroke(0);
      rect(this.x + 5, this.y + 10, this.w - 10, this.h - 20);
    },
    //this is move function
    move: function () {
      //while right arrow keyispreesed move the car right and car is not of the road
      if (keyIsPressed && keyCode === 39 && this.x + this.w !== width - 150) {
        this.x += this.sp;
      }
      ////while right arrow keyispreesed move the car to the left and car is not out of the road
      if (keyIsPressed && keyCode === 37 && this.x !== 150) {
        this.x -= this.sp;
      }
    },
  };
  //enemies car1
  let car1 = {
    x: 170,
    sp: 8,
    y: -50,
    w: 40,
    h: 55,
    col: [255, 0, 0],
    draw: function () {
      fill(this.col[0], this.col[1], this.col[2]);
      rect(this.x, this.y, this.w, this.h);
    },
    move: function () {
      //move the car1
      this.y += this.sp;
      //if the car1 is out of the canvas bring it back to the top
      if (this.y > height) {
        //car1 y value initialize to -50;
        this.y = -50;
      }
    },
  };
  //enemies car2
  let car2 = {
    x: 330,
    sp: 8,
    y: -250,
    w: 40,
    h: 55,
    col: [255, 0, 0],
    draw: function () {
      fill(this.col[0], this.col[1], this.col[2]);
      rect(this.x, this.y, this.w, this.h);
    },
    move: function () {
      //move the car2
      this.y += this.sp;
      //if the car2 is out of the canvas bring it back to the top
      if (this.y > height) {
        this.y = -50;
      }
    },
  };
  
  let car3 = {
    x: 330,
    sp: 8,
    y: -550,
    w: 40,
    h: 55,
    col: [255, 0, 0],
    draw: function () {
      fill(this.col[0], this.col[1], this.col[2]);
      rect(this.x, this.y, this.w, this.h);
    },
    move: function () {
      //move the car3
      this.y += this.sp;
      //if the car3 is out of the canvas bring it back to the top
      if (this.y > height) {
        this.y = -50;
      }
    },
  };
  

  //broken yellow lines
let _line = {
    x: 300,
    y:0,
    x2: 300,
    y2: 50,
    sp: 5,
    col: "#dbd109",
    draw: function(){
        strokeWeight(5);
        stroke("#dbd109");
        line(this.x, this.y, this.x2, this.y2);
    },
    //moving function
    move: function(){
      this.y+=this.sp;
      this.y2+=this.sp;
      if(this.y>height){
        this.y=-50;
        this.y2=100;
      }
    }
  };
  //second broken lines
  let _line1 = {
    x: 300,
    y: 300,
    x2: 300,
    y2: 350,
    sp: 5,
    col: "#dbd109",
    draw: function(){
        strokeWeight(5);
        stroke("#dbd109");
        line(this.x, this.y, this.x2, this.y2);
    },
    //moving the second line
    move: function(){
      this.y+=this.sp;
      this.y2+=this.sp;
      if(this.y>height){
        this.y=-50;
        this.y2=100;
      }
    }
  };

  let txt = {
    _text: "GAME OVER!!!",
    _textScore: "Your score is: ",
    color: 255,
    stroke: 255,
    size: 38,
    size1: 24,
    x: 150,
    y: 300,
    x1: 200,
    y1: 350,
  };
  
  let bordL;
  let bordR;
  let test = 0;
  let scores = [];
  let score = 0;
  let i = 0;
 
  function setup() {
    //storing the scores to use it later for //levelup function
    mode=0;
    for(let i=0; i<100;i++){
      test += 10;
      scores[i] = test;
   }
   
    //creating instance of Border class
    bordL = new Borders();
    bordR = new Borders();
    bordR.x = 450;
    createCanvas(canv.w, canv.h);
    background(canv.col);
  }
   
  function draw() {
    //it will display the text until player hits //the ENTER
    if(mode===0){
      fill(txt.color);
      textSize(txt.size);
      text("Press the enter to start", txt.x, txt.y);
    }
    if(mode===1){
    background(canv.col);
    moveLines();
    moveTrees();
    design();
    moveCars();
    levelUp();
    fill(0);
    rect(0,0,600,40);
    displayScore();
    }
  }
  //design function, drawing the objects, by //calling their draw methods
  function design(){
    bordL.draw();
    bordR.draw();
    trees.drawE();
    myCar.draw();
    trees.drawR();
    trees2.drawE();
    trees2.drawR();
  }
  //car moving function
  function moveCars(){
  
      //if the car3 in initial position randomize //the appearance by changing x value
    if(car1.y<0){
      car1.x = random(155,410);
      //color of cars randomized
      car1.col[1] = random(255);
      car1.col[2] = random(255);
      car1.col[3] = random(255);
    }
    
    if(car1.y===-50 || car2.y===-50 || car3.y===-50){
        score++;
    }
      //if the car3 in initial position randomize //the appearance by changing x value
    if(car2.y<0){
      car2.x = random(155,410);
      car2.col[1] = random(255);
      car2.col[2] = random(255);
      car2.col[3] = random(255);
      //console.log("debuging");
    }
    //if the car3 in initial position randomize //the appearance by changing x value
    if(car3.y<0){
      car3.x = random(155,410);
      car3.col[1] = random(255);
      car3.col[2] = random(255);
      car3.col[3] = random(255);
      //console.log("debuging");
    }
    //moving and drawing the cars, by using cars //methods
    myCar.move();
    car1.draw();
    car1.move();
    car2.draw();
    car2.move();
    car3.draw();
    car3.move();
    //assigning colideCar function for car1, //passing arguement
    let collide = collideCar(myCar.x, myCar.y, myCar.w, myCar.h, car1.x, car1.y, car1.w, car1.h);
    //if colide returns true calls the stop function
    if(collide){
     
      stop();
    }
    //assigning colideCar function for car2, //passing arguement
    let collide2 = collideCar(myCar.x, myCar.y, myCar.w, myCar.h, car2.x, car2.y, car2.w, car2.h);
    //if colide returns true calls the stop function
    if(collide2){
      //plays the crash song
      songs[1].play();
      stop();
    }
    //assigning colideCar function for car3, //passing arguement
      let collide3 = collideCar(myCar.x, myCar.y, myCar.w, myCar.h, car3.x, car3.y, car3.w, car3.h);
    //if colide returns true calls the stop function
    if(collide3){
      //plays the crash song
      songs[1].play();
      stop();
    }
  }
  
  function collideCar(x, y, w, h, x2, y2, w2, h2) {
    //2d
    //add in a thing to detect rectMode CENTER
    if (x + w >= x2 &&    // r1 right edge past r2 left
        x <= x2 + w2 &&    // r1 left edge past r2 right
        y + h >= y2 &&    // r1 top edge past r2 bottom
        y <= y2 + h2) {    // r1 bottom edge past r2 top
          return true;
    }
    return false;
  }
  //moves the lines
  function moveLines(){
    _line.draw();
    _line.move();
    _line1.draw();
    _line1.move();
  }
  //stops the game and displays the Game over
  //and the final score
  function stop(){
      background(0);
      stroke(txt.stroke);
      fill(txt.color);
      textSize(txt.size);
      text(txt._text, txt.x, txt.y);
      textSize(txt.size1);
      noStroke();
      text(`${txt._textScore}${score}`, txt.x1, txt.y1);
       noLoop();
       songs[0].stop();
  }
  //trees moving function
  function moveTrees(){
    trees.moveE();
    trees.moveR();
    trees2.moveE();
    trees2.moveR();
  }
  
  function displayScore(){
      noStroke();
      fill(txt.color);
      textSize(16);
    //displaying the score
      text(`YOUR SCORE: ${score}`, 50, 20);
    //displaying the speed 
      fill(txt.color);
      textSize(16);
      text(`YOUR SPEED: ${car1.sp}0 km/h `, 400, 20);
  }
  
  
  //this function for increase the speed 
  function levelUp(){
    //score is equal to the number in array speed //up
      if(score === scores[i])
      {
        
        console.log("speeding");
        //increment every objects speed by 1
        car1.sp++;
        car2.sp++;
        car3.sp++;
        trees.esp++;
        trees.rsp++;
        trees2.esp++;
        trees2.rsp++;
        _line.sp++;
        _line1.sp++;
        i++;
        score++;
      }
  }
  
  function keyPressed(){
      if(keyCode===ENTER && mode===0){
          mode=1;
  
      }
  }

  let trees = {
    ex: 92,
    ey: 20,
    ew: 30,
    eh: 75,
    esp: 5,
   //left Tree head drawing
    drawE: function (){
      noStroke();
        fill("#1e704a");
        ellipse(this.ex, this.ey, this.ew, this.eh);
    },
  //moving the trees head
    moveE: function(){
      this.ey+=this.esp;
      if(this.ey>height){
        this.ey = -100;
        this.ry = -70;
      }
    },
    rx: 85,
    ry: 50,
    rw: 15,
    rh: 50,
    rsp: 5,
   //left tree trunk
    drawR: function(){
      noStroke();
      fill("#3d1d10");
      rect(this.rx, this.ry, this.rw, this.rh);
    },
      moveR: function(){
      this.ry+=this.rsp;
    }
};

let trees2 = {
    ex: 488,
    ey: 220,
    ew: 30,
    eh: 75,
    esp: 5,
  //right tree head
    drawE: function (){
      noStroke();
        fill("#1e704a");
        ellipse(this.ex, this.ey, this.ew, this.eh);
    },
  //right tree head is moving
    moveE: function(){
      this.ey+=this.esp;
      if(this.ey>height){
        this.ey = -100;
        this.ry = -70;
      }
    },
    rx: 481,
    ry: 250,
    rw: 15,
    rh: 50,
    rsp: 5,
  //right tree trunk 
    drawR: function(){
      noStroke();
      fill("#3d1d10");
      rect(this.rx, this.ry, this.rw, this.rh);
    },//right tree trunk is moving
      moveR: function(){
      this.ry+=this.rsp;
    }
};  
  
