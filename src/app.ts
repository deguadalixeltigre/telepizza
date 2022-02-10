import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dockerIpTools from "docker-ip-get";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from '../docs/swagger.json';
// Controllers
import { MenusController } from "./menus.controller";
import { CategoriesController } from "./categories.controller";
// Services
import { MenusService } from "./services/menus.service";
import { CategoriesService } from "./services/categories.service";
import { SysLogsService } from "./services/syslogs.service";
import { SysLogs } from "./models/syslogs.model";

// Helpers
import { Utils } from "./utils/utils";
// Mysql Database
import { mysqldb } from "./models/mysql.db";
// Constants
import { MONGO_URL } from "./constants/menus.constants";

class App {

    public app: express.Application;
    public utils = new Utils();
    public mysqldb: any = null;
    public strConn: string = "";
    public sysLogSrv: SysLogsService;
    constructor() {
        this.app = express();
        this.sysLogSrv = new SysLogsService();
        this.setConfig();
        this.setDatabases();
        this.setControllers();
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
        let db = null;
        // Check if the system is a docker container
        if (dockerIpTools.isInDocker()) {
            db = MONGO_URL.replace("ipv4", "historydb");
        } else {
            db = MONGO_URL.replace("ipv4", await this.utils.getIPv4());
        }
        mongoose.Promise = global.Promise;
        mongoose.connect(db);
        // Renaming _id to id
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_: any, converted: any) => {
                delete converted._id;
            },
        });
        } catch (err) {
            let msg: any = { message: (err as Error).message };
            this.writeSysLog(msg.message);
        }
    }

    private async startMySQL() {
        await this.setMySqlConfig();
        // Wait until starts database
        while (this.utils.isNull(this.mysqldb)) {
            this.utils.sleep(1);
        }
        // Sync database when started
        this.mysqldb.sequelize.sync();    
    }

    private async setMySqlConfig() {
        try {
            if (dockerIpTools.isInDocker()) {
                this.strConn = process.env.DB_DIALECT + "://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@dockerhost:" + process.env.DB_PORT+ "/" + process.env.DB_NAME;
                this.strConn = this.strConn.replace("dockerhost", (await dockerIpTools.getGatewayIp()));
                console.log(this.strConn);
            } else {
                this.strConn = process.env.DB_DIALECT + "://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@localhost:" + process.env.DB_PORT+ "/" + process.env.DB_NAME;
            }
            this.mysqldb = new mysqldb(this.strConn, this.sysLogSrv);       
        } catch (err) {
            let msg: any = { message: (err as Error).message };
            this.writeSysLog(msg.message);
        }
    }

    private async setDatabases() {
        // Start mongo database
        await this.startMongo();
    }

    private async setControllers() {
        // Start mysql database
        await this.startMySQL();
        // Init controllers  
        const menusController = new MenusController(new MenusService(this.mysqldb.db));
        const categoriesController = new CategoriesController(new CategoriesService(this.mysqldb.db), this.sysLogSrv);
        this.app.use("/menus", menusController.router);
        this.app.use("/categories", categoriesController.router);
    }

    private writeSysLog = async (message: string, label: string = "[serv]", level: string = "info") => {
        try {
            await this.sysLogSrv.create(new SysLogs({
                timestamp: String(this.utils.getNow()),
                label: label,
                level: level,
                message: message
            }));
        } catch (e) {
            console.log((e as Error).message);
        }
    }
}

export default new App().app;
