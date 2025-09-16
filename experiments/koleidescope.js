let position;
let velocity;
let acceleration;

function setup() {
  createCanvas(innerWidth, innerHeight);
  position = createVector(100, 100);
  velocity = createVector(5, 8);
  background(255);

  colorMode(HSB);
}

function draw() {
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
}