//code made by utilising flower example from class as well as the noise example from class and the tone.js synth example from garrit schaap
let slider;

function setup(){
    createCanvas(innerWidth, innerHeight);
    frameRate(30);
    synth = new Tone.Synth().toDestination(); 
    //logic for slider was made using p5js.org, 1 OCT, https://p5js.org/reference/p5/createSlider/
    slider = createSlider(0, 7, 0);
    slider.position(innerWidth/2, innerHeight/4+300);
    slider.size(100);
}

//flower variables
let size = 15;
const divider = 10;
const numRows = 100;
const numCols = 100;
let flowerSize = 1;
let amount = 1;
let gap = 120;

//sound variables
// i got help with coding the following notes array from my friend Ene Sherifi 30 SEP.
let synth;
let notes = ["D3","F#3","A3","C#4","D4","F#4","A4","C#5"];
let previousNote = -1;

let counter = 0;

//-------floweeerr-------

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
    
    noStroke();
    // the following code to control the note was used with the help of chatGPT, 1 OCT, https://chatgpt.com/s/t_68dd6c22c54081918e5c92277a7af214 
    let currentNote = slider.value();
    background(0,0,40);
    if (currentNote !== previousNote) {
        if (previousNote !== -1) synth.triggerRelease(); 
        synth.triggerAttack(notes[currentNote]); 
        previousNote = currentNote;
    }
    
    for (let y = 0; y < numRows; y++){
        for (let x= 0; x < numCols; x++){
            const value = noise(x / divider, y / divider, counter) * currentNote *2;
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
        
    }}