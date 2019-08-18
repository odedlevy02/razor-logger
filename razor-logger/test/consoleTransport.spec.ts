
import * as sinon from "sinon"
import assert = require("assert");
import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";

describe("console log tests",()=>{
    it("display console logs simple format",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true}})
        console.log("just some log");
    })
    it("display console logs json format",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,format:"json"}})
        console.log("just some log");
        
    })
})