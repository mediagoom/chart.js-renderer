const assert = require('assert');



function draw(ctx, options, width, height)
{
const upperSpace = 30;

// Define gauge parameters
let centerX = width / 2;
let centerY = height - (upperSpace * .3);
let radius  = width / 2 - (3 * upperSpace);



// Define the current speed level (0.00 to 1)
const currentSpeedLevel = options.value; // Change this value to set the current speed level

assert(currentSpeedLevel >= 0 && currentSpeedLevel <= 1, 'Invalid value');

// Calculate the angle for the needle
const angle = ((1 + currentSpeedLevel) * Math.PI);

// Draw the gauge
ctx.clearRect(0, 0, width, height);

const border = (undefined === options.border)?.005:options.border;

assert(options.arcs && options.arcs.length > 0, 'Invalid arcs');

let start = 0;

const arcs = options.arcs;

for(let j = 0; j < arcs.length ; j++){
    
    const arc = arcs[j];

    if(undefined !== arc.start)
    {
       assert(arc.start >= start && arc.start <= 1, `Invalid start ${j}`); 
       start = arc.start;
    }

    const end = arc.end; 
    assert(end >= start && end <= 1, `Invalid end ${j}`); 

    arc.start = start;
    start = end;
}

for(let j = arcs.length - 1; j >= 0 ; j--){
    const arc = arcs[j];
    const col = arc.color;

    const start = arc.start

    const end = arc.end; 
    
    // Draw the gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius,  border + ( 1 + start) * Math.PI,  ( 1 + end) * Math.PI - border);
    ctx.lineTo(centerX, centerY);
    ctx.fillStyle = col;
    ctx.fill();
    
    
}

// Draw the inner circle to create the "hole" in the donut
ctx.beginPath();
ctx.arc(centerX, centerY, radius * .5, Math.PI, Math.PI * 2);
ctx.fillStyle = 'white';
ctx.fill();


// Draw the gauge border
ctx.strokeStyle = '#ccc';
ctx.lineWidth = 2;
ctx.stroke();

// Draw the speed labels
const outside = 25;
//let angleInRadians = (Math.PI / 2);
ctx.font = '12px Arial';
ctx.fillStyle = '#000';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';


const mov = Math.floor(arcs.length / 2); 

for (let i = arcs.length - 1; i >= 0; i--) {
    const arc = arcs[i];

    const offset = Math.abs(i - mov);
    const labelAngle = border + ( 1 + arc.end) * Math.PI;
    const x = centerX + (radius + (outside * offset)) * Math.cos(labelAngle);
    const y = centerY + (radius + outside) * Math.sin(labelAngle);
    const txt = arc.label.split('-');
    for(let j = 0; j < txt.length; j++)
        ctx.fillText(txt[j], x, y + j * 25);
}


// Draw the needle
ctx.beginPath();
ctx.moveTo(centerX, centerY);
const needleLength = radius - 10;
const needleX = centerX + needleLength * Math.cos(angle);
const needleY = centerY + needleLength * Math.sin(angle);
ctx.lineTo(needleX, needleY);
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.stroke();

// Draw a circle at the base of the needle
ctx.beginPath();
ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();
}

module.exports = { draw }