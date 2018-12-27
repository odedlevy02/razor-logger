import {TransportInstance} from "winston";
import {S3TransportBuilder} from "./transportInstances/s3TransportBuilder";
import {FileTransportBuilder} from "./transportInstances/fileTransportBuilder";
import {ConsoleTransportBuilder} from "./transportInstances/consoleTransportBuilder";
import { RestApiTransportBuilder } from "./transportInstances/restApiTransportBuilder";
import { CallbackTransportBuilder } from "./transportInstances/callbackTransportBuilder";

/*
* The ITransportBuilder interface needs to be implemented by classes that create winstons TransportInstance
* When creating your own TransportBuilder implement ITransportBuilder and register it using method appendTransportsMap with the name
* Then when initializing the logger via createLogger method - add a property with the map name and an object with it's initializing data.
* This data will be passed to the transport builder for required initializations
* (e.g. for initializing an s3 transport it is required to pass in {bucket: string, folder?: string, access_key_id: string, secret_access_key: string, nameFormat?: string}
* * */
export interface ITransportBuilder{
    buildTransport(options:any):TransportInstance;
}

/*
* The LoggerBase is a base class that should be inherited when creating a logger
* There are currently 2 loggers
* 1. Console logger - log all console logs to a winston logger with a set of transports (file, console, s3 etc)
* 2. Web Requests Logger - log all web requests to a winston logger with a set of transports
*
* Each logger instance writes to a different set of files / s3 locations. This is done intentianly since we will not want to mix between these loggers and their outputs
*
* The LoggerBase has a transport map container that maps between a name and a transport builder. That way before creating the logger it is possible to define which
* transports are required and with what configuration
* The logger registers 3 default transport builders but it is possible to add others or replace the defaults with custom logic
*
* */
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
        this.appendTransportsMap("restApi",new RestApiTransportBuilder())
        this.appendTransportsMap("callback",new CallbackTransportBuilder())
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
                let transport = builder.buildTransport(option)
                if(transport){
                    logTransports.push(transport)
                }
            }
        })
        return logTransports;
    }
}