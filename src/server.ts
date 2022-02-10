import dotenv from 'dotenv';
dotenv.config();
// Local imports
import app from "./app";
import { MENUS_API_PORT } from "./constants/menus.constants";
// Syslogs service import
import { SysLogsService } from "./services/syslogs.service";
import { SysLogs } from "./models/syslogs.model";
import { Utils } from "./utils/utils";

app.listen(MENUS_API_PORT, () => {
    let utils = new Utils();
    let sysLogSrv: SysLogsService = new SysLogsService();
    let sysLog = new SysLogs({
        timestamp: String(utils.getNow()),
        label: "[serv]",
        level: "info",
        message: `Menus service listening on port ${MENUS_API_PORT}`
    });
    sysLogSrv.create(sysLog);
    console.log(`Menus service listening on port ${MENUS_API_PORT}`);
});
