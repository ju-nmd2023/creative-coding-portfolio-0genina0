//the following code is from garrits flow field 03 example
//for theflow field
class Agent {
    constructor(x, y, maxSpeed, maxForce) {
      this.position = createVector(x, y);
      this.lastPosition = createVector(x, y);
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, 0);
      this.maxSpeed = maxSpeed;
      this.maxForce = maxForce;
    }
  
    follow(desiredDirection) {
      desiredDirection = desiredDirection.copy();
      desiredDirection.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desiredDirection, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.lastPosition = this.position.copy();
  
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    checkBorders() {
      if (this.position.x < 0) {
        this.position.x = innerWidth;
        this.lastPosition.x = innerWidth;
      } else if (this.position.x > innerWidth) {
        this.position.x = 0;
        this.lastPosition.x = 0;
      }
      if (this.position.y < 0) {
        this.position.y = innerHeight;
        this.lastPosition.y = innerHeight;
      } else if (this.position.y > innerHeight) {
        this.position.y = 0;
        this.lastPosition.y = 0;
      }
    }
  
    draw() {
      push();
      stroke(255, random(10, 50),20, 80);
      strokeWeight(random (1,10));
      line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
      pop();
    }
  }

function setup(){
    createCanvas(innerWidth, innerHeight);
    field = generateField();
    generateAgents();
}

//drawing gate
function drawGate() {
   // Fence dimensions
   let fenceHeight = height / 2;    
   let fenceY = height - fenceHeight;  

   // fence frame 
   stroke(30, 120, 30); 
   strokeWeight(10);
   noFill();
   rect(0, fenceY, width, fenceHeight);
 
   //lines for gate color
   stroke(50, 180, 50); 
   strokeWeight(2);
   let spacing = 30;
 
   // Diagonal lines
   for (let x = -fenceHeight; x <= width; x += spacing) {
     line(x, height, x + fenceHeight, fenceY);
   }
  }

  //drawing tree trunk
function treeTrunk(){
  fill(139,69,19);
  triangle(
    width, height,         
    width - 100, height,   
    width, 300    
  );
  rect(560, 0, 600);
}

//flow field function
function generateField() {
    let field = [];
    noiseSeed(Math.random() * 100);
    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const value = noise(x / flowdivider, y / flowdivider) * Math.PI * 2;
        field[x].push(p5.Vector.fromAngle(value));
      }
    }
    return field;
  }

  //flow field agent function
    
  function generateAgents() {
    for (let i = 0; i < 200; i++) {
      let agent = new Agent(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        4,
        0.1
      );
      agents.push(agent);
    }
  }

//variable decloration for the flow field
const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const flowdivider = 2;
let field;
let agents = [];

// variable decloration for the noise 
const size = 8;
const noisedivider = 10;
const numRows = 100;
const numCols = 100;

let counter = 0; 

function draw(){
    background(173, 200, 230);
    noStroke();
    //for loop for noise
    for (let y = 0; y < numRows; y++){
        for (let x= 0; x < numCols; x++){
            const value = noise(x / noisedivider, y / noisedivider, counter) * size;
            fill(255, 255 ,255, 80);
            rect(size / 2 + x * size, size / 2 + y * size, value);
            fill(255, 255 ,255, 50);
            ellipse(size / 2 + x * size, size / 2 + y * size, value);
        }
    }

     counter += 0.08;

     treeTrunk();
     drawGate();

    //for loop for flow field
    for (let agent of agents) {
      const x = Math.floor(agent.position.x / fieldSize);
      const y = Math.floor(agent.position.y / fieldSize);

      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
      agent.update();
      agent.checkBorders();
      agent.draw();
    }

}