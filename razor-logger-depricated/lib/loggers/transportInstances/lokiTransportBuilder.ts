import { ITransportBuilder } from "../loggerBase";
import { TransportInstance } from "winston";
import { LokiCustomTransport } from "../customTransports/lokiCustomTransport";


export type lokiOptions = { pushLogs:boolean,lokiUrl:string,defaultLabels?:any }
export class LokiTransportBuilder implements ITransportBuilder{
    buildTransport(options: any): TransportInstance {
        return new LokiCustomTransport(options)
    }
}