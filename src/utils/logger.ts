import { HistoryService } from "../services/history.service";
import { SysLogsService } from "../services/syslogs.service";
import { History } from "../models/history.models";
import { SysLogs } from "../models/syslogs.models";
import { Utils } from "../utils/utils";

export class Logger {

    public utils: Utils;
    public historySrv: HistoryService;
    public sysLogSrv: SysLogsService;

    constructor() {
        this.utils = new Utils();
        this.historySrv = new HistoryService();
        this.sysLogSrv = new SysLogsService();
    }

    public writeSysLog = async (message: string, label: string = "[serv]", level: string = "info") => {
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

    public writeHistory = async (label: string, action: string, labelId: string, data: string) => {
        try {
            await this.historySrv.create(new History({
                timestamp: String(this.utils.getNow()),
                label: label,
                action: action,
                labelId: labelId,
                data: data
            }));
        } catch (e) {
            console.log((e as Error).message);
        }
    }
}