const assert = require('assert');
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
                'master' : { 'rectangle' : {} }
            }
        }
    }
    , 'balanceX' : {
        options : {
            plugins: {
                'master' : { 'balanceX' : {} }
            }
        }
    }, 'percentage' : {
        options : {
            scales : {
                y : {
                    ticks : { callback : function(val){

                        const v = Math.round(val * 10000) / 100;

                        return `[${v}%]`;
                    }
                    }
                }
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
        if(template.kind !== undefined)
        {
            const opt = template.options;

            const obj = {options : {
                plugins: {
                    'master' : {  }
                }
            }};

            obj.options.plugins.master[template.kind] = opt;

            return obj;
        }

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