import {ITransportBuilder} from "../lib/loggers/loggerBase";
import {TransportInstance} from "winston";

export class mockTransportBuilder implements ITransportBuilder{

    buildTransport(options: any): TransportInstance {
        return null;
    }

}