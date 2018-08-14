const DataRepo = require("./DataRepo");
const spList = require('./sp500-list');
const fs = require('fs');
const rl = require('readline');



const path = "C:/temp/";

function createCSVFiles(cb){
  return new Promise((resolve, reject) =>{
    let repo = new DataRepo();  
    Promise.all(spList.map(ticker => repo.GetAllHistoricStockInfo(ticker, path))).then(results => {
      resolve()
    }).catch(e=>{
      reject(e)
    })
  })
  
}

function generateSingleCSVFile(){
  let headerWritten = false
  let ws = fs.createWriteStream(path + "0All.csv");
  
  fs.readdir(path, (err,files)=>{
    for(let file of files){
      let lineReader = rl.createInterface({
        input: fs.createReadStream(path + file)
      });
      lineReader.on('line',function(line){
        if(!headerWritten && line.indexOf("Date") > -1){
          ws.write("Ticker," + line + "\n")
          headerWritten = true;
        } else {
          let ticker = file.split('.')[0];
          ws.write(ticker + "," + line + "\n")
        }

      });
    }
  })
}
createCSVFiles().then(()=>{
  generateSingleCSVFile();
}).catch(e=>{
  console.log(e);
})