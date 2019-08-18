import { LoggerBase } from "./loggerBase";
import * as winston from "winston";
import { Logger } from "winston";

const defaultConsoleLogOptions = { console: true }

export var consoleLogger: Logger = null;

// To log all console logs add this before writing any console logs:
// new ConsoleLogger().createLogger({console:true,file:{fileName:"appconsole.log"}})
export class ConsoleOverrideLogger extends LoggerBase {
    static hasBeenCreated = false;
    createLogger(options: any = defaultConsoleLogOptions) {
        let logTransports = this.getTransportsList(options);
        consoleLogger = winston.createLogger({
            transports: logTransports
        });
        if (ConsoleOverrideLogger.hasBeenCreated == false) {
            //save the default consoles
            require("./consoleOverrides/logConsoleDefaults");
            //override the consoles
            require("./consoleOverrides/logConsoleOverrides")
        }
        ConsoleOverrideLogger.hasBeenCreated = true;
    }

    configureLogger(options: any = defaultConsoleLogOptions) {
        let logTransports = this.getTransportsList(options);
        consoleLogger.configure({
            transports: logTransports
        })
    }
}