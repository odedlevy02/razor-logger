import {ITransportBuilder} from "../loggerBase";
import {TransportInstance} from "winston";
import * as winston from "winston";

export class ConsoleTransportBuilder implements ITransportBuilder{

    buildTransport(options: any): TransportInstance {
        if(options==true){
            return new winston.transports.Console()
        }else{
            return null;
        }

    }

}