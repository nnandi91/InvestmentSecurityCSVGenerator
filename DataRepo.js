const https = require('https');
const fs = require('fs');

class DataRepo{
    constructor()
    {
        
    }

    GetAllHistoricStockInfo(ticker, path){
        let options = {
            hostname: 'query1.finance.yahoo.com',
            port:443,
            path:'/v7/finance/download/' + ticker + '?period1=345456000&period2=1530514800&interval=1d&events=history&crumb=ieuQ1d6qboz',
            method: 'GET',
            headers: {
                'Cookie': 'GUC=AQEBAQFbO6ZcHkIaoQQ9&s=AQAAADYoLhfy&g=WzpiuA; PRF=t%3DAAPL%252B%255EGSPC%26fin-trd-cue%3D1; B=539cl51djdbqa&b=3&s=0f'
            }

        }
        https.get(options, (res) => {
        let file = fs.createWriteStream(path + ticker + ".csv");        
        res.pipe(file)
        res.on('data', (d) => {
            
        });

        }).on('error', (e) => {
            console.error(e);
        });
    }
}
module.exports = DataRepo
    

//https://www.quandl.com/api/v3/datatables/WIKI/PRICES?ticker=A&date=1999-11-18%2C1999-11-19%2C1999-11-22&api_key=kaMXZW75uFSP4GymPtk8

/*

f25	!!!!!!0:1530553006	N/A	N/A	N/A	24				
fp	36276:1:1:1:10:5:y:XLK:1:6:1::1%2C%2C6%2C%2CXLK%2C1%2C%2C%2C%2C%2C%2C%2C%2Cps%2C%2C%2Cmf-08_mf-09_mf-10!!!!!!	N/A	N/A	N/A	114				
g36013	4:3642:2527:762:__304::1530574306:B2|4:3642:1465:762:__304::1530574286:B2|4:3642:2527:762:__304::1530574266:B2!!!!4:3642:2527:762:1530574306:__304:1:140:sym:AAPL|4:3642:2527:762:1530574267:__304:1:140:sym:AAPL|4:3642:2508:762:1530574246:__304:1:140:sym:AAPL!1530572325:15:15:10:0_4:15:15:10:0!4:3642:2527:762:__304::1530574308:B2|4:3642:1465:762:__304::1530574288:B2|4:3642:2527:762:__304::1530574269:B2!!2_3_14_18_21|||	N/A	N/A	N/A	427				
mp	B97025b3a62aec9180	N/A	N/A	N/A	23				
ub	B97025b3a62aec9180:0:2560:1440:1
*/
/* 

*/