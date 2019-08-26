import { Server} from "./server";
import {config} from "dotenv";
import * as path from "path"
import { logRunnerInstance } from "./logRunner";

let configPath = path.join(__dirname, "./config/.env")
config({path: configPath});
//create logger
import {ConsoleOverrideLogger} from "razor-logger";
let logger = new ConsoleOverrideLogger();
//logger.createLogger({console:{display:true}});
let loggerConfig = {console:{display:true}};
if(process.env.PUSH_LOGS=="true"){
    loggerConfig["loki"]={pushLogs:true,lokiUrl:process.env.LOKI_URL}
}
logger.createLogger(loggerConfig);

const server = new Server();
server.setRoutes();
server.setStaticFolders();
server.setErrorHandlers();
server.startServer();
//init logs
logRunnerInstance.init();
