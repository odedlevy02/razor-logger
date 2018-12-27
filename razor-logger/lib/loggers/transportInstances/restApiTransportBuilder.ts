import {ITransportBuilder} from "../loggerBase";
import {TransportInstance} from "winston";
import * as winston from "winston";
import { RestApiCustomTransport } from "../customTransports/restApiCustomTransport";

export type restApiOption={url:string,authToken:string,mandatoryAuthToken:boolean,origin?:string,filterLogLevel:string[]}
export class RestApiTransportBuilder implements ITransportBuilder{

    buildTransport(options: any): TransportInstance {
        return new RestApiCustomTransport(options)
    }

}