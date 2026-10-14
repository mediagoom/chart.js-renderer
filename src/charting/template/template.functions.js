const trace = require('../../core/trace')('XBRL:CHARTING:TEMPLATE:FUNCTION', true);

const aggregate = require('../aggregate.functions');

function min_max(data, args)
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

        return {min, max};
}

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
        
        const mm = min_max(data, args);
        const min = mm.min;
        const max = mm.max;

        const half = min + ((max - min) / 2);
        const ff = ((max - min) * .382);

        let color = 'rgba(70, 101, 145, 0.4)';
        if(args !== undefined && undefined !== args.color)
                color = args.color;

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

    , 'max' : function(data, args)
    {
        const mm = min_max(data, args);
        const max = mm.max;
        const min = mm.min;

        const perc = (max - min) / max;

        let level = { l5 : .95, l10 : .90, l15: .85, l20 : .80, l25 : .75};

        if(perc < .25)
            level = { l5 : .975, l10 : .95, l15: .925, l20 : .90, l25 : .875};

        if(perc < .10)
            level = { l5 : .99, l10 : .98, l15: .97, l20 : .96, l25 : .95};

        const max5  = max * level.l5;
        const max10 = max * level.l10;
        const max15 = max * level.l15;
        const max20 = max * level.l20;
        const max25 = max * level.l25;

        /*let color5  = '#31cb5a'
        let color10 = '#d6f7df'
        let color15 = '#c3dfec';
        //let color20 = '#F1DE40'
        let color20 = '#ee7f81'
        let color25 = '#ed3b3b'
        */

        let color5  = '#c3dfec'
        let color10 = '#ee7f81'
        let color15 = '#ee686a';
        let color20 = '#ed5252'
        let color25 = '#ed3b3b'


        
        const dash = undefined;
        const line = .5;


        return [{ 'kind' : 'rectangle' 
            ,'options' : [
                
                  {'startY' : max20, 'endY' : max25, color : color25, dash, fill: true, line, label : `-${Math.round((1-level.l25)*100)}% ${Math.round(max25)}` , labelStyle : 'bottom-right'}
                , {'startY' : max15, 'endY' : max20, color : color20, dash, fill: true, line, label : `-${Math.round((1-level.l20)*100)}%  ${Math.round(max20)}`, labelStyle : 'bottom-right'}
                , {'startY' : max10, 'endY' : max15, color : color15, dash, fill: true, line, label : `-${Math.round((1-level.l15)*100)}%  ${Math.round(max15)}`, labelStyle : 'bottom-right'}
                , {'startY' : max5, 'endY' : max10, color : color10, dash, fill: true, line, label : `-${Math.round((1-level.l10)*100)}%  ${Math.round(max10)}`, labelStyle : 'bottom-right'}
                , {'startY' : max, 'endY' : max5, color : color5, dash, fill: true, line, label : `-${Math.round((1-level.l5)*100)}% ${Math.round(max5)}`, labelStyle : 'bottom-right'}
                
                
                
                
                
                
            ]
            
        }
        
        ];


    }
};