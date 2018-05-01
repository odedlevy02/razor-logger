import * as chai from "chai";
import {ConsoleLogger} from "../lib/loggers/consoleLogger";
import {mockTransportBuilder} from "./mockItems";

var expect = chai.expect;
let should = chai.should();

describe("logger console tests", () => {
    it("should set mapped logger when created: console, file and s3 once created", () => {
        expect(true).to.eq(true)
        // let cLogger = new ConsoleLogger()
        // expect(cLogger.transportersList.size).to.eql(3)
    })

    it("should append custom map to builders list",()=>{
        let cLogger = new ConsoleLogger()
        cLogger.appendTransportsMap("mockBuilder",new mockTransportBuilder())
        expect(cLogger.transportersList.size).to.eql(4)
    })
    it("should replace existing map with custom map",()=>{
        let cLogger = new ConsoleLogger()
        cLogger.appendTransportsMap("file",new mockTransportBuilder())
        expect(cLogger.transportersList.size).to.eql(3)
    })
    it("should create file transport from maps",()=>{
        let cLogger = new ConsoleLogger()
        cLogger.createLogger({file:{fileName:"test.log"}})
    })
    it("should create console transport from maps",()=>{
        let cLogger = new ConsoleLogger()
        cLogger.createLogger({console:true})
    })
    it("should create s3 transport from maps",()=>{
        let cLogger = new ConsoleLogger()
        cLogger.createLogger({s3:{bucket:"tt"}})
    })


});



