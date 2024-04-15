const assert = require('assert');

function assign(target, source, objs)
{

    assert(typeof target === 'object', `invalid type of target ${typeof target} - ${target}`);
    assert(typeof source === 'object' && source !== null, `invalid type of target ${typeof source} - ${source}`);
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
        else if(val !== null && typeof val === 'object' && typeof t !== 'object')
        {
            if(Array.isArray(val))
                target[property] = [];
            else
                target[property] = {};
            assign(target[property], val, objs);
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

    //const ret = JSON.parse(JSON.stringify(target));
    const ret = {};

    const objs = [];

    assign(ret, target, objs);
    assign(ret, source, objs);

    return ret;

}

module.exports = merge;