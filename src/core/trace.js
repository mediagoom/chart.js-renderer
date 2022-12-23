const debug = require('debug');


/**
 * Drop in replace for debug logging to stdout instead of stderr
 * @param {String} name the name to reference the trace in output and filtering 
 * @param {boolean} composed if undefined or false return a function to trace otherwise a composed object with dbg, verbose, 
 * info, error, console and warning functions
 * @returns 
 */
function tracer(name, composed)
{
    
    if(undefined === composed)
        composed = false;

    //console.log('init tracer', name, composed);

    const log = debug(name);
    // set this namespace to log via console.log
    log.log = console.log.bind(console);

    if(!composed)
        return log;

    const trace = {
        dbg : log.extend('debug')
        , verbose : log.extend('verbose')
        , info : log.extend('info')
        , console : log.extend('console')
        , warning : log.extend('warning')
        , error : log.extend('error')
    };

    return trace;
}

module.exports = tracer;