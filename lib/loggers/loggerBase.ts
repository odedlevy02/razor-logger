import * as winston from "winston";
import * as path from "path";

export type fileOption = { fileName: string, datePattern?: string, dirname?:string,  maxSize?: number,maxFiles?:number }
export type s3Option = { bucket: string, folder?: string, access_key_id: string, secret_access_key: string, nameFormat?: string }

export type ILogOptions = {
    console: boolean,
    file?: fileOption,
    s3?: s3Option
}


export abstract class LoggerBase{

    abstract createLogger(options: ILogOptions);

    protected getTransportsList = (options: ILogOptions): any[] => {
        let logTransports = []
        if (options.console) {
            logTransports.push(new (winston.transports.Console)())
        }
        if (options && options.file) {
            logTransports.push(this.getRotateFileTransport(options.file))
        }
        if (options && options.s3) {
            logTransports.push(this.getS3Transport(options.s3))
        }
        return logTransports
    }

    private getRotateFileTransport = (fileOption: fileOption) => {
        //need to be called before using winston.transports.DailyRotateFile
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

    private getS3Transport = (s3Option: s3Option) => {
        var S3StreamLogger = require('s3-streamlogger').S3StreamLogger;
        var s3stream = new S3StreamLogger({
            bucket: s3Option.bucket,
            access_key_id: s3Option.access_key_id,
            secret_access_key: s3Option.secret_access_key,
            folder: s3Option.folder,
            name_format: s3Option.nameFormat || `%Y-%m-%d-%H-%M-%S-%L-${path.basename(process.cwd())}.log`
        });
        s3stream.on('error', function (err) {
            // there was an error!
            console.log('error', 'logging transport error', err)
        });
        var transport = new (winston.transports.File)({
            stream: s3stream
        });
        return transport;
    }

}