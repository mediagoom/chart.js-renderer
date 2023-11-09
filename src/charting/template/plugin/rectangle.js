const trace = require('../../../core/trace')('XBRL:CHARTING:RECTANGLE', true);


function rec(chart, opt_orig, option)
{
    const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
        scales: { x, y },
    } = chart;

    trace.dbg(top, right, bottom, left, width, height);

    let opt = Object.assign(JSON.parse(JSON.stringify(opt_orig)), option);

    let h = 1;
    let w = width -1;

    let xv = left + 1;
    let yv = 0;

    if(opt.reverse)
    {
        h = height - 1;
        w = 1;
        xv = 0;
        yv = top + 1;
    }

    if(opt.startY !== 0)
        yv = y.getPixelForValue(opt.startY);

    if(opt.startX !== 0)
        xv = x.getPixelForValue(opt.startX);

    //if(options.endY !== 0)

    trace.info('rectangle', yv, opt.startY, xv, opt.startX);

    ctx.lineWidth = opt.line;
    if(undefined !== opt.dash)
        ctx.setLineDash(opt.dash);
    // draw line
    ctx.strokeStyle = opt.color;
    // x0 : starting point on the horizontal line. Left to Right
    // y0 : starting point on the vertical line. Top to Bottom
    // x1 : length point on the horizontal line. Left to Right
    // y1 : length point on the vertical line. Top to Bottom
    ctx.strokeRect(xv, yv
        , w
        , h);

    if(opt.label)
    {
        let xl = xv;
        let yl = yv;

        if('top-right' 
         === opt.labelStyle)
        {
            xl += 2;
            yl -= 7;
        }

        if('bottom-right' === opt.labelStyle)
        {
            xl += 2;
            yl += 10 + h;
        }

        ctx.fillText(opt.label, xl, yl);
    }

}

const rectangle = {
    id: 'rectangle'
    //beforeDraw(chart, args, options) {
    , afterDraw(chart, args, options) {
        

        const ctx = chart.ctx;

        ctx.save();

        let opt = JSON.parse(JSON.stringify(this.defaults));

        if(Array.isArray(options))
            for(const option of options)
                rec(chart, opt, option);
        else
            rec(chart, opt, options);


        ctx.restore();
    }
    ,defaults: {
        color: 'Gray'
        , startX : 0
        , startY : 0
        , endX  : 0
        , endY : 0
        , line: .5
        , dash : undefined
        , labelStyle : 'top-right'
    }
};

module.exports = rectangle;