const expect   = require('chai').expect;
const transform = require('../../src/charting/transform')


describe('Data-Definition', ()=>{

    it('should accept a data definition json and transform in a chart json', ()=>{
        const minimal = {
            kind : 'label'          
            , series : [
                {
                    data : [
                        {x : 1, y : 1}
                        , {x : 2, y : 2}
                        , {x : 3, y : 3}
                    ]
                    , chart : {
                        charttype : 'line'
                        , leftright : 'left'
                        , min : 0
                        , max: 10
                    }
                }            
            ]
        }; 

        const chartjson = transform(minimal);

        //expect(chartjson.data.label).to.include([1, 2, 3]);
    });

    it('should process a basic data definition', ()=>{
        const cpi = {"kind":"timeseries",
            "series":[{"data":[{"x":"2021-03-31T22:00:00.000Z","y":"266.727"}
                        ,{"x":"2021-05-31T22:00:00.000Z","y":"270.955"}
                    ,{"x":"2021-06-30T22:00:00.000Z","y":"272.184"}
                    ,{"x":"2021-08-31T22:00:00.000Z","y":"274.214"}
                    ,{"x":"2021-09-30T22:00:00.000Z","y":"276.590"}
                    ,{"x":"2021-10-31T23:00:00.000Z","y":"278.524"}
                    ,{"x":"2021-11-30T23:00:00.000Z","y":"280.126"}
                    ,{"x":"2022-01-31T23:00:00.000Z","y":"284.182"}
                    ,{"x":"2022-02-28T23:00:00.000Z","y":"287.708"}
                    ,{"x":"2022-03-31T22:00:00.000Z","y":"288.663"}]
                    ,"chart":{"charttype":"line"}}]};

        const chartjson = transform(cpi);

        expect(chartjson.data.label).to.be.undefined;

    });

});

