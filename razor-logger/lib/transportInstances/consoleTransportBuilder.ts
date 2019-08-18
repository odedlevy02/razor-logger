
import { transports, format } from "winston";

import * as Transport from "winston-transport"
import { ITransportBuilder } from "../ITransportBuilder";

export interface ConsoleOptions {
    display: boolean;
    format: string;
}

export class ConsoleTransportBuilder implements ITransportBuilder {

    buildTransport(options: ConsoleOptions): Transport {
        if (options && options.display == true) {
            if (options.format == "json") {
                return new transports.Console({ format: format.json() })
            } else {
                return new transports.Console({ format: format.simple() })
            }

        } else {
            return null;
        }

    }

}