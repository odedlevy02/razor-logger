import { LoggerBase} from "./loggerBase";
import * as expressWinston from "express-winston";

const defaultReqLogOptions= {console: false, file: {fileName: "requests.log"}}

// To log express requests , server.js add before creating a router use the logger:
// this.app.use(new RequestLogger ().createLogger({console:true,file:{fileName:"requests.log"}));

export class RequestLogger extends LoggerBase{
    constructor(private logRequestBody:boolean=true,private logResponseBody=true){
        super()
    }

    createLogger(options = defaultReqLogOptions){
        if(this.logResponseBody){
            expressWinston.requestWhitelist.push('body')
        }
        if(this.logResponseBody){
            expressWinston.responseWhitelist.push('body')
        }

        let expressLogger = expressWinston.logger({
            transports: this.getTransportsList(options),
            meta: true, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}} {res.responseTime}}ms {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) {
                return false;
            } // optional: allows to skip some log messages based on request and/or response
        })
        return expressLogger;
    }

}