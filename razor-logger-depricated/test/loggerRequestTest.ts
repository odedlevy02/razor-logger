// import * as chai from "chai";
// import * as sinon from "sinon";
// import * as assert from "assert";
// import {ConsoleLogger} from "../lib/loggers/consoleLogger";
// import {ITransportBuilder} from "../lib/loggers/loggerBase";
// import {TransportInstance} from "winston";
// import {mockTransportBuilder} from "./mockItems";
// import {RequestLogger} from "../lib/loggers/requestLogger";

// var expect = chai.expect;
// let should = chai.should();

// describe("logger request tests", () => {
//     it("should set mapped logger when created: console, file and s3 once created", () => {
//         let cLogger = new RequestLogger()
//         expect(cLogger.transportersList.size).to.eql(3)
//     })

//     it("should append custom map to builders list",()=>{
//         let cLogger = new RequestLogger()
//         cLogger.appendTransportsMap("mockBuilder",new mockTransportBuilder())
//         expect(cLogger.transportersList.size).to.eql(4)
//     })
//     it("should replace existing map with custom map",()=>{
//         let cLogger = new RequestLogger()
//         cLogger.appendTransportsMap("file",new mockTransportBuilder())
//         expect(cLogger.transportersList.size).to.eql(3)
//     })

// });
