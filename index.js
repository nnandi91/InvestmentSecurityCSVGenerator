const DataRepo = require("./DataRepo");
const spList = require('./sp500-list');
const fs = require('fs');
const rl = require('readline');



const path = "C:/temp/";

function createCSVFiles(){
  let repo = new DataRepo();
  for(let ticker of spList){
    repo.GetAllHistoricStockInfo(ticker, path);
  }
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

generateSingleCSVFile();