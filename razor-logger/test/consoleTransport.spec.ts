
import * as sinon from "sinon"
import assert = require("assert");
import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";

describe("console log tests",()=>{
    it("display console logs simple format without timestamp",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true}})
        console.log("just some log");
    })
    it("display console logs with multiple args in console of type string",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true}})
        console.log("just some log","additional info","plus some more");
    })
    it("display console logs with multiple args in console of type object and error",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true}})
        console.log("just some log",{name:"John"},new Error("some error"));
    })
    it("display console logs simple format with timestamp",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,timestamp:true}})
        console.log("log with timestamp");
    })

    it("display console logs simple format with timestamp",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,timestamp:true}})
        console.log("log with timestamp");
    })

    it("display console logs simple format with traceId",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,traceId:true}})
        //does not actually since print trace id since it is not in network call 
        console.log("log with traceId");
    })

    it("display console logs json format",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,format:"json"}})
        console.log("json log");
    })
    it("display console logs json format with timestamp",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,format:"json",timestamp:true}})
        console.log("json log with timestamp");
    })

    it("not display console logs when level set to warn ",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,level:"warn"}})
        console.log("should not be displayed");
    })
    it("should display console warn when level set to warn ",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({console:{display:true,level:"warn"}})
        console.warn("warn to be displayed");
    })
})