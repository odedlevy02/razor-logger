import assert = require("assert");
import { CoralogixTransport } from "../lib/customTransports/coralogixTransport";
import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";

describe("coralogix logger tests", () => {
    it.skip("should send log to coralogix",()=>{
        let logger = new ConsoleOverrideLogger();
        logger.createLogger({coralogix:{
            applicationName:"<app name>>",
            privateKey:"<coralogix key>",
            subsystemName:"dev",
            category:"my category"
        }});
         console.log("Some coralogix log")    
         console.info("Some coralogix info")    
         console.debug("Some coralogix debug")    
         console.warn("Some coralogix warning")  
         console.error("Some coralogix error")    
        return delay(1000).then(res=>{
            assert(true);
        })
    })
    
})

function delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}
