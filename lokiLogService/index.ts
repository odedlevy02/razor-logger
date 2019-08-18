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
logger.createLogger({console:{display:true},loki:{pushLogs:true,lokiUrl:"http://localhost:3100/api/prom/push"}});

const server = new Server();
server.setRoutes();
server.setStaticFolders();
server.setErrorHandlers();
server.startServer();
//init logs
logRunnerInstance.init();
