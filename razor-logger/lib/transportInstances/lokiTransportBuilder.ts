import { ITransportBuilder } from "../ITransportBuilder";
import * as Transport from "winston-transport"
import { LokiTransport } from "../customTransports/lokiTransport";


export interface LokiOptions { //extends Transport.TransportStreamOptions
    pushLogs:boolean;
    lokiUrl:string;
    defaultLabels?:any,
    level?:string
}


export class LokiTransportBuilder implements ITransportBuilder{
    buildTransport(options: any): Transport {
        return new LokiTransport(options)
    }
}