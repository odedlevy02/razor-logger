
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
    traceId?:boolean
}

export class ConsoleTransportBuilder implements ITransportBuilder {

    buildTransport(options: ConsoleOptions): Transport {
        if (options && options.display == true) {
            let config: { format: any, level?: string } = <any>{}

            //remove since in json the timestamp does not work properly 
            // if (options.format == "json") {
            //     config.format = format.combine(
            //         format.json(),
            //         format.timestamp({
            //             format: 'YYYY-MM-DD HH:mm:ss'
            //           }),
            //     )
            // }
            const addAspectoTraceId = format((info) => {
                info.traceId = getContext().traceId;
                return info;
            });

            if (options.level) {
                config.level = options.level;
            }
            if (options.timestamp && options.traceId) {
                config.format = format.combine(
                    format.simple(),
                    format.timestamp(),
                    addAspectoTraceId(), 
                    format.printf((info) => {
                        if(info.traceId){
                            return `${info.timestamp} (tId:${info.traceId}) ${info.level}: ${info.message}`;
                        }else{
                            return `${info.timestamp} ${info.level}: ${info.message}`;
                        }
                        
                    })
                )
            } else if (options.timestamp) {
                config.format = format.combine(
                    format.simple(),
                    format.timestamp(),
                    format.printf((info) => {
                        return `${info.timestamp} ${info.level}: ${info.message}`;
                    })
                )
            } else if (options.traceId) {
                config.format = format.combine(
                    format.simple(),
                    addAspectoTraceId(), 
                    format.printf((info) => {
                        if(info.traceId){
                            return `(tId:${info.traceId}) ${info.level}: ${info.message}`;
                        }else{
                            return `${info.level}: ${info.message}`;
                        }
                    })
                )
            } else {
                config.format = format.combine(
                    format.simple()
                )
            }

            return new transports.Console(config);

        } else {
            return null;
        }

    }

}