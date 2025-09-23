//code made by utilising flower example from class as well as the noise example from class
function setup(){
    createCanvas(innerWidth, innerHeight);
    frameRate(20);
}


const size = 15;
const divider = 10;
const numRows = 100;
const numCols = 100;

let flowerSize = 1;
let amount = 1;
let gap = 120;


let counter = 0;

function flower(){
    noStroke();
    let petals =8;

    for (let y = 0; y < petals; y++){
        for (let x = 0; x < petals; x++){

            fill(255, 138, 170);
            ellipse(x, y, 70, 5);

            fill(230, 162,185);
            rect(x, y, 14, 3);

            fill(255,238,140);
            rect(x, y, 5,2);

            fill(255,238,140);
            ellipse(x, y, 20,2);


            rotate(PI / 5);

        
        }
    }
}

function draw(){
    background(0,0, 40);
    noStroke();

    for (let y = 0; y < numRows; y++){
        for (let x= 0; x < numCols; x++){
            const value = noise(x / divider, y / divider, counter) * size;
            fill(51,130,235);
            rect(size / 4 + x * size, size / 4 + y * size, value);
            fill(0, 0, 125);
            ellipse(size / 2+ x * size, size / 2 + y * size, value);
        }
    }

    counter += 0.1;

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
