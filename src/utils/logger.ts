import { TransactionsService } from "../services/transactions.service";
import { SysLogsService } from "../services/syslogs.service";
import { Transaction } from "../models/transactions.models";
import { SysLogs } from "../models/syslogs.models";
import { Utils } from "../utils/utils";

export class Logger {

    public utils: Utils;
    public transactionsSrv: TransactionsService;
    public sysLogSrv: SysLogsService;

    constructor() {
        this.utils = new Utils();
        this.transactionsSrv = new TransactionsService();
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

    public writeTransaction = async (label: string, action: string, labelId: string, data: string) => {
        try {
            await this.transactionsSrv.create(new Transaction({
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