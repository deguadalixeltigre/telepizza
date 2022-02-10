import { Document } from "mongoose";

export interface ISysLogs extends Document {
    timestamp: string;
    label: string;
    level: string;
    message: string;
}
