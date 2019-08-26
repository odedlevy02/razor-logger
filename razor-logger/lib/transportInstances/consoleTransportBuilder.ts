
import { transports, format } from "winston";

import * as Transport from "winston-transport"
import { ITransportBuilder } from "../ITransportBuilder";

export interface ConsoleOptions {
    display: boolean;
    format: string;
    level?:string
}

export class ConsoleTransportBuilder implements ITransportBuilder {

    buildTransport(options: ConsoleOptions): Transport {
        if (options && options.display == true) {
            let config:{format:any,level?:string} = { format:format.simple()}
            if (options.format == "json") {
                config.format = format.json()
            }
            if(options.level){
                config.level = options.level;
            }

            return new transports.Console(config);

        } else {
            return null;
        }

    }

}