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
        let err = new Error("some error")
        console.error("Some log",err);
        assert(hasBeenCalled);
    })
})