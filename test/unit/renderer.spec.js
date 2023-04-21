const fs = require('fs');
const path = require('path');
const expect   = require('chai').expect;
const render = require('../../bin/lib').render.default;//require('../../index');

const transform = require('../../src/charting/transform');

const chartjs = require('chart.js/auto');
const date_adapter = require('chartjs-adapter-date-fns');

const exp = require('constants');

describe('Render Chart js', function(){

    this.timeout(10000);

    const charts_dir = path.join(__dirname, './charts')
    const ls = fs.readdirSync(charts_dir);

    ls.forEach( (dir) => {

        const rx = /\.js$/i;
        const xr = /\.json$/i;

        const js = rx.test(dir);
        const json = xr.test(dir);
        
        if(js || json){
                        
            const file = path.join(charts_dir, dir);
            const name = (js)?dir.replace(rx, ''):dir.replace(xr, '');
            
            it(`should render ${name}`, ()=>{

                    //console.log(name, file, charts_dir);
                    if(js)
                    { 
                        opts = require(file);
                        fs.writeFileSync(path.join(__dirname, `./charts/tmp/${name}.json`), JSON.stringify(opts));
                    }
                    else
                    {
                        const content = fs.readFileSync(file).toString();
                        opts = JSON.parse(content);
                        if(/\.transform\./.test(file)){
                            opts = transform(opts);
                            fs.writeFileSync(path.join(__dirname, `./charts/tmp/${name}.transformed.json`), JSON.stringify(opts, null, 2));
                        }
                    }

                    //opts.options.datasets = {line : { pointStyle : 'line' , fill: true } };

                    const svg = render(chartjs, opts);

                    fs.writeFileSync(path.join(__dirname, `./charts/tmp/${name}.svg`), svg);

                    const svg_original = path.join(charts_dir, `${name}.svg`);

                    const target = fs.readFileSync(svg_original).toString().replace(/\n/g, '');
           
                    const a = svg.replace(/\n/g, '').split('>');
                    const b = target.split('>');

                    expect(a.length).to.be.eq(b.length);

                    for(let j = 0; j < a.length; j++)
                        expect(a[j]).to.be.eq(b[j], `${j}]>> ${a[j]}
${j}]<< ${b[j]}
`);

            });



        }

    });

    
});