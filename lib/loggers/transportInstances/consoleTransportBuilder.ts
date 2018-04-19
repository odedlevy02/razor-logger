import {ITransportBuilder} from "../loggerBase";
import {TransportInstance} from "winston";
import * as winston from "winston";

export class ConsoleTransportBuilder implements ITransportBuilder{

    buildTransport(options: any): TransportInstance {
        return new winston.transports.Console()
    }

}