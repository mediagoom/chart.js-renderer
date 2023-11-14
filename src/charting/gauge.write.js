
function cartesianDistance(x, y, x1, y1)
{
    const a = Math.abs(x - x1);
    const b = Math.abs(y - y1);

    const hypotenuseSquared = Math.pow(a, 2) + Math.pow(b, 2);
    const hypotenuse = Math.sqrt(hypotenuseSquared);
    return hypotenuse;
}

function missingSide(hypotenuse, knownSide) {
    // Calculate the square of the missing side
    const missingSideSquared = Math.pow(hypotenuse, 2) - Math.pow(knownSide, 2);

    // Check if the value inside the square root is non-negative
    if (missingSideSquared >= 0) {
        // Compute the missing side
        const missingSide = Math.sqrt(missingSideSquared);
        return missingSide;
    } else {
        throw new Error( 'Invalid input. The known side is larger than the hypotenuse.');
    }
}



function _arcWrite(ctx, x, y, x1, y1, centerX, centerY, text, reversed, radius, dbg){

 
    //Calculate the slope, 
    const m = (y1 - y) / (x1 - x);
    const b = y - (m * x);
    const y2 = centerY;

    const x2 = (y2 - b) / m;

    const orizontal_distance = cartesianDistance(x, y, x1, y1) / 2; //Math.abs(x1 - x) / 2;
    let vertical_distance = radius - missingSide(radius, orizontal_distance);
    let textHeight = parseInt(ctx.font, 10) + 1;
    const t_mesure = ctx.measureText(text);
    let x_text = orizontal_distance - t_mesure.width / 2;

    if(y < centerY){
        vertical_distance = vertical_distance * -1;
        textHeight = textHeight * -1;
    }

    
    if(dbg){

        ctx.fillText(`x',y': ${Math.round(x1 * 100) / 100}, ${Math.round(y1 * 100) / 100}`, x1,y1 );
        ctx.fillText(`x,y: ${Math.round(x * 100) / 100}, ${Math.round(y * 100) / 100}`, x,y );
        ctx.fillText(`x'',y'': ${Math.round(x2 * 100) / 100}, ${Math.round(y2 * 100) / 100}`, x2,y2 );

        const draw_triangle = false;

        if(draw_triangle){
        // Draw 
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x, y);
            ctx.lineTo(x, y2);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
    }
    
    
    const radians = Math.atan2(  y2 - y, x2 - x);

    // Calculate the midpoint of the hypotenuse
    let midX = x1; //centerX; //+ (x2 - centerX) / 2;
    let midY = y1; //centerY; //+ (y - centerY) / 2;

    //if(Math.abs(centerX - x1) > Math.abs(centerX - x))
    if( x < x1)
    {
        midX = x;
        midY = y;
    }


    // Save the current canvas state
    ctx.save();
    // Translate the canvas origin to the midpoint
    ctx.translate(midX, midY);
    // Rotate the canvas to match the angle of the hypotenuse
    if(reversed)
        ctx.rotate(radians - Math.PI);
    else
        ctx.rotate(radians);

    ctx.fillText(text, x_text, vertical_distance + textHeight);
    
    // Restore the canvas state to its original
    ctx.restore();
    

   

}


function arcWrite(context, centerX, centerY, radius,  angle_start,  angle_end, color, text, dbg)
{

    if(undefined === dbg)
        dbg = false;

    if(dbg){
        //Draw the arch. This should be removed later
        context.beginPath();
        context.arc(centerX, centerY, radius,  angle_start,  angle_end);
        context.lineTo(centerX, centerY);
        context.fillStyle = color;
        context.fill();

        context.fillStyle = 'black';
    }

    //compute x,y 
    const x = centerX + radius  * Math.cos(angle_end);
    const y = centerY + radius  * Math.sin(angle_end);
    

    //compute x1,y1 
    const x1 = centerX + radius  * Math.cos(angle_start);
    const y1 = centerY + radius  * Math.sin(angle_start);
    
    
    
    if(y < y1 && y < centerY)
        _arcWrite(context, x, y, x1, y1, centerX, centerY, text, true, radius, dbg);
    else if(y > y1 && y < centerY)
        _arcWrite(context, x1, y1, x, y, centerX, centerY, text, false, radius, dbg);

}

module.exports = arcWrite
