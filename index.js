const render = require('./bin/lib').render.default;
const chartjs = require('chart.js');
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


    let w = args[2];
    let h = args[3];

    //console.log('size', w, h);

    const input = await getInput();

    const options = JSON.parse(input)

    const svg = render(chartjs, options, w, h);


    console.log(svg);


}

//console.log(process);

main(process.argv).then(()=>{});