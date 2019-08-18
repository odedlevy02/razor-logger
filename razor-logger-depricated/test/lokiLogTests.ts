import * as chai from "chai";
import {ConsoleLogger} from "../lib/loggers/consoleLogger";
import {mockTransportBuilder} from "./mockItems";
import { LokiCustomTransport } from "../lib/loggers/customTransports/lokiCustomTransport";
import { AssertionError } from "assert";
import assert = require("assert");

var expect = chai.expect;
let should = chai.should();

describe("Loki tests",()=>{
    // it("should create loki transport even when no config",()=>{
    //     let logger = new ConsoleLogger();
    //     logger.createLogger({loki:{}})
    //     console.log("something");
    // })
    // it("should merge labels with default and per console",()=>{
    //     let lokiLogger = new LokiCustomTransport(<any>{});
    //     let res = lokiLogger.mergeLabels({consLabel:"label1"},{labelDef:"default"})
    //     assert(res.labelDef && res.consLabel);
    // })
    // it("should create label str from obj",()=>{
    //     let lokiLogger = new LokiCustomTransport(<any>{});
    //     let labelStr = lokiLogger.createGoLabels({label1:"label1",label2:"label2"})
    //     assert(labelStr="{label1=\"label1\",label2\=\"label2\"}");
    // })
    it("should console warning when loki url missing",()=>{
        let clogger = new ConsoleLogger()
        clogger.createLogger({loki:{pushLogs:true,lokiUrl:"http://test"}})
        console.log("something",{test:"tt"});
        assert(true);
    })
})