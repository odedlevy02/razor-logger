import { TransportInstance, Transport } from "winston";
import { callbackOption } from "../transportInstances/callbackTransportBuilder";
export class CallbackCustomTransport extends Transport {

  constructor(private opts: callbackOption) {
    super(opts);
  }

  log(level, msg, meta) {
    if (this.validateLevelFilter(level)) {
      if (this.opts && this.opts.callbackMethod) {
        this.opts.callbackMethod(level, msg, meta);
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