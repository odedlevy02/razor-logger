import { ITransportBuilder } from "../loggerBase";
import { TransportInstance } from "winston";
import * as winston from "winston";
import { CallbackCustomTransport } from "../customTransports/callbackCustomTransport";

export type callbackOption = { callbackMethod: (level, log, meta) => void,filterLogLevel?:string[] }
export class CallbackTransportBuilder implements ITransportBuilder {

    buildTransport(options: any): TransportInstance {
        if (options.callbackMethod) {
            return new CallbackCustomTransport(options)
        } else {
            return null;
        }
    }

}