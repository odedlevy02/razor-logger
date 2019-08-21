import * as Transport from "winston-transport";
import { callbackOption } from "../transportInstances/callbackTransportBuilder";
import { shouldLogLevel } from "../helpers/validators";



export class CallbackCustomTransport extends Transport {

  constructor(private opts: callbackOption) {
    super(<any>opts);
  }

  log(info, callback) {
    if (shouldLogLevel(this.opts, info.level)) {
      if (this.opts && this.opts.callbackMethod) {
        this.opts.callbackMethod(info.level,info.message, info.meta);
      }
    }
    callback();
  }

};