
import { transports, format } from "winston";

import * as Transport from "winston-transport"
import { ITransportBuilder } from "../ITransportBuilder";

export interface ConsoleOptions {
    display: boolean;
    format?: "simple"|"json";
    level?: string,
    timestamp?: boolean
}

export class ConsoleTransportBuilder implements ITransportBuilder {

    buildTransport(options: ConsoleOptions): Transport {
        if (options && options.display == true) {
            let config: { format: any, level?: string } =<any>{}

            //remove since in json the timestamp does not work properly 
            // if (options.format == "json") {
            //     config.format = format.combine(
            //         format.json(),
            //         format.timestamp({
            //             format: 'YYYY-MM-DD HH:mm:ss'
            //           }),
            //     )
            // }
            if (options.level) {
                config.level = options.level;
            }
            if (options.timestamp) {
                config.format = format.combine(
                    format.simple(),
                    format.timestamp(),
                    format.printf((info) => {
                        return `${info.timestamp} ${info.level}: ${info.message}`;
                      })
                )
            }else{
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