const trace = require('../../core/trace')('XBRL:CHARTING:TEMPLATE:FUNCTION', true);

const aggregate = require('../aggregate.functions');

module.exports = {
    'recession' : function(/*data, args*/)
    {
    }

    , 'rectangle-reverse' : function(data, args)
    {

        let back = 1;
        let label = '';
        let percentage = false;

        if(args !== undefined)
            if(typeof args === 'string')
                back = Number.parseFloat(args);
            else if(typeof args === 'object')
            {
                if(undefined !== args.back)
                    back = Number.parseFloat(args.back);

                if(undefined !== args.label)
                    label = args.label;

                if(undefined !== args.percentage)
                    percentage = args.percentage;
            }

        const xs = data[data.length - 1].series.data;

        if(xs.length < back)
            back = xs.length;

        trace.info('rectangle-reverse', xs.length, back, JSON.stringify(args));

        //const val = xs[xs.length - back].y;
        const point = xs[xs.length - back];
        const val = point.y;

        trace.info('rectangle-reverse', xs.length, back, val, JSON.stringify(args));

        const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        const mm = month[point.x.getMonth()];

        let value = val.toString();

        if(percentage)
            value = `${Math.round( val * 10000 ) / 100}%`;

        return [{ 'kind' : 'rectangle' 
            ,'options' : { 'startX' : val, 'reverse' : true}
        }, {
            'options' : {'scales' : { 'x' : { 'title' : { 'display' : true, 'text' : `${label} ${mm} ${value}` }}}
            }
        }
        ];

    }
    , 'fibonacci' : function(data, args)
    {
        const point = aggregate.min_max(data, args);

        let min = Infinity;
        let max = 0;

        for(let idx = 0; idx < point.length; idx++)
        {
            const y = Number.parseFloat(point[idx].y);

            if(y < min)
                min = y;

            if(y > max)
                max = y;
        }

        const half = min + ((max - min) / 2);
        const ff = ((max - min) * .382);

        const color = 'rgba(70, 101, 145, 0.4)';
        const dash = [4, 8];
        const line = 1.5;


        return [{ 'kind' : 'rectangle' 
            ,'options' : [
                {'startY' : max, color, dash, line, label : Math.round(max), labelStyle : 'bottom-right'}
                , {'startY' : max - ff, color, dash, line, label: Math.round(max - ff)}
                , {'startY': half, color, dash, line , label: Math.round(half)}
                , {'startY' : min + ff, color, dash, line, label: Math.round(min + ff), labelStyle : 'bottom-right'}
                , {'startY' : min, color, dash, line, label: Math.round(min)}
                
                
                
                
            ]
            
        }
        
        ];


    }
};