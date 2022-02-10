import { ISysLogs } from "../interfaces/syslogs.interfaces";
import { SysLogs } from "../models/syslogs.model";

export class SysLogsService {

    public async create(syslog: ISysLogs) {
        try {
            const _syslog = new SysLogs(syslog);
            return _syslog.save();
        } catch (err) {
            return err;
        }
    }
}