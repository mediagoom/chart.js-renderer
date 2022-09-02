const { assert } = require('chai');
const merge = require('../../core/jsonmerge');


const simple = {

    horizontal : {
        options: {
            indexAxis: 'y'
        }
    }
};


function resolve_template(template)
{
    if(typeof template === 'string')
    {
        if(simple[template] !== undefined)
            return simple[template];
    }

    assert(false, 'cannot resolve template');
}


function apply_template(object, template)
{
    const t = resolve_template(template);
    return merge(object, t);
}


function apply_templates(object, templates)
{

    let result = JSON.parse(JSON.stringify(object));

    if(Array.isArray(templates))
    {
        for(const template in templates)
        {
            result = apply_template(result, template);
        }
    }
    else
    {
        
        result = apply_template(result, templates);
    }

    return result;
}


module.exports = apply_templates;