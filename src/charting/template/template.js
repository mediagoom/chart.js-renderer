

const assert = require('assert');
const template_function = require('./template.functions');
//const trace = require('../core/trace')('XBRL:CHARTING:AGGREGATE', true);



module.exports = class {

    constructor(options, id)
    {

        this.options = options;
        this.id = id;

    }

    get kind(){ return 'timeseries';}
    /**
     * @param {*} target_id If it is a string is the id of the timeseries key. If it is a function is called with the full nav.
     * @param {*} start_date 
     * @param {*} end_date 
     * @param {*} modifier can be a string to identify a known modifier, a function or an object.
     * @returns 
     */
    async retrieve(target_id, start_date, end_date, modifier, args)
    {
        assert(target_id, 'target id not provided');

        assert(typeof target_id === 'object');

        const func = target_id.function;

        const r = template_function[func](args, target_id.args);

        if(undefined !== modifier)
        {

            assert(false, 'modifier not supported on templates');
        }

        return r;
        
    }

};