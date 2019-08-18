import * as Transport from "winston-transport";
import { LokiOptions } from "../transportInstances/lokiTransportBuilder";
import * as request from "superagent";
import { baseConsoleWarn } from "../consoleOverrides/logConsoleDefaults";

    
export class LokiTransport extends Transport{
    _lokiOptions: LokiOptions = null;
    constructor(private opts: LokiOptions) {
        super(<any>opts);
        this._lokiOptions = opts;
    }

    log(info,callback) {
        if(this._lokiOptions && this._lokiOptions.pushLogs && this._lokiOptions.lokiUrl){
            let mergedLabels = this.mergeLabels(info.labels,this._lokiOptions.defaultLabels);
            let labelsStr = this.createGoLabels(mergedLabels);
            this.sendLogToLoki(info.level,info.message,labelsStr,this._lokiOptions.lokiUrl);
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
        this.postToLoki(lokiUrl,lokiLog);
    }

    postToLoki(lokiUrl,lokiLog){
        request.post(lokiUrl).send(lokiLog).then(res=>{}).catch(err=>{
            this.warnNoConnection(err);
        })
    }

    warnNoConnection(err){
        baseConsoleWarn(`Warn - Could not log to loki. Err: ${err.message}`);
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