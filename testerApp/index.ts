import { ConsoleLogger } from "razor-logger"


const callback=(level,msg,meta)=>{
    let myLevel = level;
}

new ConsoleLogger().createLogger({ console: true, restApi:{url:"http://localhost:4000/logs"} });
console.log("lets give it a try",{some:"obj"});
console.warn("warn log")
new ConsoleLogger().configureLogger({ console: true, restApi:{url:"http://localhost:4000/logs",authToken:"sometoken"} });
console.error("error log")
new ConsoleLogger().configureLogger({ console: true,callback:{callbackMethod:callback,filterLogLevel:["warn"] }});
console.log("lets try callback",{some:"obj"});
console.warn("warn log");
setTimeout(()=>{},1000)

