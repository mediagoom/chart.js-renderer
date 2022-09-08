const p = {
        id: 'balanceX',
        /*beforeDraw(chart, args, options) {

            let min = chart.scales.x.min;
            let max = chart.scales.x.max;


            if(min < 0 && max > 0)
            {
                let M = Math.abs(min);

                if(M < max)
                    M = max;

                chart.scales.x.min = M * -1;
                chart.scales.x.max = M;
            }
        }*/
        afterDataLimits(chart, args, options)
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
      }

module.exports = p;