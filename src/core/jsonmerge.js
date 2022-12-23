const assert = require('assert');

function assign(target, source, objs)
{
    /*
    let recursive = false;
    objs.forEach(element => {
        if(element === source)
            recursive = true;
    });

    if(recursive)
        throw new Error('recursive object found');

    objs.push(source);
    */

    Object.keys(source).forEach( property => {

        const val = source[property];
        const t   = target[property];

        if(val !== null && typeof val === 'object' && typeof t === 'object')
        {
            assign(t, val, objs);
        }
        else
        {
            target[property] = val;
        }

    });

    
}

function merge(target, source)
{
    const a = typeof target;
    const b = typeof source;

    assert(a === 'object' && b === 'object');

    const ret = {};

    const objs = [];

    assign(ret, target, objs);
    assign(ret, source, objs);

    return ret;

}

module.exports = merge;