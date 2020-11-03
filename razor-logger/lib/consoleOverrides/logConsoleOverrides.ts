import {consoleLogger} from "../consoleOverrideLogger";


console.log = (...args) => {
    if (consoleLogger) consoleLogger.info.call(consoleLogger, aggregateArgs(...args))
    else console.log(...args);
}
console.info = (...args) => {
    if (consoleLogger) consoleLogger.info.call(consoleLogger, aggregateArgs(...args))
    else console.info(...args);
}
console.warn = (...args) => {
    if (consoleLogger) consoleLogger.warn.call(consoleLogger, aggregateArgs(...args))
    else console.warn(...args);
}
console.error = (...args) => {
    if (consoleLogger) consoleLogger.error.call(consoleLogger, aggregateArgs(...args))
    else console.error(...args);
}
console.debug = (...args) => {
    if (consoleLogger) consoleLogger.debug.call(consoleLogger, aggregateArgs(...args))
    else console.debug(...args);
}

//Since version 3.2 of winston only first arg is logged
function aggregateArgs(...args){
    return args.map(arg=>{
        if(typeof arg == "string"){
            return arg;
        }else if(arg instanceof Error){
            return arg.stack
        }else{
            return JSON.stringify(arg)
        }
        
    }).join(" ")
}
