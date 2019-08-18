import * as Transport from "winston-transport";
import { callbackOption } from "../transportInstances/callbackTransportBuilder";



export class CallbackCustomTransport extends Transport {

  constructor(private opts: callbackOption) {
    super(<any>opts);
  }

  log(info, callback) {
    if (this.validateLevelFilter(info.level)) {
      if (this.opts && this.opts.callbackMethod) {
        this.opts.callbackMethod(info.level,info.message, info.meta);
      }
    }
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
};