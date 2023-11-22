const assert = require('assert');
const { startOfWeekYearWithOptions } = require('date-fns/fp');
const arcWrite = require('./gauge.write')

function symmetricGrowth(x) {
    // Scale the sine function to fit between 0 and 1
    const scaledSine = 0.5 * Math.sin(Math.PI * x) + 0.5;
    return scaledSine;
}

function symmetricDecrease(x) {
    // Scale the sine function to fit between 0 and 1
    const scaledSine = 0.5 * Math.sin(Math.PI * (x - 0.5)) + 0.5;
    return scaledSine;
}

function draw(ctx, options, width, height)
{

const font_size = (undefined === options.fontSize)?12:options.fontSize;
const font = (undefined === options.font)?`${font_size}px Arial`:options.font;
const needle_color = (undefined === options.needle)?'black':options.needle;

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
const outside = 15;
//let angleInRadians = (Math.PI / 2);
ctx.font = font;
ctx.fillStyle = '#000';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const mov = Math.floor(arcs.length / 2); 

for (let i = arcs.length - 1; i >= 0; i--) {
    const arc = arcs[i];

    const offset = Math.abs(i - mov);
    const middle_angle = (arc.start + (arc.end - arc.start) / 2);
    const labelAngle = /*border +*/ ( 1 + middle_angle) * Math.PI;
    const x = centerX + (radius /*+ (outside   * offset)*/)  * Math.cos(labelAngle);
    const y = centerY + (radius /*+ outside*/) * Math.sin(labelAngle);
    const txt = arc.label.split('-');
    for(let j = 0; j < txt.length; j++)
    {
        const text = txt[j];
        const sign = (middle_angle < .5)?-1:1;
        const distancer =  (middle_angle - .5 ) * outside;
        const y_distancer = symmetricGrowth(middle_angle) * outside;
        const t_mesure = (ctx.measureText(text).width / 2  ) * sign;
        ctx.fillText(text, x + t_mesure + distancer, y + (j * font_size ) - y_distancer);
    }
        
    
    //arcWrite(ctx, centerX, centerY, radius, (1 +arc.start) * Math.PI, (1 + arc.end), arc.color, arc.label, true);
}


// Draw the needle
ctx.beginPath();
ctx.moveTo(centerX, centerY);
const needleLength = radius - 10;
const needleX = centerX + needleLength * Math.cos(angle);
const needleY = centerY + needleLength * Math.sin(angle);
ctx.lineTo(needleX, needleY);
ctx.strokeStyle = needle_color;
ctx.lineWidth = 2;
ctx.stroke();

// Draw a circle at the base of the needle
ctx.beginPath();
ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
ctx.fillStyle = needle_color;
ctx.fill();
}

module.exports = { draw, arcWrite }