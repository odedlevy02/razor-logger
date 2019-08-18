
class LogRunner {
    
    init() {
        this.startLogInterval();
    }

    startLogInterval() {
        let counter = 0;
        setInterval(() => {
            //let log = `app=myapp level=info Log from app. Count=${counter++}`
            let startWith = process.env.START_WITH;
            let log = `${startWith} Log from app. Count=${counter++}`
            console.log(log);

        }, 2000)
    }


}

export const logRunnerInstance = new LogRunner();