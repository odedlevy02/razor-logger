import * as request from "superagent";
import { restApiOption } from "../transportInstances/restApiTransportBuilder";
import * as Transport from "winston-transport";
import { baseConsoleError } from "../consoleOverrides/logConsoleDefaults";
import { shouldLogLevel } from "../helpers/validators";

export class RestApiCustomTransport extends Transport {

  constructor(private opts: restApiOption) {
    super(<any>opts);
  }

  log(info, callback) {
    //if(this.validateAuthToken() && this.validateLevelFilter(level)){
    let level: string = info.level;
    if (shouldLogLevel(this.opts, level)) {
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