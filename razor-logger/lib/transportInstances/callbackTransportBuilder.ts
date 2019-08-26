import { CallbackCustomTransport } from "../customTransports/callbackCustomTransport";
import { ITransportBuilder } from "../ITransportBuilder";
import * as Transport from "winston-transport"


export interface callbackOption { //extends Transport.TransportStreamOptions
    callbackMethod: (level, log, meta) => void;
    level?:string;
}

export class CallbackTransportBuilder implements ITransportBuilder {

    buildTransport(options: any):Transport {
        if (options.callbackMethod) {
            return new CallbackCustomTransport(options)
        } else {
            return null;
        }
    }

}