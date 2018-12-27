import {LoggerBase} from "./loggerBase";
import * as winston from "winston";

const defaultConsoleLogOptions = {console: true}

export var consoleLogger:winston.LoggerInstance = null;

// To log all console logs add this before writing any console logs:
// new ConsoleLogger().createLogger({console:true,file:{fileName:"appconsole.log"}})
export class ConsoleLogger extends LoggerBase{
    createLogger(options: any = defaultConsoleLogOptions){
        let logTransports = this.getTransportsList(options);
        consoleLogger = new winston.Logger({
            transports: logTransports
        });
        require("./logConsoleOverrides")
    }

    configureLogger(options: any = defaultConsoleLogOptions){
        let logTransports = this.getTransportsList(options);
        consoleLogger.configure({
            transports: logTransports
        })
    }
}