
import { Format } from "logform";
import { transports, format } from "winston";

import * as Transport from "winston-transport"
import { ITransportBuilder } from "../ITransportBuilder";
// import { getContext } from "@aspecto/opentelemetry"
const { getContext } = require('@aspecto/opentelemetry');

export interface ConsoleOptions {
    display: boolean;
    format?: "simple" | "json";
    level?: string,
    timestamp?: boolean,
    traceId?: boolean
}

export class ConsoleTransportBuilder implements ITransportBuilder {

    buildTransport(options: ConsoleOptions): Transport {
        if (options && options.display == true) {
            let config: { format: any, level?: string } = <any>{}
         
           

            if (options.level) {
                config.level = options.level;
            }
            //Build the list of formats and then combine them
            const formats: Format[] = []
            if (options.timestamp) {
                formats.push(format.timestamp())
            }
            //Select between json and simple format
            if (options.format == "json") {
                formats.push(format.json())
            } else {
                formats.push(format.simple())
            }
            if (options.traceId) {
                const addAspectoTraceId = format((info) => {
                    info.traceId = getContext().traceId;
                    //added for unit testing when there is no traceid
                    if(!info.traceId && options["simulateTraceId"]){
                        info.traceId = "tid1234"
                    }
                    return info;
                });
                formats.push(addAspectoTraceId())
            }
            //If this is a simple format then define the string format
            if(options.format != "json"){
                formats.push( format.printf((info) => {
                    //base message contains level and message
                    let logMessage = `${info.message}`
                    let preLogMessage = ""
                    if (info.traceId) {
                        preLogMessage = `(tid:${info.traceId})`
                    }
                    preLogMessage = preLogMessage?`${info.level} ${preLogMessage}`: info.level
                    if (info.timestamp) {
                        preLogMessage = `${info.timestamp} ${preLogMessage}`
                    }
                    //total message will be <timestamp> <level> <traceId>: message
                    return `${preLogMessage}: ${logMessage}`;
                }))
            }
            config.format = format.combine(...formats)//,

            return new transports.Console(config);

        } else {
            return null;
        }

    }

}