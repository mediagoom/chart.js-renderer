const assert = require('assert');
//const template = require('./template');





const colors = [
    
    'rgba(33,150,243, 0.2)' 
    , 'rgba(113, 233, 89, 0.2)'
    , 'rgba(51,63,79, 0.8)'
    
    //, 'rgba( 25, 78,  0,1)'
    //, 'rgba( 91, 20,  0,1)'

    //, 'rgba(170,205,153,1)'
    //, 'rgba(237,190,176,1)'
    //*, 'rgba( 74,141,105,1)'
    //, 'rgba(186, 98,115,1)'
    , 'rgba(117,173, 91,1)'
    //, 'rgba(200,126,105,1)'
    //, 'rgba(  8, 90, 46,1)'
    //, 'rgba(118, 11, 32,1)'
    , 'rgba( 43,110, 10,1)'
    , 'rgba(127, 38, 12,1)'
    , 'rgba(  0, 64, 30,1)'
    , 'rgba( 84,  0, 17,1)'


    , 'rgb(255, 153, 0, 0.8)'
    , 'rgba(125,168,145,1)'
    , 'rgba(221,164,175,1)'
];

const borders = [];

for(const color of colors)
{
    // eslint-disable-next-line no-useless-escape
    const rx = /(rgba\(\s*\d+,\s*\d+,\s*\d+\s*),\s*[\d\.]+\s*\)/;
    const border = color.replace(rx, '$1, 1)');

    borders.push(border);

}

const default_palette = {colors, borders};

const palettes = {};

function get_palette(obj)
{
    if(undefined === obj)
        return default_palette;

    if(typeof obj === 'object')
        return obj;

    const p = palettes[obj];

    if(undefined === p)
        throw new Error(`Invalid palette ${obj.toString()}`);

    return p;
}


function roll(arr, idx)
{
    const x = idx % arr.length;

    assert(x < arr.length);

    return arr[x];
}


module.exports = function(data_definition)
{
    let chart = { arcs : [] };
    let idx = 0;

    let target = undefined;
    let value = undefined;
    let previous = undefined;
    let base = undefined;

    const palette = get_palette(data_definition.palette);

   

    for(let j = 0; j < data_definition.series.length; j++)
    {
        const serie = data_definition.series[j];
        const val = serie.data[serie.data.length - 1].y;
        const role  = serie.chart.gauge;

        if(role === 'target')
        {
            target = val;
            continue;
        }

        if(role === 'value')
        {
            value = val;
            continue;
        }

        if(val > target)
            break;

        assert(target !== undefined);

        if(previous !== undefined)
        {
            assert(undefined !== base);

            const l = (target - base) * 2;
            const end = Math.round((val - base) / l * 100) / 100;

            chart.arcs.push({end, 'label' : previous.role, 'color' : previous.color});

            if(undefined === chart.value)
                chart.value = (value - base) / l;

            //if(idx === (serie.data.length - 1)) //last one
        }

        if(undefined === base)
            base = val;

        previous = { val, role, 'color' : roll(palette.colors, idx++) };

    }

    //previous = { "val" : 1 }

    const ends = [];

    for(let j = data_definition.series.length - 1; j >=0; j--)
    {
        const serie = data_definition.series[j];
        const val = serie.data[serie.data.length - 1].y;
        const role  = serie.chart.gauge;

        if(val < target)
            break;

        const l = (target - base) * 2;
        const end = Math.round((val - base) / l * 100) / 100;

        ends.push({"end" : end, 'label' : role, 'color' : roll(palette.colors, j - 2)});


    }

    for(let j = ends.length - 1; j >=0; j--)
    {
        chart.arcs.push(ends[j]);
    }
    
    
    chart.border = .005;

    return chart;

};