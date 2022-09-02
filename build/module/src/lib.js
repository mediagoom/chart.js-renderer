import { SvgCanvas,
         Rect2D,
         SvgCanvas2DGradient } from 'red-agate-svg-canvas/modules';

// tslint:disable-next-line:function-constructor
const g = Function('return this')();

export default function(ChartJs, opts, width, height)
{
    if(undefined === width)
            width = 800;
    if(undefined === height)
            height = 400;

    // SvgCanvas has a "CanvasRenderingContext2D"-compatible interface.
    const ctx = new SvgCanvas();

    // SvgCanvas lacks the canvas property.
    ctx.canvas = {
        width,
        height,
        style: {
            width: `${width}px`,
            height: `${height}400px`,
        },
    };

    //TypeError: ctx.resetTransform is not a function
    ctx.resetTransform = function(){}

    // SvgCanvas does not have font glyph information,
    // so manually set the ratio of (font height / font width).
    ctx.fontHeightRatio = 2;

    // Chart.js needs a "HTMLCanvasElement"-like interface that has "getContext()" method.
    // "getContext()" should returns a "CanvasRenderingContext2D"-compatible interface.
    const el = { getContext: () => ctx };

    if(undefined === opts.options)
        opts.options = {};

    // If "devicePixelRatio" is not set, Chart.js get the devicePixelRatio from "window" object.
    // node.js environment has no window object.
    opts.options.devicePixelRatio = 1;

    // Disable animations.
    opts.options.animation = false;
    opts.options.events = [];
    opts.options.responsive = false;

    // Chart.js needs the "CanvasGradient" in the global scope.
    const savedGradient = g.CanvasGradient;
    g.CanvasGradient = SvgCanvas2DGradient;
    try {
        const chart = new ChartJs.Chart(el, opts);
    } finally {
        if (savedGradient) {
            g.CanvasGradient = savedGradient;
        }
    }

    // Render as SVG.
    const svgString = ctx.render(new Rect2D(0, 0 , width, height), 'px');
    
    return svgString;
}

