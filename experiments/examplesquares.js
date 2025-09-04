function setup(){
    createCanvas(innerWidth,innerHeight);
}

const size = 100;
const layers = 10;


//helps get random value to not draw perfect squares
function getRandomValue(pos, variance){
    return pos + random(-variance, variance);
}

//makes it draw some layers but not all
function drawLayers(x,y,size,layers){

    noFill();
    stroke(255, 105, 180);
    strokeWeight(1.5);

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
    background(170, 51, 106);
    for (let y = 0; y < 10; y++){
        for (let x = 0; x < 10; x ++){

        drawLayers( size / 2 + x * size, size / 2 + y * size, size , layers);  
     }
    }


    noLoop();
}
