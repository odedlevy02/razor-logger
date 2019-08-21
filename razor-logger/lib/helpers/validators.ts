
export function shouldLogLevel(opts: any, level: string) {
    //if not defined filter all
    if (!opts.level) {
        return true;
    } else {
        return levels.indexOf(level) >= levels.indexOf(opts.level.toLowerCase())
    }
  }

var levels = ["trace", "debug", "info", "warn", "error", "fatal"]