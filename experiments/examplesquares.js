// code compiled of example squares from class as well as the 4th vectors example from CC Complexity slides
let position;
let velocity;
let acceleration;

function setup(){
    createCanvas(innerWidth,innerHeight);
    position = createVector(100,100);
    velocity = createVector(5,8);
}

const size = 100;
const layers = 10;

//helps get random value to not draw perfect squares
function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

function evilEye(){
    fill(0,0,128);
    noStroke();
    ellipse(position.x, position.y, 250);
    fill(255,255,255);
    ellipse(position.x, position.y, 150);
    fill(174,198,207);
    ellipse(position.x, position.y, 120);
    fill(0,0,0);
    ellipse(position.x, position.y, 50);
}

//makes it draw some layers but not all
function drawLayers(x,y,size,layers){

    noFill();
    stroke(255, 105, 180);
    strokeWeight(1.5);

    const variance = size / 100;

    for(let i = 0; i < layers; i++){
        const s = (size / layers) * i;
        const half = s / 2;
      
        beginShape();
        vertex(getRandomValue(x - half, variance), getRandomValue( y - half, variance));
        vertex( getRandomValue(x + half, variance), getRandomValue(y - half, variance));
        vertex( getRandomValue(x + half, variance), getRandomValue( y + half, variance));
        vertex( getRandomValue(x - half, variance), getRandomValue(y + half, variance));
        endShape(CLOSE);

        //full isze of og square devided by layer multiplied by i to ensure squares are not on top of eachother
    }
}

function draw(){
    background(170, 51, 106);

    evilEye();

    if (position.x > width || position.x < 0) {
        velocity.x *= -1;
      }
      if (position.y > height || position.y < 0) {
        velocity.y *= -1;
      }

    for (let y = 0; y < 10; y++){
        for (let x = 0; x < 10; x ++){

        drawLayers( size / 2 + x * size, size / 2 + y * size, size , layers);  
     }
    }
    const mouse = createVector(mouseX, mouseY);
    acceleration = p5.Vector.sub(mouse, position);
    acceleration.normalize();
    acceleration.mult(0.5);
    // Add the speed to the ball
    velocity.add(acceleration);
    velocity.limit(10);
    position.add(velocity);

}
