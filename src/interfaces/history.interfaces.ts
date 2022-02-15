import { Document } from "mongoose";

export interface IHistory extends Document {
    timestamp: string;
    label: string;
    action: string;
    labelId: string;
    data: string;
}
