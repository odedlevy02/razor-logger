import {TransportInstance, Transport} from "winston";
import { callbackOption } from "../transportInstances/callbackTransportBuilder";
export class CallbackCustomTransport extends Transport {
    
    constructor(private opts:callbackOption) {
      super(opts);
    }
  
    log(level, msg, meta) {
      if(this.opts && this.opts.callbackMethod){
          this.opts.callbackMethod(level,msg,meta);
      }
      
    }
  };