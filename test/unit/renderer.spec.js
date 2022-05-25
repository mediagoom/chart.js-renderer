const fs = require('fs');
const path = require('path');
const expect   = require('chai').expect;
const render = require('../../index');

const chartjs = require('chart.js');
const exp = require('constants');

describe('Render Chart js', ()=>{

    
    it('should render bars', ()=>{

        const opts = {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };


        const svg = render(chartjs, opts).replace(/\n/g, '');

        const target = fs.readFileSync(path.join(__dirname, 'bars.svg')).toString().replace(/\n/g, '');

            //fs.writeFileSync(path.join(__dirname, '__bars.svg'), svg);

            //expect(svg).to.be.eq(target);

            const a = svg.split('>');
            const b = target.split('>');

            expect(a.length).to.be.eq(b.length);

            for(let j = 0; j < a.length; j++)
                expect(a[j]).to.be.eq(b[j], `${j} =>${a[j]}<====>${b[j]}<=`);

    });
    

    it('should render lines', ()=>{
        const opts = require('./lines');
        /*
        const opts = {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3]
                    , borderWidth: 1
                }
                , { label : 'test', data: [1, 5, 6, 7, 9]}
                ]
            },
            options: {
                datasets : {line : { pointStyle : 'line' , fill: true } }
                , scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
                , elements: {
                        line: {
                            tension: 0, // disables bezier curves
                        }
                        , point: {
                            radius: 1
                        }
                    }
            }
            
        };
        */


        //const opts = 

//datasets : {line : { pointStyle : 'line' , fill: true } }

        opts.options.datasets = {line : { pointStyle : 'line' , fill: true } };

        const svg = render(chartjs, opts).replace(/\n/g, '');

        //const target = fs.readFileSync(path.join(__dirname, 'bars.svg')).toString().replace(/\n/g, '');

        fs.writeFileSync(path.join(__dirname, '__lines.svg'), svg);


    });
});