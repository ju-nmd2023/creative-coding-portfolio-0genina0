//the following code is from garrits flow field 03 example
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
      stroke(0, random(10, 100), 0, 40);
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

  //size of rocks variables
  const size = 90;
  const cols = 10;   
  const rows = 10; 
  const gap = 15;
  
  function setup() {
    createCanvas(innerWidth, innerHeight);
    background(74, 74, 74);
    field = generateField();
    generateAgents();
    drawRockGrid();
  }

  //----------ROCKS----------
 
  //drawing of rocks
  function drawRockGrid(){
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const centerX = size / 2 + x * (size + gap);
        const centerY = size / 2 + y * (size + gap);
        drawRock(centerX, centerY, size);
      }
    }
  }
  
  //makes it draw some layers but not all
  function drawRock(x,y,size,layers){
  noStroke();
  fill(55, 55, 55);

  const variance = size / 9;
  const half = size / 2;

      beginShape();
      vertex(getRandomValue(x - half, variance), getRandomValue( y - half, variance));
      vertex( getRandomValue(x + half, variance), getRandomValue(y - half, variance));
      vertex( getRandomValue(x + half, variance), getRandomValue( y + half, variance));
      vertex( getRandomValue(x - half, variance), getRandomValue(y + half, variance));
      endShape(CLOSE);
}

  function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

//-----FLOW FIELD-------
  
  function generateField() {
    let field = [];
    noiseSeed(Math.random() * 50);
    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const value = noise(x / divider, y / divider) * Math.PI * 10;
        field[x].push(p5.Vector.fromAngle(value));
      }
    }
    return field;
  }
  
  function generateAgents() {
    for (let i = 0; i < 50; i++) {
      let agent = new Agent(
        Math.random() * innerWidth,
        height,
        4,
        0.1
      );
      agents.push(agent);
    }
  }
  
  const fieldSize = 50;
  const maxCols = Math.ceil(innerWidth / fieldSize);
  const maxRows = Math.ceil(innerHeight / fieldSize);
  const divider = 10;
  let field;
  let agents = [];
  
  function draw() {
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