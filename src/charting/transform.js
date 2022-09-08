const template = require('./template');



const default_dataset = {
    fill: false
    ,label: 'p'
    ,data: []
    ,    backgroundColor: 'rgba(51,63,79, 0.8)'
    ,    borderColor: 'rgba(51,63,79, 1)'
    ,    borderWidth: 1
};

const Y1 = 'y-axis-1';

const TIME = 'timeseries';

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

function format_data(arr, kind)
{
    if(TIME === kind)
        return arr;

    const r = [];

    for(let x of arr)
        r.push(x.y);

    return r;
}

module.exports = function(data_definition)
{
    let chart = { type: 'line'
        , data: {
            datasets : []
        }
        , options : { scales : {}
            , elements: {
                'line': {
                    'tension': 0
                }
                ,'point': {
                    'radius': 1
                }
            }

            , responsive: true
            , maintainAspectRatio: false
        
            ,plugins: {
                rectangle : false, balanceX : false
                , tooltip: {
                    mode: 'interpolate'
                    , intersect: false
                }
                , crosshair: {
                    line: {
                        color: '#161916'        // crosshair line color
                        ,width: 1             // crosshair line width
                        ,dashPattern: [2, 2]   // crosshair line dash pattern
                    }
                    ,sync: {
                        enabled: false            // enable trace line syncing with other charts
                        ,group: 1                 // chart group
                        ,suppressTooltips: false   // suppress tooltips when showing a synced tracer
                    }
                    ,zoom: {
                        enabled: false                                      // enable zooming
                        ,zoomboxBackgroundColor: 'rgba(66,133,244,0.2)'     // background color of zoom box 
                        ,zoomboxBorderColor: '#48F'                         // border color of zoom box
                        ,zoomButtonText: 'Reset Zoom'                       // reset zoom button text
                        ,zoomButtonClass: 'reset-zoom',                      // reset zoom button class
                    }
                    ,callbacks: {
                        beforeZoom: function(/*start, end*/) {                  // called before zoom, return false to prevent zoom
                            return true;
                        }
                        ,afterZoom: function(/*start, end*/) {                   // called after zoom
                        }
                    }
                }
            }
        }
    };


    let stacked = false;
    let max = data_definition.max;
    let min = data_definition.min;

    if(data_definition.type)
    {
        let type = data_definition.type;
        if('stacked' === type){
            stacked = 'single';
            type = 'line';
        }

        if('stackedbar' === type){
            //stacked = 'single';
            stacked = true;
            type = 'bar';
        }

        chart.type = type;
    }


    const kind = data_definition.kind;

    const y = {
        'ticks': {
                        
        }
        , stacked
        , max
        , min 
    };

    chart.options.scales['y'] = y;

    let x = undefined;

    if(TIME === kind)
    {
        let unit = null;

        if(undefined !== data_definition.unit
            && /(day)|(week)|(month)|(quarter)|(year)/.test(data_definition.unit))
            unit = data_definition.unit;

        x = {
            'type': 'time'
            ,'time': {
                'unit': unit
                ,'displayFormats': {
                    'millisecond': 'h:mm:ss.SSS a'
                    ,'second': 'h:mm:ss a'
                    ,'minute': 'h:mm a'
                    ,'hour': 'hA'
                    ,'day': 'MMM d yyyy'
                    ,'week': 'll'
                    ,'month': 'MMM yyyy'
                    ,'quarter': '[Q]Q - yyyy'
                    ,'year': 'yyyy'
                }
            }
        };

    }

    if(kind === 'label')
    {
        const labels = [];

        for( let y of data_definition.series[0].data)
            labels.push(y.x);

        chart.data.labels = labels;
    }

    chart.options.scales['x'] = x;
        
    let idx = 0;
    for(const serie of data_definition.series)
    {
        const ds = JSON.parse(JSON.stringify(default_dataset));

        if('right' === serie.position)
        {
            if(undefined === chart.options.scales[Y1])
            {
                chart.options.scales[Y1] = {position: 'right', grid : { display : false }};
            }

            ds.yAxisID = Y1;
        }

            
        ds.backgroundColor = colors[idx];
        ds.borderColor = borders[idx++];

        if(serie.chart)
        {
            const conf = serie.chart;

            if(conf.charttype && conf.charttype !== chart.type)
            {
                ds.type = conf.charttype;
            }

            for(const prop in conf)
            {
                if(prop === 'charttype')
                    continue;

                ds[prop] = conf[prop];
            }
        }

        ds.data = format_data(serie.data, kind);
        chart.data.datasets.push(ds);
    }
    //}

    if(data_definition.template)
    {
        chart = template(chart, data_definition.template);
    }

    return chart;

};