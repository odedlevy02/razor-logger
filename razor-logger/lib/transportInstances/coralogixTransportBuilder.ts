import { ITransportBuilder } from "../ITransportBuilder";
import * as Transport from "winston-transport"
import { CoralogixTransport } from "../customTransports/coralogixTransport";

export type coralogixOptions={
    applicationName:string,
    privateKey:string,
    subsystemName:string,
    category?:string,
    level?:string
}
export class CoralogixTransportBuilder implements ITransportBuilder {
    buildTransport(coralogixOption: coralogixOptions): Transport {
        return new CoralogixTransport(coralogixOption)
    }
}