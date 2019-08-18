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
                assert(true)
            }else{
                assert(false,"Expected logs folder to be created");
            }
        })
        
    })
})

function delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}