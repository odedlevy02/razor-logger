
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
                    return info;
                });
                formats.push(addAspectoTraceId())
            }
            //If this is a simple format then define the string format
            if(options.format != "json"){
                formats.push( format.printf((info) => {
                    //base message contains level and message
                    let message = `${info.level}: ${info.message}`
                    
                    if (info.traceId) {
                        message = `(tId:${info.traceId}) ${message}`
                    }
                    if (info.timestamp) {
                        message = `${info.timestamp} ${message}`
                    }
                    //total message will be <timestamp> <traceId> <level>: message
                    return message;
                }))
            }
            config.format = format.combine(...formats)//,

            return new transports.Console(config);

        } else {
            return null;
        }

    }

}