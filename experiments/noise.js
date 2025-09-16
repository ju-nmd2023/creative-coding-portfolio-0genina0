//code made by utilising flower example from class as well as the noise example from class
let position;
let velocity;
let acceleration;

function setup(){
    createCanvas(innerWidth, innerHeight);
    frameRate(30);
    position = createVector(100,100);
    velocity = createVector(5,8);
    background(0,0, 40);
}


const size = 15;
const divider = 10;
const numRows = 100;
const numCols = 100;

let counter = 0;

function pad (){

}

function draw(){
    noStroke();
    push();
    fill(4, random(255), 250);
    ellipse(position.x, position.y, random(100));
    ellipse(width - position.x, height - position.y, random(100));
    pop();
  
    push();
    fill(50, random(255), 150);
    ellipse(position.x, height - position.y, random(100));
    ellipse(width - position.x, position.y, random(100));
    pop();

    if (position.x > width || position.x < 0) {
        velocity.x *= -10;
      }
    
      if (position.y > height || position.y < 0) {
        velocity.y *= -100;
      }

      const mouse = createVector(mouseX, mouseY);
      acceleration = p5.Vector.sub(mouse, position);
      acceleration.normalize();
      acceleration.mult(0.2);
    
      velocity.add(acceleration);
      velocity.limit(10);
      position.add(velocity); 

    for (let y = 0; y < numRows; y++){
        for (let x= 0; x < numCols; x++){
            const value = noise(x / divider, y / divider, counter) * size;
            fill(255);
            ellipse(size / 6 + x * size, size / 6 + y * size, value);
        }
    }

    counter += 0.1;
}