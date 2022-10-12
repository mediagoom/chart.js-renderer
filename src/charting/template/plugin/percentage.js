
const p = {
    id: 'percentage'
    , afterDataLimits(chart, args, options)
    {
        let id = 'y';
        let annualized = 1;

        if(options !== undefined){
            if(options.axe !== undefined)
                id = options.axe;

            if(options.annualized !== undefined)
                annualized = Number.parseInt(options.annualized);

        }

        if(args.scale.id === id)
            args.scale.options.ticks.callback = function(val)
            {
                const v = Math.round(val * 10000) / 100;

                if(annualized !== 1)
                {
                    const k = Math.pow((1 + val), annualized) - 1;

                    return `${v}% [${Math.round(k * 10000) / 100}%]`;
                }

                return `${v}%`;
            };
    }
};

module.exports = p;