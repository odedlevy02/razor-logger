import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";
import * as rimraf from "rimraf";
import * as fs from "fs";
import { AssertionError } from "assert";
import assert = require("assert");

describe("file transport tests",()=>{
    it("should log in a file",()=>{
        let logFolder = "./logs";
        rimraf.sync(logFolder);
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({file:{fileName:"razor.log",dirname:"logs"}});
        console.log("some data");
        return delay(300).then(res=>{
            if(fs.existsSync(logFolder)){
                assert(true);
            }else{
                assert(false,"Expected logs folder to be created");
            }
        })
        
    })

    it("should log in a file",()=>{
        let logFolder = "./logs3";
        rimraf.sync(logFolder);
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({file:{fileName:"razor-warn.log",dirname:"logs3",level:"warn"}});
        console.log("some data");
        console.warn("some warn data");
        return delay(300).then(res=>{
            let numRows = numRowsInFileInFolder(logFolder)
            assert(numRows==1,"expected only warn to be logged");
        })
        
    })

    it("should log 3 rows in a file",()=>{
        let logFolder = "./logs2";
        rimraf.sync(logFolder);
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({file:{fileName:"razor.log",dirname:"logs2"}});
        console.log("row1");
        console.debug("row2");
        console.warn("row3");
        return delay(300).then(res=>{
            let numRows = numRowsInFileInFolder(logFolder)
            assert(numRows==3,"Expected file to contain 3 rows"); 
        })
        
    })
})

function numRowsInFileInFolder(logFolder){
    if(fs.existsSync(logFolder)){
        var files = fs.readdirSync(logFolder);
        let data = fs.readFileSync(`${logFolder}/${files[0]}`).toString();
        let lines = data.split("\n")
        //filter empty rows
        lines = lines.filter(line=>line!="")
        return lines.length;
    }else{
        return 0;
    }
}

function delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}