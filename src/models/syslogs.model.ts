import { Schema, model } from "mongoose";
import { ISysLogs } from "../interfaces/syslogs.interfaces";

const SysLogsSchema = new Schema({
    timestamp: { type: String, unique: true, required: true },
    label: { type: String, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true }
});

export const SysLogs = model<ISysLogs>("SysLogs", SysLogsSchema);