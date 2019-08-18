import { ConsoleOverrideLogger } from "../lib/consoleOverrideLogger";
import * as sinon from "sinon"
import assert = require("assert");
import { LokiTransport } from "../lib/customTransports/lokiTransport";

describe("loki tests", () => {
    it("should not call loki logger when pushLogs set to false", () => {
        //creaeta a loki transport and mock the warnNoConnection method making sure that it will be called
        let lokiTransport = new LokiTransport({ pushLogs: false, lokiUrl: "http://test" });
        let lokiMock = sinon.mock(lokiTransport)
        lokiMock.expects("mergeLabels").never();
        //stub the logger so that it returns the mocked loki transport
        let logger = new ConsoleOverrideLogger();
        sinon.stub(logger, "getTransportsList").returns([lokiTransport])
        logger.createLogger();
        console.log("test");
        lokiMock.verify();
    })
    it("should not call loki logger when pushLogs set to true but no lokiUrl set", () => {
        //create a loki transport and mock the warnNoConnection method making sure that it will be called
        let lokiTransport = new LokiTransport({ pushLogs: true, lokiUrl: "" });
        let lokiMock = sinon.mock(lokiTransport)
        lokiMock.expects("mergeLabels").never();
        //stub the logger so that it returns the mocked loki transport
        let logger = new ConsoleOverrideLogger();
        sinon.stub(logger, "getTransportsList").returns([lokiTransport])
        logger.createLogger();
        console.log("test");
        lokiMock.verify();
    })
    it("should merge labels with default and per console", () => {
        let lokiLogger = new LokiTransport(<any>{});
        let res = lokiLogger.mergeLabels({ consLabel: "label1" }, { labelDef: "default" })
        assert(res.labelDef && res.consLabel);
    })
    it("should merge labels with default defined in config and per console", () => {
        let hasBeenSet = false;
        //create a loki transport and mock the warnNoConnection method making sure that it will be called
        let lokiTransport = new LokiTransport({ pushLogs: true, lokiUrl: "http://test",defaultLabels:{ labelDef: "default" }});
        //stub the createGoLabels and validate that the configs have been merged
        sinon.stub(lokiTransport,"createGoLabels").callsFake((labels)=>{
            if(labels.labelDef && labels.other){
                hasBeenSet = true;
            }
            return "";
        })
        //override sendLogToLoki to avoid sending to loki
        sinon.stub(lokiTransport,"sendLogToLoki").callsFake(()=>{})
        //stub the logger so that it returns the mocked loki transport
        let logger = new ConsoleOverrideLogger();
        sinon.stub(logger, "getTransportsList").returns([lokiTransport])
        logger.createLogger();
        console.log("test",{labels:{other:"label"}});
        assert(hasBeenSet);
    })
    it("should create label str from obj",()=>{
        let lokiLogger = new LokiTransport(<any>{});
        let labelStr = lokiLogger.createGoLabels({label1:"label1",label2:"label2"})
        assert(labelStr="{label1=\"label1\",label2\=\"label2\"}");
    })
    it("should send warning when loki server not up", () => {
        //creaeta a loki transport and mock the warnNoConnection method making sure that it will be called
        let lokiTransport = new LokiTransport({ pushLogs: true, lokiUrl: "http://test" });
        let lokiMock = sinon.mock(lokiTransport)
        lokiMock.expects("warnNoConnection").once();
        //stub the logger so that it returns the mocked loki transport
        let logger = new ConsoleOverrideLogger();
        sinon.stub(logger, "getTransportsList").returns([lokiTransport])
        logger.createLogger();
        console.log("test");
        return delay(500).then(res => {
            lokiMock.verify();
        })
    })
})

function delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}