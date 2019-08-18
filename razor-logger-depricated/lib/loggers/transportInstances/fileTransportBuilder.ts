import {TransportInstance} from "winston";
import { ITransportBuilder} from "../loggerBase";
import * as winston from "winston";

export type fileOption = { fileName: string, datePattern?: string, dirname?:string,  maxSize?: number,maxFiles?:number }

export class FileTransportBuilder implements ITransportBuilder{
    buildTransport(fileOption: fileOption): TransportInstance {
        winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
        let filename = fileOption.fileName
        if(!filename.includes("%DATE%")){
            filename= `%DATE%${filename}`
        }
        return new winston.transports.DailyRotateFile(
            {
                filename,
                datePattern: fileOption.datePattern || 'YYYY-MM-DD.',
                maxSize:fileOption.maxSize,
                maxFiles:fileOption.maxFiles,
                dirname:fileOption.dirname || "."
            });
    }

}