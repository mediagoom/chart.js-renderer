const fs = require('fs');
const path = require('path');
const expect   = require('chai').expect;

const adapter = require('../../src/draw.adapter');
const gauge = require('../../src/charting/gauge');

function lookup_tests(dir_name, transform, render, target_function, height, width)
{
    const charts_dir = path.join(__dirname, `./${dir_name}`)
    const ls = fs.readdirSync(charts_dir);

    ls.forEach( (dir) => {

        const rx = /\.js$/i;
        const xr = /\.json$/i;

        const js = rx.test(dir);
        const json = xr.test(dir);
        
        if(js || json){
                        
            const file = path.join(charts_dir, dir);
            const name = (js)?dir.replace(rx, ''):dir.replace(xr, '');
            
            it(`should render ${name} for ${dir_name}`, ()=>{

                    //console.log(name, file, charts_dir);
                    if(js)
                    { 
                        opts = require(file);
                        fs.writeFileSync(path.join(__dirname, `./${dir_name}/tmp/${name}.json`), JSON.stringify(opts));
                    }
                    else
                    {
                        const content = fs.readFileSync(file).toString();
                        opts = JSON.parse(content);
                        if(/\.transform\./.test(file)){
                            opts = transform(opts);
                            fs.writeFileSync(path.join(__dirname, `./${dir_name}/tmp/${name}.transformed.json`), JSON.stringify(opts, null, 2));
                        }
                    }

                    //opts.options.datasets = {line : { pointStyle : 'line' , fill: true } };

                    const svg = render(target_function, opts, height, width);

                    fs.writeFileSync(path.join(__dirname, `./${dir_name}/tmp/${name}.svg`), svg);

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
}

describe('Render Gouge js', function(){

    this.timeout(10000);

    lookup_tests('gauge', undefined, adapter, gauge.draw, 400, 800);

    
});