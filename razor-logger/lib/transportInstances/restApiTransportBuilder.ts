import * as winston from "winston";
import { ITransportBuilder } from "../ITransportBuilder";
import * as Transport from "winston-transport"
import { RestApiCustomTransport } from "../customTransports/restApiCustomTransport";



export interface restApiOption {
    url: string,
    authToken: string,
    mandatoryAuthToken: boolean,
    origin?: string,
    filterLogLevel: string[]
}


export class RestApiTransportBuilder implements ITransportBuilder {

    buildTransport(options: any): Transport {
        return new RestApiCustomTransport(options)
    }

}