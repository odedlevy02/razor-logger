# razor-logger

A wrapper around winston logger for making it simple to use transports such as S3, File rotations.
Supports 2 Logger types:
1. Console log wrapper - log all console logs to various transports (s3, files etc)
2. Web Request Logger - log all web requests including the result code and body to various transports (s3, files etc)
 
## Installation
```
npm install razor-logger
````
##Overview
Winston is a great Logger but configuring it in each app takes time. I wanted to make simple yet extrensive wrapper that I can use with a single line in my code. I wanted to initialize the logger with all the required configuration values for each of the transport types and just have them up and running
In addition I find it great to have the ability to override all the console.logs that users have inside their code. 

An additional log I found myself requiring is one that logs all web requests including the request body and the response code and body as well. 

##Supported transports
Initialy the module supports 3 transports (storage for the logs):
1. Console logging
2. File logging
3. S3 logging

It is easy to add any additional transports. Just implememnt the 'ITransportBuilder' and register your class and your good to go

##Supported loggers
The module supports 2 different loggers that can both be used in the same app
1. Console Logger - a logger that monitors all the users console.logs and logs them to the various transports
2. Web Request logger - a logger that monitors all the web requests and logs them to the various transports

##Configuration List
Here is the list of configurations for each transport type
1. console - boolean (e.g. console:true)
2. file - { fileName: string, datePattern?: string, dirname?:string,  maxSize?: number,maxFiles?:number } (e.g. file:{fileName:"someFile.txt"})
3. s3 - { bucket: string, folder?: string, access_key_id: string, secret_access_key: string, nameFormat?: string } 


## ConsoleLogger Usage
To use the console logger just instantiate the ConsoleLogger class and call the createLogger({options} method with a set of configurations for each transport
For instance to initialize a logger for console and file you would write

````
new ConsoleLogger().createLogger({console:true,file:{fileName:"somefile.log"}});
````
Make sure to create the logger prior to any other console.log in your code

##RequestLogger usage
To use the console logger with Express just instantiate the RequestLogger class and call the createLogger({options} method with a set of configurations for each transport.
The instansiation needs to be done inside the app.use and before creating any routes

For example:
````
this.app.use(new RequestLogger ().createLogger({console:true,file:{fileName:"requests.log"}}));
//now start setting the routes
````

##Adding additional transports
For adding your custom transports
1. create a class and implement  'ITransportBuilder'. The interface has a single method 'buildTransport' that will recieve the configuration for this trasnport and will return a Winston TransportInstance
````
export interface ITransportBuilder{
    buildTransport(options:any):TransportInstance;
}
````
2. Register the builder inside the logger (ConsoleLogger or RequestLogger) by calling 'appendTransportsMap(key:string,logTransport:ITransportBuilder)'
3. When calling Logger.createLogger({options}) insert a property by the name of you key and the configuration you defined in transport builder  


