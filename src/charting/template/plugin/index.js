const assert = require('assert');
const balanceX = require('./balanceX');
const rectangle = require('./rectangle');
const percentage = require('./percentage');

const internal_plugin = { balanceX, rectangle, percentage};

function call_plugins(event, chart, args, options)
{
    for(const internal in options)
    {
        const plugin = internal_plugin[internal];

        assert(undefined !== plugin, `invalid internal plugin [${internal}]`);

        const opt = options[internal];

        if(undefined !== plugin[event])
            plugin[event].call(plugin, chart, args, opt);
    }
}

const master = 
{
    id: 'master'
    ,beforeDraw(chart, args, options) {
        call_plugins('beforeDraw', chart, args, options);
    }
    , afterDraw(chart, args, options) {
          
        call_plugins('afterDraw', chart, args, options);
    }
    , afterDataLimits(chart, args, options) {
          
        call_plugins('afterDataLimits', chart, args, options);
    }
};

module.exports = [master];