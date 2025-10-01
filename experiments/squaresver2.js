// code compiled of example squares from class 

function setup(){
    createCanvas(innerWidth,innerHeight);
    position = createVector(100,100);
}

const size = 150;
const layers = 10;

//helps get random value to not draw perfect squares
function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

//makes it draw some layers but not all
function drawLayers(x,y,size,layers){

    noFill();
    stroke(random(0,200), random(100, 165), random(50, 255));
    strokeWeight(random(0,3));

    const variance = size / 20;

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
    background(0);

    for (let y = 0; y < 10; y++){
        for (let x = 0; x < 10; x ++){
        const centerX = size / 2 + x * size;
        const centerY = size / 2 + y *size;

        drawLayers(centerX, centerY, size, layers);  
     }
    }

    noLoop();

}






