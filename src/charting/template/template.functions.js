const trace = require('../../core/trace')('XBRL:CHARTING:TEMPLATE:FUNCTION', true);


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
};