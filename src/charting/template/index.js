const merge = require('../../core/jsonmerge');
const plugins = require('./plugin');


const simple = {
    none : {}
    , horizontal : {
        options: {
            indexAxis: 'y'
        }
    }
    , 'zero-line' : {
        options : {
            plugins: {
                'rectangle' : {}
            }
        }
    }
    , 'balanceX' : {
        options : {
            plugins: {
                'balanceX' : true
            }
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

    if(typeof template === 'object')
    {
        return template;
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
        for(const template of templates)
        {
            result = apply_template(result, template);
        }
    }
    else
    {
        
        result = apply_template(result, templates);
    }

    if(result.plugins === undefined)
        result.plugins = [];

    result.plugins = result.plugins.concat(plugins);

    return result;
}


module.exports = apply_templates;