let position;
let velocity;
let acceleration;

function setup(){
    createCanvas(innerWidth,innerHeight);
    background(235,0,120);
    frameRate(10);
    position = createVector(100,100);
    velocity = createVector(5,8);
}

//chess pawn frawing
function pawn(){
    push();
    fill('pink');
    noStroke();
  
    // head
    ellipse(200, 150, 40, 40);
  
    // neck
    rect(185, 170, 30, 15);
  
    // body
    ellipse(200, 220, 70, 90);
  
    // base
    rect(165, 265, 70, 20);

  pop();
}

//flower variables
let flowerSize = 20;
let amount = 5;
let gap = 120;

function flower(){
    noStroke();
    let petals = 22;

    for (let y = 0; y < petals; y++){
        for (let x = 0; x < petals; x++){
            fill(255, random(20,255), 255, 25);
            ellipse(x, y, 15);

            rect(x, y, 55);
            
            rotate(PI / 1);
        }
    }
}

function draw(){
    pawn();

    if (position.x > width || position.x < 0) {
        velocity.x *= -1;
      }
      if (position.y > height || position.y < 0) {
        velocity.y *= -1;
      }

    let y = (height - flowerSize * amount - gap * (amount -1)) / 2;
    for (let i = 0; i < amount; i++){
        let x = (width - flowerSize * amount - gap * (amount - 1)) / 2;
        
        for ( let j = 0; j < amount; j++){
            push();
            translate( x, y);
            flower();
            pop();
            x += flowerSize + gap;
        }
        y += flowerSize + gap;
        
    }

    const mouse = createVector(mouseX, mouseY);
    acceleration = p5.Vector.sub(mouse, position);
    acceleration.normalize();
    acceleration.mult(0.5);
    // Add the speed to the pawn
    velocity.add(acceleration);
    velocity.limit(10);
    position.add(velocity);
  
}