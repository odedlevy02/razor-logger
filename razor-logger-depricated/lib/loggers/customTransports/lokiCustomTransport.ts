import { Transport } from "winston";
import { lokiOptions } from "../transportInstances/lokiTransportBuilder";
import * as request from "superagent"
import { baseConsoleLog, baseConsoleWarn } from "../logConsoleDefaults";

export class LokiCustomTransport extends Transport {
    _lokiOptions: lokiOptions = null;
    constructor(private opts: lokiOptions) {
        super(opts);
        this._lokiOptions = opts;
    }

    log(level, msg, meta) {
        if(this._lokiOptions && this._lokiOptions.pushLogs && this._lokiOptions.lokiUrl){
            let mergedLabels = this.mergeLabels(meta,this._lokiOptions.defaultLabels);
            let labelsStr = this.createGoLabels(mergedLabels);
            this.sendLogToLoki(level,msg,labelsStr,this._lokiOptions.lokiUrl);
        }
    }

    sendLogToLoki(level,log,labelStr,lokiUrl){
        let date = new Date().toISOString();
        let labeledLog = `[${level}] ${log}`
        let lokiLog = {
            streams: [
              {
                labels: labelStr,
                entries: [{ ts:date , line:labeledLog }]
              }
            ]
          }
        request.post(lokiUrl).send(lokiLog).then(res=>{}).catch(err=>{
            baseConsoleWarn("Could not log to loki. Err: ",err );
        })
    }

    createGoLabels(labelsConfig:any){
        let labelStr = "";
        Object.keys(labelsConfig).forEach(key => {
            if(!labelStr){
                labelStr=`{${key}=\"${labelsConfig[key]}\"`
            }else{
                labelStr+=`,${key}=\"${labelsConfig[key]}\"`
            }
        });
        if(labelStr){
            labelStr+="}";
        }
        return labelStr;
    }

    mergeLabels(meta:any,defaultLabels:any){
        let merged = Object.assign({},defaultLabels,meta)
        return merged;
    }

}