# razor-logger

A wrapper around winston logger for making it simple to use transports such as S3, File rotations etc.
Razor logger overrides the console logs so that there is no need to import a logger instance all around the code.
It also promots the Twelve Factor App that logs should always print out the stdout and stderr

## Installation
```
npm install razor-logger
````
## Overview
Winston is a great Logger but configuring it in each app takes time. I wanted to make simple yet extensive wrapper that I can use with minimal lines of code. I wanted to initialize the logger with all the required configuration values for each of the transport types and just have them up and running
In addition I find it great to have the ability to override all the console.logs that users have inside their code. 

to start using just add in the begining of you app:
```
import { config } from "dotenv";
import * as path from "path"
import { displayEnv } from "dotenv-display"
import { createLogger } from "razor-logger"

//load env before calling createLogger in case need to use env vars
let configPath = path.join(__dirname, "./.env")
let env = config({ path: configPath });

//Loki url is as following: http://localhost:3100/api/prom/push
createLogger({
    console: { display: true, timestamp: true },
    file: { dirname: "logs", fileName: "scraper-manager" },
    loki:{pushLogs:true,lokiUrl: process.env.LOKI_URL,defaultLabels:{app:"scrape_manager"}}
    
})
//display config variables defined in .env file
displayEnv(env.parsed)

console.log("some test log")
//output in format of:
//2020-03-14T23:44:03.355Z info: some test log
```
Inside the createLogger config options there are several other supported transporters
## Supported transports
Initially the module supports these transports (storage for the logs):
1. Console logging
2. File logging
3. S3 logging
4. Custom REST api
5. Callback
6. Loki - (https://github.com/grafana/loki)
7. Coralogix

It is easy to add any additional transports. Just implement the 'ITransportBuilder' and register your class and your good to go.

## Configuration List
Here is the list of configurations for each transport type
1. console : (e.g. console:{display:true})
    - display:boolean. Set to true to support console logs
    - format:string. Default set to simple. Optional value 'json' for json format logs
    - level?:string
2. file :  (e.g. file:{fileName:"someFile.txt"})
    - fileName: string, 
    - datePattern?: string (date pattern in file name. Default 'YYYY-MM-DD.') 
    - dirname?:string (folder location for logs),
    - maxSize?: number,
    - maxFiles?:number 
    - level?:string
3. s3 : (e.g. s3:{ bucket: "mys3bucket",  access_key_id: "<s3 access key>", secret_access_key: "<s3 secret>"} 
    - bucket: string
    - folder? - optional. Folder inside bucket
    - access_key_id
    - secret_access_key
    - nameFormat - default value set to `%Y-%m-%d-%H-%M-%S-%L-${path.basename(process.cwd())}.log`
    - level?:string
4. restApi: (e.g. {restApi:{url:string, filterLogLevel:["warn","error"],origin:"my app"}})
    - url: path to post api
    - level?:string
    - origin: a string value to label the sending app
5. callback :(e.g. {callback:{ callbackMethod: (level:string, log:string, meta:any) => void }})
    - callbackMethod - a method that excepts level, log and meta.
    - level?:string
6. loki:  (e.g. {loki:{ pushLogs:true, lokiUrl:"http://loki:3100/api/prom/push", defaultLabels:{label1:"my label"}}})
    - pushLogs: boolean. When set to true logs will be pushed to loki service. 
    - lokiUrl:  the api to loki service
    - defaultLabels: an obj containing a set of static labels that will be appended to each log
    - level?:string
7. Coralogix : (e.g. {coralogix:{applicationName:"<app name>>",privateKey:"<coralogix key>",subsystemName:"dev"}}})
    - applicationName - coralogix application name
    - privateKey - your coralogix private key
    - subsystemName - coralogix sub system
    - category - used when creating coralogix logger

## Loki logs
Loki is a grafana solution for displaying logs. Loki is basically a pull based service by using a service named promtail. 

### Loki with docker plugin
When working on a local docker compose env I recommend using the plugin option (On your host install loki plugin ( https://github.com/grafana/loki/blob/master/cmd/docker-driver/README.md))
In order to use this plugin add to each service definition in the docker-compose the following:
```
services:
  logger:
    image: <your image>
    logging:
      driver: loki
      options:
        loki-url: "http://localhost:3100/api/prom/push"
```
When using this option set the 'pushLogs' property to false. 

### Loki with logger push logs
The logger also supports a push option without the plugin. To do that fill set the pushLogs to true and set the lokiUrl path

For detailed explanation of usage of the loki option look in the git code samples.

### Loki with kubernetes
When running on Kuberbetes it is required to have a service discovery so that promtail can collect logs from all the service instances. For that I recommend reading this article:  https://medium.com/@_oleksii_/collect-and-view-logs-with-grafana-loki-33d9155ac581

## ConsoleOverrideLogger Usage
To use the console override logger just instantiate the ConsoleOverrideLogger class and call the createLogger({options} method with a set of configurations for each transport.
For instance to initialize a logger for console and file you would write

````
new ConsoleOverrideLogger().createLogger({console:true,file:{fileName:"somefile.log"}});
````
Make sure to create the logger prior to any other console.log in your code

It also possible to update the loggers list. This is mainly relevant in case you are using the rest api and require a token. The Token will only be available when the user logs in. In this case you can update the json configuration and then reload the loggers:
```
new ConsoleOverrideLogger().configureLogger({restApi:{url:"http://localhost:3000/logs/save"});
```
>NOTE - when debugging app with Visual Studio Code add to your relevant launch.json config: 
```
{
    "type": "node",
    "request": "launch",
    "outputCapture": "std",
    ...
}
```

##Adding additional transports
For adding your custom transports
1. create a class and implement  'ITransportBuilder'. The interface has a single method 'buildTransport' that will receive the configuration for this transport and will return a Winston TransportInstance
````
export interface ITransportBuilder{
    buildTransport(options:any):TransportInstance;
}
````
2. Register the builder inside the logger by calling 'appendTransportsMap(key:string,logTransport:ITransportBuilder)'
3. When calling Logger.createLogger({options}) insert a property by the name of you key and the configuration you defined in transport builder  


