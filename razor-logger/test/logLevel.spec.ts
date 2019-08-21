import { shouldLogLevel } from "../lib/helpers/validators";
import assert = require("assert");


describe("log level tests",()=>{
    it("should filter info when level set to warn",()=>{
        let shouldlog = shouldLogLevel({level:"warn"},"info")
        assert(shouldlog==false);
    })

    it("should filter info when level set to WARN",()=>{
        let shouldlog = shouldLogLevel({level:"WARN"},"info")
        assert(shouldlog==false);
    })

    it("should not filter info when level set to info",()=>{
        let shouldlog = shouldLogLevel({level:"WARN"},"info")
        assert(shouldlog==false);
    })
})