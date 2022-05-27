const fs = require('fs');
const path = require('path');
const expect   = require('chai').expect;
const render = require('../../index');

const chartjs = require('chart.js');
const date_adapter = require('chartjs-adapter-moment');

const exp = require('constants');

describe('Render Chart js', ()=>{

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
                        opts = JSON.parse(fs.readFileSync(file).toString());
                    }

                    //opts.options.datasets = {line : { pointStyle : 'line' , fill: true } };

                    const svg = render(chartjs, opts);

                    fs.writeFileSync(path.join(__dirname, `./charts/tmp/${name}.svg`), svg);

                    const svg_original = path.join(charts_dir, `${name}.svg`);

                    const target = fs.readFileSync(svg_original).toString().replace(/\n/g, '');
          
                    //expect(svg).to.be.eq(target);
                    
                    const a = svg.replace(/\n/g, '').split('>');
                    const b = target.split('>');

                    expect(a.length).to.be.eq(b.length);

                    for(let j = 0; j < a.length; j++)
                        expect(a[j]).to.be.eq(b[j], `${j} =>${a[j]}<====>${b[j]}<=`);

            });



        }

    });

    
});