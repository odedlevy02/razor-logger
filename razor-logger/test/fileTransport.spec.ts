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

    it("should log 3 rows in a file",()=>{
        let logFolder = "./logs2";
        rimraf.sync(logFolder);
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({file:{fileName:"razor.log",dirname:"logs2"}});
        console.log("row1");
        console.log("row2");
        console.log("row3");
        return delay(300).then(res=>{
            if(fs.existsSync(logFolder)){
                var files = fs.readdirSync(logFolder);
                let data = fs.readFileSync(`${logFolder}/${files[0]}`).toString();
                let lines = data.split("\n")
                assert(lines.length==4); //one for last empty row
            }else{
                assert(false,"Expected file to contain 3 lines");
            }
        })
        
    })
})

function delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}