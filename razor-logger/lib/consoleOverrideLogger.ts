import { LoggerBase } from "./loggerBase";
import * as winston from "winston";
import { Logger } from "winston";
import { ConsoleOptions } from "./transportInstances/consoleTransportBuilder";
import { fileOption } from "./transportInstances/fileTransportBuilder";
import { callbackOption } from "./transportInstances/callbackTransportBuilder";

const defaultConsoleLogOptions = { console: true }

export var consoleLogger: Logger = null;

// To log all console logs add this before writing any console logs:
// new ConsoleLogger().createLogger({console:true,file:{fileName:"appconsole.log"}})
export class ConsoleOverrideLogger extends LoggerBase {
    static hasBeenCreated = false;
    createLogger(options: any = defaultConsoleLogOptions) {
        let logTransports = this.getTransportsList(options);
        consoleLogger = winston.createLogger({
            level:"debug", //set default to debug since current default is only info
            transports: logTransports,
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

export type loggerOptions={
    console?:ConsoleOptions,
    file?:fileOption,
    callback?:callbackOption
}

export function createLogger(options: loggerOptions){
    return new ConsoleOverrideLogger().createLogger(options)
}

