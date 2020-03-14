import { createLogger } from "razor-logger"


createLogger({console:{display:true,timestamp:true}})
console.log("lets give it a try",{some:"obj"});

// const callback=(level,msg,meta)=>{
//     let myLevel = level;
// }

// new ConsoleOverrideLogger().createLogger({ console: true, restApi:{url:"http://localhost:4000/logs"} });
// console.log("lets give it a try",{some:"obj"});
// console.warn("warn log")
// new ConsoleOverrideLogger().configureLogger({ console: true, restApi:{url:"http://localhost:4000/logs",authToken:"sometoken"} });
// console.error("error log")
// new ConsoleOverrideLogger().configureLogger({ console: true,callback:{callbackMethod:callback,filterLogLevel:["warn"] }});
// console.log("lets try callback",{some:"obj"});
// console.warn("warn log");
// setTimeout(()=>{},1000)

//Loki test - in order to test requires docker


