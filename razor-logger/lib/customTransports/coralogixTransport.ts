import * as Transport from "winston-transport";
import { coralogixOptions } from "../transportInstances/coralogixTransportBuilder";
import { shouldLogLevel } from "../helpers/validators";
import * as coralogix from "coralogix-logger";

export class CoralogixTransport extends Transport {
    private coralogixLogger = null;
    constructor(private opts: coralogixOptions) {
        super(<any>opts);
        this.initCoralogixLogger(opts);
    }

    private initCoralogixLogger(opts: coralogixOptions){
        let coralogixConfig = new coralogix.LoggerConfig({
            applicationName: opts.applicationName,
            privateKey: opts.privateKey,
            subsystemName: opts.subsystemName,
        });
        coralogix.CoralogixLogger.configure(coralogixConfig);
        this.coralogixLogger = new coralogix.CoralogixLogger(opts.category);
    }

    log(info, callback) {
        let level: string = info.level;
        if(level=="warn"){
            level="warning"
        }
        if (shouldLogLevel(this.opts, level)) {
            this.coralogixLogger.addLog(new coralogix.Log({
                severity: coralogix.Severity[level],
                text: info.message
            }));
        }
        callback();
    }
}