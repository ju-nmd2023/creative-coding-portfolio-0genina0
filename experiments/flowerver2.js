function setup(){
    createCanvas(innerWidth,innerHeight);
    background(235,0,120);
    frameRate(10);
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
  
}