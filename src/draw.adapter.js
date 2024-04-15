const render = require('../bin/lib').render.default;



module.exports = function (renderer, options, width, height){

    const mock = {
        
        Chart : function(el, opts)
        {
            const ctx = el.getContext('2d');

            renderer(ctx, opts, width, height);
        }
    }


    return render(mock, options, width, height);

}