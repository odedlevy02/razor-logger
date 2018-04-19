import {ILogOptions, LoggerBase} from "./loggerBase";
import * as winston from "winston";

const defaultConsoleLogOptions: ILogOptions = {console: true}

export var consoleLogger = null;

// To log all console logs add this before writing any console logs:
// new ConsoleLogger().createLogger({console:true,file:{fileName:"appconsole.log"}})
export class ConsoleLogger extends LoggerBase{
    createLogger(options: ILogOptions = defaultConsoleLogOptions){
        let logTransports = this.getTransportsList(options);
        consoleLogger = new winston.Logger({
            transports: logTransports
        });
        require("./logConsoleOverrides")
    }
}