import * as request from "superagent";
import { restApiOption } from "../transportInstances/restApiTransportBuilder";
import * as Transport from "winston-transport";
import { baseConsoleError } from "../consoleOverrides/logConsoleDefaults";

export class RestApiCustomTransport extends Transport {

  constructor(private opts: restApiOption) {
    super(<any>opts);
  }

  log(info, callback) {
    //if(this.validateAuthToken() && this.validateLevelFilter(level)){
    let level: string = info.level;
    if (this.validateLevelFilter(level)) {
      let fullMessage = info.message;
      if (info.meta) {
        fullMessage = `${fullMessage}. ${JSON.stringify(info.meta)}`
      }
      let log: ILog = { date: new Date(), level, logMessage: fullMessage, origin: this.opts.origin }
      request.post(this.opts.url).send(log).then(res => {

      }).catch(err => {
        baseConsoleError(`RestApiCustomTransport error - could not send rest request. Error: ${err.message}`)
      });
    }
    callback();
  }
  validateLevelFilter = (level: string) => {
    //if requires filter and level contained
    if (this.opts.filterLogLevel && this.opts.filterLogLevel.length > 0 && this.opts.filterLogLevel.includes(level)) {
      return true;
    } else if (!this.opts.filterLogLevel || this.opts.filterLogLevel.length == 0) { //not require filter
      return true;
    }
    return false;
  }
  validateAuthToken = (): boolean => {
    if (this.opts.mandatoryAuthToken && !this.opts.authToken) {
      return false;
    } else {
      return true;
    }

  }
};

export type ILog = {
  date: Date,
  level: string,
  origin?: string,
  logMessage: string
}