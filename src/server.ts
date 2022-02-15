import dotenv from 'dotenv';
dotenv.config();
// Syslogs service import
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dockerIpTools from "docker-ip-get";
// Swagger API documentation
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from '../docs/swagger.json';
// Controllers
import { MenusController } from "./controllers/menus.controller";
import { CategoriesController } from "./controllers/categories.controller";
// Services
import { MenusService } from "./services/menus.service";
import { CategoriesService } from "./services/categories.service";
// Helpers
import { Utils } from "./utils/utils";
import { Logger } from "./utils/logger";
// Mysql Database
import { mysqldb } from "./models/mysql.db";
// Constants
import { MONGO_URL } from "./constants/menus.constants";
import { MENUS_API_PORT } from "./constants/menus.constants";

class Server {

    public app: express.Application;
    public utils = new Utils();
    public mysqldb: any = null;
    public strConn: string = "";
    public logger: Logger;

    constructor() {
        this.app = express();
        this.logger = new Logger();        
        this.setConfig();
        this.setControllers();
    }

    public start(): void {
        this.app.listen(MENUS_API_PORT, () => {
            this.logger.writeSysLog(`Menus service listening on port ${MENUS_API_PORT}`);
            console.log(`Menus service listening on port ${MENUS_API_PORT}`);
        });
    }

    private setConfig() {
        // Allows to get data requests in json format
        this.app.use(bodyParser.json({ limit: "2mb" }));
        // Allows to get data requests in in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
        // Enables cors
        this.app.use(cors());
        // Load Swagger Documentation
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    private async startMongo() {
        try {
            let db:any = null;
            // Check if the system is a docker container
            if (dockerIpTools.isInDocker()) {
                db = MONGO_URL.replace("ipv4", "historydb");
            } else {
                db = MONGO_URL.replace("ipv4", await this.utils.getIPv4());
            }            
            const connection = mongoose.connection;
            connection.on("connected", () => {
                // Renaming _id to id
                connection.set("toJSON", {
                    virtuals: true,
                    transform: (_: any, converted: any) => {
                        delete converted._id;
                    },
                });
                this.logger.writeSysLog("Mongo Connection Established.");
            });
            connection.on("reconnected", () => {
                console.log("Mongo Connection Reestablished.");
            });
            connection.on("disconnected", () => {
                console.log("Mongo Connection Disconnected.");
                console.log("Trying to reconnect to Mongo ...");
                setTimeout(() => {
                    mongoose.connect(db, {
                        keepAlive: true, socketTimeoutMS: 3000, connectTimeoutMS: 3000
                    });
                }, 3000);
            });
            connection.on("close", () => {
                console.log("Mongo Connection Closed");
            });
            connection.on("error", (error: Error) => {
                console.log("Mongo Connection ERROR: " + error);
            });

            const run = async () => {
                await mongoose.connect(db, {
                    keepAlive: true, socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            };
            run();            
/*
            mongoose.Promise = global.Promise;
            await mongoose.connect(db);
            // Renaming _id to id
            mongoose.set("toJSON", {
                virtuals: true,
                transform: (_: any, converted: any) => {
                    delete converted._id;
                },
            });
*/
        } catch (err) {
            let msg: any = { message: (err as Error).message };
            this.logger.writeSysLog(msg.message);
        }
    }

    private async startMySQL() {
        try {
            if (dockerIpTools.isInDocker()) {
                this.strConn = process.env.DB_DIALECT + "://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@dockerhost:" + process.env.DB_PORT + "/" + process.env.DB_NAME;
                this.strConn = this.strConn.replace("dockerhost", (await dockerIpTools.getGatewayIp()));
                console.log(this.strConn);
            } else {
                this.strConn = process.env.DB_DIALECT + "://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@localhost:" + process.env.DB_PORT + "/" + process.env.DB_NAME;
            }
            this.mysqldb = new mysqldb(this.strConn, this.logger);
            // Wait until starts database
            while (this.mysqldb === null) {
                await this.utils.sleep(3);
            }
           // Sync database when started
           this.mysqldb.sequelize.sync();   
        } catch (err) {
            let msg: any = { message: (err as Error).message };
            this.logger.writeSysLog(msg.message);
        }
    }

    private async initDatabases() {
        // Start mongo database
        await this.startMongo();        
        // Start mysql database
        await this.startMySQL();
    }

    private async setControllers() {   
        // Init databases
        await this.initDatabases();            
        // Init controllers  
        const menusController = new MenusController(new MenusService(this.mysqldb.db));
        const categoriesController = new CategoriesController(new CategoriesService(this.mysqldb.db), this.logger);
        this.app.use("/menus", menusController.router);
        this.app.use("/categories", categoriesController.router);
    }
}

const server = new Server();

server.start();

