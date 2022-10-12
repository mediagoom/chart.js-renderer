const p = {
    id: 'balanceX'
    , afterDataLimits(chart, args/*, options*/)
    {
        let min = chart.scales.x.min;
        let max = chart.scales.x.max;

        if(args.scale.min !== min)
            return;


        if(min < 0 && max > 0)
        {
            let M = Math.abs(min);

            if(M < max)
                M = max;

            args.scale.min = M * -1;
            args.scale.max = M;
        }
    }
};

module.exports = p;