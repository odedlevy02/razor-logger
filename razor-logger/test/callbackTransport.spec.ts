import * as sinon from "sinon"
import assert = require("assert");
import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";

describe("callback transport tests",()=>{
    it("should callback to method",()=>{
        let logger = new ConsoleOverrideLogger();
        let hasBeenCalled = false;
        logger.createLogger({callback:{callbackMethod:(level,msg,meta)=>{
            hasBeenCalled = true;
        }}})
        console.warn("Some log");
        assert(hasBeenCalled);
    })
    it("should filter callback when level set to warn",()=>{
        let logger = new ConsoleOverrideLogger();
        let hasBeenCalled = false;
        logger.createLogger({callback:{callbackMethod:(level,msg,meta)=>{
            hasBeenCalled = true;
        },level:"warn"}})
        console.log("Some log");
        assert(hasBeenCalled==false);
    })
})