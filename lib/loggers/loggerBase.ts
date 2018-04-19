import * as winston from "winston";
import * as path from "path";
import {TransportInstance} from "winston";
import {S3TransportBuilder} from "./transportInstances/s3TransportBuilder";
import {FileTransportBuilder} from "./transportInstances/fileTransportBuilder";
import {ConsoleTransportBuilder} from "./transportInstances/consoleTransportBuilder";




// export type ILogOptions = {
//     console: boolean,
//     file?: fileOption,
//     s3?: s3Option
// }

export interface ITransportBuilder{
    buildTransport(options:any):TransportInstance;
}


export abstract class LoggerBase{

    constructor(){
        this.appendDefaultTransportsMaps();
    }

    abstract createLogger(options: any);
    transportersList:Map<string,ITransportBuilder> = new Map<string, ITransportBuilder>()

    protected appendDefaultTransportsMaps=()=>{
        this.appendTransportsMap("console",new ConsoleTransportBuilder())
        this.appendTransportsMap("file",new FileTransportBuilder())
        this.appendTransportsMap("s3",new S3TransportBuilder())
    }

    appendTransportsMap=(key:string,logTransport:ITransportBuilder)=>{
        this.transportersList.set(key,logTransport)
    }

    protected getTransportsList = (options: any): TransportInstance[] => {
        let logTransports = []
        //iterate over list of keys and find maching
        Object.keys(options).forEach(key=>{
            if(this.transportersList.has(key)){
                let builder = this.transportersList.get(key);
                let option = options[key]
                logTransports.push(builder.buildTransport(option))
            }
        })
        return logTransports;
        // if (options.console) {
        //     logTransports.push(new (winston.transports.Console)())
        // }
        // // if (options && options.file) {
        // //     logTransports.push(this.getRotateFileTransport(options.file))
        // // }
        // // if (options && options.s3) {
        // //     logTransports.push(this.getS3Transport(options.s3))
        // // }
        // return logTransports
    }





}