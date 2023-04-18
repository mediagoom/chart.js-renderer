const trace = require('../../../core/trace')('XBRL:CHARTING:RECTANGLE', true);

const rectangle = {
    id: 'rectangle'
    //beforeDraw(chart, args, options) {
    , afterDraw(chart, args, options) {
        const {
            ctx,
            chartArea: { top, right, bottom, left, width, height },
            scales: { x, y },
        } = chart;

        trace.dbg(top, right, bottom, left, width, height);

        ctx.save();

        let opt = JSON.parse(JSON.stringify(this.defaults));

        Object.assign(opt, options);

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

        // draw line
        ctx.strokeStyle = opt.color;
        // x0 : starting point on the horizontal line. Left to Right
        // y0 : starting point on the vertical line. Top to Bottom
        // x1 : length point on the horizontal line. Left to Right
        // y1 : length point on the vertical line. Top to Bottom
        ctx.strokeRect(xv, yv
            , w
            , h);

        ctx.restore();
    }
    ,defaults: {
        color: 'Gray'
        , startX : 0
        , startY : 0
        , endX  : 0
        , endY : 0
    }
};

module.exports = rectangle;