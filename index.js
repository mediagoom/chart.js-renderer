#!/usr/bin/env node
const render = require('./bin/lib').render.default;
const chartjs = require('chart.js');
const date_adapter = require('chartjs-adapter-date-fns');
//module.exports = render.render.default

function getInput() {
  return new Promise(function (resolve, reject) {
    const stdin = process.stdin;
    let data = '';

    stdin.setEncoding('utf8');
    stdin.on('data', function (chunk) {
      data += chunk;
    });

    stdin.on('end', function () {
      resolve(data);
    });

    stdin.on('error', reject);
  });
}

async function main(args)
{
    let w = 800;
    let h = 400;
    let format = 'svg';

    // Basic argument parsing
    for (let i = 2; i < args.length; i++) {
        if (args[i] === '--width') {
            w = parseInt(args[++i], 10);
        } else if (args[i] === '--height') {
            h = parseInt(args[++i], 10);
        } else if (args[i] === '--format') {
            format = args[++i];
        }
    }

    const input = await getInput();
    const options = JSON.parse(input);

    const output = await render(chartjs, options, w, h, format);

    if (format === 'png') {
        process.stdout.write(output);
    } else {
        console.log(output);
    }
}

//console.log(process);

main(process.argv).then(()=>{});
