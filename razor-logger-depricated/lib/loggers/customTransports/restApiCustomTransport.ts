import * as request from "superagent";
import { restApiOption } from "../transportInstances/restApiTransportBuilder";
import {} from "winston-transport";

export class RestApiCustomTransport extends Transport {
    
    constructor(private opts:restApiOption) {
      super(opts);
    }
  
    log(level, msg, meta) {
      //if(this.validateAuthToken() && this.validateLevelFilter(level)){
      if(this.validateLevelFilter(level)){
        let fullMessage = msg;
        if(meta){
          fullMessage =`${fullMessage}. ${JSON.stringify(meta)}`
        }
        let log:ILog = {date:new Date(),level,logMessage:fullMessage,origin:this.opts.origin}
        request.post(this.opts.url).send(log).then(res=>{
          //cant console log since it will cause the transport to enter an infinite loop
        }).catch(err=>{
          //cant console log since it will cause the transport to enter an infinite loop
        });
      }
      
    }
    validateLevelFilter=(level:string)=>{
      //if requires filter and level contained
      if(this.opts.filterLogLevel && this.opts.filterLogLevel.length>0 && this.opts.filterLogLevel.includes(level)){
        return true;
      }else if(!this.opts.filterLogLevel || this.opts.filterLogLevel.length==0 ){ //not require filter
        return true;
      }
      return false;
    }
    validateAuthToken=():boolean=>{
      if(this.opts.mandatoryAuthToken && !this.opts.authToken){
        return false;
      }else{
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