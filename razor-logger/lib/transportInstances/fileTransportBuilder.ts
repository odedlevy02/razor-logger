import * as winston from "winston";
import { ITransportBuilder } from "../ITransportBuilder";
import * as Transport from "winston-transport"

export type fileOption = {
    fileName: string,
    datePattern?: string,
    dirname?: string,
    maxSize?: number,
    maxFiles?: number
}

export class FileTransportBuilder implements ITransportBuilder {
    buildTransport(fileOption: fileOption): Transport {
        let dailyRotateFile = require('winston-daily-rotate-file');
        let filename = fileOption.fileName
        if (!filename.includes("%DATE%")) {
            filename = `%DATE%${filename}`
        }
        return new dailyRotateFile(
            {
                filename,
                datePattern: fileOption.datePattern || 'YYYY-MM-DD.',
                maxSize: fileOption.maxSize,
                maxFiles: fileOption.maxFiles,
                dirname: fileOption.dirname || "."
            });
    }

}