const https = require('https');
const fs = require('fs');

class DataRepo{
    constructor()
    {
        
    }

    GetAllHistoricStockInfo(ticker, path){
        let now = (new Date()).getTime();
        let beginning = 345456000;
        return this.GetHistoricStockInfo(ticker, path, beginning, now);
    }
    GetHistoricStockInfo(ticker, path, start, end){
        return new Promise((resolve, reject)=>{
            let options = {
                hostname: 'query1.finance.yahoo.com',
                port:443,
                path:'/v7/finance/download/' + ticker + '?period1=' + start + '&period2=' + end + '&interval=1d&events=history&crumb=ieuQ1d6qboz',
                method: 'GET',
                headers: {
                    'Cookie': 'GUC=AQEBAQFbO6ZcHkIaoQQ9&s=AQAAADYoLhfy&g=WzpiuA; PRF=t%3DAAPL%252B%255EGSPC%26fin-trd-cue%3D1; B=539cl51djdbqa&b=3&s=0f'
                }

            }
            if(!fs.existsSync(path)){
                fs.mkdirSync(path);
            }
            https.get(options, (res) => {

                let file = fs.createWriteStream(path + ticker + ".csv");        
                res.pipe(file);
                res.on('end', (e) =>{
                    resolve()
                });
            }).on('error', (e) => {
                reject(e)
            });
        })
    }
}
module.exports = DataRepo
    
