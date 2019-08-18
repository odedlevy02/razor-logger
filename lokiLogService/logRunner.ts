
class LogRunner {
    
    
    init() {
       this.startLogInterval();
       this.startWarnInterval();
    }

    startLogInterval() {
        let counter = 0;
        setInterval(() => {
            let log = `Log from app. Count=${counter++}`
            console.log(log);

        }, 2000)
    }

    startWarnInterval() {
        let counter = 0;
        setInterval(() => {
            //let log = `app=myapp level=info Log from app. Count=${counter++}`
            let log = `warn from app. Count=${counter++}`
            console.warn(log);

        }, 4000)
    }


}

export const logRunnerInstance = new LogRunner();