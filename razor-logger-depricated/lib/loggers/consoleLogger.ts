import { LoggerBase } from "./loggerBase";
import * as winston from "winston";
import { Logger } from "winston";

const defaultConsoleLogOptions = { console: true }

export var consoleLogger: Logger = null;

// To log all console logs add this before writing any console logs:
// new ConsoleLogger().createLogger({console:true,file:{fileName:"appconsole.log"}})
export class ConsoleLogger extends LoggerBase {
    static hasBeenCreated = false;
    createLogger(options: any = defaultConsoleLogOptions) {
        let logTransports = this.getTransportsList(options);
        consoleLogger = winston.createLogger({
            transports: logTransports
        });
        if (ConsoleLogger.hasBeenCreated == false) {
            //save the default consoles
            require("./logConsoleDefaults");
            //override the consoles
            require("./logConsoleOverrides")
        }
        ConsoleLogger.hasBeenCreated = true;
    }

    configureLogger(options: any = defaultConsoleLogOptions) {
        let logTransports = this.getTransportsList(options);
        consoleLogger.configure({
            transports: logTransports
        })
    }
}