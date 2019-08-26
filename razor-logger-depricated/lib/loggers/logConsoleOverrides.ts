import {consoleLogger} from "./consoleLogger";


console.log = (...args) => {
    if (consoleLogger) consoleLogger.info.call(consoleLogger, ...args)
    else console.log(...args);
}
console.info = (...args) => {
    if (consoleLogger) consoleLogger.info.call(consoleLogger, ...args)
    else console.info(...args);
}
console.warn = (...args) => {
    if (consoleLogger) consoleLogger.warn.call(consoleLogger, ...args)
    else console.warn(...args);
}
console.error = (...args) => {
    if (consoleLogger) consoleLogger.error.call(consoleLogger, ...args)
    else console.error(...args);
}
console.debug = (...args) => {
    if (consoleLogger) consoleLogger.debug.call(consoleLogger, ...args)
    else console.debug(...args);
}
