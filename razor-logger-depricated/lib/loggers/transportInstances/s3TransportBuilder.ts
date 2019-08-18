import {ITransportBuilder} from "../loggerBase";
import * as winston from "winston";
import * as path from "path";

export type s3Option = { bucket: string, folder?: string, access_key_id: string, secret_access_key: string, nameFormat?: string }

export class S3TransportBuilder implements ITransportBuilder{
    buildTransport(s3Option: s3Option) {
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