import {ITransportBuilder} from "../loggerBase";
import * as winston from "winston";
import { RestApiCustomTransport } from "../customTransports/restApiCustomTransport";

export type restApiOption={url:string,authToken:string,mandatoryAuthToken:boolean,origin?:string,filterLogLevel:string[]}
export class RestApiTransportBuilder implements ITransportBuilder{

    buildTransport(options: any) {
        return new RestApiCustomTransport(options)
    }

}